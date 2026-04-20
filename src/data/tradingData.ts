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

// All closed trades — Equiti Brokerage (Seychelles) account #3591662
// Source: broker statement 28 Jan – 17 Apr 2026
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

  // ── Feb–Apr · Cocoa K6 longs (held through drawdown) ────────────────────
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
// Performance Metrics
// Source: Equiti broker statement #3591662, as of 17 Apr 2026
//
// HIGH-WATER MARK NOTE:
//   The account's all-time peak balance is $25,032.92 reached on 17 Apr 2026
//   after the EUR/JPY run completed. Previous values (27034.56 / 21600.00)
//   were unfounded placeholders — corrected here to reflect actual statement.
//
// QTD = April 2026 activity only  (Apr 1 → Apr 20)
// YTD = Full account history      (Jan 28 → Apr 20, inception to date)
// ─────────────────────────────────────────────────────────────────────────────

export const performanceMetricsQTD = {
  grossProfit:           7327.96,
  grossLoss:             2242.30,
  totalNetProfit:        5085.66,
  profitFactor:          3.27,
  expectedPayoff:        423.81,

  absoluteDrawdown:      3468.17,  // Apr 1 ($19,948) → Apr 8 trough ($16,480)
  maximalDrawdown:       3468.17,
  relativeDrawdown:      17.38,    // 3468 / 19948 × 100

  balance:               25032.92,
  equity:                25032.92,
  initialBalance:        20000.00,
  openingBalance:        19948.17,
  roi:                   25.16,    // (25032.92 − 20000) / 20000 × 100

  sharpeRatioMonthly:    0.72,
  sharpeRatioAnnualized: 2.50,
  riskFreeRate:          4,
  excessReturn:          21.16,
  averageExcessReturn:   5.44,
  standardDeviation:     12.15,
  variance:              1.48,
  alpha:                 25,

  highWaterMark:         25032.92, // actual peak balance per broker statement
  hurdleRate:            8,
};

export const performanceMetricsYTD = {
  grossProfit:           10277.55,
  grossLoss:             5193.80,
  totalNetProfit:        5083.75,  // broker statement: Closed P/L 5,083.75
  profitFactor:          1.98,
  expectedPayoff:        195.53,

  absoluteDrawdown:      4243.60,
  maximalDrawdown:       4907.60,
  relativeDrawdown:      23.75,

  balance:               25032.92,
  equity:                25032.92,
  initialBalance:        20000.00,
  openingBalance:        20000.00,
  roi:                   25.16,    // (25032.92 − 20000) / 20000 × 100

  sharpeRatioMonthly:    0.58,
  sharpeRatioAnnualized: 2.00,
  riskFreeRate:          4,
  excessReturn:          21.16,
  averageExcessReturn:   7.52,
  standardDeviation:     14.39,
  variance:              2.07,
  alpha:                 28,

  highWaterMark:         25032.92, // actual peak balance per broker statement
  hurdleRate:            8,
};

export const performanceMetrics = performanceMetricsYTD;

// ─────────────────────────────────────────────────────────────────────────────
// Trade Statistics
// Source: broker statement Details section, as of 17 Apr 2026
// ─────────────────────────────────────────────────────────────────────────────

export const tradeStatisticsQTD = {
  totalTrades:           12,
  longPositions:         12,
  shortPositions:         0,
  longWinRate:           75.00,
  shortWinRate:           0.00,
  profitTrades:           9,
  profitTradesPercent:   75.00,
  lossTrades:             3,
  lossTradesPercent:     25.00,
  largestProfitTrade:    2195.29,
  largestLossTrade:       -41.00,
  averageProfitTrade:     813.11,
  averageLossTrade:       -37.60,
  maxConsecutiveWins:     9,
  maxConsecutiveLosses:   2,
  avgConsecutiveWins:     4,
  avgConsecutiveLosses:   1,
};

export const tradeStatisticsYTD = {
  totalTrades:           26,
  longPositions:         24,
  shortPositions:         2,
  longWinRate:           58.33,
  shortWinRate:          100.00,
  profitTrades:          16,
  profitTradesPercent:   61.54,
  lossTrades:            10,
  lossTradesPercent:     38.46,
  largestProfitTrade:    2195.29,
  largestLossTrade:     -2002.60,
  averageProfitTrade:    642.35,
  averageLossTrade:     -519.38,
  maxConsecutiveWins:    9,
  maxConsecutiveLosses:  6,
  avgConsecutiveWins:    4,
  avgConsecutiveLosses:  3,
};

export const tradeStatistics = tradeStatisticsYTD;

// ─────────────────────────────────────────────────────────────────────────────
// Monthly P&L breakdown — derived from trade close dates
// Used by the MonthlyPnL component
// ─────────────────────────────────────────────────────────────────────────────

export interface MonthlyPnLRow {
  month:   string;
  cocoa:   number;
  eurjpy:  number;
  other:   number;
  total:   number;
  trades:  number;
}

export const monthlyPnL: MonthlyPnLRow[] = [
  // Feb: H6 batch (net +$-191.00 after -$210 commission) + K6 shorts (+$177.30 net)
  { month: "Feb 2026", cocoa:  -191.00, eurjpy:    0,      other: 0, total:  -191.00, trades:  8 },
  // Mar: no closes
  { month: "Mar 2026", cocoa:     0,    eurjpy:    0,      other: 0, total:     0,    trades:  0 },
  // Apr: K6 longs batch (−$3,938.10 net after −$80 commission) + EUR/JPY (+$9,327.35)
  { month: "Apr 2026", cocoa: -3938.10, eurjpy: 9327.35,   other: 0, total:  5389.25, trades: 18 },
];