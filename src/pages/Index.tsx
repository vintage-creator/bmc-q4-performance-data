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
import { MetricCard } from "@/components/TradingDashboard/MetricCard";
import { ROIChart } from "@/components/TradingDashboard/ROIChart";
import { TradeDistribution } from "@/components/TradingDashboard/TradeDistribution";
import { TradeHistory } from "@/components/TradingDashboard/TradeHistory";
import { RiskMetricsGauge } from "@/components/TradingDashboard/RiskMetricsGauge";
import { BenchmarkComparison } from "@/components/TradingDashboard/BenchmarkComparison";
import { InsightsTips } from "@/components/TradingDashboard/InsightsTips";
import { PeriodToggle } from "@/components/TradingDashboard/PeriodToggle";
import { TradeStatsCard } from "@/components/TradingDashboard/TradeStatsCard";
import { MonthlyPnLChart } from "@/components/TradingDashboard/MonthlyPnLChart";
import {
  performanceMetricsQTD,
  performanceMetricsYTD,
  tradeStatisticsQTD,
  tradeStatisticsYTD,
} from "@/data/tradingData";

const Index = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<"QTD" | "YTD">("QTD");

  const performanceMetrics =
    selectedPeriod === "QTD" ? performanceMetricsQTD : performanceMetricsYTD;
  const tradeStatistics =
    selectedPeriod === "QTD" ? tradeStatisticsQTD : tradeStatisticsYTD;

  const recipient = "Mr. Farouk Bernaoui";
  const clientSharePercent = 0.6;
  const rawProfit = Number(performanceMetrics.totalNetProfit) || 0;
  const clientTakeHome = rawProfit * clientSharePercent;

  const fmtMoney = (n: number) =>
    n.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const periodLabel =
    selectedPeriod === "QTD" ? "1 Apr – 20 Apr 2026" : "28 Jan – 20 Apr 2026";

  const percentText = `${Math.round(clientSharePercent * 100)}%`;
  const rawProfitFormatted = fmtMoney(rawProfit);
  const takeHomeFormatted = fmtMoney(clientTakeHome);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
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
            <span className="text-sm font-medium text-primary">Proprietary Data</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-10">
        {/* ── Confidentiality alert ──────────────────────────────────────── */}
        <Alert className="bg-warning/10 border-warning/50">
          <AlertCircle className="h-4 w-4 text-warning" />
          <AlertDescription className="text-foreground">
            <strong>Confidential:</strong> This trading data is proprietary information of Blue Marvel Capital.
            Unauthorised distribution or reproduction is prohibited.
          </AlertDescription>
        </Alert>

        {/* ── Page heading + period toggle ──────────────────────────────── */}
        <div>
          <div className="text-center mb-4">
            <p className="text-muted-foreground">
              Personalised performance report —{" "}
              <span className="font-bold text-foreground">{recipient}</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">Account #3591662 · {periodLabel}</p>
          </div>
          <PeriodToggle selectedPeriod={selectedPeriod} onToggle={setSelectedPeriod} />
        </div>

        {/* ── Capital overview ──────────────────────────────────────────── */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <MetricCard
              title="Initial deposit"
              value={`$${fmtMoney(performanceMetrics.initialBalance)}`}
              subtitle="Capital deployed"
              icon={DollarSign}
              trend="neutral"
            />
            <MetricCard
              title="Current balance"
              value={`$${fmtMoney(performanceMetrics.balance)}`}
              subtitle={`Net P&L: +$${fmtMoney(performanceMetrics.totalNetProfit)}`}
              icon={DollarSign}
              trend="up"
            />
            <MetricCard
              title="Total return"
              value={`${performanceMetrics.roi}%`}
              subtitle={`On $${(performanceMetrics.initialBalance / 1000).toFixed(0)}k initial deposit`}
              icon={TrendingUp}
              trend="up"
            />
          </div>
        </section>

        {/* ── Client take-home summary ─────────────────────────────────── */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="w-full max-w-3xl"
          >
            <Card className="relative border-2 border-primary/30 shadow-2xl bg-gradient-to-br from-card via-card to-primary/10">
              <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent px-6 py-4 border-b border-primary/20">
                <div className="flex items-center justify-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Target className="w-5 h-5 text-primary" />
                  </motion.div>
                  <span className="text-sm font-bold uppercase tracking-widest text-primary">
                    Client Summary
                  </span>
                  <Badge variant="secondary" className="ml-2">
                    {percentText} Share
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6 sm:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-center lg:text-left min-w-0"
                  >
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
                      Prepared for
                    </p>
                    <h3 className="text-xl font-bold text-foreground break-words">
                      {recipient}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-2">
                      QTD / YTD Performance Report
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center justify-center"
                  >
                    <div className="w-full max-w-xs rounded-2xl border-2 border-green-500/30 bg-gradient-to-br from-green-500/15 via-emerald-500/10 to-green-600/5 p-5 text-center shadow-lg shadow-green-500/10">
                      <p className="text-xs font-semibold text-green-400 uppercase tracking-widest mb-2">
                        Your Take-Home
                      </p>

                      <div className="flex items-center justify-center gap-3">
                        <motion.div
                          animate={{
                            scale: [1, 1.12, 1],
                            boxShadow: [
                              "0 0 0 0 rgba(34, 197, 94, 0.18)",
                              "0 0 0 10px rgba(34, 197, 94, 0)",
                              "0 0 0 0 rgba(34, 197, 94, 0)",
                            ],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-12 h-12 rounded-full bg-green-500/25 flex items-center justify-center shrink-0"
                        >
                          <DollarSign className="w-6 h-6 text-green-500" />
                        </motion.div>

                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.7 }}
                          className="text-2xl sm:text-3xl md:text-3xl font-extrabold text-green-600 break-words"
                        >
                          ${takeHomeFormatted}
                        </motion.p>
                      </div>

                      <p className="mt-3 text-xs text-muted-foreground font-mono bg-background/0 rounded-md py-2 px-3 inline-block break-words">
                        ${rawProfitFormatted} × {percentText} = ${takeHomeFormatted}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-center lg:text-right min-w-0"
                  >
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
                      Total Profit Generated
                    </p>
                    <p className="text-2xl font-bold text-foreground break-words">
                      ${rawProfitFormatted}
                    </p>
                    <div className="flex items-center justify-center lg:justify-end gap-2 mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-500 font-medium">
                        +{performanceMetrics.roi}%
                      </span>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* ── Performance summary ───────────────────────────────────────── */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Performance summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <MetricCard
              title="Total net profit"
              value={`$${fmtMoney(performanceMetrics.totalNetProfit)}`}
              subtitle={periodLabel}
              icon={DollarSign}
              trend="up"
              tooltip={`Total profit after all commissions and fees for ${selectedPeriod}.`}
              delay={0.1}
            />
            <MetricCard
              title="Sharpe ratio"
              value={performanceMetrics.sharpeRatioAnnualized.toFixed(2)}
              subtitle={`Annualised · monthly: ${performanceMetrics.sharpeRatioMonthly}`}
              icon={Gauge}
              trend="up"
              tooltip="Risk-adjusted return. Above 2.0 is considered outstanding. Calculated against the 4% US T-Bill risk-free rate."
              delay={0.2}
            />
            <MetricCard
              title="Alpha"
              value={`${performanceMetrics.alpha}%`}
              subtitle={`vs ${performanceMetrics.hurdleRate}% hurdle rate`}
              icon={LineChart}
              trend="up"
              tooltip="Alpha measures outperformance relative to the hurdle rate. Positive alpha confirms active management value."
              delay={0.3}
            />
            <MetricCard
              title="Win rate"
              value={`${tradeStatistics.profitTradesPercent}%`}
              subtitle={`${tradeStatistics.profitTrades} of ${tradeStatistics.totalTrades} trades`}
              icon={Target}
              trend="up"
              tooltip="Percentage of profitable trades. Industry average is 40–60%."
              delay={0.4}
            />
          </div>
        </section>

        {/* ── Performance analysis charts ───────────────────────────────── */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <LineChart className="w-5 h-5 text-primary" />
            Performance analysis
          </h2>
          <div className="space-y-6">
            <ROIChart period={selectedPeriod} />
          </div>
        </section>

        {/* ── Monthly P&L breakdown ─────────────────────────────────────── */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-primary" />
            Monthly P&amp;L breakdown
          </h2>
          <MonthlyPnLChart period={selectedPeriod} />
        </section>

        {/* ── Trade metrics ─────────────────────────────────────────────── */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Trade metrics
          </h2>
          <div className="space-y-6">
            <TradeDistribution period={selectedPeriod} />
            <TradeStatsCard period={selectedPeriod} />
          </div>
        </section>

        {/* ── Risk assessment ───────────────────────────────────────────── */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Risk assessment
          </h2>
          <RiskMetricsGauge period={selectedPeriod} />
        </section>

        {/* ── Benchmark comparison ──────────────────────────────────────── */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Benchmark comparison
          </h2>
          <BenchmarkComparison period={selectedPeriod} />
        </section>

        {/* ── Detailed metrics grid ─────────────────────────────────────── */}
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
              trend="up"
              tooltip="Ratio of gross profit to gross loss. Above 2.0 is excellent."
              delay={0.1}
            />
            <MetricCard
              title="Std deviation"
              value={`${performanceMetrics.standardDeviation.toFixed(2)}%`}
              subtitle="Portfolio volatility"
              icon={BarChart3}
              trend="neutral"
              tooltip="Standard deviation of returns. Lower volatility with high returns indicates efficient risk management."
              delay={0.2}
            />
            <MetricCard
              title="Avg loss"
              value={`$${Math.abs(tradeStatistics.averageLossTrade).toFixed(2)}`}
              subtitle="Per losing trade"
              icon={Activity}
              trend="down"
              tooltip="Average loss per losing trade. Smaller losses indicate good risk management."
              delay={0.3}
            />
            <MetricCard
              title="Risk-free rate"
              value={`${performanceMetrics.riskFreeRate}%`}
              subtitle="US T-Bill (3 month)"
              icon={BarChart3}
              trend="neutral"
              tooltip="Baseline risk-free rate used for Sharpe ratio calculation."
              delay={0.4}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <MetricCard
              title="High-water mark"
              value={`$${fmtMoney(performanceMetrics.highWaterMark)}`}
              subtitle="Peak balance reached (17 Apr)"
              icon={TrendingUp}
              trend="up"
              tooltip="The highest account balance achieved — $25,032.92 on 17 Apr 2026 after the EUR/JPY run completed."
              delay={0.1}
            />
            <MetricCard
              title="Hurdle rate"
              value={`${performanceMetrics.hurdleRate}%`}
              subtitle="Minimum target return"
              icon={Target}
              trend="neutral"
              tooltip="The minimum return threshold that must be exceeded before performance fees apply."
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
              subtitle={`${selectedPeriod} · {periodLabel}`}
              icon={BarChart3}
              trend="neutral"
              tooltip="Total number of closed positions for the selected period."
              delay={0.4}
            />
          </div>
        </section>

        {/* ── Insights ──────────────────────────────────────────────────── */}
        <section>
          <InsightsTips period={selectedPeriod} />
        </section>

        {/* ── Trade history ─────────────────────────────────────────────── */}
        <section>
          <TradeHistory period={selectedPeriod} />
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Blue Marvel Capital. All rights reserved.</p>
          <p className="mt-1">
            Account #3591662 · Equiti Brokerage (Seychelles) Limited · Data as of 17 Apr 2026
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;