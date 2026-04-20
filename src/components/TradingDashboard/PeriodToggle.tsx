import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

interface PeriodToggleProps {
  selectedPeriod: "QTD" | "YTD";
  onToggle: (period: "QTD" | "YTD") => void;
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
            <span className="text-sm font-medium text-muted-foreground">
              Time period:
            </span>
            <InfoIcon className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors duration-150" />
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="w-64">
          <div className="space-y-2 text-xs">
            <p className="font-semibold">Performance period selection</p>
            <div>
              <p className="font-medium text-accent">QTD — Quarter-to-date</p>
              <p className="text-muted-foreground">April-only activity: 1 Apr – 20 Apr 2026</p>
            </div>
            <div>
              <p className="font-medium text-accent">YTD — Year-to-date</p>
              <p className="text-muted-foreground">
                Full account history: 28 Jan – 20 Apr 2026
                (account inception)
              </p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>

      {/* Toggle pill */}
      <div className="relative flex items-center gap-1 bg-secondary rounded-lg p-1 border border-border">
        {(["QTD", "YTD"] as const).map((p) => (
          <button
            key={p}
            onClick={() => onToggle(p)}
            className="relative px-4 py-1.5 rounded text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {/* Sliding active background */}
            {selectedPeriod === p && (
              <motion.span
                layoutId="period-pill"
                className="absolute inset-0 rounded bg-primary shadow-sm"
                transition={{ type: "spring", stiffness: 380, damping: 34 }}
              />
            )}
            <span
              className={`relative z-10 transition-colors duration-150 ${
                selectedPeriod === p
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {p}
            </span>
          </button>
        ))}
      </div>

      {/* Date badge — animates text swap */}
      <motion.div
        key={selectedPeriod}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Badge
          variant="outline"
          className="bg-primary/10 text-primary border-primary/30 font-medium text-xs"
        >
          {selectedPeriod === "QTD"
            ? "1 Apr – 20 Apr 2026"
            : "28 Jan – 20 Apr 2026"}
        </Badge>
      </motion.div>
    </motion.div>
  );
};

export default PeriodToggle;