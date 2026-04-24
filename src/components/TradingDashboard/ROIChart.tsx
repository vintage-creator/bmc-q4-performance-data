import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, TooltipProps } from "recharts";
import { performanceMetricsQ1, performanceMetricsQ2, performanceMetricsYTD } from "@/data/tradingData";
import { Period } from "@/lib/types";

interface ROIChartProps { period?: Period; }
interface ROIPoint { date: string; roi: number; balance: number; description: string; }

const ytdPoints: ROIPoint[] = [
  { date: "28 Jan", roi:  0.00,  balance: 20000,  description: "Account opened · initial deposit (Q1 start)" },
  { date: "6 Feb",  roi: -1.07,  balance: 19786,  description: "Cocoa H6 batch closed · −$214 net (Q1)" },
  { date: "27 Feb", roi: -1.14,  balance: 19773,  description: "Cocoa K6 shorts · +$177 net · Q1 closed P/L −$227.20" },
  { date: "31 Mar", roi: -1.14,  balance: 19773,  description: "Q1 close · 5 positions open with −$3,437 floating (equity $16,336)" },
  { date: "8 Apr",  roi: -17.60, balance: 16480,  description: "Q1 carry-forward cocoa longs resolved · −$3,768 (Q2)" },
  { date: "14 Apr", roi: -4.95,  balance: 19010,  description: "EUR/JPY first close · +$1,265 (Q2)" },
  { date: "17 Apr", roi: 25.16,  balance: 25033,  description: "EUR/JPY complete · new account high · Q2" },
];

const q1Points: ROIPoint[] = [
  { date: "28 Jan", roi:  0.00,  balance: 20000,  description: "Account opened · initial deposit" },
  { date: "6 Feb",  roi: -1.07,  balance: 19786,  description: "Cocoa H6 batch closed · −$214 net" },
  { date: "27 Feb", roi: -1.14,  balance: 19773,  description: "Cocoa K6 shorts closed · +$177 net · Q1 closed P/L −$227.20" },
  { date: "31 Mar", roi: -1.14,  balance: 19773,  description: "Q1 close · 5 longs open with −$3,437 floating" },
];

const q2Points: ROIPoint[] = [
  { date: "1 Apr",  roi:  0.00,  balance: 19948,  description: "Q2 opening balance" },
  { date: "8 Apr",  roi: -17.36, balance: 16480,  description: "Q1 carry-forward cocoa longs closed · −$3,468" },
  { date: "14 Apr", roi:  -4.74, balance: 19010,  description: "EUR/JPY first partial close · +$1,265" },
  { date: "17 Apr", roi:  25.51, balance: 25033,  description: "EUR/JPY complete · account high" },
];

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as ROIPoint;
  const positive = d.roi >= 0;
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-lg text-xs">
      <p className="font-semibold text-foreground mb-1.5">{d.date}</p>
      <div className="space-y-1">
        <div className="flex justify-between gap-6">
          <span className="text-muted-foreground">Balance:</span>
          <span className="font-medium">${d.balance.toLocaleString()}</span>
        </div>
        <div className="flex justify-between gap-6">
          <span className="text-muted-foreground">ROI:</span>
          <span className={`font-bold text-sm ${positive ? "text-success" : "text-destructive"}`}>
            {positive ? "+" : ""}{d.roi.toFixed(2)}%
          </span>
        </div>
        <p className="text-muted-foreground mt-2 pt-2 border-t border-border leading-relaxed">{d.description}</p>
      </div>
    </div>
  );
};

const metricsMap = { Q1: performanceMetricsQ1, Q2: performanceMetricsQ2, YTD: performanceMetricsYTD };
const dataMap    = { Q1: q1Points,              Q2: q2Points,              YTD: ytdPoints };

const PERIOD_SUBTITLE: Record<Period, string> = {
  Q1:  "Q1 2026 · return on initial deposit",
  Q2:  "Q2 2026 · return on opening balance",
  YTD: "Q1 + Q2 2026 · return on initial deposit",
};

export const ROIChart = ({ period = "Q1" }: ROIChartProps) => {
  const metrics  = metricsMap[period];
  const data     = dataMap[period];
  const finalROI = metrics.roi;
  const positive = finalROI >= 0;
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
      <Card className="p-6 bg-card border-border">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-3">
          <div>
            <h3 className="text-xl font-bold text-foreground">ROI progression</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{PERIOD_SUBTITLE[period]}</p>
          </div>
          <motion.div key={finalROI} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }} className="flex items-baseline gap-2">
            <span className="text-sm text-muted-foreground">Total ROI:</span>
            <span className={`text-2xl font-bold ${positive ? "text-success" : "text-destructive"}`}>
              {positive ? "+" : ""}{finalROI.toFixed(2)}%
            </span>
          </motion.div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.25} />
            <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" strokeDasharray="4 4" strokeOpacity={0.5} />
            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" style={{ fontSize: "11px" }} tick={{ dy: 6 }} />
            <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: "11px" }}
              tickFormatter={(v) => `${v.toFixed(0)}%`} domain={["auto", "auto"]} width={52} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="roi" stroke="hsl(var(--primary))" strokeWidth={2.5}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 0, r: 5 }} activeDot={{ r: 7 }}
              isAnimationActive animationDuration={1000} animationEasing="ease-out" />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-4 text-center">
          Blue Marvel Capital · Apollo · Equiti Brokerage (Seychelles) · Initial deposit: ${metrics.initialBalance.toLocaleString()}
        </p>
      </Card>
    </motion.div>
  );
};
export default ROIChart;