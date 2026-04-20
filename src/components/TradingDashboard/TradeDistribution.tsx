import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend,
} from "recharts";
import { tradeStatisticsQTD, tradeStatisticsYTD } from "@/data/tradingData";

interface TradeDistributionProps {
  period?: "QTD" | "YTD";
}

export const TradeDistribution = ({ period = "QTD" }: TradeDistributionProps) => {
  const stats = period === "QTD" ? tradeStatisticsQTD : tradeStatisticsYTD;

  const distributionData = [
    { name: "Win trades",  value: stats.profitTrades, color: "hsl(var(--success))" },
    { name: "Loss trades", value: stats.lossTrades,   color: "hsl(var(--destructive))" },
  ];

  const positionData = [
    {
      name:    "Short",
      total:   stats.shortPositions,
      winRate: stats.shortWinRate,
      wins:    Math.round((stats.shortPositions * stats.shortWinRate) / 100),
      losses:  stats.shortPositions - Math.round((stats.shortPositions * stats.shortWinRate) / 100),
    },
    {
      name:    "Long",
      total:   stats.longPositions,
      winRate: stats.longWinRate,
      wins:    Math.round((stats.longPositions * stats.longWinRate) / 100),
      losses:  stats.longPositions - Math.round((stats.longPositions * stats.longWinRate) / 100),
    },
  ];

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
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      {/* Pie — win/loss */}
      <Card className="p-4 md:p-6 bg-card border-border">
        <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">
          Win / loss distribution
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {stats.totalTrades} closed trades · {period}
        </p>

        <div className="w-full h-[300px] md:h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <Pie
                data={distributionData}
                cx="50%"
                cy="45%"
                outerRadius="55%"
                dataKey="value"
                isAnimationActive
                animationBegin={100}
                animationDuration={900}
                labelLine={{ stroke: "hsl(var(--muted-foreground))", strokeWidth: 1 }}
                label={({ cx, cy, midAngle, outerRadius, value, name }) => {
                  const RADIAN = Math.PI / 180;
                  const r = outerRadius + 28;
                  const x = cx + r * Math.cos(-midAngle * RADIAN);
                  const y = cy + r * Math.sin(-midAngle * RADIAN);
                  return (
                    <text
                      x={x} y={y}
                      fill="hsl(var(--foreground))"
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="central"
                      fontSize={12}
                      fontWeight={500}
                    >
                      {name}: {value}
                    </text>
                  );
                }}
              >
                {distributionData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                wrapperStyle={{ paddingTop: "12px", fontSize: "12px" }}
              />
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Bar — long vs short breakdown */}
      <Card className="p-4 md:p-6 bg-card border-border">
        <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">
          Position type performance
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Win / loss by trade direction · {period}
        </p>

        <div className="w-full h-[300px] md:h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={positionData}
              margin={{ top: 10, right: 10, bottom: 20, left: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                opacity={0.3}
              />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "11px" }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "11px" }}
                width={36}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(v: number, name: string) => [v + " trades", name]}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="rect"
                wrapperStyle={{ paddingTop: "12px", fontSize: "12px" }}
              />
              <Bar
                dataKey="wins"
                stackId="a"
                fill="hsl(var(--success))"
                name="Wins"
                isAnimationActive
                animationDuration={800}
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="losses"
                stackId="a"
                fill="hsl(var(--destructive))"
                name="Losses"
                isAnimationActive
                animationDuration={800}
                animationBegin={200}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
};

export default TradeDistribution;