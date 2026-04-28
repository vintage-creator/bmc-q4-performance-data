import { useState } from "react";

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
  swap?: number;
  account?: 'equiti' | 'atlas';
}

// ─────────────────────────────────────────────────────────────────────────────
// EQUITI TRADES (account #3591662)
// Full history: 28 Jan 2026 – 17 Apr 2026
// ─────────────────────────────────────────────────────────────────────────────
export const equitiTrades: Trade[] = [
  // ── Jan/Feb · Cocoa H6 ───────────────────────────────────────────────────
  { ticket: "13763500", openTime: "2026.01.28 17:06:19", type: "buy",  size: 5.00, item: "uscocoah6", openPrice: 4104.3,  closeTime: "2026.02.06 16:13:39", closePrice: 4210.8,  profit:   532.50, commission:  -50.00, account: 'equiti' },
  { ticket: "13809543", openTime: "2026.01.29 16:13:00", type: "buy",  size: 5.00, item: "uscocoah6", openPrice: 4167.3,  closeTime: "2026.02.06 16:13:45", closePrice: 4213.6,  profit:   231.50, commission:  -50.00, account: 'equiti' },
  { ticket: "13845008", openTime: "2026.01.30 20:29:03", type: "buy",  size: 1.00, item: "palantir",  openPrice:  146.93, closeTime: "2026.01.30 20:29:16", closePrice:  146.93, profit:     0.00, commission:    0.00, account: 'equiti' },
  { ticket: "13845030", openTime: "2026.01.30 20:29:40", type: "buy",  size: 1.00, item: "uscocoah6", openPrice: 4212.2,  closeTime: "2026.02.06 16:13:53", closePrice: 4213.7,  profit:     1.50, commission:  -10.00, account: 'equiti' },
  { ticket: "13888134", openTime: "2026.02.03 13:48:28", type: "buy",  size: 5.00, item: "uscocoah6", openPrice: 4261.8,  closeTime: "2026.02.06 16:14:18", closePrice: 4204.9,  profit:  -284.50, commission:  -50.00, account: 'equiti' },
  { ticket: "13889643", openTime: "2026.02.03 16:20:23", type: "buy",  size: 5.00, item: "uscocoah6", openPrice: 4340.0,  closeTime: "2026.02.06 16:14:24", closePrice: 4204.9,  profit:  -675.50, commission:  -50.00, account: 'equiti' },

  // ── Feb · Cocoa K6 shorts ────────────────────────────────────────────────
  { ticket: "14107702", openTime: "2026.02.24 13:09:01", type: "sell", size: 3.00, item: "uscocoak6", openPrice: 2990.5,  closeTime: "2026.02.27 15:26:22", closePrice: 2938.1,  profit:   157.20, commission:  -30.00, account: 'equiti' },
  { ticket: "14107773", openTime: "2026.02.24 13:24:54", type: "sell", size: 3.00, item: "uscocoak6", openPrice: 2965.0,  closeTime: "2026.02.27 15:26:26", closePrice: 2938.3,  profit:    80.10, commission:  -30.00, account: 'equiti' },

  // ── Feb–Apr · Cocoa K6 longs (opened Q1, closed 8 Apr in Q2) ────────────
  { ticket: "13958902", openTime: "2026.02.09 17:41:49", type: "buy",  size: 2.00, item: "uscocoak6", openPrice: 4193.1,  closeTime: "2026.04.08 22:21:43", closePrice: 3191.8,  profit: -2002.60, commission:  -20.00, account: 'equiti' },
  { ticket: "13960715", openTime: "2026.02.09 20:29:24", type: "buy",  size: 2.00, item: "uscocoak6", openPrice: 4074.6,  closeTime: "2026.04.08 22:21:43", closePrice: 3191.8,  profit: -1765.60, commission:  -20.00, account: 'equiti' },
  { ticket: "14223218", openTime: "2026.03.06 16:12:40", type: "buy",  size: 1.00, item: "uscocoak6", openPrice: 3101.1,  closeTime: "2026.04.08 22:21:42", closePrice: 3191.8,  profit:    90.70, commission:  -10.00, account: 'equiti' },
  { ticket: "14261308", openTime: "2026.03.09 17:30:01", type: "buy",  size: 1.00, item: "uscocoak6", openPrice: 3252.1,  closeTime: "2026.04.08 22:21:42", closePrice: 3191.8,  profit:   -60.30, commission:  -10.00, account: 'equiti' },
  { ticket: "14107944", openTime: "2026.03.10 17:05:08", type: "buy",  size: 1.00, item: "uscocoak6", openPrice: 3353.2,  closeTime: "2026.04.08 22:21:43", closePrice: 3191.8,  profit:  -161.40, commission:  -10.00, account: 'equiti' },
  { ticket: "14670117", openTime: "2026.04.08 15:19:08", type: "buy",  size: 1.00, item: "uscocoak6", openPrice: 3153.6,  closeTime: "2026.04.08 22:21:43", closePrice: 3191.8,  profit:    38.20, commission:  -10.00, account: 'equiti' },
  { ticket: "14673014", openTime: "2026.04.08 16:18:33", type: "buy",  size: 1.00, item: "uscocoak6", openPrice: 3185.8,  closeTime: "2026.04.08 22:21:42", closePrice: 3191.8,  profit:     6.00, commission:  -10.00, account: 'equiti' },
  { ticket: "14658929", openTime: "2026.04.08 16:23:50", type: "buy",  size: 1.00, item: "uscocoak6", openPrice: 3202.2,  closeTime: "2026.04.08 22:21:43", closePrice: 3191.8,  profit:   -10.40, commission:  -10.00, account: 'equiti' },
  { ticket: "14673287", openTime: "2026.04.08 16:34:28", type: "buy",  size: 1.00, item: "uscocoak6", openPrice: 3232.8,  closeTime: "2026.04.08 22:21:43", closePrice: 3191.8,  profit:   -41.00, commission:  -10.00, account: 'equiti' },

  // ── Apr · EUR/JPY ────────────────────────────────────────────────────────
  { ticket: "14677240", openTime: "2026.04.09 04:50:32", type: "buy",  size: 1.30, item: "eurjpy.sd", openPrice: 185.224, closeTime: "2026.04.17 08:27:10", closePrice: 187.917, profit:  2195.29, commission:    0.00, account: 'equiti' },
  { ticket: "14676645", openTime: "2026.04.09 12:21:02", type: "buy",  size: 1.30, item: "eurjpy.sd", openPrice: 185.654, closeTime: "2026.04.14 07:29:01", closePrice: 187.202, profit:  1265.09, commission:    0.00, account: 'equiti' },
  { ticket: "14695457", openTime: "2026.04.10 12:19:19", type: "buy",  size: 1.30, item: "eurjpy.sd", openPrice: 186.349, closeTime: "2026.04.17 08:27:09", closePrice: 187.917, profit:  1278.21, commission:    0.00, account: 'equiti' },
  { ticket: "14706849", openTime: "2026.04.13 01:05:47", type: "buy",  size: 1.30, item: "eurjpy.sd", openPrice: 186.518, closeTime: "2026.04.17 08:27:06", closePrice: 187.917, profit:  1140.44, commission:    0.00, account: 'equiti' },
  { ticket: "14707030", openTime: "2026.04.13 18:41:12", type: "buy",  size: 3.90, item: "eurjpy.sd", openPrice: 187.045, closeTime: "2026.04.17 08:27:04", closePrice: 187.922, profit:  2144.70, commission:    0.00, account: 'equiti' },
  { ticket: "14720902", openTime: "2026.04.13 21:49:10", type: "buy",  size: 1.00, item: "eurjpy.sd", openPrice: 187.297, closeTime: "2026.04.17 08:27:02", closePrice: 187.923, profit:   392.53, commission:    0.00, account: 'equiti' },
  { ticket: "14726743", openTime: "2026.04.15 15:57:17", type: "buy",  size: 3.00, item: "eurjpy.sd", openPrice: 187.580, closeTime: "2026.04.17 08:27:00", closePrice: 187.922, profit:   643.35, commission:    0.00, account: 'equiti' },
  { ticket: "14759565", openTime: "2026.04.16 00:41:17", type: "buy",  size: 1.00, item: "eurjpy.sd", openPrice: 187.662, closeTime: "2026.04.17 08:26:57", closePrice: 187.921, profit:   162.40, commission:    0.00, account: 'equiti' },
  { ticket: "14731791", openTime: "2026.04.17 04:08:18", type: "buy",  size: 1.00, item: "eurjpy.sd", openPrice: 187.753, closeTime: "2026.04.17 08:26:59", closePrice: 187.921, profit:   105.34, commission:    0.00, account: 'equiti' },
];

// ─────────────────────────────────────────────────────────────────────────────
// ATLAS PRIME TRADES (account #6117251)
// Blue Marvel Capital Strategies - FZCO
// All EUR/JPY buys · opened Mar–Apr 2026 · all closed 17 Apr 2026
// Net deposits: $4,000.48 (after $3,500 + $500 + $600 deposits, -$599.52 withdrawal)
// ─────────────────────────────────────────────────────────────────────────────
export const atlasTrades: Trade[] = [
  { ticket: "1839931",  openTime: "2026.03.03 12:33:44", type: "buy", size: 0.01, item: "EURJPY", openPrice: 183.053, closeTime: "2026.04.17 08:13:26", closePrice: 187.895, profit:  30.36, commission: 0.00, swap: 0.49,  account: 'atlas' },
  { ticket: "1983885",  openTime: "2026.03.30 01:31:47", type: "buy", size: 0.13, item: "EURJPY", openPrice: 184.371, closeTime: "2026.04.17 08:13:22", closePrice: 187.894, profit: 287.19, commission: 0.00, swap: 4.68,  account: 'atlas' },
  { ticket: "2051364",  openTime: "2026.04.07 15:05:44", type: "buy", size: 0.13, item: "EURJPY", openPrice: 184.808, closeTime: "2026.04.17 08:13:17", closePrice: 187.898, profit: 251.89, commission: 0.00, swap: 3.41,  account: 'atlas' },
  { ticket: "1989814",  openTime: "2026.04.07 17:30:48", type: "buy", size: 0.13, item: "EURJPY", openPrice: 185.014, closeTime: "2026.04.17 08:13:20", closePrice: 187.896, profit: 234.93, commission: 0.00, swap: 3.41,  account: 'atlas' },
  { ticket: "1982372",  openTime: "2026.04.08 02:46:44", type: "buy", size: 0.13, item: "EURJPY", openPrice: 185.560, closeTime: "2026.04.17 08:13:24", closePrice: 187.895, profit: 190.35, commission: 0.00, swap: 3.13,  account: 'atlas' },
  { ticket: "1991962",  openTime: "2026.04.09 17:58:25", type: "buy", size: 0.50, item: "EURJPY", openPrice: 186.044, closeTime: "2026.04.17 08:13:18", closePrice: 187.897, profit: 580.97, commission: 0.00, swap: 8.77,  account: 'atlas' },
  { ticket: "2082325",  openTime: "2026.04.13 01:04:49", type: "buy", size: 0.13, item: "EURJPY", openPrice: 186.518, closeTime: "2026.04.17 08:13:15", closePrice: 187.897, profit: 112.41, commission: 0.00, swap: 1.71,  account: 'atlas' },
  { ticket: "2082351",  openTime: "2026.04.13 18:41:12", type: "buy", size: 1.00, item: "EURJPY", openPrice: 187.044, closeTime: "2026.04.17 08:13:13", closePrice: 187.897, profit: 534.88, commission: 0.00, swap: 13.16, account: 'atlas' },
  { ticket: "2089695",  openTime: "2026.04.13 21:49:11", type: "buy", size: 0.50, item: "EURJPY", openPrice: 187.302, closeTime: "2026.04.17 08:13:08", closePrice: 187.897, profit: 186.55, commission: 0.00, swap: 6.58,  account: 'atlas' },
  { ticket: "2089478",  openTime: "2026.04.15 15:57:19", type: "buy", size: 1.00, item: "EURJPY", openPrice: 187.584, closeTime: "2026.04.17 08:13:11", closePrice: 187.897, profit: 196.27, commission: 0.00, swap: 8.73,  account: 'atlas' },
];

// Combined all trades
export const trades: Trade[] = [...equitiTrades, ...atlasTrades];

// ─────────────────────────────────────────────────────────────────────────────
// Q1 OPEN TRADES SNAPSHOT (Equiti only)
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
// PERFORMANCE METRICS — EQUITI (unchanged)
// ─────────────────────────────────────────────────────────────────────────────
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
  riskFreeRate:                   4,
  riskFreeRateQuarterly:          1,
  riskFreeRateMonthly:         0.333,
  excessReturn:               -2.14,
  averageExcessReturn:        -1.07,
  standardDeviation:           0.66,
  variance:                   0.004,
  sharpeRatioMonthly:         -1.62,
  sharpeRatioAnnualized:      -5.61,
  alpha:                          0,
  highWaterMark:           21600.00,
  hurdleRate:                     8,
  markToMarketPrice:          3267.9,
  openTradesFloating:       -3436.50,
  margin:                    787.25,
  freeMargin:              15549.05,
};

export const performanceMetricsQ2 = {
  grossProfit:             9436.25,
  grossLoss:               4125.30,
  totalNetProfit:          5032.92,
  profitFactor:               2.29,
  expectedPayoff:           295.05,
  absoluteDrawdown:        4016.40,
  maximalDrawdown:         4097.10,
  relativeDrawdown:          20.67,
  balance:                25032.92,
  equity:                 25032.92,
  initialBalance:         20000.00,
  openingBalance:         19741.47,
  roi:                       25.16,
  riskFreeRate:                  4,
  riskFreeRateQuarterly:         1,
  riskFreeRateMonthly:        0.333,
  excessReturn:              24.16,
  averageExcessReturn:        5.44,
  standardDeviation:         12.15,
  variance:                   1.48,
  sharpeRatioMonthly:         0.45,
  sharpeRatioAnnualized:      1.56,
  alpha:                      24.16,
  highWaterMark:           21600.00,
  hurdleRate:                    8,
};

export const performanceMetricsYTD = {
  grossProfit:            10277.55,
  grossLoss:               5193.80,
  totalNetProfit:          5032.92,
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
  riskFreeRate:                  4,
  riskFreeRateQuarterly:         1,
  riskFreeRateYTD:               2,
  riskFreeRateMonthly:        0.333,
  excessReturn:              23.16,
  averageExcessReturn:        8.42,
  standardDeviation:         14.39,
  variance:                   2.07,
  sharpeRatioMonthly:         0.59,
  sharpeRatioAnnualized:      2.04,
  alpha:                      23.16,
  highWaterMark:           21600.00,
  hurdleRate:                    8,
};

export const performanceMetrics = performanceMetricsYTD;

// ─────────────────────────────────────────────────────────────────────────────
// ATLAS PRIME PERFORMANCE METRICS
// Net deposits: $4,000.48  (deposits $4,600 – withdrawal $599.52)
// Final balance: $6,660.35 · Net profit: $2,659.87 · Swap earned: $54.07
// Period: 3 Mar – 17 Apr 2026
// ─────────────────────────────────────────────────────────────────────────────
export const atlasPerformanceMetrics = {
  grossProfit:              2659.87,
  grossLoss:                   0.00,
  totalNetProfit:           2659.87,
  profitFactor:                  Infinity,  // no losing trades
  expectedPayoff:            265.99,
  absoluteDrawdown:            0.00,
  maximalDrawdown:             0.00,
  relativeDrawdown:            0.00,
  balance:                  6660.35,
  equity:                   6660.35,
  // Net deposits after withdrawal
  initialBalance:           4000.48,
  openingBalance:           4000.48,
  roi:                        66.49,  // 2659.87 / 4000.48 * 100
  riskFreeRate:                   4,
  riskFreeRateQuarterly:          1,
  riskFreeRateMonthly:         0.333,
  // Period is ~6.5 weeks. Using 1 quarterly period for risk-free (closest)
  excessReturn:               65.49,
  averageExcessReturn:        32.75,  // 65.49 / 2 months
  standardDeviation:           0.00,  // all wins, no deviation
  variance:                    0.00,
  sharpeRatioMonthly:          1.51,  // as per broker report
  sharpeRatioAnnualized:       1.51,
  alpha:                       65.49, // vs 1% quarterly risk-free
  highWaterMark:            6660.35,
  hurdleRate:                     8,
  swapEarned:                 54.07,
};

// ─────────────────────────────────────────────────────────────────────────────
// COMBINED FUND METRICS
// Equiti YTD + Atlas full period → combined view
// Total deposited capital: $20,000 (Equiti) + $4,000.48 (Atlas net) = $24,000.48
// Total final balance:    $25,032.92 (Equiti) + $6,660.35 (Atlas) = $31,693.27
// Total net profit:       $5,032.92 + $2,659.87 = $7,692.79
// Blended ROI:            $7,692.79 / $24,000.48 = 32.05%
// ─────────────────────────────────────────────────────────────────────────────
export const combinedFundMetrics = {
  equitiBalance:            25032.92,
  atlasBalance:              6660.35,
  totalAUM:                 31693.27,
  equitiNetProfit:           5032.92,
  atlasNetProfit:            2659.87,
  totalNetProfit:            7692.79,
  equitiDeposit:            20000.00,
  atlasNetDeposit:           4000.48,
  totalDeposited:           24000.48,
  blendedROI:                 32.05,  // 7692.79 / 24000.48 * 100
  equitiWeight:               0.834,  // 20000 / 24000.48
  atlasWeight:                0.166,  // 4000.48 / 24000.48
  // Weighted Sharpe: (0.834 * 2.04) + (0.166 * 1.51)
  blendedSharpe:              1.95,
  totalTrades:                  36,   // 26 Equiti + 10 Atlas
  totalWinTrades:               26,   // 16 Equiti + 10 Atlas
  combinedWinRate:            72.22,  // 26/36
  highWaterMark:            31693.27,
  // Equiti drawdown dominates; atlas = 0%
  maxDrawdown:                23.75,
};

// ─────────────────────────────────────────────────────────────────────────────
// TRADE STATISTICS — EQUITI (unchanged)
// ─────────────────────────────────────────────────────────────────────────────
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
  largestProfitTrade:     482.50,
  largestLossTrade:      -725.50,
  averageProfitTrade:     168.26,
  averageLossTrade:      -356.17,
  maxConsecutiveWins:       3,
  maxConsecutiveLosses:     3,
  avgConsecutiveWins:       3,
  avgConsecutiveLosses:     3,
};

export const tradeStatisticsQ2 = {
  totalTrades:             18,
  longPositions:           18,
  shortPositions:           0,
  longWinRate:            61.11,
  shortWinRate:            0.00,
  profitTrades:            11,
  profitTradesPercent:    61.11,
  lossTrades:               7,
  lossTradesPercent:      38.89,
  largestProfitTrade:    2195.29,
  largestLossTrade:     -2022.60,
  averageProfitTrade:      857.84,
  averageLossTrade:       -589.33,
  maxConsecutiveWins:       9,
  maxConsecutiveLosses:     6,
  avgConsecutiveWins:       4,
  avgConsecutiveLosses:     4,
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

// ─────────────────────────────────────────────────────────────────────────────
// ATLAS TRADE STATISTICS
// ─────────────────────────────────────────────────────────────────────────────
export const atlasTradeStatistics = {
  totalTrades:             10,
  longPositions:           10,
  shortPositions:           0,
  longWinRate:           100.00,
  shortWinRate:             0.00,
  profitTrades:            10,
  profitTradesPercent:   100.00,
  lossTrades:               0,
  lossTradesPercent:       0.00,
  largestProfitTrade:     580.97,
  largestLossTrade:         0.00,
  averageProfitTrade:     265.99,
  averageLossTrade:         0.00,
  maxConsecutiveWins:      10,
  maxConsecutiveLosses:     0,
  avgConsecutiveWins:      10,
  avgConsecutiveLosses:     0,
};

// ─────────────────────────────────────────────────────────────────────────────
// COMBINED TRADE STATISTICS
// ─────────────────────────────────────────────────────────────────────────────
export const combinedTradeStatistics = {
  totalTrades:             36,
  longPositions:           34,
  shortPositions:           2,
  longWinRate:            76.47, // 26 long wins / 34 long trades
  shortWinRate:          100.00,
  profitTrades:            26,
  profitTradesPercent:    72.22,
  lossTrades:              10,
  lossTradesPercent:      27.78,
  largestProfitTrade:    2195.29,
  largestLossTrade:     -2002.60,
  // Total gross wins: equiti wins + atlas wins; avg across all 26 winning trades
  averageProfitTrade:     591.26,  // (16*642.35 + 10*265.99) / 26
  averageLossTrade:      -519.38,
  maxConsecutiveWins:      10,     // Atlas's perfect run
  maxConsecutiveLosses:     6,
  avgConsecutiveWins:       5,
  avgConsecutiveLosses:     3,
};

export const tradeStatistics = tradeStatisticsYTD;

// ─────────────────────────────────────────────────────────────────────────────
// MONTHLY P&L BREAKDOWN — EQUITI
// ─────────────────────────────────────────────────────────────────────────────
export interface MonthlyPnLRow {
  month:    string;
  quarter:  "Q1" | "Q2";
  cocoa:    number;
  eurjpy:   number;
  other:    number;
  total:    number;
  netTotal: number;
  trades:   number;
}

export const monthlyPnL: MonthlyPnLRow[] = [
  {
    month: "Feb 2026",
    quarter: "Q1",
    cocoa: 42.80,
    eurjpy: 0,
    other: 0,
    total: 42.80,
    netTotal: -227.20,
    trades: 8,
  },
  {
    month: "Mar 2026",
    quarter: "Q1",
    cocoa: 0,
    eurjpy: 0,
    other: 0,
    total: 0,
    netTotal: 0,
    trades: 0,
  },
  {
    month: "Apr 2026",
    quarter: "Q2",
    cocoa: -3906.40,
    eurjpy: 9327.35,
    other: 0,
    total: 5420.95,
    netTotal: 5310.95,
    trades: 18,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ATLAS MONTHLY P&L BREAKDOWN
// ─────────────────────────────────────────────────────────────────────────────
export interface AtlasMonthlyPnLRow {
  month:   string;
  eurjpy:  number;
  swap:    number;
  total:   number;
  trades:  number;
}

export const atlasMonthlyPnL: AtlasMonthlyPnLRow[] = [
  { month: "Mar 2026", eurjpy: 0,       swap: 0,     total: 0,       trades: 0 }, // positions opened, none closed
  { month: "Apr 2026", eurjpy: 2605.80, swap: 54.07, total: 2659.87, trades: 10 },
];

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
    dateRange: "1 Apr – 17 Apr 2026",
    netTotal: 5310.95,
    trades:   18,
    note: "Includes closure of Q1 carry-forward positions on 8 Apr and the EUR/JPY run; peak balance reached $25,032.92 on 17 Apr 2026",
  },
];