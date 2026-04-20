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
  ReferenceLine,
} from "recharts";
import { performanceMetricsQTD, performanceMetricsYTD } from "@/data/tradingData";

interface PerformanceChartProps {
  period?: "QTD" | "YTD";
}

// Balance journey derived from broker statement events
const ytdData = [
  { label: "Deposit",    date: "28 Jan",  balance: 20000,   note: "Initial deposit" },
  { label: "Feb 6",      date: "6 Feb",   balance: 20487,   note: "Cocoa H6 closes +$767" },
  { label: "Feb 27",     date: "27 Feb",  balance: 20724,   note: "Cocoa K6 shorts +$237" },
  { label: "Mar",        date: "Mar",     balance: 20093,   note: "Drawdown on open cocoa longs" },
  { label: "Apr 8",      date: "8 Apr",   balance: 16480,   note: "Cocoa K6 longs closed at loss" },
  { label: "Apr 14",     date: "14 Apr",  balance: 19010,   note: "EUR/JPY partial close +$1,265" },
  { label: "Apr 17",     date: "17 Apr",  balance: 25033,   note: "EUR/JPY final close +$8,062" },
];

const qtdData = [
  { label: "Apr 1",  date: "1 Apr",  balance: 19948,  note: "Opening balance for April" },
  { label: "Apr 8",  date: "8 Apr",  balance: 16480,  note: "Cocoa K6 batch closed at loss" },
  { label: "Apr 14", date: "14 Apr", balance: 19010,  note: "EUR/JPY first target hit +$1,265" },
  { label: "Apr 17", date: "17 Apr", balance: 25033,  note: "EUR/JPY all positions closed" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg text-xs">
        <p className="font-semibold text-foreground mb-1">{d.date}</p>
        <p className="text-success font-bold text-sm">${d.balance.toLocaleString()}</p>
        <p className="text-muted-foreground mt-1">{d.note}</p>
      </div>
    );
  }
  return null;
};

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  period = "QTD",
}) => {
  const metrics = period === "QTD" ? performanceMetricsQTD : performanceMetricsYTD;
  const data    = period === "QTD" ? qtdData : ytdData;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;
    setContainerWidth(containerRef.current.offsetWidth || 0);
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) setContainerWidth(Math.round(entry.contentRect.width));
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const minBal = Math.min(...data.map((d) => d.balance));
  const maxBal = Math.max(...data.map((d) => d.balance));
  const yMin   = Math.floor((minBal - 1000) / 1000) * 1000;
  const yMax   = Math.ceil((maxBal  + 1000) / 1000) * 1000;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15 }}
    >
      <Card className="p-6 bg-card border-border w-full overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
          <div>
            <h3 className="text-xl font-bold text-foreground">Cumulative balance</h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              {period === "QTD" ? "April 2026 · account #3591662" : "28 Jan – 20 Apr 2026 · account #3591662"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Deposit:</span>
              <span className="font-semibold text-foreground">
                ${metrics.initialBalance.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Balance:</span>
              <motion.span
                key={metrics.balance}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-semibold text-success"
              >
                ${metrics.balance.toLocaleString()}
              </motion.span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Net P&L:</span>
              <motion.span
                key={metrics.totalNetProfit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-semibold text-success"
              >
                +${metrics.totalNetProfit.toLocaleString()}
              </motion.span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div ref={containerRef} className="w-full h-[280px] md:h-[350px] relative">
          {containerWidth > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
              >
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  opacity={0.2}
                />

                {/* Reference line — initial deposit */}
                <ReferenceLine
                  y={metrics.initialBalance}
                  stroke="hsl(var(--muted-foreground))"
                  strokeDasharray="4 4"
                  strokeOpacity={0.5}
                  label={{
                    value: "Deposit",
                    position: "insideTopLeft",
                    fontSize: 11,
                    fill: "hsl(var(--muted-foreground))",
                  }}
                />

                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: 11 }}
                  tick={{ dy: 6 }}
                  padding={{ left: 10, right: 10 }}
                />

                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: 11 }}
                  tickFormatter={(v: number) => `$${v.toLocaleString()}`}
                  domain={[yMin, yMax]}
                  width={72}
                />

                <Tooltip content={<CustomTooltip />} />

                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2.5}
                  fill="url(#colorBalance)"
                  dot={{ r: 4, fill: "hsl(var(--primary))", strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                  isAnimationActive={true}
                  animationDuration={900}
                  animationEasing="ease-out"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse w-3/4 h-3/4 rounded-md bg-muted-foreground/10" />
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-xs text-muted-foreground mt-4 text-center">
          Blue Marvel Capital · Apollo · Equiti Brokerage (Seychelles) · Total ROI:{" "}
          <span className="text-success font-medium">{metrics.roi}%</span>
        </p>
      </Card>
    </motion.div>
  );
};

export default PerformanceChart;