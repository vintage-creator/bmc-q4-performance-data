import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { performanceMetrics } from "@/data/tradingData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Scale, TrendingUp, TrendingDown } from "lucide-react";

// Benchmark data for comparison
const benchmarkData = [
  {
    name: "BMC Portfolio",
    return: performanceMetrics.roi,
    sharpe: performanceMetrics.sharpeRatioAnnualized,
    type: "portfolio",
  },
  {
    name: "S&P 500",
    return: 12.5, // Typical annual return
    sharpe: 0.9,
    type: "benchmark",
  },
  {
    name: "NASDAQ",
    return: 15.2,
    sharpe: 0.85,
    type: "benchmark",
  },
  {
    name: "US T-Bill",
    return: performanceMetrics.riskFreeRate,
    sharpe: 0,
    type: "riskfree",
  },
  {
    name: "Hedge Fund Avg",
    return: 8.5,
    sharpe: 1.2,
    type: "benchmark",
  },
];

const returnComparisonData = benchmarkData.map(item => ({
  name: item.name,
  value: item.return,
  type: item.type,
}));

const sharpeComparisonData = benchmarkData.map(item => ({
  name: item.name,
  value: item.sharpe,
  type: item.type,
}));

const getBarColor = (type: string) => {
  switch (type) {
    case "portfolio":
      return "hsl(var(--primary))";
    case "benchmark":
      return "hsl(var(--chart-2))";
    case "riskfree":
      return "hsl(var(--muted-foreground))";
    default:
      return "hsl(var(--secondary))";
  }
};

interface ComparisonRowProps {
  name: string;
  portfolioValue: number;
  benchmarkValue: number;
  unit: string;
}

const ComparisonRow = ({ name, portfolioValue, benchmarkValue, unit }: ComparisonRowProps) => {
  const difference = portfolioValue - benchmarkValue;
  const isPositive = difference > 0;

  return (
    <div className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground">{name}</span>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-foreground">{benchmarkValue}{unit}</span>
        <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${
          isPositive ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
        }`}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {isPositive ? '+' : ''}{difference.toFixed(2)}{unit}
        </div>
      </div>
    </div>
  );
};

export const BenchmarkComparison = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="p-6 bg-card border-border">
        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Scale className="w-6 h-6 text-primary" />
          Benchmark Comparison
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Returns Comparison Chart */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
              Return Comparison (%)
            </h4>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={returnComparisonData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={true} vertical={false} />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `${value}%`} />
                  <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} width={90} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value.toFixed(2)}%`, "Return"]}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {returnComparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getBarColor(entry.type)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sharpe Ratio Comparison Chart */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
              Sharpe Ratio Comparison
            </h4>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sharpeComparisonData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={true} vertical={false} />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} width={90} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [value.toFixed(2), "Sharpe Ratio"]}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {sharpeComparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getBarColor(entry.type)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Legend: placed directly under the charts */}
        <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-border" aria-label="Chart legend">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">BMC Portfolio</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-2" />
            <span className="text-xs text-muted-foreground">Market Benchmarks</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-muted-foreground" />
            <span className="text-xs text-muted-foreground">Risk-Free Rate</span>
          </div>
        </div>

        {/* Performance vs Benchmarks Table */}
        <div className="mt-8 pt-6 border-t border-border">
          <h4 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
            BMC Outperformance vs Benchmarks
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-secondary/30 rounded-lg p-4">
              <h5 className="text-sm font-semibold text-foreground mb-3">Return Advantage</h5>
              <ComparisonRow name="vs S&P 500" portfolioValue={performanceMetrics.roi} benchmarkValue={12.5} unit="%" />
              <ComparisonRow name="vs NASDAQ" portfolioValue={performanceMetrics.roi} benchmarkValue={15.2} unit="%" />
              <ComparisonRow name="vs Hedge Fund Avg" portfolioValue={performanceMetrics.roi} benchmarkValue={8.5} unit="%" />
            </div>
            <div className="bg-secondary/30 rounded-lg p-4">
              <h5 className="text-sm font-semibold text-foreground mb-3">Risk-Adjusted Advantage</h5>
              <ComparisonRow name="vs S&P 500" portfolioValue={performanceMetrics.sharpeRatioAnnualized} benchmarkValue={0.9} unit="" />
              <ComparisonRow name="vs NASDAQ" portfolioValue={performanceMetrics.sharpeRatioAnnualized} benchmarkValue={0.85} unit="" />
              <ComparisonRow name="vs Hedge Fund Avg" portfolioValue={performanceMetrics.sharpeRatioAnnualized} benchmarkValue={1.2} unit="" />
            </div>
          </div>
        </div>

      </Card>
    </motion.div>
  );
};

export default BenchmarkComparison;
