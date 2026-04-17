import { color_vitality } from "../theme";

export const AVATAR_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCQhynbP1F2hinhCTYjL_vyYUY17a0i7T7keyTctZZ8pEvpQKLQVNKl1QStF8lYFOq4SAVWrM_7Sv54TiNyjySwAYDwjKSra699RVWZGTHQ370W9n8XuNUd8yTL6uj2UqxCVwaowCWLTSwK-JfQ_1lG9oxxSyv5ccnc5rPFNBYlZcF3r6_SsqU9oMZiBiBjke7XdsgbpgisKfZ1HQgERRL_uxC4rXwlmqratzGnjMr2cyA7digDOJvdhSFK9QjMZb1A61gnAHfU-IA";

export type ColorKey = "primary" | "secondary" | "tertiary";

export interface RawStat {
  label: string;
  level: number;
  xpToday: number;
  colorKey: ColorKey;
  progress: number;
  chartData: number[];
}

export const HERO_DATA = {
  level: 24,
  xp: 12_450,
  tier: "Master Novice",
  nextLevelXp: 15_000,
  progressPct: 0.68,
} as const;

export const STATS_DATA: RawStat[] = [
  {
    label: "Vitality",
    level: 18,
    xpToday: 240,
    colorKey: "tertiary",
    progress: 75,
    chartData: [30, 50, 40, 80, 60, 45, 90],
  },
  {
    label: "Focus",
    level: 12,
    xpToday: 15,
    colorKey: "secondary",
    progress: 45,
    chartData: [20, 10, 15, 25, 30, 20, 15],
  },
  {
    label: "Intellect",
    level: 31,
    xpToday: 840,
    colorKey: "primary",
    progress: 85,
    chartData: [40, 60, 50, 70, 85, 95, 80],
  },
  {
    label: "Spirit",
    level: 8,
    xpToday: 45,
    colorKey: "secondary",
    progress: 35,
    chartData: [10, 15, 20, 10, 30, 40, 25],
  },
  {
    label: "Social",
    level: 4,
    xpToday: 120,
    colorKey: "tertiary",
    progress: 25,
    chartData: [5, 8, 12, 20, 15, 25, 35],
  },
];
