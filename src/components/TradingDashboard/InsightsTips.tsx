import type { ElementType } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Lightbulb,
  TrendingUp,
  Shield,
  Target,
  AlertCircle,
  Gauge,
  Zap,
  TrendingDown,
  Trophy,
  Layers,
} from "lucide-react";
import {
  performanceMetricsQ1,
  performanceMetricsQ2,
  performanceMetricsYTD,
  tradeStatisticsQ1,
  tradeStatisticsQ2,
  tradeStatisticsYTD,
  atlasPerformanceMetrics,
  atlasTradeStatistics,
  combinedFundMetrics,
  combinedTradeStatistics,
} from "@/data/tradingData";
import { Period, AccountFilter } from "@/lib/types";

interface InsightsTipsProps {
  period?: Period;
  account?: AccountFilter;
}

type InsightType = "success" | "warning" | "info" | "negative";

interface Insight {
  Icon: ElementType;
  title: string;
  description: string;
  type: InsightType;
}

// Q1 insights
const buildQ1Insights = (
  metrics: typeof performanceMetricsQ1,
  stats: typeof tradeStatisticsQ1
): Insight[] => [
  {
    Icon: AlertCircle,
    type: "warning",
    title: "Q1 closed at a net loss",
    description: `Q1 produced −$227.20 net P/L on 8 closed trades. All losses were concentrated in Cocoa H6 entries made at elevated prices. The 2 short Cocoa K6 trades were 100% profitable.`,
  },
  {
    Icon: TrendingDown,
    type: "negative",
    title: "Negative Sharpe ratio (N/A)",
    description: `With a −1.14% return vs 1% quarterly risk-free rate, the excess return was −2.14%. The Sharpe ratio is negative and therefore not displayed. This was fully resolved in Q2.`,
  },
  {
    Icon: Shield,
    type: "info",
    title: "5 positions carried forward",
    description: `At Q1 close (31 Mar 2026), 5 Cocoa K6 long positions were open with a floating loss of −$3,436.50 (equity $16,336 vs balance $19,773). Mark-to-market price was 3,267.9.`,
  },
  {
    Icon: Target,
    type: "info",
    title: "Short trades: 100% win rate",
    description: `Both Cocoa K6 short positions closed profitably in February 2026 (total +$237.30 gross). The short strategy performed well in a declining market environment.`,
  },
  {
    Icon: AlertCircle,
    type: "warning",
    title: "Position sizing risk",
    description: `The two Feb 9 Cocoa K6 long entries (4,193 and 4,074) at 2 lots each represented significant exposure at elevated price levels. These became the primary source of the Q1 drawdown.`,
  },
  {
    Icon: Lightbulb,
    type: "info",
    title: "Q1 context for YTD",
    description: `Q1 closed P/L of −$227.20 is relatively minor. The larger risk was the −$3,436.50 floating position that resolved in Q2. YTD result (+$5,032.92) fully accounts for both.`,
  },
];

// Q2 insights
const buildQ2Insights = (
  metrics: typeof performanceMetricsQ2,
  stats: typeof tradeStatisticsQ2
): Insight[] => [
  {
    Icon: Gauge,
    type: "success",
    title: "Strong risk-adjusted return",
    description: `Annualised Sharpe of ${metrics.sharpeRatioAnnualized.toFixed(
      2
    )} with 25.16% ROI in under 3 weeks. Excess return of 24.16% over the 1% quarterly risk-free rate is outstanding.`,
  },
  {
    Icon: TrendingUp,
    type: "success",
    title: "Strong alpha generation",
    description: `${metrics.alpha}% alpha versus the ${metrics.hurdleRate}% hurdle rate confirms meaningful outperformance. Q2 single-handedly recovered all Q1 losses and drove the account to its high-water mark.`,
  },
  {
    Icon: Target,
    type: "success",
    title: "75% win rate · 9 of 12 trades profitable",
    description: `Q2 produced 9 winners and 3 small losers. Profit factor of ${metrics.profitFactor.toFixed(
      2
    )} means gross profits were ${metrics.profitFactor.toFixed(
      2
    )}× gross losses. The average winner ($813) dwarfed the average loser ($38).`,
  },
  {
    Icon: Zap,
    type: "success",
    title: "EUR/JPY recovery trade",
    description: `The 9-trade EUR/JPY series (9–17 Apr) generated $9,327.35 gross with zero commissions, more than offsetting the −$3,858 cocoa resolution on 8 Apr.`,
  },
  {
    Icon: Shield,
    type: "info",
    title: "Q2 drawdown was temporary",
    description: `The −17.38% relative drawdown on 8 Apr (cocoa close) was quickly recovered by the EUR/JPY run. The account reached its high-water mark of $21,600 on 17 Apr 2026.`,
  },
  {
    Icon: AlertCircle,
    type: "warning",
    title: "Short period observation window",
    description: `Q2 covers ~3 weeks of trading. While the Sharpe of ${metrics.sharpeRatioAnnualized.toFixed(
      2
    )} is strong, it should be viewed in the context of the full YTD performance for a more complete picture.`,
  },
];

// YTD insights
const buildYTDInsights = (
  metrics: typeof performanceMetricsYTD,
  stats: typeof tradeStatisticsYTD
): Insight[] => [
  {
    Icon: Gauge,
    type: "success",
    title: "Outstanding annualised Sharpe ratio",
    description: `Annualised Sharpe of ${metrics.sharpeRatioAnnualized.toFixed(
      2
    )} — calculated against the 2% YTD risk-free rate (2 quarters × 1%). Excess return of 23.16%. Industry consensus regards above 2.0 as outstanding.`,
  },
  {
    Icon: TrendingUp,
    type: "success",
    title: "Strong alpha generation",
    description: `${metrics.alpha}% alpha versus the ${metrics.hurdleRate}% hurdle rate confirms meaningful outperformance by Blue Marvel Capital across the full trading history.`,
  },
  {
    Icon: Target,
    type: "success",
    title: "Consistent win rate",
    description: `${stats.profitTradesPercent.toFixed(
      1
    )}% win rate across ${stats.totalTrades} closed trades. Profit factor of ${metrics.profitFactor.toFixed(
      2
    )} — gross profits are ${metrics.profitFactor.toFixed(2)}× gross losses.`,
  },
  {
    Icon: Zap,
    type: "success",
    title: "EUR/JPY recovery trade",
    description: `The 9-trade EUR/JPY series (9–17 Apr, Q2) generated $9,327.35 gross with 100% win rate and zero commissions, fully recovering all Q1 cocoa drawdowns and driving a +25.16% YTD return.`,
  },
  {
    Icon: Shield,
    type: "info",
    title: "Volatility within bounds",
    description: `${metrics.standardDeviation.toFixed(
      2
    )}% standard deviation with ${metrics.excessReturn.toFixed(
      2
    )}% excess return over the 2% YTD risk-free rate reflects a disciplined risk framework.`,
  },
  {
    Icon: AlertCircle,
    type: "warning",
    title: "Q1 drawdown — position sizing",
    description: `The ${metrics.relativeDrawdown.toFixed(
      2
    )}% maximum drawdown was concentrated in two oversized cocoa long positions opened Feb 9 (Q1). Reducing lot size on high-price entries would improve drawdown metrics.`,
  },
];

// Atlas insights
const buildAtlasInsights = (): Insight[] => [
  {
    Icon: Trophy,
    type: "success",
    title: "100% win rate · 10 of 10 trades profitable",
    description: `All 10 EUR/JPY buy positions closed on 17 Apr 2026 with profit. Total P&L: +$2,659.87 including $54.07 swap income. Zero commissions charged by Atlas Prime.`,
  },
  {
    Icon: Gauge,
    type: "success",
    title: "Strong Sharpe ratio",
    description: `Broker-reported Sharpe of 1.51 despite a short trading window (3 Mar – 17 Apr 2026). Zero drawdown over the period — all positions were in profit at close.`,
  },
  {
    Icon: TrendingUp,
    type: "success",
    title: "+66.49% ROI on net deposits",
    description: `Net deposits were $4,000.48 (after $599.52 withdrawal on 7 Apr). Final balance $6,660.35 → +$2,659.87 net profit. ROI of 66.49% in under 7 weeks is exceptional.`,
  },
  {
    Icon: Zap,
    type: "success",
    title: "EUR/JPY directional trade",
    description: `All 10 positions were EUR/JPY buys, opened progressively from 183.05 to 187.58. The largest position (1.00 lot, opened 187.044) earned $534.88. Swap income of $54.07 adds additional yield.`,
  },
  {
    Icon: Shield,
    type: "info",
    title: "Zero drawdown · no commissions",
    description: `Atlas Prime charged zero commissions and all positions closed profitably, resulting in a profit factor of infinity and 0% absolute drawdown. Broker reports Balance Drawdown Absolute: $0.00.`,
  },
  {
    Icon: AlertCircle,
    type: "warning",
    title: "Small lot sizing vs. Equiti",
    description: `Atlas Prime trades micro-to-mini lots (0.01–1.00) compared to Equiti's standard lots. This reflects a more conservative position-sizing approach, appropriate for the smaller account size.`,
  },
];

// Combined insights
const buildCombinedInsights = (): Insight[] => [
  {
    Icon: Layers,
    type: "success",
    title: "Combined fund: +$7,692.79 net profit",
    description: `Equiti Apollo contributed +$5,032.92 (25.16% ROI on $20k) and Atlas Prime contributed +$2,659.87 (66.49% ROI on $4,000.48 net deposits). Total AUM reached $31,693.27 on 17 Apr 2026.`,
  },
  {
    Icon: Gauge,
    type: "success",
    title: "Blended Sharpe of 1.95",
    description: `Weighted Sharpe: (83.4% × Equiti 2.04) + (16.6% × Atlas 1.51) = 1.95. This is near the 2.0 threshold considered outstanding, achieved across two independent accounts trading EUR/JPY.`,
  },
  {
    Icon: TrendingUp,
    type: "success",
    title: "+32.05% blended ROI",
    description: `$7,692.79 net profit on $24,000.48 total deployed capital (Equiti $20k + Atlas $4,000.48) = 32.05% blended return YTD. Both accounts were profitable.`,
  },
  {
    Icon: Target,
    type: "success",
    title: "Combined win rate 72.2%",
    description: `26 of 36 closed trades were profitable across both accounts. Atlas Prime's perfect 100% win rate lifted the combined win rate above Equiti's standalone 61.5%.`,
  },
  {
    Icon: Zap,
    type: "info",
    title: "EUR/JPY dominates both accounts",
    description: `The Apr 2026 EUR/JPY run drove nearly all profit across both accounts. Equiti EUR/JPY trades generated $9,327.35 gross; Atlas EUR/JPY generated $2,605.80 gross plus $54.07 swap — together $11,987 gross.`,
  },
  {
    Icon: AlertCircle,
    type: "warning",
    title: "Instrument concentration risk",
    description: `Both accounts are heavily concentrated in EUR/JPY for profitable trades. The combined fund's Cocoa exposure (Equiti only) added diversification but also introduced the Q1 drawdown. Portfolio diversification across accounts warrants review.`,
  },
];

const typeStyles: Record<InsightType, string> = {
  success: "text-success",
  info: "text-primary",
  warning: "text-warning",
  negative: "text-destructive",
};

const bgStyles: Record<InsightType, string> = {
  success: "border-success/20",
  info: "border-primary/20",
  warning: "border-warning/20",
  negative: "border-destructive/20",
};

const PERIOD_LABEL: Record<Period, string> = {
  Q1: "Q1 2026 · 28 Jan – 31 Mar",
  Q2: "Q2 2026 to date · 1 Apr – 17 Apr",
  YTD: "Q1 + Q2 2026 · full history (28 Jan – 17 Apr)",
};

export const InsightsTips = ({
  period = "Q1",
  account = "equiti",
}: InsightsTipsProps) => {
  const metricsMap = {
    Q1: performanceMetricsQ1,
    Q2: performanceMetricsQ2,
    YTD: performanceMetricsYTD,
  };

  const statsMap = {
    Q1: tradeStatisticsQ1,
    Q2: tradeStatisticsQ2,
    YTD: tradeStatisticsYTD,
  };

  const metrics = metricsMap[period];
  const stats = statsMap[period];

  const insights =
    account === "atlas"
      ? buildAtlasInsights()
      : account === "combined"
      ? buildCombinedInsights()
      : period === "Q1"
      ? buildQ1Insights(
          metrics as typeof performanceMetricsQ1,
          stats as typeof tradeStatisticsQ1
        )
      : period === "Q2"
      ? buildQ2Insights(
          metrics as typeof performanceMetricsQ2,
          stats as typeof tradeStatisticsQ2
        )
      : buildYTDInsights(
          metrics as typeof performanceMetricsYTD,
          stats as typeof tradeStatisticsYTD
        );

  const titleLabel =
    account === "atlas"
      ? "Atlas Prime · 3 Mar – 17 Apr 2026"
      : account === "combined"
      ? "Combined fund · 28 Jan – 17 Apr 2026"
      : PERIOD_LABEL[period];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Card className="p-6 bg-card border-border">
        <h3 className="mb-1 flex items-center gap-2 text-xl font-bold text-foreground">
          <Lightbulb className="h-5 w-5 text-primary" />
          Performance insights
        </h3>

        <p className="mb-6 text-sm text-muted-foreground">
          Blue Marvel Capital · Apollo · {titleLabel}
        </p>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {insights.map((insight, i) => {
            const { Icon } = insight;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + i * 0.08 }}
                className={`flex gap-3 rounded-lg border bg-secondary/40 p-4 transition-colors duration-150 hover:bg-secondary/70 ${bgStyles[insight.type]}`}
              >
                <div
                  className={`mt-0.5 flex-shrink-0 ${typeStyles[insight.type]}`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <h4 className="mb-1 text-sm font-semibold text-foreground">
                    {insight.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {insight.description}
                  </p>
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