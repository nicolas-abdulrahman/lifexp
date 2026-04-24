import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { appTheme } from "../theme";

interface RitualCardProps {
  title: string;
  progress: number;
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
  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <Pressable style={styles.card}>
      {({ pressed }) => (
        <>
          <LinearGradient
            colors={[color + "20", "transparent"]}
            style={[styles.glow, { opacity: pressed ? 1 : 0 }]}
          />

          {/* 1. Added numberOfLines to prevent text wrapping from pushing content down */}
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>

          {/* 2. Scaled Gauge from 112 -> 80.
              Because we use viewBox, the circle math stays perfect. */}
          <View style={styles.gaugeContainer}>
            <Svg width="80" height="80" viewBox="0 0 36 36">
              <Circle
                cx="18"
                cy="18"
                r={radius}
                stroke={appTheme.colors.surface.containerHigh}
                strokeWidth="3.8"
                fill="none"
              />
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
    // 3. Reduced padding from md (16) to sm (8) to reclaim 32px of vertical space
    padding: appTheme.spacing.sm,
    alignItems: "center",
    justifyContent: "center",
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
    // 4. Tightened margin
    marginBottom: 4,
    zIndex: 10,
    fontSize: 13, // Slightly smaller to ensure fit
  },
  gaugeContainer: {
    width: 80, // Reduced from 112
    height: 80, // Reduced from 112
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
    marginTop: 4, // Reduced from spacing.sm
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: appTheme.radius.pill,
    borderWidth: 1,
    borderColor: "rgba(197, 154, 255, 0.2)",
    zIndex: 10,
  },
  badgeText: {
    ...appTheme.typography.label,
    fontSize: 10,
  },
});
