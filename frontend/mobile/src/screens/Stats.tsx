import React, { useState } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  StyleSheet,
} from "react-native";
import { STATS_DATA } from "../constants/data";
import type { StatItem } from "../types";
import StatCard from "../components/StatCard";
import { appTheme, cardTheme, skills } from "../theme";
import VitalityScreen from "./stats/Vitality";
import FocusScreen from "./stats/Focus";
import IntellectScreen from "./stats/Intellect";
import SpiritScreen from "./stats/Spirit";
import CharismaScreen from "./stats/Charisma";

const PANEL_HEIGHT = 560;

const SCREEN_MAP: Record<string, React.ReactNode> = {
  vitality: (
    <View style={{ height: PANEL_HEIGHT }}>
      <VitalityScreen />
    </View>
  ),
  focus: (
    <View style={{ height: PANEL_HEIGHT }}>
      <FocusScreen />
    </View>
  ),
  intelligence: (
    <View style={{ height: PANEL_HEIGHT }}>
      <IntellectScreen />
    </View>
  ),
  spirit: (
    <View style={{ height: PANEL_HEIGHT }}>
      <SpiritScreen />
    </View>
  ),
  charisma: (
    <View style={{ height: PANEL_HEIGHT }}>
      <CharismaScreen />
    </View>
  ),
};

let idx = 0;
const stats: StatItem[] = Object.entries(skills).map(([key, c]) => {
  const raw = STATS_DATA[idx++];
  const Icon = c.icon;
  const theme = cardTheme.from(c);
  return {
    label: raw.label,
    level: raw.level,
    xpToday: raw.xpToday,
    theme,
    icon: <Icon size={22} color={theme.glowColor} />,
    go_to: SCREEN_MAP[key],
    on_press: handleToggle,
    progress: raw.progress,
    data: raw.chartData,
  };
});

export default function Stats() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const Container = Platform.OS === "web" ? View : SafeAreaView;
  const handleToggle = (id: string) => {
    if (id === expandedId) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };
  return (
    <Container style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={appTheme.colors.surface.main}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsList}>
          {stats.map((stat) => (
            <View
              style={{
                display: expandedId !== stat.label ? "none" : "flex",
              }}
            >
              <StatCard key={stat.label} {...stat} />
            </View>
          ))}
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    gap: 20,
  },
  statsList: {
    gap: 12,
  },
});
