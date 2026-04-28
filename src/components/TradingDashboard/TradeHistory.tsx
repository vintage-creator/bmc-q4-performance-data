import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { trades, equitiTrades, atlasTrades, Trade } from "@/data/tradingData";
import { Search, TrendingUp, TrendingDown } from "lucide-react";
import { Period, AccountFilter, PERIOD_LABELS } from "@/lib/types";

interface TradeHistoryProps { period?: Period; account?: AccountFilter; }

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

const getTradePool = (account: AccountFilter) => {
  if (account === "equiti") return equitiTrades;
  if (account === "atlas")  return atlasTrades;
  return trades; // combined
};

const PERIOD_DATE_LABEL: Record<Period, string> = {
  Q1:  "Q1 2026 · 28 Jan – 31 Mar",
  Q2:  "Q2 2026 · 1 Apr – 20 Apr",
  YTD: "Q1 + Q2 2026 · 28 Jan – 20 Apr",
};

export const TradeHistory = ({ period = "Q1", account = "equiti" }: TradeHistoryProps) => {
  const [search, setSearch]             = useState("");
  const [filterType, setFilterType]     = useState<"all" | "buy" | "sell">("all");
  const [filterResult, setFilterResult] = useState<"all" | "profit" | "loss">("all");
  const [filterItem, setFilterItem]     = useState<string>("all");
  const [filterAccount, setFilterAccount] = useState<"all" | "equiti" | "atlas">("all");

  const pool = getTradePool(account);

  const periodTrades =
    account === "atlas"
      ? atlasTrades // Atlas: all trades fall in the period; no date filtering needed
      : filterByPeriod(pool, period);

  const filtered = periodTrades.filter((t) => {
    const matchSearch   = !search || t.ticket.toLowerCase().includes(search.toLowerCase()) || t.item.toLowerCase().includes(search.toLowerCase());
    const matchType     = filterType   === "all" || t.type === filterType;
    const matchResult   = filterResult === "all" || (filterResult === "profit" && t.profit > 0) || (filterResult === "loss" && t.profit <= 0);
    const matchItem     = filterItem   === "all" || t.item === filterItem;
    const matchAccount  = filterAccount === "all" || t.account === filterAccount;
    return matchSearch && matchType && matchResult && matchItem && matchAccount;
  });

  const grossPnl = filtered.reduce((a, t) => a + t.profit, 0);
  const swapTotal = filtered.reduce((a, t) => a + (t.swap ?? 0), 0);
  const netPnl   = filtered.reduce((a, t) => a + t.profit + t.commission + (t.swap ?? 0), 0);

  const fmt = (n: number) =>
    n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const titleLabel =
    account === "combined"
      ? "Combined trade history · both accounts"
      : account === "atlas"
      ? "Atlas Prime · trade history · 3 Mar – 17 Apr 2026"
      : `Equiti · trade history · ${PERIOD_DATE_LABEL[period]}`;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
      <Card className="p-6 bg-card border-border">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <div>
            <h3 className="text-xl font-bold text-foreground">Trade history</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{titleLabel}</p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary border border-border">
              <span className="text-muted-foreground">Trades:</span>
              <span className="font-medium">{filtered.length}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary border border-border">
              <span className="text-muted-foreground">Gross P&amp;L:</span>
              <span className={`font-semibold ${grossPnl >= 0 ? "text-success" : "text-destructive"}`}>
                {grossPnl >= 0 ? "+" : ""}${fmt(Math.abs(grossPnl))}
              </span>
            </div>
            {swapTotal > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary border border-border">
                <span className="text-muted-foreground">Swap:</span>
                <span className="font-semibold text-success">+${fmt(swapTotal)}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary border border-border">
              <span className="text-muted-foreground">Net P&amp;L:</span>
              <span className={`font-semibold ${netPnl >= 0 ? "text-success" : "text-destructive"}`}>
                {netPnl >= 0 ? "+" : ""}${fmt(Math.abs(netPnl))}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-5 flex-wrap">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search ticket or instrument…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-secondary border-border text-sm h-9"
            />
          </div>
          {account === "combined" && (
            <Select value={filterAccount} onValueChange={(v: any) => setFilterAccount(v)}>
              <SelectTrigger className="w-full sm:w-[140px] bg-secondary border-border h-9 text-sm">
                <SelectValue placeholder="Account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All accounts</SelectItem>
                <SelectItem value="equiti">Equiti</SelectItem>
                <SelectItem value="atlas">Atlas Prime</SelectItem>
              </SelectContent>
            </Select>
          )}
          <Select value={filterType} onValueChange={(v: any) => setFilterType(v)}>
            <SelectTrigger className="w-full sm:w-[130px] bg-secondary border-border h-9 text-sm">
              <SelectValue placeholder="Direction" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All directions</SelectItem>
              <SelectItem value="buy">Buy</SelectItem>
              <SelectItem value="sell">Sell</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterResult} onValueChange={(v: any) => setFilterResult(v)}>
            <SelectTrigger className="w-full sm:w-[120px] bg-secondary border-border h-9 text-sm">
              <SelectValue placeholder="Result" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All results</SelectItem>
              <SelectItem value="profit">Profit</SelectItem>
              <SelectItem value="loss">Loss</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterItem} onValueChange={setFilterItem}>
            <SelectTrigger className="w-full sm:w-[150px] bg-secondary border-border h-9 text-sm">
              <SelectValue placeholder="Instrument" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All instruments</SelectItem>
              <SelectItem value="EURJPY">EUR/JPY (Atlas)</SelectItem>
              <SelectItem value="eurjpy.sd">EUR/JPY (Equiti)</SelectItem>
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
                {["Ticket", "Account", "Direction", "Instrument", "Size", "Open", "Close",
                  "Open time", "Close time", "Gross P&L", "Swap", "Commission"].map((h) => (
                  <TableHead
                    key={h}
                    className="text-muted-foreground text-xs font-medium uppercase tracking-wide"
                    style={["Gross P&L", "Swap", "Commission"].includes(h) ? { textAlign: "right" } : {}}
                  >
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence mode="popLayout">
                {filtered.map((trade, index) => (
                  <motion.tr
                    key={trade.ticket}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.22, delay: index * 0.015 }}
                    className="border-border hover:bg-secondary/30 transition-colors duration-150"
                  >
                    <TableCell className="font-mono text-xs text-muted-foreground">{trade.ticket}</TableCell>
                    <TableCell>
                      <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                        trade.account === "atlas"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                          : "bg-primary/10 text-primary"
                      }`}>
                        {trade.account === "atlas" ? "Atlas" : "Equiti"}
                      </span>
                    </TableCell>
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
                      {(trade.swap ?? 0) > 0 ? <span className="text-success">+${fmt(trade.swap!)}</span> : "—"}
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">
                      {trade.commission !== 0 ? `-$${fmt(Math.abs(trade.commission))}` : "—"}
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filtered.length === 0 && (
                <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <TableCell colSpan={12} className="text-center text-muted-foreground py-10 text-sm">
                    No trades match the current filters.
                  </TableCell>
                </motion.tr>
              )}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Showing {filtered.length} of {periodTrades.length} trades ·{" "}
          {account === "combined" ? "both accounts" : account === "atlas" ? "Atlas Prime" : `Equiti · ${period}`}
        </p>
      </Card>
    </motion.div>
  );
};

export default TradeHistory;