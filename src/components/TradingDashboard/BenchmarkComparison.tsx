import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Scale, TrendingUp, TrendingDown } from "lucide-react";
import {
  performanceMetricsQ1,
  performanceMetricsQ2,
  performanceMetricsYTD,
  combinedFundMetrics,
} from "@/data/tradingData";
import { Period, AccountFilter } from "@/lib/types";

interface BenchmarkComparisonProps {
  period?: Period;
  account?: AccountFilter;
}

// Risk-free rate by period: 1% for Q1/Q2, 2% for YTD
const getRiskFreeReturn = (period: Period): number => {
  if (period === "YTD") return 2;
  if (period === "Q1" || period === "Q2") return 1;
  console.warn(`Unknown period "${period}", defaulting to 1%`);
  return 1;
};

type BenchmarkRowType = "portfolio" | "benchmark" | "riskfree";

const buildData = (roi: number, sharpe: number, period: Period, label: string) => {
  const riskFreeReturn = getRiskFreeReturn(period);

  return [
    { name: label, return: roi, sharpe, type: "portfolio" as BenchmarkRowType },
    { name: "S&P 500", return: 12.5, sharpe: 0.9, type: "benchmark" as BenchmarkRowType },
    { name: "NASDAQ", return: 15.2, sharpe: 0.85, type: "benchmark" as BenchmarkRowType },
    { name: "US T-Bill", return: riskFreeReturn, sharpe: 0, type: "riskfree" as BenchmarkRowType },
    { name: "Hedge Fund Avg", return: 8.5, sharpe: 1.2, type: "benchmark" as BenchmarkRowType },
  ];
};

const barColor = (type: BenchmarkRowType) => {
  if (type === "portfolio") return "hsl(var(--primary))";
  if (type === "riskfree") return "hsl(var(--muted-foreground))";
  return "hsl(var(--chart-2))";
};

interface ComparisonRowProps {
  name: string;
  portfolioValue: number;
  benchmarkValue: number;
  unit: string;
  index: number;
}

const ComparisonRow = ({
  name,
  portfolioValue,
  benchmarkValue,
  unit,
  index,
}: ComparisonRowProps) => {
  const diff = portfolioValue - benchmarkValue;
  const isPositive = diff > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.05 * index }}
      className="flex items-center justify-between border-b border-border/50 py-3 last:border-0"
    >
      <span className="text-sm text-muted-foreground">{name}</span>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-foreground">
          {unit ? `${benchmarkValue}${unit}` : benchmarkValue.toFixed(2)}
        </span>
        <div
          className={`flex items-center gap-1 rounded px-2 py-0.5 text-xs font-semibold ${
            isPositive
              ? "bg-success/20 text-success"
              : "bg-destructive/20 text-destructive"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          {isPositive ? "+" : ""}
          {diff.toFixed(2)}
          {unit}
        </div>
      </div>
    </motion.div>
  );
};

const metricsMap = {
  Q1: performanceMetricsQ1,
  Q2: performanceMetricsQ2,
  YTD: performanceMetricsYTD,
};

const PERIOD_LABEL: Record<Period, string> = {
  Q1: "Q1 2026 · 28 Jan – 31 Mar",
  Q2: "Q2 2026 · 1 Apr – 17 Apr",
  YTD: "YTD 2026 · 28 Jan – 17 Apr",
};

export const BenchmarkComparison = ({
  period = "Q1",
  account = "equiti",
}: BenchmarkComparisonProps) => {
  const metrics =
    account === "combined"
      ? {
          roi: combinedFundMetrics.blendedROI,
          sharpeRatioAnnualized: combinedFundMetrics.blendedSharpe,
        }
      : metricsMap[period];

  const portfolioLabel =
    account === "combined"
      ? "BMC (combined)"
      : account === "atlas"
      ? "Atlas Prime"
      : "BMC Apollo";

  const subtitleLabel =
    account === "combined"
      ? "Combined fund · Equiti + Atlas"
      : account === "atlas"
      ? "Atlas Prime account"
      : `Blue Marvel Capital Apollo · ${PERIOD_LABEL[period]}`;

  const data = buildData(
    metrics.roi,
    metrics.sharpeRatioAnnualized,
    period,
    portfolioLabel
  );

  const returnData = data.map(({ name, return: value, type }) => ({
    name,
    value,
    type,
  }));

  const sharpeData = data.map(({ name, sharpe: value, type }) => ({
    name,
    value,
    type,
  }));

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
        <h3 className="mb-1 flex items-center gap-2 text-xl font-bold text-foreground">
          <Scale className="h-5 w-5 text-primary" />
          Benchmark comparison
        </h3>

        <p className="mb-6 text-sm text-muted-foreground">{subtitleLabel}</p>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Return comparison (%)
            </h4>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={returnData} layout="vertical">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                    horizontal
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
                    width={120}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(v: number) => [`${v.toFixed(2)}%`, "Return"]}
                  />
                  <Bar
                    dataKey="value"
                    radius={[0, 4, 4, 0]}
                    isAnimationActive
                    animationDuration={800}
                  >
                    {returnData.map((e, i) => (
                      <Cell key={i} fill={barColor(e.type)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Sharpe ratio comparison
            </h4>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sharpeData} layout="vertical">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                    horizontal
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
                    width={120}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(v: number) => [v.toFixed(2), "Sharpe ratio"]}
                  />
                  <Bar
                    dataKey="value"
                    radius={[0, 4, 4, 0]}
                    isAnimationActive
                    animationDuration={800}
                    animationBegin={150}
                  >
                    {sharpeData.map((e, i) => (
                      <Cell key={i} fill={barColor(e.type)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 pt-4 border-t border-border">
          {[
            { color: "bg-primary", label: "Portfolio" },
            { color: "bg-chart-2", label: "Market benchmarks" },
            { color: "bg-muted-foreground", label: "Risk-free rate" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`h-2.5 w-2.5 rounded-full ${color}`} />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <h4 className="mb-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            BMC vs benchmarks
          </h4>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-secondary/30 p-4">
              <h5 className="mb-3 text-sm font-semibold text-foreground">
                Return difference
              </h5>
              <ComparisonRow
                name="vs S&P 500"
                portfolioValue={metrics.roi}
                benchmarkValue={12.5}
                unit="%"
                index={0}
              />
              <ComparisonRow
                name="vs NASDAQ"
                portfolioValue={metrics.roi}
                benchmarkValue={15.2}
                unit="%"
                index={1}
              />
              <ComparisonRow
                name="vs Hedge Fund avg"
                portfolioValue={metrics.roi}
                benchmarkValue={8.5}
                unit="%"
                index={2}
              />
            </div>

            <div className="rounded-lg bg-secondary/30 p-4">
              <h5 className="mb-3 text-sm font-semibold text-foreground">
                Risk-adjusted difference
              </h5>
              <ComparisonRow
                name="vs S&P 500"
                portfolioValue={metrics.sharpeRatioAnnualized}
                benchmarkValue={0.9}
                unit=""
                index={0}
              />
              <ComparisonRow
                name="vs NASDAQ"
                portfolioValue={metrics.sharpeRatioAnnualized}
                benchmarkValue={0.85}
                unit=""
                index={1}
              />
              <ComparisonRow
                name="vs Hedge Fund avg"
                portfolioValue={metrics.sharpeRatioAnnualized}
                benchmarkValue={1.2}
                unit=""
                index={2}
              />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default BenchmarkComparison;