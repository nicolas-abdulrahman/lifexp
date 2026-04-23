import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import Svg, { Circle } from "react-native-svg";
import type { StatItem } from "../types";
import { CardTheme, appTheme } from "../theme";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const RADIUS = 40; // Reduced from 45
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const CHART_HEIGHT = 44; // Reduced from 44

export default function StatCard({
  label,
  level,
  xpToday,
  theme,
  icon,
  progress = 0,
  data = [],
}: StatItem) {
  const strokeOffset = useRef(new Animated.Value(CIRCUMFERENCE)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const cardTranslateY = useRef(new Animated.Value(20)).current;

  const [barAnims, setBarAnims] = useState(() =>
    data.map(() => new Animated.Value(0)),
  );

  const styles = useMemo(() => createStyle(theme), [theme]);

  useEffect(() => {
    if (data.length !== barAnims.length) {
      setBarAnims(data.map(() => new Animated.Value(0)));
      return;
    }

    cardOpacity.setValue(0);
    cardTranslateY.setValue(20);
    strokeOffset.setValue(CIRCUMFERENCE);
    barAnims.forEach((anim) => anim.setValue(0));

    const safeProgress = Number.isNaN(progress) ? 0 : progress;

    Animated.parallel([
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(cardTranslateY, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(strokeOffset, {
        toValue: CIRCUMFERENCE - (CIRCUMFERENCE * safeProgress) / 100,
        duration: 1200,
        useNativeDriver: false,
      }),
      Animated.stagger(
        60,
        barAnims.map((anim) =>
          Animated.timing(anim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: false,
          }),
        ),
      ),
    ]).start();
  }, [data, progress]);

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
      <View style={styles.containerCircle}>
        <View style={styles.circularWrapper}>
          <Svg width={70} height={70} viewBox="0 0 100 100" style={styles.svg}>
            <Circle
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              stroke={theme.onSurface}
              strokeWidth="2"
              opacity={0.2}
            />
            <AnimatedCircle
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              stroke={theme.glowColor}
              strokeWidth="4"
              strokeDasharray={`${CIRCUMFERENCE}`}
              strokeDashoffset={strokeOffset}
              strokeLinecap="round"
            />
          </Svg>

          <View style={styles.circularInner}>
            <View style={[styles.iconContainer]}>{icon}</View>
          </View>
        </View>
        <Text style={{ color: theme.foreground }}>Lv 8</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={[styles.statLabel, { color: theme.foreground }]}>
            {label}
          </Text>
          <Text
            style={[
              styles.xpText,
              { color: theme.foreground },
              { opacity: 0.4 },
            ]}
          >
            +{xpToday} XP
          </Text>
        </View>

        <View style={styles.chartContainer}>
          <View
            style={[
              styles.chartHalf,
              styles.chartHalfTop,
              { backgroundColor: theme.surfaceChartTop },
            ]}
          />
          <View
            style={[
              styles.chartHalf,
              styles.chartHalfBottom,
              { backgroundColor: theme.surfaceChartBottom },
            ]}
          />
          <View
            style={[
              styles.dividerLine,
              { backgroundColor: theme.chartDivider },
            ]}
          />

          {data.map((val, i) => {
            const anim = barAnims[i] || new Animated.Value(0);
            const targetHeight = Math.max(
              0,
              ((val || 0) / 100) * (CHART_HEIGHT - 8),
            );

            return (
              <Animated.View
                key={i}
                style={[
                  styles.bar,
                  { backgroundColor: theme.glowColor },
                  {
                    height: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, targetHeight],
                    }),
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
    </Animated.View>
  );
}

function createStyle(theme: CardTheme) {
  return StyleSheet.create({
    card: {
      // ADDING TRANSPARENCY: 'CC' at the end makes it ~80% opaque.
      // This allows the background purple to bleed through, removing the "box" feel.
      backgroundColor: theme.surface + "CC",
      borderRadius: 20,
      paddingVertical: 12, // Reduced from 18
      paddingHorizontal: 16, // Reduced from 22
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      borderWidth: 1,
      borderColor: theme.border + "30", // Very subtle edge
      elevation: theme.shadow?.elevation || 8,
      shadowColor: theme.shadow?.shadowColor || "#000",
      shadowOffset: theme.shadow?.shadowOffset || { width: 0, height: 6 },
      shadowOpacity: theme.shadow?.shadowOpacity || 0.3,
      shadowRadius: theme.shadow?.shadowRadius || 12,
    },
    circularWrapper: {
      width: 70, // Reduced from 90
      height: 70,
      justifyContent: "center",
      alignItems: "center",
      flexShrink: 0,
    },
    svg: {
      position: "absolute",
      transform: [{ rotate: "-90deg" }],
    },
    circularInner: {
      alignItems: "center",
      justifyContent: "center",
    },
    iconContainer: {
      width: 30, // Reduced from 38
      height: 30,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 2,
      borderWidth: 1,
    },
    levelText: {
      fontSize: 9,
      fontWeight: "800",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    infoContainer: {
      flex: 1,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: 8, // Reduced from 12
    },
    statLabel: {
      fontSize: 15, // Reduced from 17
      fontWeight: "700",
      letterSpacing: 0.3,
    },
    xpText: {
      fontSize: 11,
      fontWeight: "600",
    },
    chartContainer: {
      height: CHART_HEIGHT,
      flexDirection: "row",
      alignItems: "flex-end",
      gap: 3,
      borderRadius: 8,
      paddingHorizontal: 6,
      paddingBottom: 3,
      overflow: "hidden",
      position: "relative",
    },
    chartHalf: {
      position: "absolute",
      left: 0,
      right: 0,
      width: "100%",
    },
    chartHalfTop: {
      top: 0,
      height: "50%",
    },
    chartHalfBottom: {
      bottom: 0,
      height: "50%",
    },
    dividerLine: {
      position: "absolute",
      top: "50%",
      left: 0,
      right: 0,
      height: 1,
      zIndex: 1,
    },
    containerCircle: {
      // 1. Establish the size of the container
      width: 80,
      height: 80,
      borderRadius: 40, // Half of width/height to make it a circle

      // 2. Alignment logic
      // flexDirection: "column" is default, so items stack top-to-bottom
      alignItems: "center", // Centers items horizontally (Left-to-Right)
      justifyContent: "center", // Centers items vertically (Top-to-Bottom)

      // 3. Optional: Add your theme background
      backgroundColor: theme.surface,
    },
    bar: {
      flex: 1,
      borderRadius: 0,
      opacity: 0.9,
      zIndex: 2,
    },
  });
}
