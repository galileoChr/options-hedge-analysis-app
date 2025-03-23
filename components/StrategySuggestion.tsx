"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Strategy } from "@/lib/mockData";
import { Info, ChevronRight } from "lucide-react";

interface StrategySuggestionProps {
  strategies: Strategy[];
  currentSignal: string;
  ivRvRatio: number;
}

export function StrategySuggestion({
  strategies,
  currentSignal,
  ivRvRatio,
}: StrategySuggestionProps) {
  const [selectedStrategy, setSelectedStrategy] = useState(
    strategies.find(s => s.type === currentSignal) || strategies[0]
  );

  const getSignalColor = (type: string) => {
    if (type.toLowerCase().includes("sell")) return "destructive";
    if (type.toLowerCase().includes("buy")) return "green";
    return "secondary";
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold mb-2">Strategy Suggestion</h2>
          <p className="text-sm text-muted-foreground">
            Based on IV/RV ratio of {ivRvRatio.toFixed(2)}
          </p>
        </div>
        <Badge
          variant={getSignalColor(selectedStrategy.type)}
          className="text-lg px-4 py-1"
        >
          {selectedStrategy.type}
        </Badge>
      </div>

      <Accordion type="single" collapsible className="mb-6">
        <AccordionItem value="details">
          <AccordionTrigger className="text-lg">
            Why this strategy?
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div>
                <h4 className="font-medium mb-1">Condition</h4>
                <p className="text-sm text-muted-foreground">{selectedStrategy.condition}</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Description</h4>
                <p className="text-sm text-muted-foreground">{selectedStrategy.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-1">Breakeven Range</h4>
                  <p className="text-sm text-muted-foreground">{selectedStrategy.breakeven_range}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Max Profit</h4>
                  <p className="text-sm text-muted-foreground">{selectedStrategy.max_profit}</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="space-y-4">
        <div className="flex space-x-2">
          <Button className="flex-1">
            Simulate P/L
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" className="flex-1">
            Explore Alternatives
          </Button>
        </div>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Info className="h-4 w-4" />
          <p>Recommended for: {selectedStrategy.recommended_for}</p>
        </div>
      </div>
    </Card>
  );
}