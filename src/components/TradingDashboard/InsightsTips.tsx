import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Lightbulb, TrendingUp, Shield, Target, AlertCircle, Gauge } from "lucide-react";
import { performanceMetrics, tradeStatistics } from "@/data/tradingData";

const insights = [
  {
    icon: Gauge,
    title: "Strong Sharpe Ratio",
    description: `Annualized Sharpe Ratio of ${performanceMetrics.sharpeRatioAnnualized} indicates excellent risk-adjusted returns. Above 2.0 is considered exceptional in the industry.`,
    type: "success",
  },
  {
    icon: TrendingUp,
    title: "Outstanding Alpha Generation",
    description: `${performanceMetrics.alpha}% alpha in Q4 2025 demonstrates significant outperformance. This indicates strong active management capabilities.`,
    type: "success",
  },
  {
    icon: Target,
    title: "Exceptional Win Rate",
    description: `${tradeStatistics.profitTradesPercent}% win rate significantly exceeds industry standards. Combined with ${performanceMetrics.profitFactor.toFixed(2)} profit factor shows consistent execution.`,
    type: "success",
  },
  {
    icon: Shield,
    title: "Controlled Volatility",
    description: `${performanceMetrics.standardDeviation.toFixed(2)}% standard deviation with ${performanceMetrics.excessReturn}% excess return over risk-free rate shows efficient risk management.`,
    type: "info",
  },
  {
    icon: AlertCircle,
    title: "Consecutive Wins Streak",
    description: `${tradeStatistics.maxConsecutiveWins} consecutive wins achieved. While impressive, maintaining strict stop-losses remains critical for capital preservation.`,
    type: "warning",
  },
];

export const InsightsTips = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Card className="p-6 bg-card border-border">
        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-primary" />
          Performance Insights & Tips
        </h3>
        
        <div className="space-y-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            const getColor = () => {
              if (insight.type === "success") return "text-success";
              if (insight.type === "warning") return "text-warning";
              return "text-primary";
            };
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                className="flex gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors border border-border/50"
              >
                <div className={`flex-shrink-0 ${getColor()}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{insight.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
};
