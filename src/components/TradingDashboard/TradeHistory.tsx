import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trades, Trade } from "@/data/tradingData";
import { Search, TrendingUp, TrendingDown } from "lucide-react";
import { Period, PERIOD_LABELS } from "@/lib/types";

interface TradeHistoryProps { period?: Period; }

const PERIOD_RANGES: Record<Period, { start: Date; end: Date }> = {
  Q1:  { start: new Date("2026-01-28T00:00:00"), end: new Date("2026-03-31T23:59:59") },
  Q2:  { start: new Date("2026-04-01T00:00:00"), end: new Date("2026-04-20T23:59:59") },
  YTD: { start: new Date("2026-01-28T00:00:00"), end: new Date("2026-04-20T23:59:59") },
};

const filterByPeriod = (all: Trade[], period: Period) => {
  const { start, end } = PERIOD_RANGES[period];
  return all.filter((t) => {
    const close = new Date(t.closeTime.replace(/\./g, "-").replace(" ", "T"));
    return close >= start && close <= end;
  });
};

const PERIOD_DATE_LABEL: Record<Period, string> = {
  Q1:  "Q1 2026 · 28 Jan – 31 Mar",
  Q2:  "Q2 2026 · 1 Apr – 20 Apr",
  YTD: "Q1 + Q2 2026 · 28 Jan – 20 Apr",
};

export const TradeHistory = ({ period = "Q1" }: TradeHistoryProps) => {
  const [search, setSearch]             = useState("");
  const [filterType, setFilterType]     = useState<"all" | "buy" | "sell">("all");
  const [filterResult, setFilterResult] = useState<"all" | "profit" | "loss">("all");
  const [filterItem, setFilterItem]     = useState<string>("all");

  const periodTrades = filterByPeriod(trades, period);
  const filtered = periodTrades.filter((t) => {
    const matchSearch  = !search || t.ticket.toLowerCase().includes(search.toLowerCase()) || t.item.toLowerCase().includes(search.toLowerCase());
    const matchType    = filterType   === "all" || t.type === filterType;
    const matchResult  = filterResult === "all" || (filterResult === "profit" && t.profit > 0) || (filterResult === "loss" && t.profit < 0);
    const matchItem    = filterItem   === "all" || t.item === filterItem;
    return matchSearch && matchType && matchResult && matchItem;
  });

  const grossPnl = filtered.reduce((a, t) => a + t.profit, 0);
  const netPnl   = filtered.reduce((a, t) => a + t.profit + t.commission, 0);
  const fmt = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
      <Card className="p-6 bg-card border-border">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <div>
            <h3 className="text-xl font-bold text-foreground">Trade history</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{PERIOD_DATE_LABEL[period]} · closed positions</p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary border border-border">
              <span className="text-muted-foreground">Trades:</span><span className="font-medium">{filtered.length}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary border border-border">
              <span className="text-muted-foreground">Gross P&amp;L:</span>
              <span className={`font-semibold ${grossPnl >= 0 ? "text-success" : "text-destructive"}`}>
                {grossPnl >= 0 ? "+" : ""}${fmt(Math.abs(grossPnl))}
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary border border-border">
              <span className="text-muted-foreground">Net P&amp;L:</span>
              <span className={`font-semibold ${netPnl >= 0 ? "text-success" : "text-destructive"}`}>
                {netPnl >= 0 ? "+" : ""}${fmt(Math.abs(netPnl))}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search ticket or instrument…" value={search}
              onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-secondary border-border text-sm h-9" />
          </div>
          <Select value={filterType} onValueChange={(v: any) => setFilterType(v)}>
            <SelectTrigger className="w-full sm:w-[130px] bg-secondary border-border h-9 text-sm"><SelectValue placeholder="Direction" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All directions</SelectItem>
              <SelectItem value="buy">Buy</SelectItem>
              <SelectItem value="sell">Sell</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterResult} onValueChange={(v: any) => setFilterResult(v)}>
            <SelectTrigger className="w-full sm:w-[120px] bg-secondary border-border h-9 text-sm"><SelectValue placeholder="Result" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All results</SelectItem>
              <SelectItem value="profit">Profit</SelectItem>
              <SelectItem value="loss">Loss</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterItem} onValueChange={setFilterItem}>
            <SelectTrigger className="w-full sm:w-[150px] bg-secondary border-border h-9 text-sm"><SelectValue placeholder="Instrument" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All instruments</SelectItem>
              <SelectItem value="eurjpy.sd">EUR/JPY</SelectItem>
              <SelectItem value="uscocoak6">Cocoa K6</SelectItem>
              <SelectItem value="uscocoah6">Cocoa H6</SelectItem>
              <SelectItem value="palantir">Palantir</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="overflow-x-auto rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent bg-secondary/50">
                {["Ticket","Direction","Instrument","Size","Open","Close","Open time","Close time","Gross P&L","Commission"].map((h) => (
                  <TableHead key={h} className="text-muted-foreground text-xs font-medium uppercase tracking-wide"
                    style={["Gross P&L","Commission"].includes(h) ? { textAlign: "right" } : {}}>{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence mode="popLayout">
                {filtered.map((trade, index) => (
                  <motion.tr key={trade.ticket} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.22, delay: index * 0.018 }}
                    className="border-border hover:bg-secondary/30 transition-colors duration-150">
                    <TableCell className="font-mono text-xs text-muted-foreground">{trade.ticket}</TableCell>
                    <TableCell>
                      <Badge variant={trade.type === "buy" ? "default" : "secondary"} className="text-xs gap-1">
                        {trade.type === "buy" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {trade.type.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-sm">{trade.item}</TableCell>
                    <TableCell className="text-sm">{trade.size}</TableCell>
                    <TableCell className="font-mono text-xs">{trade.openPrice.toLocaleString()}</TableCell>
                    <TableCell className="font-mono text-xs">{trade.closePrice.toLocaleString()}</TableCell>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{trade.openTime}</TableCell>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{trade.closeTime}</TableCell>
                    <TableCell className="text-right">
                      <span className={`font-semibold text-sm ${trade.profit >= 0 ? "text-success" : "text-destructive"}`}>
                        {trade.profit >= 0 ? "+" : ""}${fmt(Math.abs(trade.profit))}
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">
                      {trade.commission !== 0 ? `-$${fmt(Math.abs(trade.commission))}` : "—"}
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filtered.length === 0 && (
                <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <TableCell colSpan={10} className="text-center text-muted-foreground py-10 text-sm">No trades match the current filters.</TableCell>
                </motion.tr>
              )}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Showing {filtered.length} of {periodTrades.length} trades · {period}</p>
      </Card>
    </motion.div>
  );
};
export default TradeHistory;