import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { appTheme } from "../theme";

interface RitualCardProps {
  title: string;
  progress: number; // 0 to 100
  icon: React.ReactNode;
  color: string;
  streak: string;
  isCompleted?: boolean;
}

export const QuestCard = ({
  title,
  progress,
  icon,
  color,
  streak,
  isCompleted,
}: RitualCardProps) => {
  // SVG Circle Math
  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <Pressable style={styles.card}>
      {({ pressed }) => (
        <>
          {/* Subtle BG Glow (Simulates Hover) */}
          <LinearGradient
            colors={[color + "20", "transparent"]}
            style={[styles.glow, { opacity: pressed ? 1 : 0 }]}
          />

          <Text style={styles.title}>{title}</Text>

          {/* Circular Gauge */}
          <View style={styles.gaugeContainer}>
            <Svg width="112" height="112" viewBox="0 0 36 36">
              {/* Background Circle */}
              <Circle
                cx="18"
                cy="18"
                r={radius}
                stroke={appTheme.colors.surface.containerHigh}
                strokeWidth="3.8"
                fill="none"
              />
              {/* Progress Circle */}
              <Circle
                cx="18"
                cy="18"
                r={radius}
                stroke={color}
                strokeWidth="2.8"
                fill="none"
                strokeDasharray={`${circumference}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </Svg>
            <View style={styles.iconCenter}>{icon}</View>
          </View>

          {/* Streak / Status Badge */}
          <View
            style={[
              styles.badge,
              isCompleted && {
                backgroundColor: color + "33",
                borderColor: color + "50",
              },
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                {
                  color: isCompleted
                    ? color
                    : appTheme.colors.surface.onSurface,
                },
              ]}
            >
              {streak}
            </Text>
          </View>
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "47%",
    aspectRatio: 1,
    backgroundColor: appTheme.colors.surface.containerHigh,
    borderRadius: appTheme.radius.soft,
    padding: appTheme.spacing.md,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(197, 154, 255, 0.1)",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  glow: {
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    ...appTheme.typography.h2,
    textAlign: "center",
    color: appTheme.colors.surface.onSurface,
    marginBottom: appTheme.spacing.sm,
    zIndex: 10,
  },
  gaugeContainer: {
    width: 112,
    height: 112,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  iconCenter: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    marginTop: appTheme.spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: appTheme.radius.pill,
    borderWidth: 1,
    borderColor: "rgba(197, 154, 255, 0.2)",
    zIndex: 10,
  },
  badgeText: {
    ...appTheme.typography.label,
    fontSize: 11,
  },
});
