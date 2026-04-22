import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { performanceMetricsQTD, performanceMetricsYTD } from "@/data/tradingData";
import { Period } from "@/lib/types";

interface PerformanceChartProps { period?: Period; }

const ytdData = [
  { date: "28 Jan", balance: 20000,   note: "Initial deposit · account opened" },
  { date: "6 Feb",  balance: 19786,   note: "Cocoa H6 batch closed · −$214 net (Q1)" },
  { date: "27 Feb", balance: 19773,   note: "Cocoa K6 shorts closed · +$177 net (Q1)" },
  { date: "31 Mar", balance: 19773,   note: "Q1 close · balance $19,772.80 · 5 longs open (floating −$3,437)" },
  { date: "8 Apr",  balance: 16480,   note: "Q1 carry-forward positions closed at loss (Q2)" },
  { date: "14 Apr", balance: 19010,   note: "EUR/JPY first target hit · +$1,265 (Q2)" },
  { date: "17 Apr", balance: 25033,   note: "EUR/JPY run complete · new account high (Q2)" },
];

const qtdData = [
  { date: "1 Apr",  balance: 19948,  note: "Q2 opening balance" },
  { date: "8 Apr",  balance: 16480,  note: "Q1 carry-forward cocoa longs closed at loss" },
  { date: "14 Apr", balance: 19010,  note: "EUR/JPY first target: +$1,265" },
  { date: "17 Apr", balance: 25033,  note: "EUR/JPY complete · account high" },
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

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ period = "QTD" }) => {
  const metrics = period === "QTD" ? performanceMetricsQTD : performanceMetricsYTD;
  const data    = period === "QTD" ? qtdData : ytdData;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  useEffect(() => {
    if (!containerRef.current) return;
    setContainerWidth(containerRef.current.offsetWidth || 0);
    const ro = new ResizeObserver((entries) => { for (const e of entries) setContainerWidth(Math.round(e.contentRect.width)); });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);
  const balances = data.map((d) => d.balance);
  const yMin = Math.floor((Math.min(...balances) - 1500) / 1000) * 1000;
  const yMax = Math.ceil((Math.max(...balances)  + 1500) / 1000) * 1000;
  const periodLabel = period === "QTD" ? "Q2 2026 · 1 Apr – 20 Apr" : "Q1 + Q2 2026 · 28 Jan – 20 Apr";
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.15 }}>
      <Card className="p-6 bg-card border-border w-full overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
          <div>
            <h3 className="text-xl font-bold text-foreground">Cumulative balance</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{periodLabel} · account #3591662</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Deposit:</span>
              <span className="font-semibold text-foreground">${metrics.initialBalance.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Balance:</span>
              <motion.span key={metrics.balance} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="font-semibold text-success">${metrics.balance.toLocaleString()}</motion.span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Net P&L:</span>
              <motion.span key={metrics.totalNetProfit} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="font-semibold text-success">+${metrics.totalNetProfit.toLocaleString()}</motion.span>
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
                <ReferenceLine y={metrics.initialBalance} stroke="hsl(var(--muted-foreground))"
                  strokeDasharray="4 4" strokeOpacity={0.5}
                  label={{ value: "Deposit", position: "insideTopLeft", fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
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
        {period === "YTD" && (
          <p className="text-xs text-muted-foreground mt-3 text-center bg-secondary/50 rounded py-1.5 px-3">
            31 Mar Q1 close: balance $19,772.80 · 5 open positions carrying −$3,436.50 floating (equity $16,336.30)
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Blue Marvel Capital · Apollo · Equiti Brokerage (Seychelles) · ROI: <span className="text-success font-medium">{metrics.roi}%</span>
        </p>
      </Card>
    </motion.div>
  );
};
export default PerformanceChart;