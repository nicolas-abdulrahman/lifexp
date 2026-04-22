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
  StyleSheet,
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
import { AVATAR_URL, STATS_DATA, HERO_DATA } from "../constants/data";
import type { StatItem } from "../types";
import StatCard from "../components/StatCard";
import NavItem from "../components/NavItem";
import HeroCard from "../components/HeroCard";

import { appTheme, cardTheme, palletes } from "../theme";

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

var i = 0;
const stats: StatItem[] = Object.entries(palletes).map(([key, c]) => {
  const color = c;
  const raw = STATS_DATA[0];
  const Icon = STAT_ICONS[raw.label];
  const theme = cardTheme.from(c);
  i++;
  return {
    label: raw.label,
    level: raw.level,
    xpToday: raw.xpToday,
    theme,
    icon: <Icon size={18} color={theme.glowColor} />,
    progress: raw.progress,
    data: raw.chartData,
  };
});

export default function Stats() {
  // On web the PhoneFrame provides the inset strips, so SafeAreaView is not needed
  const Container = Platform.OS === "web" ? View : SafeAreaView;

  return (
    <Container style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={appTheme.colors.surface.main}
      />

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
          <Settings size={20} color={appTheme.colors.primary} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.colors.background,
  },

  // ── Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 14,
    backgroundColor: "rgba(16,11,27,0.92)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarRing: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: appTheme.colors.primary,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  headerTitle: {
    color: appTheme.colors.primary,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 3,
  },

  // ── Scroll
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    gap: 20,
  },

  // ── Stats list
  statsList: {
    gap: 12,
  },

  // ── Bottom nav
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 14,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: "rgba(28,22,42,0.96)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
});
