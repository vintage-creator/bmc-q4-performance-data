import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { performanceMetricsQTD, performanceMetricsYTD } from "@/data/tradingData";
import { Gauge, TrendingUp, Shield, Activity } from "lucide-react";
import { Period } from "@/lib/types";

interface RiskMetricsGaugeProps { period?: Period; }

interface CircularGaugeProps {
  value: number; max: number; label: string; color: string; description: string; delay?: number;
}
const CircularGauge = ({ value, max, label, color, description, delay = 0 }: CircularGaugeProps) => {
  const pct = Math.min((value / max) * 100, 100);
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (pct / 100) * circumference;
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--secondary))" strokeWidth="8" />
          <motion.circle cx="50" cy="50" r="45" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
            strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }} transition={{ duration: 1.4, delay, ease: "easeOut" }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span className="text-2xl font-bold text-foreground" initial={{ opacity: 0 }}
            animate={{ opacity: 1 }} transition={{ delay: delay + 0.4, duration: 0.4 }}>
            {value.toFixed(2)}
          </motion.span>
        </div>
      </div>
      <h4 className="mt-3 font-semibold text-foreground text-sm text-center">{label}</h4>
      <p className="text-xs text-muted-foreground text-center mt-1 max-w-[140px] leading-relaxed">{description}</p>
    </div>
  );
};

interface LinearGaugeProps {
  value: number; max: number; label: string; unit: string; color: string; description: string; delay?: number;
}
const LinearGauge = ({ value, max, label, unit, color, description, delay = 0 }: LinearGaugeProps) => {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm font-bold text-foreground">{value}{unit}</span>
      </div>
      <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
        <motion.div className="h-full rounded-full" style={{ background: color }}
          initial={{ width: 0 }} animate={{ width: `${pct}%` }}
          transition={{ duration: 1, delay, ease: "easeOut" }} />
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
};

export const RiskMetricsGauge = ({ period = "QTD" }: RiskMetricsGaugeProps) => {
  const m = period === "QTD" ? performanceMetricsQTD : performanceMetricsYTD;
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
      <Card className="p-6 bg-card border-border">
        <h3 className="text-xl font-bold text-foreground mb-1 flex items-center gap-2">
          <Gauge className="w-5 h-5 text-primary" />Risk metrics
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Volatility, drawdown &amp; risk-adjusted return ·{" "}
          {period === "QTD" ? "Q2 2026 to date" : "Q1 + Q2 2026 · full history"}
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-6 uppercase tracking-wide">Sharpe ratio analysis</h4>
            <div className="flex flex-wrap justify-center gap-8">
              <CircularGauge value={m.sharpeRatioMonthly} max={2} label="Monthly Sharpe"
                color="hsl(var(--primary))" description="Risk-adjusted return on a monthly basis" delay={0.1} />
              <CircularGauge value={m.sharpeRatioAnnualized} max={4} label="Annualised Sharpe"
                color="hsl(var(--success))" description="Above 2.0 is considered outstanding" delay={0.3} />
            </div>
          </div>
          <div className="space-y-5">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Volatility &amp; risk indicators</h4>
            <LinearGauge value={m.standardDeviation} max={30} label="Standard deviation" unit="%" color="hsl(var(--primary))" description="Portfolio return volatility" delay={0.15} />
            <LinearGauge value={m.variance} max={10} label="Variance" unit="%" color="hsl(var(--chart-2))" description="Squared deviation from mean returns" delay={0.25} />
            <LinearGauge value={m.relativeDrawdown} max={30} label="Max relative drawdown" unit="%" color="#E24B4A" description="Largest peak-to-trough decline as % of balance" delay={0.35} />
            <LinearGauge value={m.riskFreeRate} max={10} label="Risk-free rate" unit="%" color="hsl(var(--muted-foreground))" description="US T-Bill (3 month) benchmark" delay={0.45} />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-8 pt-6 border-t border-border">
          {[
            { Icon: TrendingUp, color: "text-success",       value: `$${m.highWaterMark.toLocaleString()}`, label: "High-water mark" },
            { Icon: Activity,   color: "text-primary",       value: `${m.hurdleRate}%`,                    label: "Hurdle rate"     },
            { Icon: TrendingUp, color: "text-chart-2",       value: `${m.excessReturn}%`,                  label: "Excess return"   },
            { Icon: Shield,     color: "text-chart-2",       value: `${m.alpha}%`,                         label: "Alpha"           },
            { Icon: Gauge,      color: "text-warning",       value: m.profitFactor.toFixed(2),             label: "Profit factor"   },
          ].map(({ Icon, color, value, label }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.6 + i * 0.07 }} className="text-center p-4 bg-secondary/50 rounded-lg">
              <Icon className={`w-4 h-4 ${color} mx-auto mb-2`} />
              <p className="text-xl font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};
export default RiskMetricsGauge;