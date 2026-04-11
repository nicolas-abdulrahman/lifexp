/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode } from "react";
import { motion } from "motion/react";
import { 
  Shield, 
  Target, 
  Book, 
  Sparkles, 
  MessageSquare, 
  Settings, 
  LayoutList, 
  BarChart3, 
  Backpack, 
  Map as MapIcon 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

const AVATAR_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuCQhynbP1F2hinhCTYjL_vyYUY17a0i7T7keyTctZZ8pEvpQKLQVNKl1QStF8lYFOq4SAVWrM_7Sv54TiNyjySwAYDwjKSra699RVWZGTHQ370W9n8XuNUd8yTL6uj2UqxCVwaowCWLTSwK-JfQ_1lG9oxxSyv5ccnc5rPFNBYlZcF3r6_SsqU9oMZiBiBjke7XdsgbpgisKfZ1HQgERRL_uxC4rXwlmqratzGnjMr2cyA7digDOJvdhSFK9QjMZb1A61gnAHfU-IA";

interface StatProps {
  label: string;
  level: number;
  xpToday: number;
  color: string;
  icon: ReactNode;
  progress: number;
  data: number[];
  key?: string | number;
}

const StatCard = ({ label, level, xpToday, color, icon, progress, data }: StatProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="group bg-surface-container-high rounded-lg p-5 flex items-center gap-6 hover:bg-surface-bright transition-all duration-300 shadow-lg"
    >
      {/* Circular Progress */}
      <div className="relative flex-shrink-0 w-20 h-20">
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
          <circle 
            className="text-surface-container-highest" 
            cx="50" cy="50" fill="none" r="45" 
            stroke="currentColor" strokeWidth="4" 
          />
          <motion.circle 
            initial={{ strokeDashoffset: 282.7 }}
            animate={{ strokeDashoffset: 282.7 - (282.7 * progress) / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={color}
            style={{ filter: `drop-shadow(0 0 8px ${color === 'text-tertiary' ? 'rgba(255,111,124,0.5)' : color === 'text-secondary' ? 'rgba(0,227,253,0.5)' : 'rgba(197,154,255,0.5)'})` }}
            cx="50" cy="50" fill="none" r="45" 
            stroke="currentColor" 
            strokeDasharray="282.7" 
            strokeWidth="6" 
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`${color} mb-0.5`}>{icon}</div>
          <span className="text-[10px] font-headline font-black text-white uppercase">LVL {level}</span>
        </div>
      </div>

      {/* Info & Chart */}
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-2">
          <span className="font-headline font-extrabold text-sm uppercase tracking-widest text-on-surface">{label}</span>
          <span className={`text-[10px] font-label font-bold ${color}`}>+{xpToday} XP Today</span>
        </div>
        
        {/* Activity Chart */}
        <div className="h-12 w-full flex items-end gap-1.5">
          <div className="bg-white/5 w-full h-full rounded-md relative overflow-hidden">
            <div className={`absolute bottom-0 left-0 w-full h-[40%] chart-gradient-mask ${color.replace('text-', 'bg-')}/20`} />
            <div className="absolute inset-0 flex items-end px-2 gap-1.5">
              {data.map((val, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${val}%` }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className={`${color.replace('text-', 'bg-')} w-full rounded-t-sm opacity-80 group-hover:opacity-100 transition-opacity`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const stats = [
    { label: "Vitality", level: 18, xpToday: 240, color: "text-tertiary", icon: <Shield size={18} />, progress: 75, data: [30, 50, 40, 80, 60, 45, 90] },
    { label: "Focus", level: 12, xpToday: 15, color: "text-secondary", icon: <Target size={18} />, progress: 45, data: [20, 10, 15, 25, 30, 20, 15] },
    { label: "Intellect", level: 31, xpToday: 840, color: "text-primary", icon: <Book size={18} />, progress: 85, data: [40, 60, 50, 70, 85, 95, 80] },
    { label: "Spirit", level: 8, xpToday: 45, color: "text-secondary", icon: <Sparkles size={18} />, progress: 35, data: [10, 15, 20, 10, 30, 40, 25] },
    { label: "Social", level: 4, xpToday: 120, color: "text-tertiary", icon: <MessageSquare size={18} />, progress: 25, data: [5, 8, 12, 20, 15, 25, 35] },
  ];

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans selection:bg-primary/30 pb-32">
      {/* Top Bar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md flex justify-between items-center px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border-2 border-primary ring-2 ring-primary/20">
            <AvatarImage src={AVATAR_URL} alt="Archmage" />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary-dim font-headline font-black uppercase tracking-widest text-xs">
            LVL 42 ARCHMAGE
          </span>
        </div>
        <button className="text-primary hover:text-primary-dim transition-colors active:scale-90">
          <Settings size={20} />
        </button>
      </header>

      <main className="pt-24 px-6 max-w-2xl mx-auto space-y-6">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative p-8 rounded-lg bg-surface-container overflow-hidden shadow-2xl border border-white/5"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Sparkles size={120} className="text-primary" />
          </div>
          
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-primary-dim font-headline font-bold text-[10px] tracking-widest uppercase mb-1">Global Standing</p>
                <h1 className="text-5xl font-headline font-extrabold text-white tracking-tight">Level 24</h1>
              </div>
              <div className="text-right">
                <div className="text-secondary font-headline font-black text-2xl flex items-baseline gap-1">
                  12,450 <span className="text-on-surface-variant text-xs font-medium uppercase tracking-tighter">XP</span>
                </div>
              </div>
            </div>

            {/* Main Progress Bar */}
            <div className="space-y-2">
              <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden p-0.5 border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "68%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-secondary to-primary shadow-[0_0_15px_rgba(0,227,253,0.3)]"
                />
              </div>
              <div className="flex justify-between text-[9px] font-headline font-black uppercase tracking-widest text-on-surface-variant">
                <span>Tier: Master Novice</span>
                <span>Next Level: 15,000 XP</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Stats Grid */}
        <div className="space-y-4">
          {stats.map((stat) => (
            <StatCard 
              key={stat.label} 
              label={stat.label}
              level={stat.level}
              xpToday={stat.xpToday}
              color={stat.color}
              icon={stat.icon}
              progress={stat.progress}
              data={stat.data}
            />
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center pt-4 pb-10 px-6 bg-surface-container/90 backdrop-blur-xl rounded-t-[2.5rem] border-t border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-50">
        <NavItem icon={<LayoutList size={22} />} label="Quests" />
        <NavItem icon={<BarChart3 size={22} />} label="Stats" active />
        <NavItem icon={<Backpack size={22} />} label="Inventory" />
        <NavItem icon={<MapIcon size={22} />} label="Map" />
      </nav>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: ReactNode; label: string; active?: boolean }) {
  return (
    <button className={`flex flex-col items-center gap-1.5 transition-all active:scale-90 ${active ? 'text-secondary drop-shadow-[0_0_8px_rgba(0,227,253,0.5)]' : 'text-on-surface-variant hover:text-primary'}`}>
      {icon}
      <span className="font-headline font-bold text-[9px] uppercase tracking-widest">{label}</span>
    </button>
  );
}
