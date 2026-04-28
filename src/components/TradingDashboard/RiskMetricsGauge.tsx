import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  performanceMetricsQ1,
  performanceMetricsQ2,
  performanceMetricsYTD,
  combinedFundMetrics,
} from "@/data/tradingData";
import { Gauge, TrendingUp, Shield, Activity } from "lucide-react";
import { Period, AccountFilter } from "@/lib/types";

interface RiskMetricsGaugeProps {
  period?: Period;
  account?: AccountFilter;
}

interface LinearGaugeProps {
  value: number;
  max: number;
  label: string;
  unit: string;
  color: string;
  description: string;
  delay?: number;
}

const LinearGauge = ({
  value,
  max,
  label,
  unit,
  color,
  description,
  delay = 0,
}: LinearGaugeProps) => {
  const pct = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm font-bold text-foreground">
          {value}
          {unit}
        </span>
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
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

const metricsMap = {
  Q1: performanceMetricsQ1,
  Q2: performanceMetricsQ2,
  YTD: performanceMetricsYTD,
};

const PERIOD_LABEL: Record<Period, string> = {
  Q1: "Q1 2026 · 28 Jan – 31 Mar",
  Q2: "Q2 2026 · 1 Apr – 17 Apr",
  YTD: "Q1 + Q2 2026 · 28 Jan – 17 Apr · 2% YTD risk-free",
};

const RF_DISPLAY: Record<Period, { value: number; label: string }> = {
  Q1: { value: 1, label: "1% quarterly (4% p.a.)" },
  Q2: { value: 1, label: "1% quarterly (4% p.a.)" },
  YTD: { value: 2, label: "2% YTD · 2 qtrs × 1%" },
};

export const RiskMetricsGauge = ({
  period = "Q1",
  account = "equiti",
}: RiskMetricsGaugeProps) => {
  // Combined view uses YTD Equiti risk metrics, because Atlas has zero drawdown
  // and the combined risk profile is driven by Equiti.
  const m = metricsMap[period];

  const rf = RF_DISPLAY[period];

  const titleLabel =
    account === "combined"
      ? "Combined fund risk metrics"
      : "Risk metrics";

  const subtitleLabel =
    account === "combined"
      ? "Volatility, drawdown & risk-adjusted return · combined view based on Equiti YTD risk profile"
      : `Volatility, drawdown & risk-adjusted return · ${PERIOD_LABEL[period]}`;

  const highWaterMark =
    account === "combined" ? combinedFundMetrics.highWaterMark : m.highWaterMark;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex justify-center"
    >
      <Card className="w-full max-w-5xl border-border bg-card p-6">
        <div className="flex flex-col items-center text-center">
          <h3 className="mb-1 flex items-center gap-2 text-xl font-bold text-foreground">
            <Gauge className="h-5 w-5 text-primary" />
            {titleLabel}
          </h3>
          <p className="mb-6 text-sm text-muted-foreground">{subtitleLabel}</p>
        </div>

        {m.sharpeRatioAnnualized < 0 && (
          <div className="mb-6 flex justify-center">
            <p className="inline-block rounded bg-destructive/10 px-3 py-2 text-xs text-destructive">
              Period return was below the {rf.value}% risk-free rate threshold
            </p>
          </div>
        )}

        <div className="mx-auto max-w-3xl">
          <h4 className="mb-4 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Volatility &amp; risk indicators
          </h4>

          <div className="grid grid-cols-1 gap-6 justify-items-center sm:grid-cols-2 lg:grid-cols-3">
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

        <div className="mt-8 grid grid-cols-2 gap-3 border-t border-border pt-6 md:grid-cols-4">
          {[
            {
              Icon: TrendingUp,
              color: "text-success",
              value: `$${highWaterMark.toLocaleString()}`,
              label: "High-water mark",
            },
            {
              Icon: Activity,
              color: "text-primary",
              value: `${m.hurdleRate}%`,
              label: "Hurdle rate",
            },
            {
              Icon: Shield,
              color: "text-chart-2",
              value: `${m.alpha.toFixed(2)}%`,
              label: "Alpha",
            },
            {
              Icon: Gauge,
              color: "text-warning",
              value:
                m.profitFactor === Infinity ? "∞" : m.profitFactor.toFixed(2),
              label: "Profit factor",
            },
          ].map(({ Icon, color, value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.6 + i * 0.07 }}
              className="rounded-lg bg-secondary/50 p-3 text-center"
            >
              <Icon className={`mx-auto mb-2 h-4 w-4 ${color}`} />
              <p className="text-base font-bold text-foreground sm:text-xl">
                {value}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 rounded-lg border border-border/50 bg-secondary/40 p-3 text-center">
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">Risk-free rate:</strong>{" "}
            US T-Bill (3-month) = 4% p.a. = 1% per quarter = 0.333% per month.{" "}
            {period === "YTD"
              ? "YTD spans 2 quarters → period risk-free = 2%."
              : `${period} spans 1 quarter → period risk-free = 1%.`}{" "}
            Sharpe ratio = (avg monthly excess return) / (std deviation of
            returns) × √12 (annualised).
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

export default RiskMetricsGauge;