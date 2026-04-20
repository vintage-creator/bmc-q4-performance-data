import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { BarChart3, TrendingUp, TrendingDown, Repeat2, Trophy, AlertTriangle } from "lucide-react";
import { tradeStatisticsQTD, tradeStatisticsYTD } from "@/data/tradingData";

interface TradeStatsCardProps {
  period?: "QTD" | "YTD";
}

interface StatItemProps {
  label:    string;
  value:    string | number;
  sub?:     string;
  color?:   string;
  icon?:    React.ReactNode;
  delay?:   number;
}

const StatItem = ({ label, value, sub, color = "text-foreground", icon, delay = 0 }: StatItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay }}
    className="flex flex-col gap-1 p-3 rounded-lg bg-secondary/40 border border-border/50 hover:bg-secondary/70 transition-colors duration-150"
  >
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium uppercase tracking-wide">
      {icon}
      {label}
    </div>
    <span className={`text-xl font-bold ${color}`}>{value}</span>
    {sub && <span className="text-xs text-muted-foreground">{sub}</span>}
  </motion.div>
);

export const TradeStatsCard = ({ period = "QTD" }: TradeStatsCardProps) => {
  const s = period === "QTD" ? tradeStatisticsQTD : tradeStatisticsYTD;

  const winLossRatio =
    s.averageLossTrade !== 0
      ? Math.abs(s.averageProfitTrade / s.averageLossTrade).toFixed(2)
      : "∞";

  const fmt = (n: number) =>
    n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.2 }}
    >
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-bold text-foreground">Trade statistics</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          Closed position breakdown · {period} ·{" "}
          {s.totalTrades} trades total
        </p>

        {/* Win/loss overview bar */}
        <div className="mb-5">
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>{s.profitTrades} winning trades ({s.profitTradesPercent.toFixed(1)}%)</span>
            <span>{s.lossTrades} losing trades ({s.lossTradesPercent.toFixed(1)}%)</span>
          </div>
          <div className="h-3 rounded-full bg-secondary overflow-hidden flex">
            <motion.div
              className="h-full bg-success rounded-l-full"
              initial={{ width: 0 }}
              animate={{ width: `${s.profitTradesPercent}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            />
            <motion.div
              className="h-full bg-destructive rounded-r-full"
              initial={{ width: 0 }}
              animate={{ width: `${s.lossTradesPercent}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            />
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <StatItem
            label="Largest win"
            value={`$${fmt(s.largestProfitTrade)}`}
            color="text-success"
            icon={<Trophy className="w-3 h-3" />}
            delay={0.25}
          />
          <StatItem
            label="Largest loss"
            value={`-$${fmt(Math.abs(s.largestLossTrade))}`}
            color="text-destructive"
            icon={<AlertTriangle className="w-3 h-3" />}
            delay={0.3}
          />
          <StatItem
            label="Avg win"
            value={`$${fmt(s.averageProfitTrade)}`}
            sub="Per winning trade"
            color="text-success"
            icon={<TrendingUp className="w-3 h-3" />}
            delay={0.35}
          />
          <StatItem
            label="Avg loss"
            value={`-$${fmt(Math.abs(s.averageLossTrade))}`}
            sub="Per losing trade"
            color="text-destructive"
            icon={<TrendingDown className="w-3 h-3" />}
            delay={0.4}
          />
          <StatItem
            label="Win/loss ratio"
            value={winLossRatio}
            sub="Avg win ÷ avg loss"
            color="text-foreground"
            delay={0.45}
          />
          <StatItem
            label="Max consec. wins"
            value={s.maxConsecutiveWins}
            sub={`Avg: ${s.avgConsecutiveWins}`}
            color="text-success"
            icon={<Repeat2 className="w-3 h-3" />}
            delay={0.5}
          />
          <StatItem
            label="Max consec. losses"
            value={s.maxConsecutiveLosses}
            sub={`Avg: ${s.avgConsecutiveLosses}`}
            color="text-destructive"
            icon={<Repeat2 className="w-3 h-3" />}
            delay={0.55}
          />
          <StatItem
            label="Long win rate"
            value={`${s.longWinRate.toFixed(1)}%`}
            sub={`${s.longPositions} long positions`}
            color="text-foreground"
            delay={0.6}
          />
          {s.shortPositions > 0 && (
            <StatItem
              label="Short win rate"
              value={`${s.shortWinRate.toFixed(1)}%`}
              sub={`${s.shortPositions} short positions`}
              color="text-foreground"
              delay={0.65}
            />
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default TradeStatsCard;