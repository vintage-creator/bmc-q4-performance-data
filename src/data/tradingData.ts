export interface Trade {
  ticket: string;
  openTime: string;
  type: 'buy' | 'sell';
  size: number;
  item: string;
  openPrice: number;
  closeTime: string;
  closePrice: number;
  profit: number;
  commission: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// ALL CLOSED TRADES
// Source: Equiti Brokerage (Seychelles) account #3591662
// Full history: 28 Jan 2026 – 17 Apr 2026
// ─────────────────────────────────────────────────────────────────────────────
export const trades: Trade[] = [
  // ── Jan/Feb · Cocoa H6 ───────────────────────────────────────────────────
  { ticket: "13763500", openTime: "2026.01.28 17:06:19", type: "buy",  size: 5.00, item: "uscocoah6", openPrice: 4104.3,  closeTime: "2026.02.06 16:13:39", closePrice: 4210.8,  profit:   532.50, commission:  -50.00 },
  { ticket: "13809543", openTime: "2026.01.29 16:13:00", type: "buy",  size: 5.00, item: "uscocoah6", openPrice: 4167.3,  closeTime: "2026.02.06 16:13:45", closePrice: 4213.6,  profit:   231.50, commission:  -50.00 },
  { ticket: "13845008", openTime: "2026.01.30 20:29:03", type: "buy",  size: 1.00, item: "palantir",  openPrice:  146.93, closeTime: "2026.01.30 20:29:16", closePrice:  146.93, profit:     0.00, commission:    0.00 },
  { ticket: "13845030", openTime: "2026.01.30 20:29:40", type: "buy",  size: 1.00, item: "uscocoah6", openPrice: 4212.2,  closeTime: "2026.02.06 16:13:53", closePrice: 4213.7,  profit:     1.50, commission:  -10.00 },
  { ticket: "13888134", openTime: "2026.02.03 13:48:28", type: "buy",  size: 5.00, item: "uscocoah6", openPrice: 4261.8,  closeTime: "2026.02.06 16:14:18", closePrice: 4204.9,  profit:  -284.50, commission:  -50.00 },
  { ticket: "13889643", openTime: "2026.02.03 16:20:23", type: "buy",  size: 5.00, item: "uscocoah6", openPrice: 4340.0,  closeTime: "2026.02.06 16:14:24", closePrice: 4204.9,  profit:  -675.50, commission:  -50.00 },

  // ── Feb · Cocoa K6 shorts ────────────────────────────────────────────────
  { ticket: "14107702", openTime: "2026.02.24 13:09:01", type: "sell", size: 3.00, item: "uscocoak6", openPrice: 2990.5,  closeTime: "2026.02.27 15:26:22", closePrice: 2938.1,  profit:   157.20, commission:  -30.00 },
  { ticket: "14107773", openTime: "2026.02.24 13:24:54", type: "sell", size: 3.00, item: "uscocoak6", openPrice: 2965.0,  closeTime: "2026.02.27 15:26:26", closePrice: 2938.3,  profit:    80.10, commission:  -30.00 },

  // ── Feb–Apr · Cocoa K6 longs (opened Q1, closed 8 Apr in Q2) ────────────
  { ticket: "13958902", openTime: "2026.02.09 17:41:49", type: "buy",  size: 2.00, item: "uscocoak6", openPrice: 4193.1,  closeTime: "2026.04.08 22:21:43", closePrice: 3191.8,  profit: -2002.60, commission:  -20.00 },
  { ticket: "13960715", openTime: "2026.02.09 20:29:24", type: "buy",  size: 2.00, item: "uscocoak6", openPrice: 4074.6,  closeTime: "2026.04.08 22:21:43", closePrice: 3191.8,  profit: -1765.60, commission:  -20.00 },
  { ticket: "14223218", openTime: "2026.03.06 16:12:40", type: "buy",  size: 1.00, item: "uscocoak6", openPrice: 3101.1,  closeTime: "2026.04.08 22:21:42", closePrice: 3191.8,  profit:    90.70, commission:  -10.00 },
  { ticket: "14261308", openTime: "2026.03.09 17:30:01", type: "buy",  size: 1.00, item: "uscocoak6", openPrice: 3252.1,  closeTime: "2026.04.08 22:21:42", closePrice: 3191.8,  profit:   -60.30, commission:  -10.00 },
  { ticket: "14107944", openTime: "2026.03.10 17:05:08", type: "buy",  size: 1.00, item: "uscocoak6", openPrice: 3353.2,  closeTime: "2026.04.08 22:21:43", closePrice: 3191.8,  profit:  -161.40, commission:  -10.00 },
  { ticket: "14670117", openTime: "2026.04.08 15:19:08", type: "buy",  size: 1.00, item: "uscocoak6", openPrice: 3153.6,  closeTime: "2026.04.08 22:21:43", closePrice: 3191.8,  profit:    38.20, commission:  -10.00 },
  { ticket: "14673014", openTime: "2026.04.08 16:18:33", type: "buy",  size: 1.00, item: "uscocoak6", openPrice: 3185.8,  closeTime: "2026.04.08 22:21:42", closePrice: 3191.8,  profit:     6.00, commission:  -10.00 },
  { ticket: "14658929", openTime: "2026.04.08 16:23:50", type: "buy",  size: 1.00, item: "uscocoak6", openPrice: 3202.2,  closeTime: "2026.04.08 22:21:43", closePrice: 3191.8,  profit:   -10.40, commission:  -10.00 },
  { ticket: "14673287", openTime: "2026.04.08 16:34:28", type: "buy",  size: 1.00, item: "uscocoak6", openPrice: 3232.8,  closeTime: "2026.04.08 22:21:43", closePrice: 3191.8,  profit:   -41.00, commission:  -10.00 },

  // ── Apr · EUR/JPY ────────────────────────────────────────────────────────
  { ticket: "14677240", openTime: "2026.04.09 04:50:32", type: "buy",  size: 1.30, item: "eurjpy.sd", openPrice: 185.224, closeTime: "2026.04.17 08:27:10", closePrice: 187.917, profit:  2195.29, commission:    0.00 },
  { ticket: "14676645", openTime: "2026.04.09 12:21:02", type: "buy",  size: 1.30, item: "eurjpy.sd", openPrice: 185.654, closeTime: "2026.04.14 07:29:01", closePrice: 187.202, profit:  1265.09, commission:    0.00 },
  { ticket: "14695457", openTime: "2026.04.10 12:19:19", type: "buy",  size: 1.30, item: "eurjpy.sd", openPrice: 186.349, closeTime: "2026.04.17 08:27:09", closePrice: 187.917, profit:  1278.21, commission:    0.00 },
  { ticket: "14706849", openTime: "2026.04.13 01:05:47", type: "buy",  size: 1.30, item: "eurjpy.sd", openPrice: 186.518, closeTime: "2026.04.17 08:27:06", closePrice: 187.917, profit:  1140.44, commission:    0.00 },
  { ticket: "14707030", openTime: "2026.04.13 18:41:12", type: "buy",  size: 3.90, item: "eurjpy.sd", openPrice: 187.045, closeTime: "2026.04.17 08:27:04", closePrice: 187.922, profit:  2144.70, commission:    0.00 },
  { ticket: "14720902", openTime: "2026.04.13 21:49:10", type: "buy",  size: 1.00, item: "eurjpy.sd", openPrice: 187.297, closeTime: "2026.04.17 08:27:02", closePrice: 187.923, profit:   392.53, commission:    0.00 },
  { ticket: "14726743", openTime: "2026.04.15 15:57:17", type: "buy",  size: 3.00, item: "eurjpy.sd", openPrice: 187.580, closeTime: "2026.04.17 08:27:00", closePrice: 187.922, profit:   643.35, commission:    0.00 },
  { ticket: "14759565", openTime: "2026.04.16 00:41:17", type: "buy",  size: 1.00, item: "eurjpy.sd", openPrice: 187.662, closeTime: "2026.04.17 08:26:57", closePrice: 187.921, profit:   162.40, commission:    0.00 },
  { ticket: "14731791", openTime: "2026.04.17 04:08:18", type: "buy",  size: 1.00, item: "eurjpy.sd", openPrice: 187.753, closeTime: "2026.04.17 08:26:59", closePrice: 187.921, profit:   105.34, commission:    0.00 },
];

// ─────────────────────────────────────────────────────────────────────────────
// Q1 OPEN TRADES SNAPSHOT
// Mark-to-market at 31 Mar 2026, cocoa K6 price 3267.9
// These 5 positions were open at Q1 close — they closed 8 Apr 2026 (Q2).
// Used for Q1 context display within the YTD view.
// ─────────────────────────────────────────────────────────────────────────────
export interface OpenTradeSnapshot {
  ticket: string; openTime: string; type: 'buy' | 'sell';
  size: number; item: string; openPrice: number;
  markPrice: number; floatingPnl: number; commission: number; snapshotDate: string;
}

export const openTradesQ1Snapshot: OpenTradeSnapshot[] = [
  { ticket: "13958902", openTime: "2026.02.09 17:41:49", type: "buy", size: 2.00, item: "uscocoak6", openPrice: 4193.1, markPrice: 3267.9, floatingPnl: -1850.40, commission: -20.00, snapshotDate: "2026.03.31" },
  { ticket: "13960715", openTime: "2026.02.09 20:29:24", type: "buy", size: 2.00, item: "uscocoak6", openPrice: 4074.6, markPrice: 3267.9, floatingPnl: -1613.40, commission: -20.00, snapshotDate: "2026.03.31" },
  { ticket: "14107944", openTime: "2026.03.10 17:05:08", type: "buy", size: 1.00, item: "uscocoak6", openPrice: 3353.2, markPrice: 3267.9, floatingPnl:   -85.30, commission: -10.00, snapshotDate: "2026.03.31" },
  { ticket: "14223218", openTime: "2026.03.06 16:12:40", type: "buy", size: 1.00, item: "uscocoak6", openPrice: 3101.1, markPrice: 3267.9, floatingPnl:   166.80, commission: -10.00, snapshotDate: "2026.03.31" },
  { ticket: "14261308", openTime: "2026.03.09 17:30:01", type: "buy", size: 1.00, item: "uscocoak6", openPrice: 3252.1, markPrice: 3267.9, floatingPnl:    15.80, commission: -10.00, snapshotDate: "2026.03.31" },
];

// ─────────────────────────────────────────────────────────────────────────────
// PERFORMANCE METRICS
//
// QTD = Q2 activity to date    (1 Apr – 20 Apr 2026)
// YTD = Full account history   (28 Jan – 20 Apr 2026, inception to date)
//
// Q1 metrics are stored separately for use in YTD quarter breakdown displays.
// They are NOT a toggle option — they surface as context within YTD.
//
// HIGH-WATER MARK: $25,032.92 — peak balance reached 17 Apr 2026 (Q2).
// ─────────────────────────────────────────────────────────────────────────────

// Q1 metrics — used internally by YTD quarter breakdown, not a toggle
export const performanceMetricsQ1 = {
  grossProfit:               841.30,
  grossLoss:                1068.50,
  totalNetProfit:           -227.20,
  profitFactor:               0.79,
  expectedPayoff:            -28.40,
  absoluteDrawdown:          404.50,
  maximalDrawdown:          1068.50,
  relativeDrawdown:            5.17,
  balance:                 19772.80,
  equity:                  16336.30,
  initialBalance:          20000.00,
  openingBalance:          20000.00,
  floatingPnl:             -3436.50,
  roi:                        -1.14,
  sharpeRatioMonthly:         -1.06,
  sharpeRatioAnnualized:      -3.66,
  riskFreeRate:                   4,
  riskFreeRateQuarterly:          1,
  riskFreeRateMonthly:         0.32,
  excessReturn:               -2.08,
  averageExcessReturn:        -0.69,
  standardDeviation:           0.66,
  variance:                   0.004,
  squaredDeviation:           0.009,
  alpha:                          0,
  highWaterMark:           20000.00,
  hurdleRate:                     8,
  markToMarketPrice:          3267.9,
  openTradesFloating:       -3436.50,
  margin:                    787.25,
  freeMargin:              15549.05,
};

export const performanceMetricsQTD = {
  grossProfit:             7327.96,
  grossLoss:               2242.30,
  totalNetProfit:          5085.66,
  profitFactor:               3.27,
  expectedPayoff:           423.81,
  absoluteDrawdown:        3468.17,
  maximalDrawdown:         3468.17,
  relativeDrawdown:          17.38,
  balance:                25032.92,
  equity:                 25032.92,
  initialBalance:         20000.00,
  openingBalance:         19948.17,
  roi:                       25.16,
  sharpeRatioMonthly:         0.72,
  sharpeRatioAnnualized:      2.50,
  riskFreeRate:                  4,
  excessReturn:              21.16,
  averageExcessReturn:        5.44,
  standardDeviation:         12.15,
  variance:                   1.48,
  alpha:                        25,
  highWaterMark:          25032.92,
  hurdleRate:                    8,
};

export const performanceMetricsYTD = {
  grossProfit:            10277.55,
  grossLoss:               5193.80,
  totalNetProfit:          5083.75,
  profitFactor:               1.98,
  expectedPayoff:           195.53,
  absoluteDrawdown:        4243.60,
  maximalDrawdown:         4907.60,
  relativeDrawdown:          23.75,
  balance:                25032.92,
  equity:                 25032.92,
  initialBalance:         20000.00,
  openingBalance:         20000.00,
  roi:                       25.16,
  sharpeRatioMonthly:         0.58,
  sharpeRatioAnnualized:      2.00,
  riskFreeRate:                  4,
  excessReturn:              21.16,
  averageExcessReturn:        7.52,
  standardDeviation:         14.39,
  variance:                   2.07,
  alpha:                        28,
  highWaterMark:          25032.92,
  hurdleRate:                    8,
};

export const performanceMetrics = performanceMetricsYTD;

// ─────────────────────────────────────────────────────────────────────────────
// TRADE STATISTICS
// ─────────────────────────────────────────────────────────────────────────────

// Q1 stats — used internally for YTD quarter breakdown display
export const tradeStatisticsQ1 = {
  totalTrades:              8,
  longPositions:            6,
  shortPositions:           2,
  longWinRate:            50.00,
  shortWinRate:          100.00,
  profitTrades:             5,
  profitTradesPercent:    62.50,
  lossTrades:               3,
  lossTradesPercent:      37.50,
  largestProfitTrade:     532.50,
  largestLossTrade:      -725.50,
  averageProfitTrade:     168.26,
  averageLossTrade:      -356.17,
  maxConsecutiveWins:       3,
  maxConsecutiveLosses:     3,
  avgConsecutiveWins:       3,
  avgConsecutiveLosses:     3,
};

export const tradeStatisticsQTD = {
  totalTrades:             12,
  longPositions:           12,
  shortPositions:           0,
  longWinRate:            75.00,
  shortWinRate:            0.00,
  profitTrades:             9,
  profitTradesPercent:    75.00,
  lossTrades:               3,
  lossTradesPercent:      25.00,
  largestProfitTrade:    2195.29,
  largestLossTrade:        -41.00,
  averageProfitTrade:      813.11,
  averageLossTrade:        -37.60,
  maxConsecutiveWins:       9,
  maxConsecutiveLosses:     2,
  avgConsecutiveWins:       4,
  avgConsecutiveLosses:     1,
};

export const tradeStatisticsYTD = {
  totalTrades:             26,
  longPositions:           24,
  shortPositions:           2,
  longWinRate:            58.33,
  shortWinRate:          100.00,
  profitTrades:            16,
  profitTradesPercent:    61.54,
  lossTrades:              10,
  lossTradesPercent:      38.46,
  largestProfitTrade:    2195.29,
  largestLossTrade:     -2002.60,
  averageProfitTrade:     642.35,
  averageLossTrade:      -519.38,
  maxConsecutiveWins:       9,
  maxConsecutiveLosses:     6,
  avgConsecutiveWins:       4,
  avgConsecutiveLosses:     3,
};

export const tradeStatistics = tradeStatisticsYTD;

// ─────────────────────────────────────────────────────────────────────────────
// MONTHLY P&L BREAKDOWN
// Used by MonthlyPnLChart. Each row belongs to a quarter for grouping.
// gross = before commission  |  netTotal = after commission
// ─────────────────────────────────────────────────────────────────────────────

export interface MonthlyPnLRow {
  month:    string;
  quarter:  "Q1" | "Q2";   // which quarter this month falls in
  cocoa:    number;
  eurjpy:   number;
  other:    number;
  total:    number;          // gross
  netTotal: number;          // after commission
  trades:   number;
}

export const monthlyPnL: MonthlyPnLRow[] = [
  {
    // H6 closes Feb 6 (gross −194.50, comm −210) + K6 shorts Feb 27 (gross +237.30, comm −60)
    // Combined: gross +42.80 | commission −270.00 | net −227.20 ✓ matches Q1 statement
    month: "Feb 2026", quarter: "Q1",
    cocoa: 42.80, eurjpy: 0, other: 0, total: 42.80, netTotal: -227.20, trades: 8,
  },
  {
    // No closes in March — 5 K6 longs held open, floating loss −3,436.50
    month: "Mar 2026", quarter: "Q1",
    cocoa: 0, eurjpy: 0, other: 0, total: 0, netTotal: 0, trades: 0,
  },
  {
    // Apr 8: K6 longs closed (gross −3,858.10, comm −80) + EUR/JPY Apr 9–17 (gross +9,327.35, comm 0)
    month: "Apr 2026", quarter: "Q2",
    cocoa: -3858.10, eurjpy: 9327.35, other: 0, total: 5469.25, netTotal: 5389.25, trades: 18,
  },
];

// Quarter summary — derived from monthlyPnL for the quarter breakdown panel
export interface QuarterSummary {
  quarter:  "Q1" | "Q2";
  label:    string;
  dateRange: string;
  netTotal: number;
  trades:   number;
  note?:    string;
}

export const quarterSummaries: QuarterSummary[] = [
  {
    quarter:  "Q1",
    label:    "Q1 2026",
    dateRange: "28 Jan – 31 Mar 2026",
    netTotal: -227.20,
    trades:   8,
    note: "5 positions carried forward into Q2 with −$3,436.50 floating loss at quarter close",
  },
  {
    quarter:  "Q2",
    label:    "Q2 2026 (to date)",
    dateRange: "1 Apr – 20 Apr 2026",
    netTotal: 5389.25,
    trades:   18,
    note: "Includes resolution of Q1 carry-forward positions (closed 8 Apr) and EUR/JPY run",
  },
];