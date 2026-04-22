import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, Legend,
} from "recharts";
import { CalendarDays, TrendingUp, TrendingDown } from "lucide-react";
import { monthlyPnL, quarterSummaries } from "@/data/tradingData";
import { Period } from "@/lib/types";

interface MonthlyPnLChartProps {
  period?: Period;
}

const fmt = (n: number) =>
  (n >= 0 ? "+" : "") +
  n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload;
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-lg text-xs min-w-[180px]">
      <div className="flex items-center justify-between mb-2">
        <p className="font-semibold text-foreground">{label}</p>
        <span className="text-muted-foreground bg-secondary px-1.5 py-0.5 rounded text-xs">
          {row?.quarter}
        </span>
      </div>
      {payload.map((p: any) => p.value !== 0 && (
        <div key={p.name} className="flex justify-between gap-4 mb-1">
          <span className="text-muted-foreground flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-sm" style={{ background: p.fill }} />
            {p.name}
          </span>
          <span className="font-medium" style={{ color: p.value >= 0 ? "#0F6E56" : "#993C1D" }}>
            {fmt(p.value)}
          </span>
        </div>
      ))}
      <div className="border-t border-border mt-2 pt-2 space-y-1">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Gross</span>
          <span className="font-medium" style={{ color: row?.total >= 0 ? "#0F6E56" : "#993C1D" }}>
            {fmt(row?.total ?? 0)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Net (after comm.)</span>
          <span className="font-bold" style={{ color: row?.netTotal >= 0 ? "#0F6E56" : "#993C1D" }}>
            {fmt(row?.netTotal ?? 0)}
          </span>
        </div>
        <p className="text-muted-foreground">{row?.trades} closed trades</p>
      </div>
    </div>
  );
};

// Quarter summary card shown in the breakdown panel
const QuarterCard = ({ q, index }: { q: typeof quarterSummaries[0]; index: number }) => {
  const positive = q.netTotal >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
      className="flex flex-col gap-2 p-4 rounded-lg bg-secondary/40 border border-border/60"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-foreground bg-primary/10 text-primary px-2 py-0.5 rounded">
            {q.quarter}
          </span>
          <span className="text-sm font-semibold text-foreground">{q.label}</span>
        </div>
        <div className={`flex items-center gap-1 text-sm font-bold ${positive ? "text-success" : "text-destructive"}`}>
          {positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {fmt(q.netTotal)}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">{q.dateRange} · {q.trades} closed trades</p>
      {q.note && (
        <p className="text-xs text-muted-foreground italic border-t border-border/50 pt-2 mt-1">
          {q.note}
        </p>
      )}
    </motion.div>
  );
};

export const MonthlyPnLChart = ({ period = "QTD" }: MonthlyPnLChartProps) => {
  // QTD: Q2 months only (Apr) · YTD: all active months across both quarters
  const chartData =
    period === "QTD"
      ? monthlyPnL.filter((r) => r.quarter === "Q2")
      : monthlyPnL.filter((r) => r.trades > 0);

  // For YTD we show the quarter breakdown panel; QTD shows just Q2 context
  const quartersToShow =
    period === "QTD"
      ? quarterSummaries.filter((q) => q.quarter === "Q2")
      : quarterSummaries;

  const totalCocoa  = chartData.reduce((a, r) => a + r.cocoa, 0);
  const totalEurjpy = chartData.reduce((a, r) => a + r.eurjpy, 0);
  const totalNet    = chartData.reduce((a, r) => a + r.netTotal, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.25 }}
    >
      <Card className="p-6 bg-card border-border">
        {/* Header */}
        <div className="flex items-start justify-between mb-1 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-bold text-foreground">Monthly P&amp;L by instrument</h3>
          </div>
          <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded border border-border">
            {period === "QTD" ? "Q2 2026 · 1 Apr – 20 Apr" : "Q1 + Q2 2026 · full history"}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          {period === "QTD"
            ? "Current quarter (Q2) gross P/L per instrument"
            : "Year-to-date gross P/L per instrument, broken down by quarter"}
        </p>

        {/* Quarter breakdown panel — only meaningful for YTD */}
        <AnimatePresence>
          {quartersToShow.length > 0 && (
            <motion.div
              key={period}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`grid gap-3 mb-5 ${period === "YTD" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}
            >
              {quartersToShow.map((q, i) => (
                <QuarterCard key={q.quarter} q={q} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Summary chips */}
        <div className="flex flex-wrap gap-3 mb-5">
          {[
            { label: "Cocoa",     value: totalCocoa,  color: "#BA7517" },
            { label: "EUR/JPY",   value: totalEurjpy, color: "#0F6E56" },
            { label: "Net total", value: totalNet,    color: undefined  },
          ].map(({ label, value, color }) => (
            <div key={label}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary border border-border text-sm">
              {color && <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: color }} />}
              <span className="text-muted-foreground">{label}:</span>
              <span className="font-semibold" style={{ color: value >= 0 ? "#0F6E56" : "#993C1D" }}>
                {fmt(value)}
              </span>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="w-full h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.25} vertical={false} />
              <ReferenceLine y={0} stroke="hsl(var(--border))" strokeWidth={1} />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "11px" }} tick={{ dy: 5 }} />
              <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: "11px" }}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} width={52} />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" align="right" iconType="square" iconSize={10}
                wrapperStyle={{ fontSize: "12px", paddingBottom: "8px" }} />
              <Bar dataKey="cocoa"  name="Cocoa"   fill="#BA7517" radius={[3,3,0,0]}
                isAnimationActive animationDuration={900} />
              <Bar dataKey="eurjpy" name="EUR/JPY" fill="#0F6E56" radius={[3,3,0,0]}
                isAnimationActive animationDuration={900} animationBegin={150} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Month detail rows with quarter label */}
        <div className="mt-4 pt-4 border-t border-border space-y-1">
          {chartData.map((row, i) => (
            <motion.div key={row.month}
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: 0.4 + i * 0.06 }}
              className="flex items-center justify-between text-sm py-1.5 border-b border-border/30 last:border-0"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs text-primary bg-primary/10 px-1.5 py-0.5 rounded font-medium">
                  {row.quarter}
                </span>
                <span className="text-muted-foreground">{row.month}</span>
              </div>
              <span className="text-muted-foreground text-xs">{row.trades} trades</span>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-muted-foreground">
                  gross: <span style={{ color: row.total >= 0 ? "#0F6E56" : "#993C1D" }}>
                    {fmt(row.total)}
                  </span>
                </span>
                <span className="font-semibold"
                  style={{ color: row.netTotal >= 0 ? "#0F6E56" : "#993C1D" }}>
                  net: {fmt(row.netTotal)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default MonthlyPnLChart;