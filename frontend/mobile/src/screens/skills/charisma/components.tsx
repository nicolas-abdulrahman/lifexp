import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { appTheme } from "../../../theme";

export const GlassPanel = ({
  children,
  style,
  borderC = "rgba(120, 220, 119, 0.2)",
}: any) => (
  <View style={[styles.glass, { borderColor: borderC }, style]}>
    {children}
  </View>
);

export const ProgressChart = ({
  data,
  label,
  subtitle,
}: {
  data: number[];
  label: string;
  subtitle: string;
}) => (
  <GlassPanel style={styles.chartCard}>
    <div style={styles.header}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </div>
    <View style={styles.barContainer}>
      {data.map((h, i) => (
        <View
          key={i}
          style={[
            styles.bar,
            {
              height: `${h}%`,
              backgroundColor:
                i === data.length - 1
                  ? appTheme.colors.charisma.primary
                  : "rgba(120, 220, 119, 0.3)",
            },
          ]}
        />
      ))}
    </View>
  </GlassPanel>
);

export const RadiantGauge = ({ level, label, value, goal }: any) => {
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / goal) * circumference;

  return (
    <View style={styles.gaugeWrapper}>
      <View style={styles.gaugeContainer}>
        <Svg width="192" height="192" viewBox="0 0 192 192">
          <Circle
            cx="96"
            cy="96"
            r={radius}
            stroke={appTheme.colors.charisma.container}
            strokeWidth="8"
            fill="none"
          />
          <Circle
            cx="96"
            cy="96"
            r={radius}
            stroke={appTheme.colors.charisma.primary}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </Svg>
        <View style={styles.gaugeText}>
          <Text style={styles.levelText}>{level}</Text>
          <Text style={styles.gaugeLabel}>{label}</Text>
        </View>
      </View>
    </View>
  );
};

export const AllyItem = ({ name, rank, xp, color }: any) => (
  <View style={styles.allyCard}>
    <View style={styles.allyLeft}>
      <View
        style={[
          styles.avatarCircle,
          { backgroundColor: color + "33", borderColor: color + "50" },
        ]}
      >
        <Text style={{ color }}>P</Text>
      </View>
      <View>
        <Text style={styles.allyName}>{name}</Text>
        <Text style={styles.allyRank}>{rank}</Text>
      </View>
    </View>
    <View style={styles.allyRight}>
      <Text style={styles.xpLabel}>Shared XP</Text>
      <Text style={styles.xpValue}>{xp}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  glass: {
    backgroundColor: "rgba(30, 32, 30, 0.6)",
    borderRadius: appTheme.radius.soft,
    borderWidth: 1,
    padding: 20,
  },
  chartCard: { width: "100%" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  label: {
    ...appTheme.typography.label,
    color: appTheme.colors.charisma.primary,
  },
  subtitle: {
    ...appTheme.typography.caption,
    color: appTheme.colors.surface.onSurfaceVariant,
  },
  barContainer: {
    height: 120,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  bar: { flex: 1, borderRadius: 2 },
  gaugeWrapper: { alignItems: "center", justifyContent: "center", padding: 20 },
  gaugeContainer: {
    width: 192,
    height: 192,
    justifyContent: "center",
    alignItems: "center",
  },
  gaugeText: { position: "absolute", alignItems: "center" },
  levelText: { fontSize: 48, fontWeight: "900", color: "#fff" },
  gaugeLabel: {
    ...appTheme.typography.label,
    color: appTheme.colors.charisma.primary,
  },
  allyCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: appTheme.colors.surface.container,
    borderRadius: appTheme.radius.soft,
    borderWidth: 1,
    borderColor: "rgba(120, 220, 119, 0.1)",
    marginBottom: 10,
  },
  allyLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  allyName: { fontWeight: "bold", color: "#fff", fontSize: 14 },
  allyRank: {
    ...appTheme.typography.caption,
    color: appTheme.colors.charisma.tertiary,
  },
  allyRight: { alignItems: "flex-end" },
  xpLabel: {
    ...appTheme.typography.label,
    fontSize: 8,
    color: appTheme.colors.surface.onSurfaceVariant,
  },
  xpValue: { fontWeight: "bold", color: appTheme.colors.charisma.primary },
});
