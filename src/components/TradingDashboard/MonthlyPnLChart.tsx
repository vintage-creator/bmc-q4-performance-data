import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, Legend,
} from "recharts";
import { CalendarDays, TrendingUp, TrendingDown } from "lucide-react";
import {
  monthlyPnL, atlasMonthlyPnL, quarterSummaries,
} from "@/data/tradingData";
import { Period, AccountFilter, PERIOD_LABELS } from "@/lib/types";

interface MonthlyPnLChartProps { period?: Period; account?: AccountFilter; }

const fmt = (n: number) =>
  (n >= 0 ? "+" : "") +
  n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const CustomTooltipEquiti = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload;
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-lg text-xs min-w-[180px]">
      <div className="flex items-center justify-between mb-2">
        <p className="font-semibold text-foreground">{label}</p>
        <span className="text-muted-foreground bg-secondary px-1.5 py-0.5 rounded text-xs">{row?.quarter}</span>
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
          <span className="text-muted-foreground">Net</span>
          <span className="font-bold" style={{ color: row?.netTotal >= 0 ? "#0F6E56" : "#993C1D" }}>
            {fmt(row?.netTotal ?? 0)}
          </span>
        </div>
        <p className="text-muted-foreground">{row?.trades} closed trades</p>
      </div>
    </div>
  );
};

const CustomTooltipAtlas = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload;
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-lg text-xs min-w-[180px]">
      <p className="font-semibold text-foreground mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex justify-between gap-4 mb-1">
          <span className="text-muted-foreground">{p.name}</span>
          <span className="font-medium" style={{ color: p.value >= 0 ? "#0F6E56" : "#993C1D" }}>
            {fmt(p.value)}
          </span>
        </div>
      ))}
      <div className="border-t border-border mt-2 pt-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Net total</span>
          <span className="font-bold" style={{ color: row?.total >= 0 ? "#0F6E56" : "#993C1D" }}>
            {fmt(row?.total ?? 0)}
          </span>
        </div>
        <p className="text-muted-foreground mt-1">{row?.trades} closed trades</p>
      </div>
    </div>
  );
};

// Combined monthly data (Equiti + Atlas, keyed by month)
const combinedMonthlyData = [
  {
    month:    "Feb 2026",
    equiti:   -227.20,
    atlas:    0,
    total:    -227.20,
    trades:   8,
  },
  {
    month:    "Mar 2026",
    equiti:   0,
    atlas:    0,
    total:    0,
    trades:   0,
  },
  {
    month:    "Apr 2026",
    equiti:   5310.95,
    atlas:    2659.87,
    total:    7970.82,
    trades:   28, // 18 Equiti + 10 Atlas
  },
];

export const MonthlyPnLChart = ({ period = "YTD", account = "equiti" }: MonthlyPnLChartProps) => {
  if (account === "atlas") {
    const chartData = atlasMonthlyPnL.filter((r) => r.trades > 0);
    const totalNet = chartData.reduce((a, r) => a + r.total, 0);

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.25 }}>
        <Card className="p-6 bg-card border-border">
          <div className="flex items-start justify-between mb-1 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold text-foreground">Atlas Prime P&L by month</h3>
            </div>
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded border border-border">
              3 Mar – 17 Apr 2026
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-5">EUR/JPY positions · all closed 17 Apr 2026</p>

          <div className="flex flex-wrap gap-3 mb-5">
            {[
              { label: "EUR/JPY profit", value: chartData.reduce((a,r) => a + r.eurjpy, 0), color: "#0F6E56" },
              { label: "Swap earned",    value: chartData.reduce((a,r) => a + r.swap, 0),    color: "#BA7517" },
              { label: "Net total",      value: totalNet,                                    color: undefined  },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary border border-border text-sm">
                {color && <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: color }} />}
                <span className="text-muted-foreground">{label}:</span>
                <span className="font-semibold" style={{ color: value >= 0 ? "#0F6E56" : "#993C1D" }}>
                  {fmt(value)}
                </span>
              </div>
            ))}
          </div>

          <div className="w-full h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.25} vertical={false} />
                <ReferenceLine y={0} stroke="hsl(var(--border))" strokeWidth={1} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" style={{ fontSize: "11px" }} />
                <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: "11px" }}
                  tickFormatter={(v) => `$${v.toLocaleString()}`} width={60} />
                <Tooltip content={<CustomTooltipAtlas />} />
                <Legend verticalAlign="top" align="right" iconType="square" iconSize={10}
                  wrapperStyle={{ fontSize: "12px", paddingBottom: "8px" }} />
                <Bar dataKey="eurjpy" name="EUR/JPY"     fill="#0F6E56" radius={[3,3,0,0]} isAnimationActive animationDuration={900} />
                <Bar dataKey="swap"   name="Swap income" fill="#BA7517" radius={[3,3,0,0]} isAnimationActive animationDuration={900} animationBegin={150} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-xs text-muted-foreground mt-4 text-center">
            Positions opened March–April 2026, all closed on 17 Apr · Atlas Prime Ltd. · Account #6117251
          </p>
        </Card>
      </motion.div>
    );
  }

  if (account === "combined") {
    const chartData = combinedMonthlyData.filter((r) => r.trades > 0);
    const totalNet = chartData.reduce((a, r) => a + r.total, 0);

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.25 }}>
        <Card className="p-6 bg-card border-border">
          <div className="flex items-start justify-between mb-1 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold text-foreground">Combined P&L by month</h3>
            </div>
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded border border-border">
              28 Jan – 17 Apr 2026
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-5">Equiti (Apollo) + Atlas Prime · net P&L by account per month</p>

          <div className="flex flex-wrap gap-3 mb-5">
            {[
              { label: "Equiti net", value: chartData.reduce((a,r) => a + r.equiti, 0), color: "hsl(var(--primary))" },
              { label: "Atlas net",  value: chartData.reduce((a,r) => a + r.atlas, 0),  color: "#BA7517" },
              { label: "Combined",   value: totalNet,                                   color: undefined },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary border border-border text-sm">
                {color && <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: color }} />}
                <span className="text-muted-foreground">{label}:</span>
                <span className="font-semibold" style={{ color: value >= 0 ? "#0F6E56" : "#993C1D" }}>
                  {fmt(value)}
                </span>
              </div>
            ))}
          </div>

          <div className="w-full h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.25} vertical={false} />
                <ReferenceLine y={0} stroke="hsl(var(--border))" strokeWidth={1} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" style={{ fontSize: "11px" }} />
                <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: "11px" }}
                  tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} width={52} />
                <Tooltip content={<CustomTooltipAtlas />} />
                <Legend verticalAlign="top" align="right" iconType="square" iconSize={10}
                  wrapperStyle={{ fontSize: "12px", paddingBottom: "8px" }} />
                <Bar dataKey="equiti" name="Equiti Apollo" fill="hsl(var(--primary))" radius={[3,3,0,0]} isAnimationActive animationDuration={900} />
                <Bar dataKey="atlas"  name="Atlas Prime"   fill="#BA7517"              radius={[3,3,0,0]} isAnimationActive animationDuration={900} animationBegin={150} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>
    );
  }

  // Equiti view (original logic)
  const chartData =
    period === "Q1"
      ? monthlyPnL.filter((r) => r.quarter === "Q1")
      : period === "Q2"
      ? monthlyPnL.filter((r) => r.quarter === "Q2")
      : monthlyPnL.filter((r) => r.trades > 0);

  const quartersToShow =
    period === "YTD"
      ? quarterSummaries
      : quarterSummaries.filter((q) => q.quarter === period);

  const totalCocoa  = chartData.reduce((a, r) => a + r.cocoa, 0);
  const totalEurjpy = chartData.reduce((a, r) => a + r.eurjpy, 0);
  const totalNet    = chartData.reduce((a, r) => a + r.netTotal, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.25 }}>
      <Card className="p-6 bg-card border-border">
        <div className="flex items-start justify-between mb-1 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-bold text-foreground">Monthly P&L by instrument</h3>
          </div>
          <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded border border-border">
            {PERIOD_LABELS[period]}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          {period === "Q1"
            ? "Q1 gross P/L per instrument"
            : period === "Q2"
            ? "Q2 gross P/L per instrument"
            : "Year-to-date gross P/L per instrument, broken down by quarter"}
        </p>

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
                <motion.div
                  key={q.quarter}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                  className="flex flex-col gap-2 p-4 rounded-lg bg-secondary/40 border border-border/60"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-foreground bg-primary/10 text-primary px-2 py-0.5 rounded">
                        {q.quarter}
                      </span>
                      <span className="text-sm font-semibold text-foreground">{q.label}</span>
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-bold ${q.netTotal >= 0 ? "text-success" : "text-destructive"}`}>
                      {q.netTotal >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {fmt(q.netTotal)}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{q.dateRange} · {q.trades} closed trades</p>
                  {q.note && <p className="text-xs text-muted-foreground italic border-t border-border/50 pt-2 mt-1">{q.note}</p>}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap gap-3 mb-5">
          {[
            { label: "Cocoa",    value: totalCocoa,  color: "#BA7517" },
            { label: "EUR/JPY",  value: totalEurjpy, color: "#0F6E56" },
            { label: "Net total",value: totalNet,    color: undefined  },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary border border-border text-sm">
              {color && <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: color }} />}
              <span className="text-muted-foreground">{label}:</span>
              <span className="font-semibold" style={{ color: value >= 0 ? "#0F6E56" : "#993C1D" }}>{fmt(value)}</span>
            </div>
          ))}
        </div>

        <div className="w-full h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.25} vertical={false} />
              <ReferenceLine y={0} stroke="hsl(var(--border))" strokeWidth={1} />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" style={{ fontSize: "11px" }} tick={{ dy: 5 }} />
              <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: "11px" }}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} width={52} />
              <Tooltip content={<CustomTooltipEquiti />} />
              <Legend verticalAlign="top" align="right" iconType="square" iconSize={10}
                wrapperStyle={{ fontSize: "12px", paddingBottom: "8px" }} />
              <Bar dataKey="cocoa"  name="Cocoa"   fill="#BA7517" radius={[3,3,0,0]} isAnimationActive animationDuration={900} />
              <Bar dataKey="eurjpy" name="EUR/JPY" fill="#0F6E56" radius={[3,3,0,0]} isAnimationActive animationDuration={900} animationBegin={150} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 pt-4 border-t border-border space-y-1">
          {chartData.map((row, i) => (
            <motion.div key={row.month} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: 0.4 + i * 0.06 }}
              className="flex items-center justify-between text-sm py-1.5 border-b border-border/30 last:border-0">
              <div className="flex items-center gap-2">
                <span className="text-xs text-primary bg-primary/10 px-1.5 py-0.5 rounded font-medium">{row.quarter}</span>
                <span className="text-muted-foreground">{row.month}</span>
              </div>
              <span className="text-muted-foreground text-xs">{row.trades} trades</span>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-muted-foreground">
                  gross: <span style={{ color: row.total >= 0 ? "#0F6E56" : "#993C1D" }}>{fmt(row.total)}</span>
                </span>
                <span className="font-semibold" style={{ color: row.netTotal >= 0 ? "#0F6E56" : "#993C1D" }}>
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