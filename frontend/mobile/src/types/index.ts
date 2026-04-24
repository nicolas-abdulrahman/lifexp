import type React from "react";
import { CardTheme } from "../theme";

export interface StatItem {
  label: string;
  level: number;
  xpToday: number;
  theme: CardTheme;
  icon: React.ReactNode;
  go_to: any;
  progress: number;
  data: number[];
}

export interface HeroData {
  level: number;
  xp: number;
  tier: string;
  nextLevelXp: number;
  progressPct: number;
}
