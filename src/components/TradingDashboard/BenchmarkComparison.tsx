import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { Scale, TrendingUp, TrendingDown } from "lucide-react";
import { performanceMetricsQTD, performanceMetricsYTD } from "@/data/tradingData";

interface BenchmarkComparisonProps {
  period?: "QTD" | "YTD";
}

const buildData = (roi: number, sharpe: number) => [
  { name: "BMC Apollo",      return: roi,   sharpe,  type: "portfolio" },
  { name: "S&P 500",         return: 12.5,  sharpe: 0.90, type: "benchmark" },
  { name: "NASDAQ",          return: 15.2,  sharpe: 0.85, type: "benchmark" },
  { name: "US T-Bill",       return: 4.0,   sharpe: 0,    type: "riskfree"  },
  { name: "Hedge Fund Avg",  return: 8.5,   sharpe: 1.20, type: "benchmark" },
];

const barColor = (type: string) => {
  if (type === "portfolio") return "hsl(var(--primary))";
  if (type === "riskfree")  return "hsl(var(--muted-foreground))";
  return "hsl(var(--chart-2))";
};

interface ComparisonRowProps {
  name: string;
  portfolioValue: number;
  benchmarkValue: number;
  unit: string;
  index: number;
}

const ComparisonRow = ({ name, portfolioValue, benchmarkValue, unit, index }: ComparisonRowProps) => {
  const diff       = portfolioValue - benchmarkValue;
  const isPositive = diff > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.05 * index }}
      className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
    >
      <span className="text-sm text-muted-foreground">{name}</span>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-foreground">
          {benchmarkValue}{unit}
        </span>
        <div
          className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${
            isPositive
              ? "bg-success/20 text-success"
              : "bg-destructive/20 text-destructive"
          }`}
        >
          {isPositive
            ? <TrendingUp className="w-3 h-3" />
            : <TrendingDown className="w-3 h-3" />}
          {isPositive ? "+" : ""}
          {diff.toFixed(2)}{unit}
        </div>
      </div>
    </motion.div>
  );
};

export const BenchmarkComparison = ({ period = "QTD" }: BenchmarkComparisonProps) => {
  const metrics = period === "QTD" ? performanceMetricsQTD : performanceMetricsYTD;
  const data    = buildData(metrics.roi, metrics.sharpeRatioAnnualized);

  const returnData = data.map(({ name, return: value, type }) => ({ name, value, type }));
  const sharpeData = data.map(({ name, sharpe: value, type }) => ({ name, value, type }));

  const tooltipStyle = {
    backgroundColor: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
    borderRadius: "8px",
    color: "hsl(var(--foreground))",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="p-6 bg-card border-border">
        <h3 className="text-xl font-bold text-foreground mb-1 flex items-center gap-2">
          <Scale className="w-5 h-5 text-primary" />
          Benchmark comparison
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Blue Marvel Capital Apollo vs major indices and risk-free rate
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Returns */}
          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wide">
              Return comparison (%)
            </h4>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={returnData} layout="vertical">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                    horizontal={true}
                    vertical={false}
                  />
                  <XAxis
                    type="number"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={11}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={11}
                    width={95}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(v: number) => [`${v.toFixed(2)}%`, "Return"]}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} isAnimationActive animationDuration={800}>
                    {returnData.map((e, i) => (
                      <Cell key={i} fill={barColor(e.type)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sharpe */}
          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wide">
              Sharpe ratio comparison
            </h4>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sharpeData} layout="vertical">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                    horizontal={true}
                    vertical={false}
                  />
                  <XAxis
                    type="number"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={11}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={11}
                    width={95}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(v: number) => [v.toFixed(2), "Sharpe ratio"]}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} isAnimationActive animationDuration={800} animationBegin={150}>
                    {sharpeData.map((e, i) => (
                      <Cell key={i} fill={barColor(e.type)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-border">
          {[
            { color: "bg-primary",           label: "BMC Apollo" },
            { color: "bg-chart-2",           label: "Market benchmarks" },
            { color: "bg-muted-foreground",  label: "Risk-free rate" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>

        {/* Outperformance table */}
        <div className="mt-8 pt-6 border-t border-border">
          <h4 className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wide">
            BMC outperformance vs benchmarks
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-secondary/30 rounded-lg p-4">
              <h5 className="text-sm font-semibold text-foreground mb-3">Return advantage</h5>
              <ComparisonRow name="vs S&P 500"        portfolioValue={metrics.roi} benchmarkValue={12.5} unit="%" index={0} />
              <ComparisonRow name="vs NASDAQ"         portfolioValue={metrics.roi} benchmarkValue={15.2} unit="%" index={1} />
              <ComparisonRow name="vs Hedge Fund avg" portfolioValue={metrics.roi} benchmarkValue={8.5}  unit="%" index={2} />
            </div>
            <div className="bg-secondary/30 rounded-lg p-4">
              <h5 className="text-sm font-semibold text-foreground mb-3">Risk-adjusted advantage</h5>
              <ComparisonRow name="vs S&P 500"        portfolioValue={metrics.sharpeRatioAnnualized} benchmarkValue={0.90} unit="" index={0} />
              <ComparisonRow name="vs NASDAQ"         portfolioValue={metrics.sharpeRatioAnnualized} benchmarkValue={0.85} unit="" index={1} />
              <ComparisonRow name="vs Hedge Fund avg" portfolioValue={metrics.sharpeRatioAnnualized} benchmarkValue={1.20} unit="" index={2} />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default BenchmarkComparison;