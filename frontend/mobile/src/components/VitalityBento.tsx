import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle } from "react-native-svg";
import { Shield, Bean, Timer } from "lucide-react-native";
import { appTheme } from "../theme";
import { DiamondWrapper } from "./vitalityShapes";

const q = appTheme.colors.quest; // Shortcut for cleaner code

export const CarbsCard = () => (
  <View style={styles.card}>
    <View style={styles.header}>
      <View style={styles.left}>
        <DiamondWrapper>
          <Shield size={20} color={q.accent} />
        </DiamondWrapper>
        <View>
          <Text style={styles.label}>CARBS INTAKE</Text>
          <Text style={styles.value}>
            150<Text style={styles.subValue}>/ 250g</Text>
          </Text>
        </View>
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>60% RECHARGED</Text>
      </View>
    </View>
    <View style={styles.progressBg}>
      <LinearGradient
        colors={[q.accentDark, q.accent, q.accentLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.progressFill, { width: "60%" }]}
      />
    </View>
    <View style={styles.footer}>
      <Text style={styles.footerText}>BASE ENERGY</Text>
      <Text style={styles.footerText}>MANA CAP REACHED</Text>
    </View>
  </View>
);

export const SleepCard = () => (
  <View style={styles.card}>
    <View style={styles.header}>
      <View style={styles.iconBox}>
        <Bean size={20} color={q.accent} />
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <Text style={styles.label}>REST STATE</Text>
        <Text style={styles.value}>7.5h</Text>
      </View>
    </View>
    <View style={styles.graph}>
      {[40, 60, 50, 70, 90, 40, 30].map((h, i) => (
        <View
          key={i}
          style={[
            styles.bar,
            {
              height: h,
              backgroundColor: i > 3 ? q.accent : q.accentDark + "66",
            },
          ]}
        />
      ))}
    </View>
    <View style={styles.days}>
      {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => (
        <Text key={d} style={styles.dayText}>
          {d}
        </Text>
      ))}
    </View>
  </View>
);

export const MovementCard = () => (
  <View style={[styles.card, { alignItems: "center" }]}>
    <View style={styles.ringContainer}>
      <Svg width="120" height="120" viewBox="0 0 100 100">
        <Circle
          cx="50"
          cy="50"
          r="45"
          stroke={q.accentDeep + "40"}
          strokeWidth="8"
          fill="none"
        />
        <Circle
          cx="50"
          cy="50"
          r="45"
          stroke={q.accent}
          strokeWidth="8"
          fill="none"
          strokeDasharray="283"
          strokeDashoffset="100"
          strokeLinecap="round"
        />
      </Svg>
      <View style={styles.ringContent}>
        <Timer size={24} color={q.accent} />
        <Text style={styles.ringValue}>45</Text>
        <Text style={styles.ringLabel}>MINUTES</Text>
      </View>
    </View>
    <Text style={styles.label}>STAMINA BURN</Text>
    <Text style={styles.subLabel}>72% OF DAILY QUEST</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: q.surfaceHigh,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: q.accentDark + "33",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  left: { flexDirection: "row", alignItems: "center", gap: 12 },
  label: {
    color: "#cac4d0",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },
  value: { color: "#fff", fontSize: 24, fontWeight: "900" },
  subValue: { fontSize: 14, color: q.accent + "80", marginLeft: 4 },
  badge: {
    backgroundColor: q.accent + "1A",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: q.accent + "33",
  },
  badgeText: { color: q.accent, fontSize: 9, fontWeight: "800" },
  progressBg: {
    height: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: q.accentDark + "4D",
  },
  progressFill: { height: "100%" },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  footerText: { color: q.accentDark, fontSize: 9, fontWeight: "800" },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: q.accent + "4D",
  },
  graph: {
    height: 80,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 4,
  },
  bar: { flex: 1, borderRadius: 2 },
  days: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  dayText: { color: q.accentDark, fontSize: 8, fontWeight: "900" },
  ringContainer: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  ringContent: { position: "absolute", alignItems: "center" },
  ringValue: { color: "#fff", fontSize: 20, fontWeight: "900" },
  ringLabel: { color: q.accent, fontSize: 8, fontWeight: "800" },
  subLabel: {
    color: q.accent + "99",
    fontSize: 10,
    fontWeight: "800",
    marginTop: 4,
  },
});
