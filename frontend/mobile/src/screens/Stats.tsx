import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Platform,
} from "react-native";
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
  Map,
} from "lucide-react-native";
import { colors } from "../theme";
import { styles } from "./Stats.styles";
import { AVATAR_URL, STATS_DATA, HERO_DATA } from "../constants/data";
import type { StatItem } from "../types";
import StatCard from "../components/StatCard";
import NavItem from "../components/NavItem";
import HeroCard from "../components/HeroCard";

// ── Map raw data to full StatItem (resolves color + injects icon element) ──
const STAT_ICONS: Record<
  string,
  React.ComponentType<{ size: number; color: string }>
> = {
  Vitality: Shield,
  Focus: Target,
  Intellect: Book,
  Spirit: Sparkles,
  Social: MessageSquare,
};

const stats: StatItem[] = STATS_DATA.map((raw, index) => {
  const color = colors[raw.colorKey];
  const Icon = STAT_ICONS[raw.label];
  return {
    label: raw.label,
    level: raw.level,
    xpToday: raw.xpToday,
    color,
    icon: <Icon size={18} color={color} />,
    progress: raw.progress,
    data: raw.chartData,
  };
});

export default function Stats() {
  // On web the PhoneFrame provides the inset strips, so SafeAreaView is not needed
  const Container = Platform.OS === "web" ? View : SafeAreaView;

  return (
    <Container style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.surface} />

      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarRing}>
            <Image source={{ uri: AVATAR_URL }} style={styles.avatar} />
          </View>
          <Text style={styles.headerTitle}></Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Settings size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* ── Scrollable body ── */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsList}>
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </View>
      </ScrollView>

      {/* ── Bottom navigation ── */}
      <View style={styles.bottomNav}>
        <NavItem icon={LayoutList} label="Quests" />
        <NavItem icon={BarChart3} label="Stats" active />
        <NavItem icon={Backpack} label="Inventory" />
        <NavItem icon={Map} label="Map" />
      </View>
    </Container>
  );
}
