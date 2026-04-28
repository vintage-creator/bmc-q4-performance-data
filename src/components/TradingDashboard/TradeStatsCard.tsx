import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { BarChart3, TrendingUp, TrendingDown, Repeat2, Trophy, AlertTriangle } from "lucide-react";
import {
  tradeStatisticsQ1, tradeStatisticsQ2, tradeStatisticsYTD,
  atlasTradeStatistics, combinedTradeStatistics,
} from "@/data/tradingData";
import { Period, AccountFilter } from "@/lib/types";

interface TradeStatsCardProps { period?: Period; account?: AccountFilter; }

interface StatItemProps {
  label: string; value: string | number; sub?: string;
  color?: string; icon?: React.ReactNode; delay?: number;
}

const StatItem = ({ label, value, sub, color = "text-foreground", icon, delay = 0 }: StatItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay }}
    className="flex flex-col gap-1 p-3 rounded-lg bg-secondary/40 border border-border/50 hover:bg-secondary/70 transition-colors duration-150"
  >
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium uppercase tracking-wide">
      {icon}{label}
    </div>
    <span className={`text-xl font-bold ${color}`}>{value}</span>
    {sub && <span className="text-xs text-muted-foreground">{sub}</span>}
  </motion.div>
);

const getStats = (period: Period, account: AccountFilter) => {
  if (account === "atlas")    return atlasTradeStatistics;
  if (account === "combined") return combinedTradeStatistics;
  if (period === "Q1") return tradeStatisticsQ1;
  if (period === "Q2") return tradeStatisticsQ2;
  return tradeStatisticsYTD;
};

const PERIOD_LABEL: Record<Period, string> = {
  Q1:  "Q1 2026 · 28 Jan – 31 Mar",
  Q2:  "Q2 2026 to date",
  YTD: "Q1 + Q2 2026",
};

export const TradeStatsCard = ({ period = "Q1", account = "equiti" }: TradeStatsCardProps) => {
  const s = getStats(period, account);
  const winLossRatio =
    s.averageLossTrade !== 0
      ? Math.abs(s.averageProfitTrade / s.averageLossTrade).toFixed(2)
      : "∞";
  const fmt = (n: number) =>
    n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const periodLabel =
    account === "atlas"
      ? "Atlas Prime · 3 Mar – 17 Apr 2026"
      : account === "combined"
      ? "Combined fund · both accounts"
      : PERIOD_LABEL[period];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.2 }}>
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-bold text-foreground">Trade statistics</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          Closed position breakdown · {periodLabel} · {s.totalTrades} trades
        </p>

        <div className="mb-5">
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>{s.profitTrades} winning ({s.profitTradesPercent.toFixed(1)}%)</span>
            <span>{s.lossTrades} losing ({s.lossTradesPercent.toFixed(1)}%)</span>
          </div>
          <div className="h-3 rounded-full bg-secondary overflow-hidden flex">
            <motion.div className="h-full bg-success rounded-l-full"
              initial={{ width: 0 }} animate={{ width: `${s.profitTradesPercent}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }} />
            <motion.div className="h-full bg-destructive rounded-r-full"
              initial={{ width: 0 }} animate={{ width: `${s.lossTradesPercent}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }} />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <StatItem label="Largest win"   value={`$${fmt(s.largestProfitTrade)}`}            color="text-success"     icon={<Trophy className="w-3 h-3" />}        delay={0.25} />
          <StatItem label="Largest loss"  value={`-$${fmt(Math.abs(s.largestLossTrade))}`}   color="text-destructive" icon={<AlertTriangle className="w-3 h-3" />} delay={0.3}  />
          <StatItem label="Avg win"       value={`$${fmt(s.averageProfitTrade)}`}             color="text-success"     icon={<TrendingUp className="w-3 h-3" />}    sub="Per winning trade" delay={0.35} />
          <StatItem label="Avg loss"      value={`-$${fmt(Math.abs(s.averageLossTrade))}`}   color="text-destructive" icon={<TrendingDown className="w-3 h-3" />}  sub="Per losing trade"  delay={0.4}  />
          <StatItem label="Win/loss ratio" value={winLossRatio}                               sub="Avg win ÷ avg loss"                                               delay={0.45} />
          <StatItem label="Max consec. wins"   value={s.maxConsecutiveWins}   color="text-success"     icon={<Repeat2 className="w-3 h-3" />} sub={`Avg: ${s.avgConsecutiveWins}`}   delay={0.5}  />
          <StatItem label="Max consec. losses" value={s.maxConsecutiveLosses} color="text-destructive" icon={<Repeat2 className="w-3 h-3" />} sub={`Avg: ${s.avgConsecutiveLosses}`} delay={0.55} />
          <StatItem label="Long win rate"  value={`${s.longWinRate.toFixed(1)}%`}  sub={`${s.longPositions} long positions`}  delay={0.6}  />
          {s.shortPositions > 0 && (
            <StatItem label="Short win rate" value={`${s.shortWinRate.toFixed(1)}%`} sub={`${s.shortPositions} short positions`} delay={0.65} />
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default TradeStatsCard;