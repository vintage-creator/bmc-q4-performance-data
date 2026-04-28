"use client";

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
  Layers,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { CombinedFundOverview } from "@/components/TradingDashboard/CombinedFundOverview";
import {
  performanceMetricsQ1,
  performanceMetricsQ2,
  performanceMetricsYTD,
  atlasPerformanceMetrics,
  combinedFundMetrics,
  tradeStatisticsQ1,
  tradeStatisticsQ2,
  tradeStatisticsYTD,
  atlasTradeStatistics,
  combinedTradeStatistics,
} from "@/data/tradingData";
import {
  Period,
  AccountFilter,
  AccountSelection,
  PERIOD_LABELS,
} from "@/lib/types";

const ATLAS_REPORT_URL = "https://bmc-2025-q4-trading-data.vercel.app/";

const HIGH_WATER_MARK_EQUITI = 21600;
const HIGH_WATER_MARK_COMBINED = 31693.27;

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
  const [accountFilter, setAccountFilter] = useState<AccountSelection>("");

  const resolvedAccount: AccountFilter =
    accountFilter === "" ? "equiti" : accountFilter;

  const activePeriod: Period = mode === "quarterly" ? selectedQuarter : "YTD";

  // When viewing Atlas or Combined, always use YTD/full period data
  const effectivePeriod: Period =
    resolvedAccount === "equiti" ? activePeriod : "YTD";

  const performanceMetrics = metricsMap[effectivePeriod];
  const tradeStatistics = statsMap[effectivePeriod];

  const quarterContext =
    effectivePeriod === "Q1"
      ? `Q1 2026 · ${PERIOD_LABELS.Q1}`
      : effectivePeriod === "Q2"
      ? `Q2 2026 · ${PERIOD_LABELS.Q2}`
      : `Q1 + Q2 2026 · ${PERIOD_LABELS.YTD}`;

  const fmtMoney = (n: number) =>
    n.toLocaleString("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const handleAccountChange = (value: AccountSelection) => {
    if (value === "atlas") {
      window.location.href = ATLAS_REPORT_URL;
      return;
    }

    setAccountFilter(value);
  };

  // ── Derive display values based on account filter ──────────────────────────
  const getDisplayMetrics = () => {
    if (resolvedAccount === "atlas") {
      return {
        initialBalance: atlasPerformanceMetrics.initialBalance,
        balance: atlasPerformanceMetrics.balance,
        totalNetProfit: atlasPerformanceMetrics.totalNetProfit,
        roi: atlasPerformanceMetrics.roi,
        sharpe: atlasPerformanceMetrics.sharpeRatioAnnualized,
        alpha: atlasPerformanceMetrics.alpha,
        hurdleRate: atlasPerformanceMetrics.hurdleRate,
        profitFactor: Infinity,
        stdDev: atlasPerformanceMetrics.standardDeviation,
        hwm: atlasPerformanceMetrics.highWaterMark,
      };
    }

    if (resolvedAccount === "combined") {
      return {
        initialBalance: combinedFundMetrics.totalDeposited,
        balance: combinedFundMetrics.totalAUM,
        totalNetProfit: combinedFundMetrics.totalNetProfit,
        roi: combinedFundMetrics.blendedROI,
        sharpe: combinedFundMetrics.blendedSharpe,
        alpha:
          combinedFundMetrics.blendedROI - periodRiskFreeRate[effectivePeriod],
        hurdleRate: 8,
        profitFactor: performanceMetrics.profitFactor,
        stdDev: performanceMetrics.standardDeviation,
        hwm: HIGH_WATER_MARK_COMBINED,
      };
    }

    // equiti
    return {
      initialBalance: performanceMetrics.initialBalance,
      balance: performanceMetrics.balance,
      totalNetProfit: performanceMetrics.totalNetProfit,
      roi: performanceMetrics.roi,
      sharpe: performanceMetrics.sharpeRatioAnnualized,
      alpha: performanceMetrics.alpha,
      hurdleRate: performanceMetrics.hurdleRate,
      profitFactor: performanceMetrics.profitFactor,
      stdDev: performanceMetrics.standardDeviation,
      hwm: HIGH_WATER_MARK_EQUITI,
    };
  };

  const getDisplayStats = () => {
    if (resolvedAccount === "atlas") return atlasTradeStatistics;
    if (resolvedAccount === "combined") return combinedTradeStatistics;
    return tradeStatistics;
  };

  const displayMetrics = getDisplayMetrics();
  const displayStats = getDisplayStats();

  const pnlTrend = displayMetrics.totalNetProfit >= 0 ? "up" : "down";
  const roiTrend = displayMetrics.roi >= 0 ? "up" : "down";

  const sharpeValue =
    displayMetrics.sharpe <= 0
      ? "N/A"
      : displayMetrics.sharpe === Infinity
      ? "∞"
      : displayMetrics.sharpe.toFixed(2);
  const sharpeTrend = displayMetrics.sharpe >= 0 ? "up" : "down";

  const alphaValue =
    displayMetrics.alpha <= 0 ? "N/A" : `${displayMetrics.alpha.toFixed(2)}%`;
  const alphaTrend = displayMetrics.alpha > 0 ? "up" : "neutral";

  const pnlDisplay = `${displayMetrics.totalNetProfit >= 0 ? "+" : "-"}$${fmtMoney(
    Math.abs(displayMetrics.totalNetProfit)
  )}`;
  const roiDisplay = `${displayMetrics.roi >= 0 ? "+" : ""}${displayMetrics.roi.toFixed(2)}%`;

  const getHwmSubtitle = () => {
    if (resolvedAccount === "atlas")
      return `Atlas Prime peak · 17 Apr 2026 ($${fmtMoney(displayMetrics.hwm)})`;
    if (resolvedAccount === "combined")
      return `Combined fund peak · 17 Apr 2026 ($${fmtMoney(displayMetrics.hwm)})`;
    if (effectivePeriod === "Q1") return "No profit in Q1 · HWM = initial deposit";
    return `Peak account balance · 17 Apr 2026 ($${fmtMoney(displayMetrics.hwm)})`;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-4 md:flex-row">
          <div className="text-center md:text-left">
            <h1 className="mt-4 text-2xl font-bold">Blue Marvel Capital</h1>
            <p className="text-sm text-muted-foreground">
              Overall Performance Report
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Select value={accountFilter} onValueChange={handleAccountChange}>
              <SelectTrigger className="w-[200px]">
                <Layers className="mr-2 h-4 w-4 text-primary" />
                <SelectValue placeholder="Select Trading Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="equiti">2026</SelectItem>
                <SelectItem value="atlas">2025</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2">
              <Lock className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Proprietary</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto space-y-10 px-4 py-8">
        <Alert className="border-warning/50 bg-warning/10">
          <AlertCircle className="h-4 w-4 text-warning" />
          <AlertDescription className="text-foreground">
            <strong>Confidential:</strong> This trading data is proprietary
            information of Blue Marvel Capital. Unauthorised distribution or
            reproduction is prohibited.
          </AlertDescription>
        </Alert>

        {resolvedAccount === "combined" && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Alert className="border-primary/30 bg-primary/5">
              <Layers className="h-4 w-4 text-primary" />
              <AlertDescription className="text-sm text-foreground">
                <strong>Combined fund view:</strong> Aggregates Equiti Brokerage
                #3591662 (Apollo, $20k deposit) and Atlas Prime #6117251
                ($4,000.48 net deposits). Total AUM:{" "}
                <strong>$31,693.27</strong> · Combined net profit:{" "}
                <strong>+$7,692.79</strong> · Blended ROI:{" "}
                <strong>+32.05%</strong>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {resolvedAccount === "atlas" && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Alert className="border-border bg-secondary">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
              <AlertDescription className="text-sm text-foreground">
                <strong>Atlas Prime account #6117251:</strong> Blue Marvel
                Capital Strategies - FZCO. Net deposits $4,000.48 (deposits
                $4,600 less $599.52 withdrawal on 7 Apr). All 10 trades EUR/JPY
                long, opened 3 Mar – 15 Apr, all closed 17 Apr 2026. 100% win
                rate.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {resolvedAccount === "equiti" && effectivePeriod === "YTD" && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Alert className="border-border bg-secondary">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
              <AlertDescription className="text-sm text-foreground">
                <strong>Q1 context (28 Jan – 31 Mar 2026):</strong> Closed P/L
                was −$227.20. At quarter close, 5 Cocoa K6 longs carried a
                floating loss of −$3,436.50 (equity $16,336.30). These resolved
                on 8 Apr (Q2) and are included in YTD figures.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        <div>
          <div className="mb-4 text-center">
            <p className="text-muted-foreground">
              BMC Overall Trading Performance Report
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {resolvedAccount === "equiti"
                ? `Account #3591662 · ${quarterContext}`
                : resolvedAccount === "atlas"
                ? "Account #6117251 · 3 Mar – 17 Apr 2026"
                : "Combined fund · Equiti #3591662 + Atlas Prime #6117251 · 28 Jan – 17 Apr 2026"}
            </p>
          </div>

          {resolvedAccount === "equiti" && (
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary p-1">
                <button
                  onClick={() => setMode("quarterly")}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    mode === "quarterly"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Quarterly
                </button>
                <button
                  onClick={() => setMode("ytd")}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
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
                  onValueChange={(value: "Q1" | "Q2") => setSelectedQuarter(value)}
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
                {effectivePeriod === "YTD"
                  ? "Full year to date"
                  : `${effectivePeriod} ${PERIOD_LABELS[effectivePeriod]}`}
              </Badge>
            </div>
          )}
        </div>

        {resolvedAccount === "combined" && (
          <section>
            <CombinedFundOverview />
          </section>
        )}

        <section>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <MetricCard
              title={
                resolvedAccount === "combined"
                  ? "Total capital deployed"
                  : "Initial deposit"
              }
              value={`$${fmtMoney(displayMetrics.initialBalance)}`}
              subtitle={
                resolvedAccount === "combined"
                  ? "Equiti $20,000 + Atlas $4,000.48"
                  : resolvedAccount === "atlas"
                  ? "Net deposits · Mar 2026"
                  : "Capital deployed · Jan 2026"
              }
              icon={DollarSign}
              trend="neutral"
            />
            <MetricCard
              title={resolvedAccount === "combined" ? "Total AUM" : "Current balance"}
              value={`$${fmtMoney(displayMetrics.balance)}`}
              subtitle={`Net P&L: ${pnlDisplay}`}
              icon={DollarSign}
              trend={pnlTrend}
            />
            <MetricCard
              title="Total return"
              value={roiDisplay}
              subtitle={
                resolvedAccount === "combined"
                  ? `Blended ROI · $${(displayMetrics.initialBalance / 1000).toFixed(1)}k deployed`
                  : resolvedAccount === "atlas"
                  ? "On $4,000.48 net deposits"
                  : `On $${(displayMetrics.initialBalance / 1000).toFixed(0)}k deposit · ${quarterContext}`
              }
              icon={TrendingUp}
              trend={roiTrend}
            />
          </div>
        </section>

        <section>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
            <TrendingUp className="h-5 w-5 text-primary" />
            Performance summary
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total net profit"
              value={pnlDisplay}
              subtitle={
                resolvedAccount === "combined"
                  ? "Equiti +$5,032.92 · Atlas +$2,659.87"
                  : resolvedAccount === "atlas"
                  ? "3 Mar – 17 Apr 2026"
                  : quarterContext
              }
              icon={DollarSign}
              trend={pnlTrend}
              delay={0.1}
            />
            <MetricCard
              title="Sharpe ratio"
              value={sharpeValue}
              subtitle={
                resolvedAccount === "combined"
                  ? "Weighted blended (ann.)"
                  : resolvedAccount === "atlas"
                  ? "As reported · Ann."
                  : "-"
              }
              icon={Gauge}
              trend={sharpeTrend}
              tooltip="Risk-adjusted return. Above 2.0 is outstanding. Calculated against 3-month US T-Bill rate."
              delay={0.2}
            />
            <MetricCard
              title="Alpha"
              value={alphaValue}
              subtitle={`vs ${displayMetrics.hurdleRate}% hurdle rate`}
              icon={LineChart}
              trend={alphaTrend}
              tooltip="Outperformance relative to the hurdle rate. Negative values shown as N/A."
              delay={0.3}
            />
            <MetricCard
              title="Win rate"
              value={`${displayStats.profitTradesPercent.toFixed(1)}%`}
              subtitle={`${displayStats.profitTrades} of ${displayStats.totalTrades} trades`}
              icon={Target}
              trend="up"
              tooltip="Percentage of profitable closed trades."
              delay={0.4}
            />
          </div>
        </section>

        {resolvedAccount !== "combined" && (
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
              <LineChart className="h-5 w-5 text-primary" />
              Performance analysis
            </h2>
            <div className="space-y-6">
              {resolvedAccount === "equiti" && (
                <>
                  <PerformanceChart period={effectivePeriod} />
                  <ROIChart period={effectivePeriod} />
                </>
              )}
              {resolvedAccount === "atlas" && (
                <>
                  <PerformanceChart period={effectivePeriod} account="atlas" />
                  <ROIChart period={effectivePeriod} account="atlas" />
                </>
              )}
            </div>
          </section>
        )}

        <section>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
            <CalendarDays className="h-5 w-5 text-primary" />
            {resolvedAccount === "combined"
              ? "Combined P&L breakdown"
              : resolvedAccount === "atlas"
              ? "Atlas P&L breakdown"
              : effectivePeriod === "Q2"
              ? "Q2 P&L breakdown"
              : effectivePeriod === "Q1"
              ? "Q1 P&L breakdown"
              : "Quarterly & monthly P&L breakdown"}
          </h2>
          <MonthlyPnLChart period={effectivePeriod} account={resolvedAccount} />
        </section>

        <section>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
            <BarChart3 className="h-5 w-5 text-primary" />
            Trade metrics
          </h2>
          <div className="space-y-6">
            <TradeDistribution period={effectivePeriod} account={resolvedAccount} />
            <TradeStatsCard period={effectivePeriod} account={resolvedAccount} />
          </div>
        </section>

        {resolvedAccount !== "atlas" && (
          <section>
            <RiskMetricsGauge period={effectivePeriod} account={resolvedAccount} />
          </section>
        )}

        {resolvedAccount === "atlas" && (
          <section>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <MetricCard
                title="Max drawdown"
                value="0.00%"
                subtitle="Zero losing trades"
                icon={Shield}
                trend="up"
                tooltip="Atlas Prime had no drawdown — all 10 trades closed profitably."
              />
              <MetricCard
                title="Profit factor"
                value="∞"
                subtitle="No losing trades"
                icon={Activity}
                trend="up"
              />
              <MetricCard
                title="Sharpe ratio (ann.)"
                value="1.51"
                subtitle="As reported by broker"
                icon={Gauge}
                trend="up"
              />
            </div>
          </section>
        )}

        {resolvedAccount !== "atlas" && (
          <section>
            <BenchmarkComparison
              period={effectivePeriod}
              account={resolvedAccount}
            />
          </section>
        )}

        <section>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
            <Gauge className="h-5 w-5 text-primary" />
            Detailed metrics
          </h2>
          <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Profit factor"
              value={
                displayMetrics.profitFactor === Infinity
                  ? "∞"
                  : displayMetrics.profitFactor.toFixed(2)
              }
              subtitle="Gross profit ÷ gross loss"
              icon={Activity}
              trend={displayMetrics.profitFactor >= 1 ? "up" : "down"}
              tooltip="Above 1.0 means more won than lost. Above 2.0 is excellent. ∞ means no losing trades."
              delay={0.1}
            />
            <MetricCard
              title="Std deviation"
              value={`${displayMetrics.stdDev.toFixed(2)}%`}
              subtitle="Portfolio volatility"
              icon={BarChart3}
              trend="neutral"
              tooltip="Lower volatility with high returns = efficient risk management."
              delay={0.2}
            />
            <MetricCard
              title="Avg loss"
              value={`$${Math.abs(displayStats.averageLossTrade).toFixed(2)}`}
              subtitle="Per losing trade"
              icon={Activity}
              trend="down"
              delay={0.3}
            />
            <MetricCard
              title="Risk-free rate"
              value={`${periodRiskFreeRate[effectivePeriod]}%`}
              subtitle={`${
                effectivePeriod === "YTD" ? "YTD (2 quarters)" : "Quarterly"
              } · 4% p.a.`}
              icon={BarChart3}
              trend="neutral"
              delay={0.4}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="High-water mark"
              value={`$${fmtMoney(displayMetrics.hwm)}`}
              subtitle={getHwmSubtitle()}
              icon={TrendingUp}
              trend="up"
              delay={0.1}
            />
            <MetricCard
              title="Hurdle rate"
              value={`${displayMetrics.hurdleRate}%`}
              subtitle="Minimum target return"
              icon={Target}
              trend="neutral"
              delay={0.2}
            />
            <MetricCard
              title="Avg win"
              value={`$${displayStats.averageProfitTrade.toFixed(2)}`}
              subtitle="Per profitable trade"
              icon={TrendingUp}
              trend="up"
              delay={0.3}
            />
            <MetricCard
              title="Total trades"
              value={displayStats.totalTrades}
              subtitle={
                resolvedAccount === "combined"
                  ? "Equiti 26 + Atlas 10"
                  : resolvedAccount === "atlas"
                  ? "3 Mar – 17 Apr 2026"
                  : quarterContext
              }
              icon={BarChart3}
              trend="neutral"
              delay={0.4}
            />
          </div>
        </section>

        <section>
          <InsightsTips period={effectivePeriod} account={resolvedAccount} />
        </section>

        <section>
          <TradeHistory period={effectivePeriod} account={resolvedAccount} />
        </section>
      </main>

      <footer className="mt-16 border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Blue Marvel Capital. All rights reserved.
          </p>
          <p className="mt-1">
            Equiti #3591662 · Atlas Prime #6117251 · Combined AUM $31,693.27 ·
            Data as of 17 Apr 2026
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;