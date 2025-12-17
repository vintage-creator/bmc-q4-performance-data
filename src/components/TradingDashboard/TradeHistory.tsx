import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trades, Trade } from "@/data/tradingData";
import { Search, TrendingUp, TrendingDown } from "lucide-react";

export const TradeHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "buy" | "sell">("all");
  const [filterProfit, setFilterProfit] = useState<"all" | "profit" | "loss">("all");

  const filteredTrades = trades.filter((trade) => {
    const matchesSearch = 
      trade.ticket.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trade.item.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || trade.type === filterType;
    const matchesProfit = 
      filterProfit === "all" || 
      (filterProfit === "profit" && trade.profit > 0) ||
      (filterProfit === "loss" && trade.profit < 0);

    return matchesSearch && matchesType && matchesProfit;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card className="p-6 bg-card border-border">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <h3 className="text-xl font-bold text-foreground">Trade History</h3>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search ticket or item..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-secondary border-border"
              />
            </div>
            
            <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
              <SelectTrigger className="w-full sm:w-[130px] bg-secondary border-border">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="buy">Buy</SelectItem>
                <SelectItem value="sell">Sell</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterProfit} onValueChange={(value: any) => setFilterProfit(value)}>
              <SelectTrigger className="w-full sm:w-[130px] bg-secondary border-border">
                <SelectValue placeholder="Result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Results</SelectItem>
                <SelectItem value="profit">Profit</SelectItem>
                <SelectItem value="loss">Loss</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-secondary/50">
                <TableHead className="text-muted-foreground">Ticket</TableHead>
                <TableHead className="text-muted-foreground">Type</TableHead>
                <TableHead className="text-muted-foreground">Item</TableHead>
                <TableHead className="text-muted-foreground">Size</TableHead>
                <TableHead className="text-muted-foreground">Open Price</TableHead>
                <TableHead className="text-muted-foreground">Close Price</TableHead>
                <TableHead className="text-muted-foreground">Open Time</TableHead>
                <TableHead className="text-muted-foreground">Close Time</TableHead>
                <TableHead className="text-muted-foreground text-right">Profit/Loss</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrades.map((trade, index) => (
                <motion.tr
                  key={trade.ticket}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className="border-border hover:bg-secondary/30 transition-colors"
                >
                  <TableCell className="font-mono text-sm">{trade.ticket}</TableCell>
                  <TableCell>
                    <Badge variant={trade.type === "buy" ? "default" : "secondary"}>
                      {trade.type === "buy" ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                      {trade.type.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{trade.item}</TableCell>
                  <TableCell>{trade.size}</TableCell>
                  <TableCell className="font-mono text-sm">${trade.openPrice.toLocaleString()}</TableCell>
                  <TableCell className="font-mono text-sm">${trade.closePrice.toLocaleString()}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{trade.openTime}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{trade.closeTime}</TableCell>
                  <TableCell className="text-right">
                    <span className={`font-bold ${trade.profit >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {trade.profit >= 0 ? '+' : ''}{trade.profit >= 0 ? '$' : '-$'}{Math.abs(trade.profit).toFixed(2)}
                    </span>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          Showing {filteredTrades.length} of {trades.length} trades
        </div>
      </Card>
    </motion.div>
  );
};
