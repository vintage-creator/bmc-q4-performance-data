
export type Period = "Q1" | "Q2" | "YTD";

export const PERIOD_LABELS: Record<Period, string> = {
  Q1: "28 Jan – 31 Mar 2026",
  Q2: "1 Apr – 20 Apr 2026",
  YTD: "28 Jan – 20 Apr 2026",
};

export const PERIOD_DESCRIPTIONS: Record<Period, string> = {
  Q1: "First quarter – full closed P&L (28 Jan – 31 Mar).",
  Q2: "Second quarter to date – April 2026 activity only.",
  YTD: "Year‑to‑date – full account history since inception.",
};

// Quarter definitions used for breakdown displays within YTD
export interface QuarterMeta {
  label:      string;  
  shortLabel: string; 
  dateRange:  string;  
  start:      string;  
  end:        string;
  months:     string[]; 
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