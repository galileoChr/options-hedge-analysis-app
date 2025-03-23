"use client";

import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface Greeks {
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
}

const greekDescriptions = {
  delta: "Measures how much an option's price changes relative to the underlying asset's price movement",
  gamma: "Rate of change in delta relative to the underlying asset's price",
  theta: "Time decay - how much value the option loses each day",
  vega: "Option's sensitivity to changes in volatility"
};

export function GreeksPanel({ greeks }: { greeks: Greeks }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Greeks</h2>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">What are Greeks?</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Understanding Option Greeks</SheetTitle>
              <SheetDescription>
                Option Greeks measure different dimensions of risk in options trading.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              {Object.entries(greekDescriptions).map(([greek, description]) => (
                <div key={greek} className="space-y-2">
                  <h3 className="font-medium capitalize">{greek}</h3>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(greeks).map(([greek, value]) => (
          <TooltipProvider key={greek}>
            <Tooltip>
              <TooltipTrigger className="text-center">
                <h3 className="text-lg font-medium capitalize">{greek}</h3>
                <p className="text-2xl font-bold text-primary">{value.toFixed(3)}</p>
              </TooltipTrigger>
              <TooltipContent>
                <p>{greekDescriptions[greek as keyof Greeks]}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </Card>
  );
}