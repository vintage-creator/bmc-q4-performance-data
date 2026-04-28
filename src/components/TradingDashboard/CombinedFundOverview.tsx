import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, PieChart, Pie, Legend,
} from "recharts";
import { Layers, TrendingUp } from "lucide-react";
import { combinedFundMetrics } from "@/data/tradingData";

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  color: "hsl(var(--foreground))",
};

const fmt = (n: number) =>
  n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const CombinedFundOverview = () => {
  const allocationData = [
    { name: "Equiti Apollo", value: combinedFundMetrics.equitiBalance,  color: "hsl(var(--primary))" },
    { name: "Atlas Prime",   value: combinedFundMetrics.atlasBalance,   color: "#BA7517" },
  ];

  const profitComparisonData = [
    {
      name: "Equiti Apollo",
      deposit:  combinedFundMetrics.equitiDeposit,
      balance:  combinedFundMetrics.equitiBalance,
      profit:   combinedFundMetrics.equitiNetProfit,
      roi:      25.16,
    },
    {
      name: "Atlas Prime",
      deposit:  combinedFundMetrics.atlasNetDeposit,
      balance:  combinedFundMetrics.atlasBalance,
      profit:   combinedFundMetrics.atlasNetProfit,
      roi:      66.49,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
    >
      <Card className="p-6 bg-card border-border">
        <h3 className="text-xl font-bold text-foreground mb-1 flex items-center gap-2">
          <Layers className="w-5 h-5 text-primary" />
          Combined fund overview
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Blue Marvel Capital · Equiti (Apollo) + Atlas Prime · Total AUM: ${fmt(combinedFundMetrics.totalAUM)}
        </p>

        {/* Summary stat row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Total AUM",       value: `$${fmt(combinedFundMetrics.totalAUM)}`,       color: "text-foreground" },
            { label: "Combined profit", value: `+$${fmt(combinedFundMetrics.totalNetProfit)}`, color: "text-success"    },
            { label: "Blended ROI",     value: `+${combinedFundMetrics.blendedROI.toFixed(2)}%`, color: "text-success" },
            { label: "Blended Sharpe",  value: combinedFundMetrics.blendedSharpe.toFixed(2),  color: "text-foreground" },
          ].map(({ label, value, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 + i * 0.07 }}
              className="text-center p-3 bg-secondary/50 rounded-lg"
            >
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{label}</p>
              <p className={`text-lg font-bold ${color}`}>{value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AUM allocation pie */}
          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wide">
              AUM allocation
            </h4>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="45%"
                    outerRadius="55%"
                    dataKey="value"
                    isAnimationActive
                    animationDuration={900}
                    label={({ name, value, percent }) =>
                      `${name}: $${fmt(value)} (${(percent * 100).toFixed(1)}%)`
                    }
                    labelLine={{ strokeWidth: 1 }}
                  >
                    {allocationData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(v: number) => [`$${fmt(v)}`, "Balance"]}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="square"
                    iconSize={10}
                    wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Profit comparison bar */}
          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wide">
              Net profit by account
            </h4>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={profitComparisonData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} vertical={false} />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" style={{ fontSize: "11px" }} />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: "11px" }}
                    tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
                    width={52}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(v: number, name: string) => [
                      `$${fmt(v)}`,
                      name === "profit" ? "Net profit" : name === "deposit" ? "Capital deployed" : "Balance",
                    ]}
                  />
                  <Bar dataKey="deposit" name="deposit" fill="hsl(var(--muted-foreground))" opacity={0.4} radius={[3,3,0,0]} />
                  <Bar dataKey="profit"  name="profit"  fill="hsl(var(--primary))"          radius={[3,3,0,0]}
                       isAnimationActive animationDuration={900} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Per-account breakdown table */}
        <div className="mt-8 pt-6 border-t border-border">
          <h4 className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wide">
            Account-level breakdown
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wide">
                  <th className="text-left py-2 pr-4">Account</th>
                  <th className="text-right py-2 px-4">Capital deployed</th>
                  <th className="text-right py-2 px-4">Final balance</th>
                  <th className="text-right py-2 px-4">Net profit</th>
                  <th className="text-right py-2 px-4">ROI</th>
                  <th className="text-right py-2 px-4">Sharpe</th>
                  <th className="text-right py-2 pl-4">Win rate</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 pr-4 font-medium">Equiti Apollo</td>
                  <td className="py-3 px-4 text-right font-mono">${fmt(combinedFundMetrics.equitiDeposit)}</td>
                  <td className="py-3 px-4 text-right font-mono">${fmt(combinedFundMetrics.equitiBalance)}</td>
                  <td className="py-3 px-4 text-right font-mono text-success">+${fmt(combinedFundMetrics.equitiNetProfit)}</td>
                  <td className="py-3 px-4 text-right text-success">+25.16%</td>
                  <td className="py-3 px-4 text-right">2.04</td>
                  <td className="py-3 pl-4 text-right">61.5%</td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 pr-4 font-medium">Atlas Prime</td>
                  <td className="py-3 px-4 text-right font-mono">${fmt(combinedFundMetrics.atlasNetDeposit)}</td>
                  <td className="py-3 px-4 text-right font-mono">${fmt(combinedFundMetrics.atlasBalance)}</td>
                  <td className="py-3 px-4 text-right font-mono text-success">+${fmt(combinedFundMetrics.atlasNetProfit)}</td>
                  <td className="py-3 px-4 text-right text-success">+66.49%</td>
                  <td className="py-3 px-4 text-right">1.51</td>
                  <td className="py-3 pl-4 text-right">100%</td>
                </tr>
                <tr className="bg-primary/5 font-medium">
                  <td className="py-3 pr-4 text-primary">Combined total</td>
                  <td className="py-3 px-4 text-right font-mono">${fmt(combinedFundMetrics.totalDeposited)}</td>
                  <td className="py-3 px-4 text-right font-mono">${fmt(combinedFundMetrics.totalAUM)}</td>
                  <td className="py-3 px-4 text-right font-mono text-success">+${fmt(combinedFundMetrics.totalNetProfit)}</td>
                  <td className="py-3 px-4 text-right text-success">+{combinedFundMetrics.blendedROI.toFixed(2)}%</td>
                  <td className="py-3 px-4 text-right">{combinedFundMetrics.blendedSharpe.toFixed(2)}</td>
                  <td className="py-3 pl-4 text-right">{combinedFundMetrics.combinedWinRate.toFixed(1)}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          Blue Marvel Capital · Combined fund · Equiti Brokerage (Seychelles) + Atlas Prime Ltd. · Data as of 17 Apr 2026
        </p>
      </Card>
    </motion.div>
  );
};

export default CombinedFundOverview;