import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  tooltip?: string;
  delay?: number;
}

export const MetricCard = ({ title, value, subtitle, icon: Icon, trend = "neutral", tooltip, delay = 0 }: MetricCardProps) => {
  const getTrendColor = () => {
    if (trend === "up") return "text-success";
    if (trend === "down") return "text-destructive";
    return "text-muted-foreground";
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
          >
            <Card className="p-4 sm:p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer group overflow-hidden">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1 truncate">{title}</p>
                  <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold ${getTrendColor()} group-hover:scale-105 transition-transform truncate`}>
                    {value}
                  </h3>
                  {subtitle && (
                    <p className="text-xs text-muted-foreground mt-1 sm:mt-2 truncate">{subtitle}</p>
                  )}
                </div>
                <div className="shrink-0">
                  <div className="p-2 sm:p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </TooltipTrigger>
        {tooltip && (
          <TooltipContent>
            <p className="max-w-xs">{tooltip}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};
