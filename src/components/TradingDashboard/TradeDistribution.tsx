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
  PieChart,
  Pie,
  Legend,
} from "recharts";
import { tradeStatistics } from "@/data/tradingData";

export const TradeDistribution = () => {
  const distributionData = [
    {
      name: "Win Trades",
      value: tradeStatistics.profitTrades,
      color: "hsl(var(--success))",
    },
    {
      name: "Loss Trades",
      value: tradeStatistics.lossTrades,
      color: "hsl(var(--destructive))",
    },
  ];

  const positionData = [
    {
      name: "Short Positions",
      total: tradeStatistics.shortPositions,
      winRate: tradeStatistics.shortWinRate,
      wins: Math.round(
        (tradeStatistics.shortPositions * tradeStatistics.shortWinRate) / 100
      ),
      losses:
        tradeStatistics.shortPositions -
        Math.round(
          (tradeStatistics.shortPositions * tradeStatistics.shortWinRate) / 100
        ),
    },
    {
      name: "Long Positions",
      total: tradeStatistics.longPositions,
      winRate: tradeStatistics.longWinRate,
      wins: Math.round(
        (tradeStatistics.longPositions * tradeStatistics.longWinRate) / 100
      ),
      losses:
        tradeStatistics.longPositions -
        Math.round(
          (tradeStatistics.longPositions * tradeStatistics.longWinRate) / 100
        ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      {/* Pie Chart */}
      <Card className="p-4 md:p-6 bg-card border-border">
        <h3 className="text-lg md:text-xl font-bold text-foreground mb-4 md:mb-6">
          Win/Loss Distribution
        </h3>

        {/* Ensures the chart always has height with proper padding */}
        <div className="w-full h-[320px] md:h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <Pie
                data={distributionData}
                cx="50%"
                cy="45%"
                labelLine={{
                  stroke: "hsl(var(--muted-foreground))",
                  strokeWidth: 1,
                }}
                label={({ cx, cy, midAngle, innerRadius, outerRadius, value, name }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = outerRadius + 25;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);
                  
                  return (
                    <text
                      x={x}
                      y={y}
                      fill="hsl(var(--foreground))"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                      className="text-xs md:text-sm font-medium"
                    >
                      {`${name}: ${value}`}
                    </text>
                  );
                }}
                outerRadius="55%"
                dataKey="value"
              >
                {distributionData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Legend 
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                wrapperStyle={{
                  paddingTop: '10px',
                  fontSize: '12px',
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Bar Chart */}
      <Card className="p-4 md:p-6 bg-card border-border">
        <h3 className="text-lg md:text-xl font-bold text-foreground mb-4 md:mb-6">
          Position Type Performance
        </h3>

        <div className="w-full h-[320px] md:h-[350px]">
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
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                angle={0}
                textAnchor="middle"
              />

              <YAxis
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "11px" }}
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                width={40}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
              />

              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="rect"
                wrapperStyle={{
                  paddingTop: '10px',
                  fontSize: '12px',
                }}
              />

              <Bar
                dataKey="wins"
                stackId="a"
                fill="hsl(var(--success))"
                name="Wins"
              />
              <Bar
                dataKey="losses"
                stackId="a"
                fill="hsl(var(--destructive))"
                name="Losses"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
};
