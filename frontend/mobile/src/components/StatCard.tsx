import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { colors } from "../theme";
import type { StatItem } from "../types";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const RADIUS = 45;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ≈ 282.74
const CHART_HEIGHT = 48;

export default function StatCard({
  label,
  level,
  xpToday,
  color,
  icon,
  progress,
  data,
}: StatItem) {
  const strokeOffset = useRef(new Animated.Value(CIRCUMFERENCE)).current;
  const barAnims = useRef(data.map(() => new Animated.Value(0))).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const cardTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(cardTranslateY, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(strokeOffset, {
        toValue: CIRCUMFERENCE - (CIRCUMFERENCE * progress) / 100,
        duration: 1500,
        useNativeDriver: false,
      }),
      Animated.stagger(
        50,
        barAnims.map((anim) =>
          Animated.timing(anim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
          }),
        ),
      ),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: cardOpacity,
          transform: [{ translateY: cardTranslateY }],
        },
      ]}
    >
      {/* Circular Progress Ring */}
      <View style={styles.circularWrapper}>
        <Svg width={80} height={80} viewBox="0 0 100 100" style={styles.svg}>
          {/* Track ring */}
          <Circle
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            stroke={colors.surfaceBright}
            strokeWidth="4"
          />
          {/* Animated progress ring */}
          <AnimatedCircle
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeDasharray={`${CIRCUMFERENCE}`}
            strokeDashoffset={strokeOffset}
            strokeLinecap="round"
          />
        </Svg>

        {/* Icon + Level overlay */}
        <View style={styles.circularInner}>
          {icon}
          <Text style={[styles.levelText, { color }]}>LVL {level}</Text>
        </View>
      </View>

      {/* Label, XP, and Bar Chart */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.statLabel}>{label}</Text>
          <Text style={[styles.xpText, { color }]}>+{xpToday} XP Today</Text>
        </View>

        {/* Animated bar chart */}
        <View style={styles.chartContainer}>
          {data.map((val, i) => (
            <Animated.View
              key={i}
              style={[
                styles.bar,
                { backgroundColor: color },
                {
                  height: barAnims[i].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, (val / 100) * (CHART_HEIGHT - 12)],
                  }),
                },
              ]}
            />
          ))}
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.04)",
  },
  circularWrapper: {
    width: 80,
    height: 80,
    flexShrink: 0,
  },
  svg: {
    transform: [{ rotate: "-90deg" }],
  },
  circularInner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  levelText: {
    fontSize: 9,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 3,
  },
  infoContainer: {
    flex: 1,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  statLabel: {
    color: colors.onSurface,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  xpText: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  chartContainer: {
    height: CHART_HEIGHT,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 3,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingBottom: 6,
    overflow: "hidden",
  },
  bar: {
    flex: 1,
    borderRadius: 2,
    opacity: 0.85,
  },
});
