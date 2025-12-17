import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { performanceMetrics } from "@/data/tradingData";

export const PerformanceChart: React.FC = () => {
  const simulationData = [
    { month: "Oct '25", balance: performanceMetrics.initialBalance, label: "Starting Balance" },
    { month: "Nov '25", balance: performanceMetrics.balance, label: "End of Simulation" },
    { month: "Dec '25", balance: performanceMetrics.balance, label: "Current" },
  ];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;
    setContainerWidth(containerRef.current.offsetWidth || 0);

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(Math.round(entry.contentRect.width));
      }
    });

    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15 }}
    >
      <Card className="p-6 bg-card border-border w-full overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">Cumulative Performance</h3>

          {/* SUMMARY: allow wrapping; force Profit to its own row on small screens */}
          <div className="flex items-center gap-4 mt-3 md:mt-0 text-sm min-w-0 flex-wrap">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-muted-foreground">Initial:</span>
              <span className="font-semibold text-foreground break-words">
                ${performanceMetrics.initialBalance.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-2 min-w-0">
              <span className="text-muted-foreground">Final:</span>
              <span className="font-semibold text-success break-words">
                ${performanceMetrics.balance.toLocaleString()}
              </span>
            </div>

            {/* This element becomes full-width on small screens so it drops to the next line */}
            <div className="flex items-center gap-2 min-w-0 w-full md:w-auto">
              <span className="text-muted-foreground">Profit:</span>
              <span className="font-semibold text-success break-words">
                +${performanceMetrics.totalNetProfit.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div ref={containerRef} className="w-full h-[280px] md:h-[350px] relative">
          {containerWidth > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={simulationData}
                margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
                role="img"
                aria-label="Cumulative performance over time"
              >
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.22} />

                <XAxis
                  dataKey="month"
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: 12 }}
                  interval={0}
                  tick={{ dy: 6 }}
                  padding={{ left: 8, right: 8 }}
                />

                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: 12 }}
                  tickFormatter={(value: number) => `$${value.toLocaleString()}`}
                  domain={[9000, 15000]}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    color: "hsl(var(--foreground))",
                    fontSize: 13,
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Balance"]}
                  labelFormatter={(label) => `${label}`}
                />

                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  fill="url(#colorBalance)"
                  isAnimationActive={false}
                  dot={{ r: 4 }}
                >
                  <LabelList dataKey="label" position="top" style={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                </Area>
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse w-3/4 h-3/4 rounded-md bg-muted-foreground/10" />
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          Q4/2025 Performance Simulation • Total Return: {performanceMetrics.roi}%
        </p>
      </Card>
    </motion.div>
  );
};

export default PerformanceChart;
