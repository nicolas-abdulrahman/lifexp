import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Sparkles } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme";
import type { HeroData } from "../types";

export default function HeroCard({
  level,
  xp,
  tier,
  nextLevelXp,
  progressPct,
}: HeroData) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.95)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(progressAnim, {
        toValue: progressPct,
        duration: 1500,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <Animated.View
      style={[styles.card, { opacity, transform: [{ scale }] }]}
    >
      {/* Decorative background sparkle */}
      <View style={styles.decor} pointerEvents="none">
        <Sparkles size={120} color={colors.primary} />
      </View>

      <View style={styles.content}>
        {/* Level + XP row */}
        <View style={styles.topRow}>
          <View>
            <Text style={styles.subtitle}>Global Standing</Text>
            <Text style={styles.levelText}>Level {level}</Text>
          </View>
          <View style={styles.xpGroup}>
            <Text style={styles.xpAmount}>{xp.toLocaleString()}</Text>
            <Text style={styles.xpUnit}>XP</Text>
          </View>
        </View>

        {/* Animated gradient progress bar */}
        <View style={styles.progressSection}>
          <View style={styles.progressTrack}>
            <Animated.View
              style={[styles.progressFillWrapper, { width: progressWidth }]}
            >
              <LinearGradient
                colors={[colors.secondary, colors.primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.progressGradient}
              />
            </Animated.View>
          </View>
          <View style={styles.progressMeta}>
            <Text style={styles.progressMetaText}>Tier: {tier}</Text>
            <Text style={styles.progressMetaText}>
              Next Level: {nextLevelXp.toLocaleString()} XP
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    padding: 28,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  decor: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 16,
    opacity: 0.05,
  },
  content: {
    gap: 18,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  subtitle: {
    color: colors.primaryDim,
    fontSize: 9,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 4,
  },
  levelText: {
    color: colors.white,
    fontSize: 46,
    fontWeight: "800",
    letterSpacing: -1,
    lineHeight: 50,
  },
  xpGroup: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
  },
  xpAmount: {
    color: colors.secondary,
    fontSize: 24,
    fontWeight: "900",
    lineHeight: 28,
  },
  xpUnit: {
    color: colors.onSurfaceVariant,
    fontSize: 11,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 2,
  },
  progressSection: {
    gap: 8,
  },
  progressTrack: {
    height: 12,
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 999,
    overflow: "hidden",
    padding: 2,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  progressFillWrapper: {
    height: "100%",
    borderRadius: 999,
    overflow: "hidden",
  },
  progressGradient: {
    flex: 1,
    borderRadius: 999,
  },
  progressMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressMetaText: {
    color: colors.onSurfaceVariant,
    fontSize: 9,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
});
