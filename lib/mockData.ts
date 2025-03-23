export interface Strategy {
  type: string;
  condition: string;
  description: string;
  recommended_for: string;
  profit_from: string;
  breakeven_range?: string;
  max_loss?: string;
  max_profit?: string;
}

export interface VolatilityData {
  symbol: string;
  expiry: string;
  iv: number;
  rv: number;
  greeks: {
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
  };
  edge: {
    iv_rv_ratio: number;
    signal: string;
    confidence: "High" | "Medium" | "Low";
    expected_breakeven_range: string;
    premium_collected: number;
  };
  strategies: Strategy[];
  chartData: Array<{
    date: string;
    iv: number;
    rv: number;
  }>;
}

export const mockData: VolatilityData = {
  symbol: "BTC",
  expiry: "29MAR24",
  iv: 78.4,
  rv: 42.3,
  greeks: {
    delta: 0.45,
    gamma: 0.08,
    theta: -0.03,
    vega: 0.12
  },
  edge: {
    iv_rv_ratio: 1.85,
    signal: "Sell Straddle",
    confidence: "High",
    expected_breakeven_range: "29300 - 30700",
    premium_collected: 240.50
  },
  strategies: [
    {
      type: "Sell Straddle",
      condition: "IV > RV by 85%",
      description: "Market is overpricing movement. Collect premium by selling both calls and puts.",
      recommended_for: "Range-bound markets with inflated options prices",
      profit_from: "Time decay and volatility contraction",
      breakeven_range: "29300 - 30700",
      max_loss: "Unlimited",
      max_profit: "$240.50"
    },
    {
      type: "Buy Straddle",
      condition: "RV > IV",
      description: "Market is underpricing movement. Buy both calls and puts for breakout potential.",
      recommended_for: "Pre-news or volatile market conditions",
      profit_from: "Large price movement in either direction",
      breakeven_range: "28800 - 31200",
      max_loss: "$180.30",
      max_profit: "Unlimited"
    },
    {
      type: "Sell Iron Condor",
      condition: "IV very high, strong range behavior",
      description: "Maximum premium collection with defined risk. Sell near strikes, buy protection.",
      recommended_for: "High IV environments with expected range-bound behavior",
      profit_from: "Time decay and IV contraction within range",
      breakeven_range: "29100 - 30900",
      max_loss: "$500",
      max_profit: "$150"
    }
  ],
  chartData: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    iv: 70 + Math.sin(i / 5) * 10 + Math.random() * 5,
    rv: 40 + Math.cos(i / 7) * 5 + Math.random() * 3
  }))
};