"use client";

import { Moon, Sun, User, Settings } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface NavbarProps {
  onSettingsChange?: (settings: {
    symbol: string;
    expiry: string;
    period: string;
    apiKey?: string;
    apiSecret?: string;
  }) => void;
  isLoading?: boolean;
}

export function Navbar({ onSettingsChange, isLoading }: NavbarProps) {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center px-4">
        <div className="mr-4 font-bold text-xl">Volatility Edge</div>
        
        <div className="flex items-center space-x-4 flex-1">
          <Select onValueChange={(value) => onSettingsChange?.({ symbol: value, expiry: "", period: "30" })}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select Pair" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BTC">BTC</SelectItem>
              <SelectItem value="ETH">ETH</SelectItem>
              <SelectItem value="XAUUSD">XAUUSD</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => onSettingsChange?.({ symbol: "", expiry: value, period: "30" })}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Expiry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="29MAR24">29 MAR 24</SelectItem>
              <SelectItem value="5APR24">5 APR 24</SelectItem>
              <SelectItem value="12APR24">12 APR 24</SelectItem>
            </SelectContent>
          </Select>

          {isLoading && (
            <div className="text-sm text-muted-foreground animate-pulse">
              Fetching data...
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>API Settings</SheetTitle>
                <SheetDescription>
                  Configure your Deribit API access and data preferences.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input id="apiKey" placeholder="Enter your API key" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="apiSecret">API Secret</Label>
                  <Input id="apiSecret" type="password" placeholder="Enter your API secret" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="period">Historical Data Period (days)</Label>
                  <Select onValueChange={(value) => onSettingsChange?.({ symbol: "", expiry: "", period: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <SheetFooter>
                <Button onClick={() => {/* Save settings */}}>Save Changes</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}