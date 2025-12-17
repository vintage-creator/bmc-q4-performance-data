import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { performanceMetrics } from "@/data/tradingData";

interface ROIDataPoint {
  month: string;
  roi: number;
  balance: number;
  description: string;
}

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as ROIDataPoint;
    
    return (
      <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
        <p className="text-sm font-semibold text-foreground mb-2">{data.month}</p>
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Balance:</span>
            <span className="text-foreground font-medium">${data.balance.toLocaleString()}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground font-semibold">ROI:</span>
            <span className="text-success font-bold text-base">{data.roi.toFixed(2)}%</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
            {data.description}
          </p>
        </div>
      </div>
    );
  }
  
  return null;
};

export const ROIChart = () => {
  // Use Q4/2025 simulation data with correct ROI
  const roiData: ROIDataPoint[] = [
    { 
      month: "Oct '25", 
      roi: 0, 
      balance: performanceMetrics.initialBalance,
      description: "Starting position - Initial capital deployed"
    },
    { 
      month: "Nov '25", 
      roi: performanceMetrics.roi, 
      balance: performanceMetrics.balance,
      description: `Total profit: $${performanceMetrics.totalNetProfit.toLocaleString()}`
    },
    { 
      month: "Dec '25", 
      roi: performanceMetrics.roi, 
      balance: performanceMetrics.balance,
      description: "Portfolio maintained at high-water mark"
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="p-6 bg-card border-border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">ROI Progression</h3>
          <div className="flex items-center gap-2 mt-2 md:mt-0 text-sm">
            <span className="text-muted-foreground">Final ROI:</span>
            <span className="font-bold text-success text-lg">{performanceMetrics.roi}%</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={roiData}>
            <defs>
              <linearGradient id="colorROI" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `${value.toFixed(0)}%`}
              domain={[-5, 45]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="roi" 
              stroke="hsl(var(--success))" 
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-4 text-center">
          Return on Investment calculated from initial capital of ${performanceMetrics.initialBalance.toLocaleString()}
        </p>
      </Card>
    </motion.div>
  );
};