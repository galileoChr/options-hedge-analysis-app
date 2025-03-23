from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import numpy as np
import pandas as pd
import yfinance as yf
from datetime import datetime, timedelta
import time

app = Flask(__name__)
CORS(app)

DERIBIT_API_URL = "https://www.deribit.com/api/v2"

def get_deribit_data(symbol, expiry):
    # Convert symbol to Deribit format (e.g., BTC -> BTC-USD)
    instrument_name = f"{symbol}-{expiry}"
    
    # Get instrument data
    response = requests.get(
        f"{DERIBIT_API_URL}/public/get_instrument",
        params={"instrument_name": instrument_name}
    )
    instrument_data = response.json()["result"]
    
    # Get mark price and Greeks
    mark_response = requests.get(
        f"{DERIBIT_API_URL}/public/get_mark_price_history",
        params={
            "instrument_name": instrument_name,
            "start_timestamp": int((datetime.now() - timedelta(days=30)).timestamp() * 1000),
            "end_timestamp": int(datetime.now().timestamp() * 1000),
            "resolution": "1D"
        }
    )
    mark_data = mark_response.json()["result"]
    
    # Calculate historical IV
    iv_series = [point["iv"] * 100 for point in mark_data]
    dates = [datetime.fromtimestamp(point["timestamp"] / 1000).strftime('%Y-%m-%d') 
            for point in mark_data]
    
    return {
        "iv": instrument_data["mark_iv"] * 100,
        "delta": instrument_data.get("delta", 0.5),
        "gamma": instrument_data.get("gamma", 0.08),
        "theta": instrument_data.get("theta", -0.03),
        "vega": instrument_data.get("vega", 0.12),
        "iv_series": iv_series,
        "dates": dates
    }

@app.route("/api/volatility")
def volatility_data():
    symbol = request.args.get("symbol", "BTC")
    expiry = request.args.get("expiry", "29MAR24")
    period = request.args.get("period", "30")  # Days for historical data

    try:
        # Get Deribit data
        deribit_data = get_deribit_data(symbol, expiry)
        
        # Calculate Realized Volatility
        yf_symbol = "BTC-USD" if symbol == "BTC" else f"{symbol}-USD"
        data = yf.download(yf_symbol, period=f"{period}d", interval="1d")
        data["returns"] = np.log(data["Close"] / data["Close"].shift(1))
        rv = round(data["returns"].std() * np.sqrt(365) * 100, 2)
        
        # Calculate historical RV series
        rv_series = []
        for i in range(len(deribit_data["dates"])):
            window_data = data.iloc[max(0, i-int(period)):i+1]
            if not window_data.empty:
                window_data["returns"] = np.log(window_data["Close"] / window_data["Close"].shift(1))
                daily_rv = round(window_data["returns"].std() * np.sqrt(365) * 100, 2)
                rv_series.append(daily_rv)
            else:
                rv_series.append(None)

        iv_rv_ratio = round(deribit_data["iv"] / rv, 2)
        
        return jsonify({
            "symbol": symbol,
            "expiry": expiry,
            "iv": deribit_data["iv"],
            "rv": rv,
            "greeks": {
                "delta": deribit_data["delta"],
                "gamma": deribit_data["gamma"],
                "theta": deribit_data["theta"],
                "vega": deribit_data["vega"]
            },
            "iv_series": deribit_data["iv_series"],
            "rv_series": rv_series,
            "dates": deribit_data["dates"],
            "edge": {
                "iv_rv_ratio": iv_rv_ratio,
                "signal": "Sell Straddle" if iv_rv_ratio > 1.1 else "Buy Call",
                "confidence": "High" if abs(iv_rv_ratio - 1) > 0.25 else "Moderate",
                "expected_breakeven_range": f"{round(data['Close'].iloc[-1] * 0.95)} - {round(data['Close'].iloc[-1] * 1.05)}",
                "premium_collected": round(data['Close'].iloc[-1] * 0.02, 2)  # 2% of spot as premium
            },
            "strategies": [
                {
                    "type": "Sell Straddle",
                    "condition": "IV > RV",
                    "description": "Expecting low movement, selling both call and put ATM.",
                    "recommended_for": "Range-bound, high IV environments",
                    "profit_from": "Time decay and IV collapse"
                },
                {
                    "type": "Buy Straddle",
                    "condition": "RV > IV",
                    "description": "Expecting breakout, buy both call and put.",
                    "recommended_for": "News-driven or volatile environments",
                    "profit_from": "Price explosion in either direction"
                },
                {
                    "type": "Sell Iron Condor",
                    "condition": "IV very high, strong range behavior",
                    "description": "Sell far OTM call and put, buy wings for safety",
                    "recommended_for": "Stable ranges with overbought IV",
                    "profit_from": "Range compression"
                }
            ]
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)