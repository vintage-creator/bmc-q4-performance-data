import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { performanceMetricsQ1, performanceMetricsQ2, performanceMetricsYTD, atlasPerformanceMetrics } from "@/data/tradingData";
import { Period, AccountFilter } from "@/lib/types";

interface PerformanceChartProps {
  period?: Period;
  account?: AccountFilter;
}

// Equiti data (unchanged)
const q1Data = [
  { date: "28 Jan", balance: 20000, note: "Account opened · initial deposit (Q1 start)" },
  { date: "6 Feb",  balance: 19786, note: "Cocoa H6 batch closed · −$214 net (Q1)" },
  { date: "27 Feb", balance: 19773, note: "Cocoa K6 shorts closed · +$177 net · Q1 closed P/L −$227.20" },
  { date: "31 Mar", balance: 19773, note: "Q1 close · balance $19,772.80 · 5 longs open (floating −$3,437)" },
];

const q2Data = [
  { date: "1 Apr",  balance: 19948, note: "Q2 opening balance" },
  { date: "8 Apr",  balance: 16480, note: "Q1 carry-forward cocoa longs closed at loss" },
  { date: "14 Apr", balance: 19010, note: "EUR/JPY first target: +$1,265" },
  { date: "17 Apr", balance: 25033, note: "EUR/JPY complete · account high" },
];

const ytdData = [
  { date: "28 Jan", balance: 20000, note: "Initial deposit · account opened" },
  { date: "6 Feb",  balance: 19786, note: "Cocoa H6 batch closed · −$214 net (Q1)" },
  { date: "27 Feb", balance: 19773, note: "Cocoa K6 shorts closed · +$177 net (Q1)" },
  { date: "31 Mar", balance: 19773, note: "Q1 close · balance $19,772.80 · 5 longs open (floating −$3,437)" },
  { date: "8 Apr",  balance: 16480, note: "Q1 carry-forward positions closed at loss (Q2)" },
  { date: "14 Apr", balance: 19010, note: "EUR/JPY first target hit · +$1,265 (Q2)" },
  { date: "17 Apr", balance: 25033, note: "EUR/JPY run complete · new account high (Q2)" },
];

// Atlas Prime balance curve
const atlasData = [
  { date: "3 Mar",  balance: 4600,  note: "Account opened · $3,500 + $500 + $600 deposits" },
  { date: "7 Apr",  balance: 4001,  note: "Withdrawal of $599.52 · net deposits $4,000.48" },
  { date: "9 Apr",  balance: 4001,  note: "EUR/JPY positions accumulating · 6 open" },
  { date: "13 Apr", balance: 4001,  note: "More EUR/JPY positions added · 10 total" },
  { date: "17 Apr", balance: 6660,  note: "All 10 positions closed · +$2,659.87 profit" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-lg text-xs">
      <p className="font-semibold text-foreground mb-1">{d.date}</p>
      <p className="text-success font-bold text-sm">${d.balance.toLocaleString()}</p>
      <p className="text-muted-foreground mt-1">{d.note}</p>
    </div>
  );
};

const metricsMap = { Q1: performanceMetricsQ1, Q2: performanceMetricsQ2, YTD: performanceMetricsYTD };
const dataMap    = { Q1: q1Data, Q2: q2Data, YTD: ytdData };

const PERIOD_LABEL: Record<Period, string> = {
  Q1:  "Q1 2026 · 28 Jan – 31 Mar",
  Q2:  "Q2 2026 · 1 Apr – 17 Apr",
  YTD: "Q1 + Q2 2026 · 28 Jan – 17 Apr",
};

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  period = "Q1",
  account = "equiti",
}) => {
  const isAtlas = account === "atlas";
  const metrics = isAtlas ? atlasPerformanceMetrics : metricsMap[period];
  const data    = isAtlas ? atlasData : dataMap[period];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  useEffect(() => {
    if (!containerRef.current) return;
    setContainerWidth(containerRef.current.offsetWidth || 0);
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setContainerWidth(Math.round(e.contentRect.width));
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const balances = data.map((d) => d.balance);
  const yMin = Math.floor((Math.min(...balances) - 500) / 500) * 500;
  const yMax = Math.ceil((Math.max(...balances) + 500) / 500) * 500;
  const pnlPositive = metrics.totalNetProfit >= 0;

  const formattedPnL = pnlPositive
    ? `+$${metrics.totalNetProfit.toLocaleString()}`
    : `-$${Math.abs(metrics.totalNetProfit).toLocaleString()}`;

  const subtitle = isAtlas
    ? "Atlas Prime #6117251 · 3 Mar – 17 Apr 2026"
    : `${PERIOD_LABEL[period]} · account #3591662`;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.15 }}>
      <Card className="p-6 bg-card border-border w-full overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
          <div>
            <h3 className="text-xl font-bold text-foreground">Cumulative balance</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">
                {isAtlas ? "Net deposits:" : "Deposit:"}
              </span>
              <span className="font-semibold text-foreground">
                ${metrics.initialBalance.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Balance:</span>
              <motion.span key={metrics.balance} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className={`font-semibold ${pnlPositive ? "text-success" : "text-destructive"}`}>
                ${metrics.balance.toLocaleString()}
              </motion.span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Net P&L:</span>
              <motion.span key={metrics.totalNetProfit} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className={`font-semibold ${pnlPositive ? "text-success" : "text-destructive"}`}>
                {formattedPnL}
              </motion.span>
            </div>
          </div>
        </div>
        <div ref={containerRef} className="w-full h-[280px] md:h-[350px] relative">
          {containerWidth > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
                <ReferenceLine
                  y={metrics.initialBalance}
                  stroke="hsl(var(--muted-foreground))"
                  strokeDasharray="4 4"
                  strokeOpacity={0.5}
                  label={{ value: isAtlas ? "Net deposits" : "Deposit", position: "insideTopLeft", fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" style={{ fontSize: 11 }} tick={{ dy: 6 }} padding={{ left: 10, right: 10 }} />
                <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: 11 }}
                  tickFormatter={(v: number) => `$${v.toLocaleString()}`} domain={[yMin, yMax]} width={76} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="balance" stroke="hsl(var(--primary))" strokeWidth={2.5}
                  fill="url(#colorBalance)" dot={{ r: 4, fill: "hsl(var(--primary))", strokeWidth: 0 }}
                  activeDot={{ r: 6 }} isAnimationActive animationDuration={900} animationEasing="ease-out" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse w-3/4 h-3/4 rounded-md bg-muted-foreground/10" />
            </div>
          )}
        </div>
        {!isAtlas && period === "Q1" && (
          <p className="text-xs text-muted-foreground mt-3 text-center bg-secondary/50 rounded py-1.5 px-3">
            Q1 close (31 Mar): balance $19,772.80 · 5 open positions carrying −$3,436.50 floating (equity $16,336.30)
          </p>
        )}
        {!isAtlas && period === "YTD" && (
          <p className="text-xs text-muted-foreground mt-3 text-center bg-secondary/50 rounded py-1.5 px-3">
            31 Mar Q1 close: balance $19,772.80 · 5 open positions carrying −$3,436.50 floating (equity $16,336.30)
          </p>
        )}
        {isAtlas && (
          <p className="text-xs text-muted-foreground mt-3 text-center bg-secondary/50 rounded py-1.5 px-3">
            All positions held simultaneously · closed in sequence on 17 Apr 2026 · $54.07 swap income included
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Blue Marvel Capital · {isAtlas ? "Atlas Prime" : "Apollo · Equiti Brokerage (Seychelles)"} · ROI:{" "}
          <span className={`font-medium ${metrics.roi >= 0 ? "text-success" : "text-destructive"}`}>
            {metrics.roi >= 0 ? "+" : ""}{metrics.roi.toFixed(2)}%
          </span>
        </p>
      </Card>
    </motion.div>
  );
};

export default PerformanceChart;