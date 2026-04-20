import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
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
      transition={{ duration: 0.3 }}
      className="flex items-center gap-3 mb-6"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                Time Period:
              </span>
              <InfoIcon className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors cursor-help" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="w-56">
            <div className="space-y-2 text-xs">
              <p className="font-semibold">Performance Period Selection</p>
              <div>
                <p className="font-medium text-accent">QTD (Quarter-To-Date)</p>
                <p>Performance from 1 April – 20 April 2026 (current quarter)</p>
              </div>
              <div>
                <p className="font-medium text-accent">YTD (Year-To-Date)</p>
                <p>Performance from 1 January – 20 April 2026 (entire year)</p>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex items-center gap-2 bg-secondary rounded-lg p-1 border border-border">
        <button
          onClick={() => onToggle("QTD")}
          className={`px-4 py-2 rounded transition-all duration-200 font-medium text-sm ${
            selectedPeriod === "QTD"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          QTD
        </button>
        <button
          onClick={() => onToggle("YTD")}
          className={`px-4 py-2 rounded transition-all duration-200 font-medium text-sm ${
            selectedPeriod === "YTD"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          YTD
        </button>
      </div>

      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
        {selectedPeriod === "QTD"
          ? "1 Apr – 20 Apr 2026"
          : "1 Jan – 20 Apr 2026"}
      </Badge>
    </motion.div>
  );
};
