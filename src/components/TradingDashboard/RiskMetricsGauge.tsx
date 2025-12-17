import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { performanceMetrics } from "@/data/tradingData";
import { Gauge, TrendingUp, Shield, Activity } from "lucide-react";

interface GaugeProps {
  value: number;
  max: number;
  label: string;
  color: string;
  description: string;
}

const CircularGauge = ({ value, max, label, color, description }: GaugeProps) => {
  const percentage = Math.min((value / max) * 100, 100);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(var(--secondary))"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-foreground">{value.toFixed(2)}</span>
        </div>
      </div>
      <h4 className="mt-3 font-semibold text-foreground text-center">{label}</h4>
      <p className="text-xs text-muted-foreground text-center mt-1 max-w-[140px]">{description}</p>
    </div>
  );
};

interface LinearGaugeProps {
  value: number;
  max: number;
  label: string;
  unit: string;
  colorClass: string;
  description: string;
}

const LinearGauge = ({ value, max, label, unit, colorClass, description }: LinearGaugeProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm font-bold text-foreground">{value}{unit}</span>
      </div>
      <div className="h-3 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${colorClass}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
};

export const RiskMetricsGauge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="p-6 bg-card border-border">
        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Gauge className="w-6 h-6 text-primary" />
          Risk Metrics Breakdown
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gauges Section */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-6 uppercase tracking-wide">
              Sharpe Ratio Analysis
            </h4>
            <div className="flex flex-wrap justify-center gap-8">
              <CircularGauge
                value={performanceMetrics.sharpeRatioMonthly}
                max={2}
                label="Monthly Sharpe"
                color="hsl(var(--primary))"
                description="Risk-adjusted return (monthly basis)"
              />
              <CircularGauge
                value={performanceMetrics.sharpeRatioAnnualized}
                max={4}
                label="Annualized Sharpe"
                color="hsl(var(--success))"
                description="Excellent (>2.0 is outstanding)"
              />
            </div>
          </div>

          {/* Volatility Indicators */}
          <div className="space-y-6">
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Volatility & Risk Indicators
            </h4>
            
            <LinearGauge
              value={performanceMetrics.standardDeviation}
              max={30}
              label="Standard Deviation"
              unit="%"
              colorClass="bg-primary"
              description="Portfolio volatility measure (lower is more stable)"
            />

            <LinearGauge
              value={performanceMetrics.variance}
              max={10}
              label="Variance"
              unit="%"
              colorClass="bg-chart-2"
              description="Squared deviation from mean returns"
            />

            <LinearGauge
              value={performanceMetrics.relativeDrawdown}
              max={25}
              label="Max Drawdown"
              unit="%"
              colorClass="bg-warning"
              description="Maximum peak-to-trough decline"
            />

            <LinearGauge
              value={performanceMetrics.riskFreeRate}
              max={10}
              label="Risk-Free Rate"
              unit="%"
              colorClass="bg-muted-foreground"
              description="US T-Bill (3 Month) benchmark"
            />
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 pt-6 border-t border-border">
          <div className="text-center p-4 bg-secondary/50 rounded-lg">
            <TrendingUp className="w-5 h-5 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">${performanceMetrics.highWaterMark.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">High-Water Mark</p>
          </div>
          <div className="text-center p-4 bg-secondary/50 rounded-lg">
            <Activity className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{performanceMetrics.hurdleRate}%</p>
            <p className="text-xs text-muted-foreground">Hurdle Rate</p>
          </div>
          <div className="text-center p-4 bg-secondary/50 rounded-lg">
            <TrendingUp className="w-5 h-5 text-chart-2 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{performanceMetrics.excessReturn}%</p>
            <p className="text-xs text-muted-foreground">Excess Return</p>
          </div>
          <div className="text-center p-4 bg-secondary/50 rounded-lg">
            <Shield className="w-5 h-5 text-chart-2 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{performanceMetrics.alpha}%</p>
            <p className="text-xs text-muted-foreground">Alpha (Q4/25)</p>
          </div>
          <div className="text-center p-4 bg-secondary/50 rounded-lg">
            <Gauge className="w-5 h-5 text-warning mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{performanceMetrics.profitFactor.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">Profit Factor</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
