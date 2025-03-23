# Volatility Edge Backend

Flask backend for the Volatility Edge dashboard, providing options analytics and volatility metrics.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
- Windows: `venv\Scripts\activate`
- Unix/MacOS: `source venv/bin/activate`

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the development server:
```bash
python app.py
```

The API will be available at `http://localhost:5000`.

## API Endpoints

### GET /api/volatility

Returns volatility metrics and options data for a given symbol and expiry.

Query Parameters:
- `symbol` (optional): Trading pair (default: "BTC")
- `expiry` (optional): Option expiry date (default: "29MAR24")

Example Response:
```json
{
  "symbol": "BTC",
  "expiry": "29MAR24",
  "iv": 78.4,
  "rv": 42.3,
  "greeks": {
    "delta": 0.45,
    "gamma": 0.08,
    "theta": -0.03,
    "vega": 0.12
  },
  "iv_series": [...],
  "rv_series": [...],
  "dates": [...],
  "edge": {
    "iv_rv_ratio": 1.85,
    "signal": "Sell Straddle",
    "confidence": "High",
    "expected_breakeven_range": "29300 - 30700",
    "premium_collected": 240.50
  },
  "strategies": [...]
}
```

## Development

The backend currently uses mock data for Deribit API responses. In production, replace the mock data with actual API calls to Deribit.