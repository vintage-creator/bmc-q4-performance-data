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

export const trades: Trade[] = [
  // Closed Trades from statement (9 Feb – 17 Apr 2026)
  { ticket: "13958902", openTime: "2026.02.09 17:41:49", type: "buy", size: 2.00, item: "uscocoak6", openPrice: 4193.1, closeTime: "2026.04.08 22:21:43", closePrice: 3191.8, profit: -2002.60, commission: -20.00 },
  { ticket: "13960715", openTime: "2026.02.09 20:29:24", type: "buy", size: 2.00, item: "uscocoak6", openPrice: 4074.6, closeTime: "2026.04.08 22:21:43", closePrice: 3191.8, profit: -1765.60, commission: -20.00 },
  { ticket: "14223218", openTime: "2026.03.06 16:12:40", type: "buy", size: 1.00, item: "uscocoak6", openPrice: 3101.1, closeTime: "2026.04.08 22:21:42", closePrice: 3191.8, profit: 90.70, commission: -10.00 },
  { ticket: "14261308", openTime: "2026.03.09 17:30:01", type: "buy", size: 1.00, item: "uscocoak6", openPrice: 3252.1, closeTime: "2026.04.08 22:21:42", closePrice: 3191.8, profit: -60.30, commission: -10.00 },
  { ticket: "14107944", openTime: "2026.03.10 17:05:08", type: "buy", size: 1.00, item: "uscocoak6", openPrice: 3353.2, closeTime: "2026.04.08 22:21:43", closePrice: 3191.8, profit: -161.40, commission: -10.00 },
  { ticket: "14670117", openTime: "2026.04.08 15:19:08", type: "buy", size: 1.00, item: "uscocoak6", openPrice: 3153.6, closeTime: "2026.04.08 22:21:43", closePrice: 3191.8, profit: 38.20, commission: -10.00 },
  { ticket: "14673014", openTime: "2026.04.08 16:18:33", type: "buy", size: 1.00, item: "uscocoak6", openPrice: 3185.8, closeTime: "2026.04.08 22:21:42", closePrice: 3191.8, profit: 6.00, commission: -10.00 },
  { ticket: "14658929", openTime: "2026.04.08 16:23:50", type: "buy", size: 1.00, item: "uscocoak6", openPrice: 3202.2, closeTime: "2026.04.08 22:21:43", closePrice: 3191.8, profit: -10.40, commission: -10.00 },
  { ticket: "14673287", openTime: "2026.04.08 16:34:28", type: "buy", size: 1.00, item: "uscocoak6", openPrice: 3232.8, closeTime: "2026.04.08 22:21:43", closePrice: 3191.8, profit: -41.00, commission: -10.00 },
  { ticket: "14677240", openTime: "2026.04.09 04:50:32", type: "buy", size: 1.30, item: "eurjpy.sd", openPrice: 185.224, closeTime: "2026.04.17 08:27:10", closePrice: 187.917, profit: 2195.29, commission: 0.00 },
  { ticket: "14676645", openTime: "2026.04.09 12:21:02", type: "buy", size: 1.30, item: "eurjpy.sd", openPrice: 185.654, closeTime: "2026.04.14 07:29:01", closePrice: 187.202, profit: 1265.09, commission: 0.00 },
  { ticket: "14695457", openTime: "2026.04.10 12:19:19", type: "buy", size: 1.30, item: "eurjpy.sd", openPrice: 186.349, closeTime: "2026.04.17 08:27:09", closePrice: 187.917, profit: 1278.21, commission: 0.00 },
  { ticket: "14706849", openTime: "2026.04.13 01:05:47", type: "buy", size: 1.30, item: "eurjpy.sd", openPrice: 186.518, closeTime: "2026.04.17 08:27:06", closePrice: 187.917, profit: 1140.44, commission: 0.00 },
  { ticket: "14707030", openTime: "2026.04.13 18:41:12", type: "buy", size: 3.90, item: "eurjpy.sd", openPrice: 187.045, closeTime: "2026.04.17 08:27:04", closePrice: 187.922, profit: 2144.70, commission: 0.00 },
  { ticket: "14720902", openTime: "2026.04.13 21:49:10", type: "buy", size: 1.00, item: "eurjpy.sd", openPrice: 187.297, closeTime: "2026.04.17 08:27:02", closePrice: 187.923, profit: 392.53, commission: 0.00 },
  { ticket: "14726743", openTime: "2026.04.15 15:57:17", type: "buy", size: 3.00, item: "eurjpy.sd", openPrice: 187.580, closeTime: "2026.04.17 08:27:00", closePrice: 187.922, profit: 643.35, commission: 0.00 },
  { ticket: "14759565", openTime: "2026.04.16 00:41:17", type: "buy", size: 1.00, item: "eurjpy.sd", openPrice: 187.662, closeTime: "2026.04.17 08:26:57", closePrice: 187.921, profit: 162.40, commission: 0.00 },
  { ticket: "14731791", openTime: "2026.04.17 04:08:18", type: "buy", size: 1.00, item: "eurjpy.sd", openPrice: 187.753, closeTime: "2026.04.17 08:26:59", closePrice: 187.921, profit: 105.34, commission: 0.00 },
];

// Period-specific performance data
export const performanceMetricsQTD = {
  // Core Performance (1–20 Apr 2026)
  grossProfit: 7327.96,
  grossLoss: 2242.30,
  totalNetProfit: 5085.45,
  profitFactor: 3.27,
  expectedPayoff: 423.78,
  
  // Drawdown Metrics
  absoluteDrawdown: 2022.60,
  maximalDrawdown: 2242.30,
  relativeDrawdown: 10.10,
  
  // Balance Info
  balance: 30117.45,
  equity: 30117.45,
  initialBalance: 25032,
  roi: 20.31,
  
  // Risk-Adjusted Metrics
  sharpeRatioMonthly: 0.72,
  sharpeRatioAnnualized: 2.50,
  riskFreeRate: 4,
  excessReturn: 16.31,
  averageExcessReturn: 5.44,
  standardDeviation: 12.15,
  variance: 1.48,
  squaredDeviation: 3.24,
  alpha: 25,
  
  // High-Water Mark & Hurdle Rate
  highWaterMark: 27034.56,
  hurdleRate: 8,
};

export const performanceMetricsYTD = {
  // Core Performance (1 Jan – 20 Apr 2026)
  grossProfit: 9436.25,
  grossLoss: 4125.30,
  totalNetProfit: 5310.95,
  profitFactor: 2.29,
  expectedPayoff: 295.05,
  
  // Drawdown Metrics
  absoluteDrawdown: 4016.40,
  maximalDrawdown: 4097.10,
  relativeDrawdown: 20.67,
  
  // Balance Info
  balance: 25032.92,
  equity: 25032.92,
  initialBalance: 20000,
  roi: 26.55,
  
  // Risk-Adjusted Metrics
  sharpeRatioMonthly: 0.58,
  sharpeRatioAnnualized: 2.0,
  riskFreeRate: 4,
  excessReturn: 22.55,
  averageExcessReturn: 7.52,
  standardDeviation: 14.39,
  variance: 2.07,
  squaredDeviation: 4.143,
  alpha: 28,
  
  // High-Water Mark & Hurdle Rate
  highWaterMark: 21600,
  hurdleRate: 8,
};

// Default to QTD for compatibility
export const performanceMetrics = performanceMetricsQTD;

export const tradeStatisticsQTD = {
  totalTrades: 12,
  longPositions: 12,
  longWinRate: 75.00,
  profitTrades: 9,
  profitTradesPercent: 75.00,
  lossTrades: 3,
  lossTradesPercent: 25.00,
  largestProfitTrade: 2195.29,
  largestLossTrade: -41.00,
  averageProfitTrade: 813.11,
  averageLossTrade: -747.43,
  maxConsecutiveWins: 9,
  maxConsecutiveLosses: 2,
  avgConsecutiveWins: 4,
  avgConsecutiveLosses: 2,
};

export const tradeStatisticsYTD = {
  totalTrades: 18,
  longPositions: 18,
  longWinRate: 61.11,
  profitTrades: 11,
  profitTradesPercent: 61.11,
  lossTrades: 7,
  lossTradesPercent: 38.89,
  largestProfitTrade: 2195.29,
  largestLossTrade: -2002.60,
  averageProfitTrade: 857.84,
  averageLossTrade: -589.33,
  maxConsecutiveWins: 9,
  maxConsecutiveLosses: 6,
  avgConsecutiveWins: 4,
  avgConsecutiveLosses: 4,
};

// Default to QTD for compatibility
export const tradeStatistics = tradeStatisticsQTD;
