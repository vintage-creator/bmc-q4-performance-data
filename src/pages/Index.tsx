import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  DollarSign,
  TrendingUp,
  Target,
  Activity,
  BarChart3,
  Lock,
  LineChart,
  Gauge,
  Shield,
  CalendarDays,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MetricCard } from "@/components/TradingDashboard/MetricCard";
import { PerformanceChart } from "@/components/TradingDashboard/PerformanceChart";
import { ROIChart } from "@/components/TradingDashboard/ROIChart";
import { TradeDistribution } from "@/components/TradingDashboard/TradeDistribution";
import { TradeHistory } from "@/components/TradingDashboard/TradeHistory";
import { RiskMetricsGauge } from "@/components/TradingDashboard/RiskMetricsGauge";
import { BenchmarkComparison } from "@/components/TradingDashboard/BenchmarkComparison";
import { InsightsTips } from "@/components/TradingDashboard/InsightsTips";
import { TradeStatsCard } from "@/components/TradingDashboard/TradeStatsCard";
import { MonthlyPnLChart } from "@/components/TradingDashboard/MonthlyPnLChart";
import {
  performanceMetricsQ1,
  performanceMetricsQ2,
  performanceMetricsYTD,
  tradeStatisticsQ1,
  tradeStatisticsQ2,
  tradeStatisticsYTD,
} from "@/data/tradingData";
import { Period } from "@/lib/types";

const HIGH_WATER_MARK_ACCOUNT = 21600;

// Date ranges (up to 17 Apr 2026)
const PERIOD_LABELS: Record<Period, string> = {
  Q1: "28 Jan – 31 Mar 2026",
  Q2: "1 Apr – 17 Apr 2026",
  YTD: "28 Jan – 17 Apr 2026",
};

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

const periodRiskFreeRate: Record<Period, number> = {
  Q1: 1,
  Q2: 1,
  YTD: 2,
};

const Index = () => {
  const [mode, setMode] = useState<"quarterly" | "ytd">("quarterly");
  const [selectedQuarter, setSelectedQuarter] = useState<"Q1" | "Q2">("Q1");

  const activePeriod: Period = mode === "quarterly" ? selectedQuarter : "YTD";

  const performanceMetrics = metricsMap[activePeriod];
  const tradeStatistics = statsMap[activePeriod];
  const periodLabel = PERIOD_LABELS[activePeriod];

  const quarterContext =
    activePeriod === "Q1"
      ? `Q1 2026 · ${PERIOD_LABELS.Q1}`
      : activePeriod === "Q2"
      ? `Q2 2026 · ${PERIOD_LABELS.Q2}`
      : `Q1 + Q2 2026 · ${PERIOD_LABELS.YTD}`;

  const fmtMoney = (n: number) =>
    n.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const pnlTrend = performanceMetrics.totalNetProfit >= 0 ? "up" : "down";
  const roiTrend = performanceMetrics.roi >= 0 ? "up" : "down";

  // Sharpe ratio: display "N/A" if negative
  const sharpeValue =
  performanceMetrics.sharpeRatioAnnualized <= 0
    ? "N/A"
    : performanceMetrics.sharpeRatioAnnualized.toFixed(2);
  const sharpeTrend =
    performanceMetrics.sharpeRatioAnnualized >= 0 ? "up" : "down";

  // Alpha: display "N/A" if negative (for Q1 alpha=0 we show "0%")
  const alphaValue =
  performanceMetrics.alpha <= 0
    ? "N/A"
    : `${performanceMetrics.alpha}%`;
  const alphaTrend = performanceMetrics.alpha > 0 ? "up" : "neutral";

  const pnlDisplay = `${
    performanceMetrics.totalNetProfit >= 0 ? "+" : "-"
  }$${fmtMoney(Math.abs(performanceMetrics.totalNetProfit))}`;
  const roiDisplay = `${performanceMetrics.roi >= 0 ? "+" : ""}${
    performanceMetrics.roi
  }%`;

  const getHwmSubtitle = () => {
    if (activePeriod === "Q1") return "No profit in Q1 · HWM = initial deposit";
    return `Peak account balance · 17 Apr 2026 ($${fmtMoney(HIGH_WATER_MARK_ACCOUNT)})`;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold">Blue Marvel Capital</h1>
            <p className="text-sm text-muted-foreground">
              Live Performance Report · Apollo · Equiti Brokerage (Seychelles)
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg border border-primary/30">
            <Lock className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Proprietary Data
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-10">
        <Alert className="bg-warning/10 border-warning/50">
          <AlertCircle className="h-4 w-4 text-warning" />
          <AlertDescription className="text-foreground">
            <strong>Confidential:</strong> This trading data is proprietary
            information of Blue Marvel Capital. Unauthorised distribution or
            reproduction is prohibited.
          </AlertDescription>
        </Alert>

        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {activePeriod === "YTD" && (
            <Alert className="bg-secondary border-border">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
              <AlertDescription className="text-foreground text-sm">
                <strong>Q1 context (28 Jan – 31 Mar 2026):</strong> Closed P/L
                was −$227.20. At quarter close, 5 Cocoa K6 longs carried a
                floating loss of −$3,436.50 (equity $16,336.30). These resolved
                on 8 Apr (Q2) and are included in YTD figures.
              </AlertDescription>
            </Alert>
          )}
        </motion.div>

        <div>
          <div className="text-center mb-4">
            <p className="text-muted-foreground">
              BMC trading performance report
              {/* <span className="font-bold text-foreground">{recipient}</span> */}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Account #3591662 · {quarterContext}
            </p>
          </div>

          <div className="flex justify-center items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-secondary rounded-lg p-1 border border-border">
              <button
                onClick={() => setMode("quarterly")}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  mode === "quarterly"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Quarterly
              </button>
              <button
                onClick={() => setMode("ytd")}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  mode === "ytd"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                YTD
              </button>
            </div>

            {mode === "quarterly" && (
              <Select
                value={selectedQuarter}
                onValueChange={(value: "Q1" | "Q2") =>
                  setSelectedQuarter(value)
                }
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Select quarter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Q1">Q1 (28 Jan – 31 Mar)</SelectItem>
                  <SelectItem value="Q2">Q2 (1 Apr – 17 Apr)</SelectItem>
                </SelectContent>
              </Select>
            )}

            <Badge variant="outline" className="bg-primary/10 text-primary">
              {activePeriod === "YTD"
                ? "Full year to date"
                : `${activePeriod} ${periodLabel}`}
            </Badge>
          </div>
        </div>

        {/* Capital overview */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <MetricCard
              title="Initial deposit"
              value={`$${fmtMoney(performanceMetrics.initialBalance)}`}
              subtitle="Capital deployed · Jan 2026"
              icon={DollarSign}
              trend="neutral"
            />
            <MetricCard
              title="Current balance"
              value={`$${fmtMoney(performanceMetrics.balance)}`}
              subtitle={`Net P&L: ${pnlDisplay}`}
              icon={DollarSign}
              trend={pnlTrend}
            />
            <MetricCard
              title="Total return"
              value={roiDisplay}
              subtitle={`On $${(
                performanceMetrics.initialBalance / 1000
              ).toFixed(0)}k deposit · ${quarterContext}`}
              icon={TrendingUp}
              trend={roiTrend}
            />
          </div>
        </section>

        {/* Performance summary */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Performance summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <MetricCard
              title="Total gross profit"
              value={pnlDisplay}
              subtitle={quarterContext}
              icon={DollarSign}
              trend={pnlTrend}
              tooltip={`Total closed P/L after all commissions. ${
                activePeriod === "YTD"
                  ? `Includes Q1 (${
                      performanceMetricsQ1.totalNetProfit >= 0 ? "+" : ""
                    }$${fmtMoney(
                      Math.abs(performanceMetricsQ1.totalNetProfit)
                    )}) and Q2 (${
                      performanceMetricsQ2.totalNetProfit >= 0 ? "+" : ""
                    }$${fmtMoney(
                      Math.abs(performanceMetricsQ2.totalNetProfit)
                    )}).`
                  : `${activePeriod} activity only.`
              }`}
              delay={0.1}
            />
            <MetricCard
              title="Sharpe ratio"
              value={sharpeValue}
              subtitle={`-`}
              icon={Gauge}
              trend={sharpeTrend}
              tooltip="Risk-adjusted return. Above 2.0 is outstanding. Calculated against 3‑month US T‑Bill rate. Negative values shown as N/A."
              delay={0.2}
            />
            <MetricCard
              title="Alpha"
              value={alphaValue}
              subtitle={`vs ${performanceMetrics.hurdleRate}% hurdle rate`}
              icon={LineChart}
              trend={alphaTrend}
              tooltip="Outperformance relative to the hurdle rate. Negative values shown as N/A."
              delay={0.3}
            />
            <MetricCard
              title="Win rate"
              value={`${tradeStatistics.profitTradesPercent}%`}
              subtitle={`${tradeStatistics.profitTrades} of ${tradeStatistics.totalTrades} trades`}
              icon={Target}
              trend="up"
              tooltip="Percentage of profitable closed trades."
              delay={0.4}
            />
          </div>
        </section>

        {/* Performance analysis */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <LineChart className="w-5 h-5 text-primary" />
            Performance analysis
          </h2>
          <div className="space-y-6">
            <PerformanceChart period={activePeriod} />
            <ROIChart period={activePeriod} />
          </div>
        </section>

        {/* Monthly / quarterly P&L */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-primary" />
            {activePeriod === "Q2"
              ? "Q2 P&L breakdown"
              : activePeriod === "Q1"
              ? "Q1 P&L breakdown"
              : "Quarterly & monthly P&L breakdown"}
          </h2>
          <MonthlyPnLChart period={activePeriod} />
        </section>

        {/* Trade metrics */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Trade metrics
          </h2>
          <div className="space-y-6">
            <TradeDistribution period={activePeriod} />
            <TradeStatsCard period={activePeriod} />
          </div>
        </section>

        {/* Risk assessment */}
        <section>
          <RiskMetricsGauge period={activePeriod} />
        </section>

        {/* Benchmark comparison */}
        <section>
          <BenchmarkComparison period={activePeriod} />
        </section>

        {/* Detailed metrics */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Gauge className="w-5 h-5 text-primary" />
            Detailed metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
            <MetricCard
              title="Profit factor"
              value={performanceMetrics.profitFactor.toFixed(2)}
              subtitle="Gross profit ÷ gross loss"
              icon={Activity}
              trend={performanceMetrics.profitFactor >= 1 ? "up" : "down"}
              tooltip="Above 1.0 means more won than lost. Above 2.0 is excellent."
              delay={0.1}
            />
            <MetricCard
              title="Std deviation"
              value={`${performanceMetrics.standardDeviation.toFixed(2)}%`}
              subtitle="Portfolio volatility"
              icon={BarChart3}
              trend="neutral"
              tooltip="Lower volatility with high returns = efficient risk management."
              delay={0.2}
            />
            <MetricCard
              title="Avg loss"
              value={`$${Math.abs(tradeStatistics.averageLossTrade).toFixed(
                2
              )}`}
              subtitle="Per losing trade"
              icon={Activity}
              trend="down"
              tooltip="Average loss per losing trade."
              delay={0.3}
            />
            <MetricCard
              title="Risk-free rate"
              value={`${periodRiskFreeRate[activePeriod]}%`}
              subtitle={`${
                activePeriod === "YTD" ? "YTD (2 quarters)" : "Quarterly"
              } · 4% p.a.`}
              icon={BarChart3}
              trend="neutral"
              tooltip={`Risk-free rate for the selected period. US 3-month T-Bill annualised = 4% = 1% per quarter. ${
                activePeriod === "YTD"
                  ? "YTD spans 2 quarters → 2%."
                  : `${activePeriod} spans 1 quarter → 1%.`
              }`}
              delay={0.4}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <MetricCard
              title="High-water mark"
              value={`$${fmtMoney(HIGH_WATER_MARK_ACCOUNT)}`}
              subtitle={getHwmSubtitle()}
              icon={TrendingUp}
              trend="up"
              tooltip="High‑water mark is the peak account balance reached ($21,600 on 17 Apr 2026). Performance fees are calculated from this level."
              delay={0.1}
            />
            <MetricCard
              title="Hurdle rate"
              value={`${performanceMetrics.hurdleRate}%`}
              subtitle="Minimum target return"
              icon={Target}
              trend="neutral"
              tooltip="Minimum return threshold before performance fees apply."
              delay={0.2}
            />
            <MetricCard
              title="Avg win"
              value={`$${tradeStatistics.averageProfitTrade.toFixed(2)}`}
              subtitle="Per profitable trade"
              icon={TrendingUp}
              trend="up"
              tooltip="Average profit on winning trades."
              delay={0.3}
            />
            <MetricCard
              title="Total trades"
              value={tradeStatistics.totalTrades}
              subtitle={quarterContext}
              icon={BarChart3}
              trend="neutral"
              tooltip="Total closed positions for the selected period."
              delay={0.4}
            />
          </div>
        </section>

        {/* Insights */}
        <section>
          <InsightsTips period={activePeriod} />
        </section>

        {/* Trade history */}
        <section>
          <TradeHistory period={activePeriod} />
        </section>
      </main>

      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Blue Marvel Capital. All rights
            reserved.
          </p>
          <p className="mt-1">
            Account #3591662 · Equiti Brokerage (Seychelles) Limited · Data as
            of 17 Apr 2026
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;