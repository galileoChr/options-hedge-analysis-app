"use client";

import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceArea,
} from "recharts";

interface ChartData {
  date: string;
  iv: number;
  rv: number;
}

interface VolatilityChartProps {
  data: ChartData[];
  timeframe: string;
  onTimeframeChange: (timeframe: string) => void;
}

export function VolatilityChart({
  data,
  timeframe,
  onTimeframeChange,
}: VolatilityChartProps) {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis 
            dataKey="date" 
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
            tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis 
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
            tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-background border rounded-lg p-3 shadow-lg">
                    <p className="text-sm font-medium mb-1">{payload[0].payload.date}</p>
                    <p className="text-sm text-chart-1">IV: {payload[0].value.toFixed(1)}%</p>
                    <p className="text-sm text-chart-2">RV: {payload[1].value.toFixed(1)}%</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => <span className="text-sm font-medium">{value}</span>}
          />
          {data.map((point, i) => {
            if (i === 0) return null;
            if (point.iv > point.rv) {
              return (
                <ReferenceArea
                  key={i}
                  x1={data[i - 1].date}
                  x2={point.date}
                  y1={Math.min(point.iv, point.rv)}
                  y2={Math.max(point.iv, point.rv)}
                  fill="hsl(var(--destructive))"
                  fillOpacity={0.1}
                />
              );
            }
            return null;
          })}
          <Line
            type="monotone"
            dataKey="iv"
            stroke="hsl(var(--chart-1))"
            name="IV"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="rv"
            stroke="hsl(var(--chart-2))"
            name="RV"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}