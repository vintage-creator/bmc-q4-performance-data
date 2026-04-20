import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, ReferenceLine,
  Legend,
} from "recharts";
import { CalendarDays } from "lucide-react";
import { monthlyPnL } from "@/data/tradingData";

interface MonthlyPnLChartProps {
  period?: "QTD" | "YTD";
}

const fmt = (n: number) =>
  (n >= 0 ? "+" : "") +
  n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((a: number, p: any) => a + (p.value || 0), 0);
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-lg text-xs min-w-[160px]">
      <p className="font-semibold text-foreground mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex justify-between gap-4 mb-1">
          <span className="text-muted-foreground flex items-center gap-1.5">
            <span
              className="inline-block w-2 h-2 rounded-sm"
              style={{ background: p.fill }}
            />
            {p.name}
          </span>
          <span
            className="font-medium"
            style={{ color: p.value >= 0 ? "#0F6E56" : "#993C1D" }}
          >
            {fmt(p.value)}
          </span>
        </div>
      ))}
      <div className="border-t border-border mt-2 pt-2 flex justify-between">
        <span className="text-muted-foreground">Net total</span>
        <span
          className="font-bold"
          style={{ color: total >= 0 ? "#0F6E56" : "#993C1D" }}
        >
          {fmt(total)}
        </span>
      </div>
    </div>
  );
};

export const MonthlyPnLChart = ({ period = "QTD" }: MonthlyPnLChartProps) => {
  // QTD: only show April; YTD: show all months with activity
  const data =
    period === "QTD"
      ? monthlyPnL.filter((r) => r.month.startsWith("Apr"))
      : monthlyPnL.filter((r) => r.trades > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.25 }}
    >
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center gap-2 mb-1">
          <CalendarDays className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-bold text-foreground">Monthly P&amp;L by instrument</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          Gross profit / loss per instrument, per month · {period}
        </p>

        {/* Summary chips */}
        <div className="flex flex-wrap gap-3 mb-5">
          {[
            { label: "Cocoa (all)", value: data.reduce((a, r) => a + r.cocoa, 0), color: "#BA7517" },
            { label: "EUR/JPY",    value: data.reduce((a, r) => a + r.eurjpy, 0), color: "#0F6E56" },
            { label: "Net total",  value: data.reduce((a, r) => a + r.total, 0),  color: undefined },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary border border-border text-sm"
            >
              {color && (
                <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: color }} />
              )}
              <span className="text-muted-foreground">{label}:</span>
              <span
                className="font-semibold"
                style={{ color: value >= 0 ? "#0F6E56" : "#993C1D" }}
              >
                {fmt(value)}
              </span>
            </div>
          ))}
        </div>

        <div className="w-full h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
              barGap={4}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                opacity={0.25}
                vertical={false}
              />
              <ReferenceLine y={0} stroke="hsl(var(--border))" strokeWidth={1} />
              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "11px" }}
                tick={{ dy: 5 }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "11px" }}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                width={52}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="square"
                iconSize={10}
                wrapperStyle={{ fontSize: "12px", paddingBottom: "8px" }}
              />
              <Bar
                dataKey="cocoa"
                name="Cocoa"
                fill="#BA7517"
                radius={[3, 3, 0, 0]}
                isAnimationActive
                animationDuration={900}
              />
              <Bar
                dataKey="eurjpy"
                name="EUR/JPY"
                fill="#0F6E56"
                radius={[3, 3, 0, 0]}
                isAnimationActive
                animationDuration={900}
                animationBegin={150}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Month detail rows */}
        <div className="mt-4 pt-4 border-t border-border space-y-2">
          {data.map((row, i) => (
            <motion.div
              key={row.month}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: 0.4 + i * 0.06 }}
              className="flex items-center justify-between text-sm py-1"
            >
              <span className="text-muted-foreground w-24">{row.month}</span>
              <span className="text-muted-foreground text-xs">{row.trades} trades</span>
              <span
                className="font-semibold w-28 text-right"
                style={{ color: row.total >= 0 ? "#0F6E56" : "#993C1D" }}
              >
                {fmt(row.total)}
              </span>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default MonthlyPnLChart;