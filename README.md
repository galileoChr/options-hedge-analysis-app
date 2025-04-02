# Volatility Edge

In this project, I created an options trading dashboard that helps traders identify volatility-based trading opportunities in the cryptocurrency markets. This project is currently a prototype/proof of concept that demonstrates my vision for a more comprehensive trading tool.


![image](https://github.com/user-attachments/assets/985b2a3a-3a67-4ad1-b020-b69e560baa09)

![image](https://github.com/user-attachments/assets/19f05fdb-975c-4409-aa63-7566da81fad2)

![image](https://github.com/user-attachments/assets/4f36398c-011d-44d3-9a61-eab8d73f5ad2)


## Overview

Volatility Edge analyzes the relationship between implied volatility (IV) and realized volatility (RV) to identify potential trading opportunities in the options market. The dashboard provides real-time analytics, including:

- IV/RV ratio analysis
- Greeks monitoring (Delta, Gamma, Theta, Vega)
- Historical volatility charts
- Trading strategy suggestions based on market conditions

## Technical Stack

### Frontend
- Next.js 13 with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Recharts for data visualization

### Backend
- Flask API
- Python for quantitative calculations
- Integration with Deribit API (in progress)
- yfinance for market data

## Current Status

This is an early prototype that I'm actively developing. The current version includes:

- ✅ Real-time volatility metrics dashboard
- ✅ Interactive charts and analytics
- ✅ Strategy suggestions based on IV/RV ratios
- ✅ Greeks analysis panel
- 🚧 Backend API integration (in progress)
- 🚧 Full Deribit API implementation (coming soon)
- 🚧 Advanced strategy backtesting (planned)

## Installation

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## What's Next

I'm currently working on:

1. Implementing full Deribit API integration
2. Adding historical backtesting capabilities
3. Developing more sophisticated trading signals
4. Creating a proper options chain view
5. Adding portfolio management features

## Note

This is a prototype version and should not be used for actual trading decisions without proper validation. I'm actively working on a more robust version with complete market integration and advanced risk management features.

## Author

Christophe M. © 2025
