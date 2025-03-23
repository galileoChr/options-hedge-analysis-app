"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { OverviewCards } from "@/components/OverviewCards";
import { GreeksPanel } from "@/components/GreeksPanel";
import { VolatilityChart } from "@/components/VolatilityChart";
import { StrategySuggestion } from "@/components/StrategySuggestion";
import { mockData } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState("10D");
  const [data, setData] = useState(mockData);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [settings, setSettings] = useState({
    symbol: "BTC",
    expiry: "29MAR24",
    period: "30",
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/volatility?symbol=${settings.symbol}&expiry=${settings.expiry}&period=${settings.period}`
      );
      if (!response.ok) throw new Error('Failed to fetch data');
      const newData = await response.json();
      setData(newData);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch market data. Using mock data instead.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [settings]);

  const handleSettingsChange = (newSettings: Partial<typeof settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar onSettingsChange={handleSettingsChange} isLoading={isLoading} />
      <main className="container mx-auto py-8 flex-1">
        <div className="space-y-8 max-w-[1400px] mx-auto">
          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Market Overview</h2>
            <OverviewCards iv={data.iv} rv={data.rv} />
          </section>

          {/* Chart Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Volatility Analysis</h2>
              <div className="flex gap-2">
                {["1D", "5D", "10D", "30D"].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      timeframe === tf
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-card rounded-xl p-6">
              <VolatilityChart
                data={data.chartData}
                timeframe={timeframe}
                onTimeframeChange={setTimeframe}
              />
            </div>
          </section>

          {/* Analysis Section */}
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Greeks Analysis</h2>
              <GreeksPanel greeks={data.greeks} />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Trading Strategy</h2>
              <StrategySuggestion
                strategies={data.strategies}
                currentSignal={data.edge.signal}
                ivRvRatio={data.edge.iv_rv_ratio}
              />
            </div>
          </section>
        </div>
      </main>
      <footer className="border-t border-border">
        <div className="container mx-auto py-4">
          <p className="text-sm text-muted-foreground text-center">
            © 2025 Christophe M. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}