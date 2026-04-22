
export type Period = "QTD" | "YTD";

export const PERIOD_LABELS: Record<Period, string> = {
  QTD: "1 Apr – 20 Apr 2026",
  YTD: "28 Jan – 20 Apr 2026",
};

export const PERIOD_DESCRIPTIONS: Record<Period, string> = {
  QTD: "Q2 quarter-to-date — April 2026 activity only",
  YTD: "Year-to-date — full account history since inception (28 Jan 2026)",
};

// Quarter definitions used for breakdown displays within YTD
export interface QuarterMeta {
  label:      string;  // e.g. "Q1 2026"
  shortLabel: string;  // e.g. "Q1"
  dateRange:  string;  // human-readable
  start:      string;  // ISO date string
  end:        string;
  months:     string[]; // month keys matching MonthlyPnLRow.month
}

export const QUARTERS: QuarterMeta[] = [
  {
    label:      "Q1 2026",
    shortLabel: "Q1",
    dateRange:  "28 Jan – 31 Mar 2026",
    start:      "2026-01-28",
    end:        "2026-03-31",
    months:     ["Feb 2026", "Mar 2026"],
  },
  {
    label:      "Q2 2026",
    shortLabel: "Q2",
    dateRange:  "1 Apr – 20 Apr 2026",
    start:      "2026-04-01",
    end:        "2026-04-20",
    months:     ["Apr 2026"],
  },
];