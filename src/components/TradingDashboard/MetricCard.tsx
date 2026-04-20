import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  title:        string;
  value:        string | number;
  subtitle?:    string;
  icon:         LucideIcon;
  trend?:       "up" | "down" | "neutral";
  tooltip?:     string;
  delay?:       number;
  /** When true, renders a small trend arrow badge next to the value */
  showTrendBadge?: boolean;
}

const TrendBadge = ({ trend }: { trend: "up" | "down" | "neutral" }) => {
  if (trend === "up")
    return (
      <span className="inline-flex items-center gap-0.5 text-xs font-medium text-success bg-success/10 px-1.5 py-0.5 rounded">
        <TrendingUp className="w-3 h-3" /> up
      </span>
    );
  if (trend === "down")
    return (
      <span className="inline-flex items-center gap-0.5 text-xs font-medium text-destructive bg-destructive/10 px-1.5 py-0.5 rounded">
        <TrendingDown className="w-3 h-3" /> down
      </span>
    );
  return (
    <span className="inline-flex items-center gap-0.5 text-xs font-medium text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
      <Minus className="w-3 h-3" />
    </span>
  );
};

export const MetricCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend = "neutral",
  tooltip,
  delay = 0,
  showTrendBadge = false,
}: MetricCardProps) => {
  const getTrendColor = () => {
    if (trend === "up")   return "text-success";
    if (trend === "down") return "text-destructive";
    return "text-foreground";
  };

  const card = (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      whileHover={{ y: -2 }}
    >
      <Card className="p-4 sm:p-5 bg-card border-border hover:border-primary/40 hover:shadow-md transition-all duration-300 cursor-default group overflow-hidden relative">
        {/* Subtle top accent bar that fills on hover */}
        <motion.div
          className="absolute top-0 left-0 h-0.5 bg-primary rounded-t"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />

        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-muted-foreground mb-1.5 truncate uppercase tracking-wide">
              {title}
            </p>

            <div className="flex items-baseline gap-2 flex-wrap">
              <motion.h3
                key={String(value)}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: delay + 0.1 }}
                className={`text-xl sm:text-2xl md:text-3xl font-bold ${getTrendColor()} truncate`}
              >
                {value}
              </motion.h3>
              {showTrendBadge && <TrendBadge trend={trend} />}
            </div>

            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1.5 truncate leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          <div className="shrink-0">
            <motion.div
              className="p-2 sm:p-2.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-200"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  if (!tooltip) return card;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{card}</TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs text-xs leading-relaxed">
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};