// InsightsTips.tsx
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Lightbulb, TrendingUp, Shield, Target, AlertCircle, Gauge, Zap } from "lucide-react";
import { performanceMetricsQTD, performanceMetricsYTD, tradeStatisticsQTD, tradeStatisticsYTD } from "@/data/tradingData";
import { Period } from "@/lib/types";

interface InsightsTipsProps { period?: Period; }
type InsightType = "success" | "warning" | "info";
interface Insight { Icon: React.ElementType; title: string; description: string; type: InsightType; }

const buildInsights = (
  metrics: typeof performanceMetricsYTD,
  stats:   typeof tradeStatisticsYTD,
): Insight[] => [
  { Icon: Gauge,        type: "success",
    title: "Outstanding Sharpe ratio",
    description: `Annualised Sharpe of ${metrics.sharpeRatioAnnualized.toFixed(2)} signals exceptional risk-adjusted returns. Industry consensus regards anything above 2.0 as outstanding.` },
  { Icon: TrendingUp,   type: "success",
    title: "Strong alpha generation",
    description: `${metrics.alpha}% alpha versus the ${metrics.hurdleRate}% hurdle rate confirms meaningful outperformance by Blue Marvel Capital.` },
  { Icon: Target,       type: "success",
    title: "Consistent win rate",
    description: `${stats.profitTradesPercent.toFixed(1)}% win rate across ${stats.totalTrades} closed trades. Profit factor of ${metrics.profitFactor.toFixed(2)} — gross profits are ${metrics.profitFactor.toFixed(2)}× gross losses.` },
  { Icon: Zap,          type: "success",
    title: "EUR/JPY recovery trade",
    description: `The 8-trade EUR/JPY series (9–17 Apr, Q2) generated $9,327.35 gross with 100% win rate and zero commissions, fully recovering all Q1 cocoa drawdowns.` },
  { Icon: Shield,       type: "info",
    title: "Volatility within bounds",
    description: `${metrics.standardDeviation.toFixed(2)}% standard deviation with ${metrics.excessReturn.toFixed(2)}% excess return over the risk-free rate reflects a disciplined risk framework.` },
  { Icon: AlertCircle,  type: "warning",
    title: "Q1 drawdown — position sizing",
    description: `The ${metrics.relativeDrawdown.toFixed(2)}% maximum drawdown was concentrated in two oversized cocoa long positions opened Feb 9 (Q1). Reducing lot size on high-price entries would improve drawdown metrics.` },
];

const typeStyles: Record<InsightType, string> = { success: "text-success", info: "text-primary", warning: "text-warning" };
const bgStyles:   Record<InsightType, string> = { success: "border-success/20", info: "border-primary/20", warning: "border-warning/20" };

export const InsightsTips = ({ period = "QTD" }: InsightsTipsProps) => {
  const metrics  = period === "QTD" ? performanceMetricsQTD : performanceMetricsYTD;
  const stats    = period === "QTD" ? tradeStatisticsQTD    : tradeStatisticsYTD;
  const insights = buildInsights(metrics, stats);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
      <Card className="p-6 bg-card border-border">
        <h3 className="text-xl font-bold text-foreground mb-1 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-primary" />
          Performance insights
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Blue Marvel Capital · Apollo ·{" "}
          {period === "QTD" ? "Q2 2026 to date" : "Q1 + Q2 2026 · full history"}
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