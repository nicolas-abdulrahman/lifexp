import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Animated,
} from "react-native";
import { Settings, Plus, Heart, Brain, Sparkles } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { appTheme } from "../theme";
import { QuestCard } from "../components/QuestCard";

export default function QuestsScreen() {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const quests = [
    {
      title: "Drink Water 2L",
      progress: 50,
      icon: (
        <Heart
          size={30}
          color={appTheme.colors.tertiary}
          fill={appTheme.colors.tertiary}
        />
      ),
      color: appTheme.colors.tertiary,
      streak: "Day 4",
    },
    {
      title: "Deep Work 2hrs",
      progress: 75,
      icon: (
        <Brain
          size={30}
          color={appTheme.colors.secondary}
          fill={appTheme.colors.secondary}
        />
      ),
      color: appTheme.colors.secondary,
      streak: "Day 12",
    },
    {
      title: "Morning Meditation",
      progress: 100,
      icon: (
        <Sparkles
          size={30}
          color={appTheme.colors.primary}
          fill={appTheme.colors.primary}
        />
      ),
      color: appTheme.colors.primary,
      streak: "Completed",
      isCompleted: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top AppBar */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: "https://lh3.googleusercontent.com/..." }}
            style={styles.avatar}
          />
          <Text style={styles.levelText}>LEVEL 42 ARCHITECT</Text>
        </View>
        <TouchableOpacity style={styles.settingsBtn}>
          <Settings size={20} color={appTheme.colors.surface.onSurface} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Active quests Header */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Active quests</Text>
            <Text style={styles.sectionSubtitle}>
              Daily Synchronization required
            </Text>
          </View>
          <View style={styles.statusBadge}>
            <Animated.View
              style={[
                styles.pulseDot,
                {
                  opacity: pulseAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.4, 1],
                  }),
                },
              ]}
            />
            <Text style={styles.statusText}>3 IN PROGRESS</Text>
          </View>
        </View>

        {/* quest Grid */}
        <View style={styles.grid}>
          {quests.map((quest, index) => (
            <QuestCard
              key={index}
              title={quest.title}
              progress={quest.progress}
              icon={quest.icon}
              color={quest.color}
              streak={quest.streak}
              isCompleted={quest.isCompleted}
            />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fabContainer}>
        <LinearGradient
          colors={appTheme.colors.quest.fabGradient}
          style={styles.fab}
        >
          <Plus color="white" size={30} />
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: appTheme.colors.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: appTheme.spacing.page,
    paddingVertical: appTheme.spacing.md,
    backgroundColor: appTheme.colors.quest.headerBg,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(197, 154, 255, 0.1)",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: appTheme.spacing.md,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: appTheme.colors.primary,
  },
  levelText: {
    ...appTheme.typography.h2,
    color: appTheme.colors.primary,
    fontStyle: "italic",
    letterSpacing: 1,
  },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: appTheme.radius.pill,
    backgroundColor: appTheme.colors.surface.containerHigh,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    padding: appTheme.spacing.page,
    paddingBottom: 100,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: appTheme.spacing.lg,
  },
  sectionTitle: {
    ...appTheme.typography.h1,
    color: appTheme.colors.surface.onSurface,
  },
  sectionSubtitle: {
    ...appTheme.typography.label,
    color: appTheme.colors.surface.onSurfaceVariant,
    marginTop: 4,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: appTheme.colors.surface.containerHigh,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: appTheme.radius.pill,
    borderWidth: 1,
    borderColor: "rgba(197, 154, 255, 0.2)",
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: appTheme.colors.secondary,
    shadowColor: appTheme.colors.secondary,
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  statusText: {
    ...appTheme.typography.label,
    color: appTheme.colors.secondary,
    fontSize: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: appTheme.spacing.md,
  },
  fabContainer: { position: "absolute", bottom: 30, right: 20 },
  fab: {
    width: 64,
    height: 64,
    borderRadius: appTheme.radius.pill,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: appTheme.colors.primary,
    shadowOpacity: 0.5,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 5 },
  },
});
