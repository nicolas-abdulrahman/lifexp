import type React from 'react';

export interface StatItem {
  label: string;
  level: number;
  xpToday: number;
  color: string;
  icon: React.ReactNode;
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
