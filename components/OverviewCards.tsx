"use client";

import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";

interface OverviewCardsProps {
  iv: number;
  rv: number;
}

export function OverviewCards({ iv, rv }: OverviewCardsProps) {
  const ratio = iv / rv;
  const signal = ratio > 1.1 ? "SELL" : ratio < 0.9 ? "BUY" : "NEUTRAL";
  const signalColor = {
    SELL: "destructive",
    BUY: "green",
    NEUTRAL: "secondary"
  } as const;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="p-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">Implied Volatility</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Market's forecast of future movement</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-3xl font-bold text-primary">{iv.toFixed(1)}%</p>
        {Math.abs(ratio - 1) > 0.2 && (
          <div className="absolute -left-2 top-1/2 w-1 h-1/2 bg-primary animate-pulse" />
        )}
      </Card>

      <Card className="p-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">Realized Volatility</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Historical price movement</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-3xl font-bold text-primary">{rv.toFixed(1)}%</p>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">IV/RV Ratio</h3>
        <p className="text-3xl font-bold text-primary">{ratio.toFixed(2)}</p>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">Edge Signal</h3>
        <Badge variant={signalColor[signal]} className="text-lg px-4 py-1">
          {signal} STRADDLE
        </Badge>
      </Card>
    </div>
  );
}