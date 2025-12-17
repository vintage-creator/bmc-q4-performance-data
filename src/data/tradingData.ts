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
  { ticket: "12221195", openTime: "2025.10.20 16:56:24", type: "sell", size: 1.00, item: "uscocoaz5", openPrice: 5890.5, closeTime: "2025.11.12 16:22:34", closePrice: 5762.5, profit: 128.00, commission: -10.00 },
  { ticket: "12238206", openTime: "2025.10.21 16:29:49", type: "sell", size: 1.00, item: "uscocoaz5", openPrice: 5965.0, closeTime: "2025.11.12 16:26:01", closePrice: 5751.0, profit: 214.00, commission: -10.00 },
  { ticket: "12254738", openTime: "2025.10.22 14:55:18", type: "sell", size: 1.00, item: "uscocoaz5", openPrice: 6218.5, closeTime: "2025.11.03 16:11:00", closePrice: 6357.0, profit: -138.50, commission: -10.00 },
  { ticket: "12256775", openTime: "2025.10.22 16:57:49", type: "buy", size: 0.01, item: "eurjpy.sd", openPrice: 176.232, closeTime: "2025.11.18 18:27:58", closePrice: 179.948, profit: 23.90, commission: 0.00 },
  { ticket: "12258067", openTime: "2025.10.27 13:25:03", type: "sell", size: 1.00, item: "uscocoaz5", openPrice: 6151.0, closeTime: "2025.11.03 17:03:04", closePrice: 6449.5, profit: -298.50, commission: -10.00 },
  { ticket: "12269295", openTime: "2025.10.27 13:37:26", type: "sell", size: 1.00, item: "uscocoaz5", openPrice: 6100.5, closeTime: "2025.11.12 16:25:42", closePrice: 5750.5, profit: 350.00, commission: -10.00 },
  { ticket: "12296259", openTime: "2025.10.27 13:47:31", type: "buy", size: 0.10, item: "eurjpy.sd", openPrice: 177.872, closeTime: "2025.11.18 18:27:53", closePrice: 179.950, profit: 133.67, commission: 0.00 },
  { ticket: "12296745", openTime: "2025.10.27 14:24:36", type: "buy", size: 0.10, item: "eurjpy.sd", openPrice: 177.742, closeTime: "2025.11.18 18:27:49", closePrice: 179.955, profit: 142.36, commission: 0.00 },
  { ticket: "12298113", openTime: "2025.10.27 15:51:29", type: "buy", size: 0.20, item: "eurjpy.sd", openPrice: 177.894, closeTime: "2025.11.03 17:22:08", closePrice: 177.414, profit: -3.04, commission: 0.00 },
  { ticket: "12344956", openTime: "2025.10.29 21:01:58", type: "buy", size: 0.10, item: "eurjpy.sd", openPrice: 177.394, closeTime: "2025.11.03 14:54:15", closePrice: 177.576, profit: 11.81, commission: 0.00 },
  { ticket: "12347055", openTime: "2025.10.30 06:18:49", type: "buy", size: 0.10, item: "eurjpy.sd", openPrice: 177.521, closeTime: "2025.11.03 14:55:15", closePrice: 177.585, profit: 4.16, commission: 0.00 },
  { ticket: "12359263", openTime: "2025.10.30 13:03:31", type: "buy", size: 0.10, item: "eurjpy.sd", openPrice: 178.712, closeTime: "2025.11.03 18:14:44", closePrice: 177.610, profit: -71.51, commission: 0.00 },
  { ticket: "12344420", openTime: "2025.10.30 15:21:59", type: "sell", size: 2.00, item: "uscocoaz5", openPrice: 5937.0, closeTime: "2025.11.12 16:25:19", closePrice: 5754.5, profit: 365.00, commission: -20.00 },
  { ticket: "12373548", openTime: "2025.10.31 17:16:43", type: "sell", size: 1.00, item: "uscocoaz5", openPrice: 6189.0, closeTime: "2025.11.03 16:36:49", closePrice: 6390.0, profit: -201.00, commission: -10.00 },
  { ticket: "12373650", openTime: "2025.10.31 17:38:10", type: "sell", size: 1.00, item: "uscocoaz5", openPrice: 6151.0, closeTime: "2025.11.03 16:52:41", closePrice: 6411.0, profit: -260.00, commission: -10.00 },
  { ticket: "12389786", openTime: "2025.11.06 11:45:00", type: "sell", size: 1.00, item: "uscocoaz5", openPrice: 6252.5, closeTime: "2025.11.12 16:24:26", closePrice: 5757.5, profit: 495.00, commission: -10.00 },
  { ticket: "12398518", openTime: "2025.11.06 11:45:00", type: "sell", size: 1.00, item: "uscocoaz5", openPrice: 6252.5, closeTime: "2025.11.12 16:24:20", closePrice: 5757.5, profit: 495.00, commission: -10.00 },
  { ticket: "12386861", openTime: "2025.11.06 11:46:34", type: "sell", size: 1.00, item: "uscocoaz5", openPrice: 6244.5, closeTime: "2025.11.12 16:25:01", closePrice: 5757.5, profit: 487.00, commission: -10.00 },
  { ticket: "12426744", openTime: "2025.11.06 15:44:54", type: "sell", size: 1.00, item: "uscocoaz5", openPrice: 6211.5, closeTime: "2025.11.12 16:24:10", closePrice: 5758.0, profit: 453.50, commission: -10.00 },
  { ticket: "12388377", openTime: "2025.11.07 11:59:26", type: "sell", size: 1.00, item: "uscocoaz5", openPrice: 6100.5, closeTime: "2025.11.12 16:24:55", closePrice: 5757.5, profit: 343.00, commission: -10.00 },
  { ticket: "12429179", openTime: "2025.11.07 18:35:59", type: "sell", size: 1.00, item: "uscocoaz5", openPrice: 6012.5, closeTime: "2025.11.12 16:24:04", closePrice: 5758.0, profit: 254.50, commission: -10.00 },
  { ticket: "12388462", openTime: "2025.11.10 15:21:09", type: "sell", size: 1.00, item: "uscocoaz5", openPrice: 5962.0, closeTime: "2025.11.12 16:24:41", closePrice: 5757.0, profit: 205.00, commission: -10.00 },
  { ticket: "12470745", openTime: "2025.11.10 16:18:11", type: "sell", size: 1.00, item: "uscocoaz5", openPrice: 5934.0, closeTime: "2025.11.12 16:25:27", closePrice: 5754.0, profit: 180.00, commission: -10.00 },
  { ticket: "12471925", openTime: "2025.11.11 17:01:28", type: "sell", size: 2.00, item: "uscocoaz5", openPrice: 5882.5, closeTime: "2025.11.12 16:25:34", closePrice: 5750.5, profit: 264.00, commission: -20.00 },
  { ticket: "12475937", openTime: "2025.11.11 17:24:02", type: "sell", size: 2.00, item: "uscocoaz5", openPrice: 5835.0, closeTime: "2025.11.12 16:25:52", closePrice: 5750.5, profit: 169.00, commission: -20.00 },
  { ticket: "12431799", openTime: "2025.11.11 17:37:06", type: "sell", size: 1.00, item: "uscocoaz5", openPrice: 5788.0, closeTime: "2025.11.12 16:23:55", closePrice: 5760.0, profit: 28.00, commission: -10.00 },
  { ticket: "12364916", openTime: "2025.11.11 17:37:06", type: "sell", size: 1.00, item: "uscocoaz5", openPrice: 5788.0, closeTime: "2025.11.12 16:25:09", closePrice: 5750.0, profit: 38.00, commission: -10.00 },
  { ticket: "12388502", openTime: "2025.11.11 17:37:06", type: "sell", size: 1.00, item: "uscocoaz5", openPrice: 5788.0, closeTime: "2025.11.12 16:24:34", closePrice: 5757.5, profit: 30.50, commission: -10.00 },
  { ticket: "12511430", openTime: "2025.11.11 22:36:45", type: "buy", size: 0.10, item: "eurjpy.sd", openPrice: 178.575, closeTime: "2025.11.18 18:27:44", closePrice: 179.946, profit: 88.19, commission: 0.00 },
  { ticket: "12568240", openTime: "2025.11.13 17:08:36", type: "buy", size: 0.10, item: "eurjpy.sd", openPrice: 179.581, closeTime: "2025.11.18 18:27:39", closePrice: 179.947, profit: 23.54, commission: 0.00 },
  { ticket: "12576684", openTime: "2025.11.13 21:04:22", type: "buy", size: 0.10, item: "eurjpy.sd", openPrice: 179.710, closeTime: "2025.11.18 18:27:35", closePrice: 179.944, profit: 15.05, commission: 0.00 },
];

export const performanceMetrics = {
  // Core Performance
  grossProfit: 4728.87,
  grossLoss: 1075.08,
  totalNetProfit: 3653.79,
  profitFactor: 4.40,
  expectedPayoff: 117.86,
  
  // Drawdown Metrics
  absoluteDrawdown: 1060.45,
  maximalDrawdown: 1075.08,
  relativeDrawdown: 10.74,
  
  // Balance Info
  balance: 13653.79,
  equity: 13653.79,
  initialBalance: 10000,
  roi: 36.54, // Total Portfolio Return: 37% -> using exact calculation
  
  // Risk-Adjusted Metrics (from BMC simulation)
  sharpeRatioMonthly: 0.58,
  sharpeRatioAnnualized: 2.0,
  riskFreeRate: 4, // US T-Bill 3 Month (%)
  excessReturn: 25, // (%)
  averageExcessReturn: 8, // (%)
  standardDeviation: 14.39, // 0.1439 * 100
  variance: 2.07, // 0.0207 * 100
  squaredDeviation: 4.143, // 0.04143 * 100
  alpha: 33, // Q4/25 Alpha (%)
  
  // High-Water Mark & Hurdle Rate
  highWaterMark: 10800, // Initial capital ($10,000) + 8% hurdle ($800) - threshold to outperform for fees
  hurdleRate: 8, // Minimum target return (%)
};

export const tradeStatistics = {
  totalTrades: 31,
  shortPositions: 21,
  shortWinRate: 80.95,
  longPositions: 10,
  longWinRate: 80.00,
  profitTrades: 25,
  profitTradesPercent: 80.65,
  lossTrades: 6,
  lossTradesPercent: 19.35,
  largestProfitTrade: 495.00,
  largestLossTrade: -308.50,
  averageProfitTrade: 189.15,
  averageLossTrade: -179.18,
  maxConsecutiveWins: 23,
  maxConsecutiveLosses: 6,
  avgConsecutiveWins: 13,
  avgConsecutiveLosses: 6,
};
