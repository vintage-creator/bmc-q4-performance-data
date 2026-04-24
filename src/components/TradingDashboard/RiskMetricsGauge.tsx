import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { performanceMetricsQ1, performanceMetricsQ2, performanceMetricsYTD } from "@/data/tradingData";
import { Gauge, TrendingUp, Shield, Activity } from "lucide-react";
import { Period } from "@/lib/types";

interface RiskMetricsGaugeProps { period?: Period; }

interface LinearGaugeProps {
  value: number; max: number; label: string; unit: string; color: string; description: string; delay?: number;
}
const LinearGauge = ({ value, max, label, unit, color, description, delay = 0 }: LinearGaugeProps) => {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="space-y-1.5 w-full">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm font-bold text-foreground">{value}{unit}</span>
      </div>
      <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
};

const metricsMap = { Q1: performanceMetricsQ1, Q2: performanceMetricsQ2, YTD: performanceMetricsYTD };

const PERIOD_LABEL: Record<Period, string> = {
  Q1:  "Q1 2026 · 28 Jan – 31 Mar",
  Q2:  "Q2 2026 · 1 Apr – 17 Apr",
  YTD: "Q1 + Q2 2026 · 28 Jan – 17 Apr · 2% YTD risk-free",
};

const RF_DISPLAY: Record<Period, { value: number; label: string }> = {
  Q1:  { value: 1,   label: "1% quarterly (4% p.a.)"    },
  Q2:  { value: 1,   label: "1% quarterly (4% p.a.)"    },
  YTD: { value: 2,   label: "2% YTD · 2 qtrs × 1%"      },
};

export const RiskMetricsGauge = ({ period = "Q1" }: RiskMetricsGaugeProps) => {
  const m = metricsMap[period];
  const rf = RF_DISPLAY[period];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex justify-center"
    >
      <Card className="p-6 bg-card border-border w-full max-w-5xl">
        <div className="flex flex-col items-center text-center">
          <h3 className="text-xl font-bold text-foreground mb-1 flex items-center gap-2">
            <Gauge className="w-5 h-5 text-primary" /> Risk metrics
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Volatility, drawdown &amp; risk-adjusted return · {PERIOD_LABEL[period]}
          </p>
        </div>

        {m.sharpeRatioAnnualized < 0 && (
          <div className="flex justify-center mb-6">
            <p className="text-xs text-destructive bg-destructive/10 rounded px-3 py-2 inline-block">
              Period return was below the {rf.value}% risk-free rate threshold
            </p>
          </div>
        )}

        {/* Linear gauges – responsive grid */}
        <div className="max-w-3xl mx-auto">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-4 text-center">
            Volatility &amp; risk indicators
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            <LinearGauge
              value={m.standardDeviation}
              max={30}
              label="Standard deviation"
              unit="%"
              color="hsl(var(--primary))"
              description="Portfolio return volatility"
              delay={0.15}
            />
            <LinearGauge
              value={m.variance}
              max={10}
              label="Variance"
              unit="%"
              color="hsl(var(--chart-2))"
              description="Squared deviation from mean returns"
              delay={0.25}
            />
            <LinearGauge
              value={m.relativeDrawdown}
              max={30}
              label="Max relative drawdown"
              unit="%"
              color="#E24B4A"
              description="Largest peak-to-trough decline as % of balance"
              delay={0.35}
            />
            <LinearGauge
              value={rf.value}
              max={10}
              label="Risk-free rate (period)"
              unit="%"
              color="hsl(var(--muted-foreground))"
              description={rf.label}
              delay={0.45}
            />
          </div>
        </div>

        {/* Bottom stat cards – responsive grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 pt-6 border-t border-border">
          {[
            { Icon: TrendingUp, color: "text-success",   value: `$${m.highWaterMark.toLocaleString()}`, label: "High-water mark" },
            { Icon: Activity,   color: "text-primary",   value: `${m.hurdleRate}%`,                    label: "Hurdle rate"     },
            { Icon: Shield,     color: "text-chart-2",   value: `N/A`,                         label: "Alpha"           },
            { Icon: Gauge,      color: "text-warning",   value: m.profitFactor.toFixed(2),             label: "Profit factor"   },
          ].map(({ Icon, color, value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.6 + i * 0.07 }}
              className="text-center p-3 bg-secondary/50 rounded-lg"
            >
              <Icon className={`w-4 h-4 ${color} mx-auto mb-2`} />
              <p className="text-base sm:text-xl font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Centered footnote */}
        <div className="mt-6 p-3 bg-secondary/40 rounded-lg border border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">Risk-free rate:</strong> US T-Bill (3-month) = 4% p.a. = 1% per quarter = 0.333% per month.{" "}
            {period === "YTD"
              ? "YTD spans 2 quarters → period risk-free = 2%."
              : `${period} spans 1 quarter → period risk-free = 1%.`}{" "}
            Sharpe ratio = (avg monthly excess return) / (std deviation of returns) × √12 (annualised).
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

export default RiskMetricsGauge;