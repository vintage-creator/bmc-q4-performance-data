import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Period, PERIOD_LABELS } from "@/lib/types";

interface PeriodToggleProps {
  selectedPeriod: Period;
  onToggle: (period: Period) => void;
}

export const PeriodToggle = ({ selectedPeriod, onToggle }: PeriodToggleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex items-center gap-3 mb-6 flex-wrap"
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 cursor-help select-none">
            <span className="text-sm font-medium text-muted-foreground">Time period:</span>
            <InfoIcon className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors duration-150" />
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="w-72 p-3">
          <div className="space-y-3 text-xs">
            <p className="font-semibold text-foreground">Performance period selection</p>

            <div className="space-y-1">
              <p className="font-medium text-primary">QTD — Quarter-to-date</p>
              <p className="text-muted-foreground">Current quarter activity only: 1 Apr – 20 Apr 2026</p>
              <div className="pl-2 border-l-2 border-primary/30 mt-1 space-y-0.5">
                <p className="text-muted-foreground">Q2 2026 · Apr: Cocoa K6 closes + EUR/JPY run</p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="font-medium text-primary">YTD — Year-to-date</p>
              <p className="text-muted-foreground">Full account history since inception: 28 Jan – 20 Apr 2026</p>
              <div className="pl-2 border-l-2 border-primary/30 mt-1 space-y-0.5">
                <p className="text-muted-foreground flex items-center gap-1">
                  <TrendingDown className="w-3 h-3 text-destructive" />
                  Q1 (28 Jan – 31 Mar): −$227.20 closed P/L
                </p>
                <p className="text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-success" />
                  Q2 to date (1 Apr – 20 Apr): +$5,389.25
                </p>
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>

      {/* Two-button toggle pill */}
      <div className="relative flex items-center gap-1 bg-secondary rounded-lg p-1 border border-border">
        {(["QTD", "YTD"] as const).map((p) => (
          <button
            key={p}
            onClick={() => onToggle(p)}
            className="relative px-4 py-1.5 rounded text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {selectedPeriod === p && (
              <motion.span
                layoutId="period-pill"
                className="absolute inset-0 rounded bg-primary shadow-sm"
                transition={{ type: "spring", stiffness: 380, damping: 34 }}
              />
            )}
            <span className={`relative z-10 transition-colors duration-150 ${
              selectedPeriod === p
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}>
              {p}
            </span>
          </button>
        ))}
      </div>

      {/* Animated date badge */}
      <motion.div
        key={selectedPeriod}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-2"
      >
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 font-medium text-xs">
          {PERIOD_LABELS[selectedPeriod]}
        </Badge>
        {/* Sub-label showing which quarters are included */}
        <span className="text-xs text-muted-foreground hidden sm:inline">
          {selectedPeriod === "QTD" ? "Q2 2026 · to date" : "Q1 + Q2 2026 · inception to date"}
        </span>
      </motion.div>
    </motion.div>
  );
};

export default PeriodToggle;