import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Lightbulb, TrendingUp, Shield, Target, AlertCircle, Gauge, Zap, TrendingDown } from "lucide-react";
import {
  performanceMetricsQ1, performanceMetricsQ2, performanceMetricsYTD,
  tradeStatisticsQ1, tradeStatisticsQ2, tradeStatisticsYTD,
} from "@/data/tradingData";
import { Period } from "@/lib/types";

interface InsightsTipsProps { period?: Period; }
type InsightType = "success" | "warning" | "info" | "negative";
interface Insight { Icon: React.ElementType; title: string; description: string; type: InsightType; }

// Q1 insights – updated to avoid showing negative Sharpe number
const buildQ1Insights = (
  metrics: typeof performanceMetricsQ1,
  stats:   typeof tradeStatisticsQ1,
): Insight[] => [
  { Icon: AlertCircle, type: "warning",
    title: "Q1 closed at a net loss",
    description: `Q1 produced −$227.20 net P/L on 8 closed trades. All losses were concentrated in Cocoa H6 entries made at elevated prices. The 2 short Cocoa K6 trades were 100% profitable.` },
  { Icon: TrendingDown, type: "negative",
    title: "Negative Sharpe ratio (N/A)",
    description: `With a −1.14% return vs 1% quarterly risk-free rate, the excess return was −2.14%. The Sharpe ratio is negative and therefore not displayed. This was fully resolved in Q2.` },
  { Icon: Shield, type: "info",
    title: "5 positions carried forward",
    description: `At Q1 close (31 Mar 2026), 5 Cocoa K6 long positions were open with a floating loss of −$3,436.50 (equity $16,336 vs balance $19,773). Mark-to-market price was 3,267.9.` },
  { Icon: Target, type: "info",
    title: "Short trades: 100% win rate",
    description: `Both Cocoa K6 short positions closed profitably in February 2026 (total +$237.30 gross). The short strategy performed well in a declining market environment.` },
  { Icon: AlertCircle, type: "warning",
    title: "Position sizing risk",
    description: `The two Feb 9 Cocoa K6 long entries (4,193 and 4,074) at 2 lots each represented significant exposure at elevated price levels. These became the primary source of the Q1 drawdown.` },
  { Icon: Lightbulb, type: "info",
    title: "Q1 context for YTD",
    description: `Q1 closed P/L of −$227.20 is relatively minor. The larger risk was the −$3,436.50 floating position that resolved in Q2. YTD result (+$5,032.92) fully accounts for both.` },
];

// Q2 insights – updated HWM to $21,600
const buildQ2Insights = (
  metrics: typeof performanceMetricsQ2,
  stats:   typeof tradeStatisticsQ2,
): Insight[] => [
  { Icon: Gauge, type: "success",
    title: "Strong risk-adjusted return",
    description: `Annualised Sharpe of ${metrics.sharpeRatioAnnualized.toFixed(2)} with 25.16% ROI in under 3 weeks. Excess return of 24.16% over the 1% quarterly risk-free rate is outstanding.` },
  { Icon: TrendingUp, type: "success",
    title: "Strong alpha generation",
    description: `${metrics.alpha}% alpha versus the ${metrics.hurdleRate}% hurdle rate confirms meaningful outperformance. Q2 single-handedly recovered all Q1 losses and drove the account to its high-water mark.` },
  { Icon: Target, type: "success",
    title: "75% win rate · 9 of 12 trades profitable",
    description: `Q2 produced 9 winners and 3 small losers. Profit factor of ${metrics.profitFactor.toFixed(2)} means gross profits were ${metrics.profitFactor.toFixed(2)}× gross losses. The average winner ($813) dwarfed the average loser ($38).` },
  { Icon: Zap, type: "success",
    title: "EUR/JPY recovery trade",
    description: `The 9-trade EUR/JPY series (9–17 Apr) generated $9,327.35 gross with zero commissions, more than offsetting the −$3,858 cocoa resolution on 8 Apr.` },
  { Icon: Shield, type: "info",
    title: "Q2 drawdown was temporary",
    description: `The −17.38% relative drawdown on 8 Apr (cocoa close) was quickly recovered by the EUR/JPY run. The account reached its high-water mark of $21,600 on 17 Apr 2026.` },
  { Icon: AlertCircle, type: "warning",
    title: "Short period observation window",
    description: `Q2 covers ~3 weeks of trading. While the Sharpe of ${metrics.sharpeRatioAnnualized.toFixed(2)} is strong, it should be viewed in the context of the full YTD performance for a more complete picture.` },
];

// YTD insights – uses updated metrics (alpha 23.16%, net profit 5032.92, etc.)
const buildYTDInsights = (
  metrics: typeof performanceMetricsYTD,
  stats:   typeof tradeStatisticsYTD,
): Insight[] => [
  { Icon: Gauge, type: "success",
    title: "Outstanding annualised Sharpe ratio",
    description: `Annualised Sharpe of ${metrics.sharpeRatioAnnualized.toFixed(2)} — calculated against the 2% YTD risk-free rate (2 quarters × 1%). Excess return of 23.16%. Industry consensus regards above 2.0 as outstanding.` },
  { Icon: TrendingUp, type: "success",
    title: "Strong alpha generation",
    description: `${metrics.alpha}% alpha versus the ${metrics.hurdleRate}% hurdle rate confirms meaningful outperformance by Blue Marvel Capital across the full trading history.` },
  { Icon: Target, type: "success",
    title: "Consistent win rate",
    description: `${stats.profitTradesPercent.toFixed(1)}% win rate across ${stats.totalTrades} closed trades. Profit factor of ${metrics.profitFactor.toFixed(2)} — gross profits are ${metrics.profitFactor.toFixed(2)}× gross losses.` },
  { Icon: Zap, type: "success",
    title: "EUR/JPY recovery trade",
    description: `The 9-trade EUR/JPY series (9–17 Apr, Q2) generated $9,327.35 gross with 100% win rate and zero commissions, fully recovering all Q1 cocoa drawdowns and driving a +25.16% YTD return.` },
  { Icon: Shield, type: "info",
    title: "Volatility within bounds",
    description: `${metrics.standardDeviation.toFixed(2)}% standard deviation with ${metrics.excessReturn.toFixed(2)}% excess return over the 2% YTD risk-free rate reflects a disciplined risk framework.` },
  { Icon: AlertCircle, type: "warning",
    title: "Q1 drawdown — position sizing",
    description: `The ${metrics.relativeDrawdown.toFixed(2)}% maximum drawdown was concentrated in two oversized cocoa long positions opened Feb 9 (Q1). Reducing lot size on high-price entries would improve drawdown metrics.` },
];

const typeStyles: Record<InsightType, string> = {
  success:  "text-success",
  info:     "text-primary",
  warning:  "text-warning",
  negative: "text-destructive",
};
const bgStyles: Record<InsightType, string> = {
  success:  "border-success/20",
  info:     "border-primary/20",
  warning:  "border-warning/20",
  negative: "border-destructive/20",
};

const PERIOD_LABEL: Record<Period, string> = {
  Q1:  "Q1 2026 · 28 Jan – 31 Mar",
  Q2:  "Q2 2026 to date · 1 Apr – 17 Apr",
  YTD: "Q1 + Q2 2026 · full history (28 Jan – 17 Apr)",
};

export const InsightsTips = ({ period = "Q1" }: InsightsTipsProps) => {
  const metricsMap = { Q1: performanceMetricsQ1, Q2: performanceMetricsQ2, YTD: performanceMetricsYTD };
  const statsMap   = { Q1: tradeStatisticsQ1,    Q2: tradeStatisticsQ2,    YTD: tradeStatisticsYTD    };
  const metrics    = metricsMap[period];
  const stats      = statsMap[period];
  const insights   =
    period === "Q1"  ? buildQ1Insights(metrics as typeof performanceMetricsQ1, stats as typeof tradeStatisticsQ1)  :
    period === "Q2"  ? buildQ2Insights(metrics as typeof performanceMetricsQ2, stats as typeof tradeStatisticsQ2)  :
                       buildYTDInsights(metrics as typeof performanceMetricsYTD, stats as typeof tradeStatisticsYTD);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
      <Card className="p-6 bg-card border-border">
        <h3 className="text-xl font-bold text-foreground mb-1 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-primary" />
          Performance insights
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Blue Marvel Capital · Apollo · {PERIOD_LABEL[period]}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {insights.map((insight, i) => {
            const { Icon } = insight;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + i * 0.08 }}
                className={`flex gap-3 p-4 rounded-lg bg-secondary/40 hover:bg-secondary/70 transition-colors duration-150 border ${bgStyles[insight.type]}`}>
                <div className={`flex-shrink-0 mt-0.5 ${typeStyles[insight.type]}`}><Icon className="w-5 h-5" /></div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">{insight.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{insight.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
};
export default InsightsTips;