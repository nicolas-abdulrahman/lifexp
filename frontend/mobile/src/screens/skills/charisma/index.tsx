import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import { School, Shield, Group, Settings } from "lucide-react-native";
import { appTheme } from "../../../theme";
import {
  GlassPanel,
  ProgressChart,
  RadiantGauge,
  AllyItem,
} from "./components";

export default function CharismaScreen() {
  const Container = Platform.OS === "web" ? View : SafeAreaView;

  return (
    <Container style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarRing}>
            <View style={styles.avatarPlaceholder} />
          </View>
          <Text style={styles.headerTitle}>CHARISMA QUEST</Text>
        </View>
        <TouchableOpacity style={styles.settingsBtn}>
          <Settings size={20} color={appTheme.colors.charisma.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Analytics Section */}
        <View style={styles.row}>
          <ProgressChart
            label="Daily Progress"
            subtitle="+12% vs yesterday"
            data={[25, 40, 75, 90, 50, 60, 100]}
          />
          <GlassPanel style={styles.influenceCard}>
            <Text style={styles.influenceTitle}>Weekly Influence</Text>
            <View style={styles.influenceValueRow}>
              <Text style={styles.influenceValue}>4,280</Text>
              <View style={styles.rankBadge}>
                <Text style={styles.rankText}>Paladin</Text>
              </View>
            </View>
          </GlassPanel>
        </View>

        {/* Central Gauge */}
        <GlassPanel style={styles.radiantPanel}>
          <RadiantGauge
            level="LV 42"
            label="Radiant Presence"
            value={74}
            goal={88}
          />
          <Text style={styles.auraText}>
            Your social aura is currently "Compelling". You are 840 XP away from
            "Magnetic".
          </Text>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: "75%" }]} />
          </View>
        </GlassPanel>

        {/* Quests & Mastery */}
        <View style={styles.row}>
          <GlassPanel style={styles.bondingPanel}>
            <View style={styles.sectionHeader}>
              <Shield size={20} color={appTheme.colors.charisma.primary} />
              <Text style={styles.sectionTitle}>Bonding Quests</Text>
            </View>
            <View style={styles.questItem}>
              <View style={styles.questTop}>
                <Text style={styles.questLabel}>Family Ties</Text>
                <Text style={styles.questValue}>12/20 hrs</Text>
              </View>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: "60%" }]} />
              </View>
            </View>
          </GlassPanel>

          <GlassPanel style={styles.masteryPanel}>
            <View style={styles.sectionHeader}>
              <School size={20} color={appTheme.colors.charisma.secondary} />
              <Text style={styles.sectionTitle}>Mastery</Text>
            </View>
            <TouchableOpacity style={styles.logBtn}>
              <Text style={styles.logBtnText}>LOG SESSION</Text>
            </TouchableOpacity>
          </GlassPanel>
        </View>

        {/* Social Circle */}
        <View style={styles.socialSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.titleRow}>
              <Group size={20} color={appTheme.colors.charisma.primary} />
              <Text style={styles.sectionTitle}>Social Circle</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <AllyItem
            name="Elias Thorne"
            rank="LV 38 Guardian"
            xp="12,450"
            color={appTheme.colors.charisma.primary}
          />
          <AllyItem
            name="Sarah Vane"
            rank="LV 45 Orator"
            xp="8,920"
            color={appTheme.colors.charisma.secondary}
          />
          <AllyItem
            name="Marcus Flint"
            rank="LV 31 Sage"
            xp="3,110"
            color={appTheme.colors.charisma.tertiary}
          />
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: appTheme.colors.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#1a1c1a",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(120, 220, 119, 0.2)",
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  avatarRing: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: appTheme.colors.charisma.primary,
    overflow: "hidden",
  },
  avatarPlaceholder: { flex: 1, backgroundColor: "#333" },
  headerTitle: {
    ...appTheme.typography.label,
    color: appTheme.colors.charisma.primary,
    fontSize: 14,
  },
  settingsBtn: { padding: 5 },
  scrollContent: { padding: 20, paddingBottom: 100 },
  row: { flexDirection: "row", gap: 16, marginBottom: 24 },
  influenceCard: { flex: 1, padding: 20, justifyContent: "center" },
  influenceTitle: {
    ...appTheme.typography.label,
    color: appTheme.colors.charisma.primary,
    marginBottom: 10,
  },
  influenceValueRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  influenceValue: { fontSize: 24, fontWeight: "900", color: "#fff" },
  rankBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: "rgba(13 la, 21 la, 1 la, 0.2)",
    borderWidth: 1,
    borderColor: appTheme.colors.charisma.tertiary + "40",
  },
  rankText: {
    ...appTheme.typography.label,
    fontSize: 8,
    color: appTheme.colors.charisma.tertiary,
  },
  radiantPanel: {
    padding: 30,
    alignItems: "center",
    marginBottom: 32,
    backgroundColor: "rgba(120, 220, 119, 0.05)",
  },
  auraText: {
    ...appTheme.typography.body,
    textAlign: "center",
    color: appTheme.colors.surface.onSurfaceVariant,
    marginTop: 20,
    maxWidth: 250,
  },
  progressBg: {
    width: "100%",
    height: 6,
    backgroundColor: "#000",
    borderRadius: 3,
    marginTop: 15,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: appTheme.colors.charisma.primary,
  },
  bondingPanel: { flex: 2, padding: 20 },
  masteryPanel: { flex: 1, padding: 20, justifyContent: "center" },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 15,
  },
  sectionTitle: { ...appTheme.typography.h2, color: "#fff" },
  questItem: {
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(120, 220, 119, 0.1)",
  },
  questTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  questLabel: {
    ...appTheme.typography.label,
    color: appTheme.colors.charisma.tertiary,
    fontSize: 11,
  },
  questValue: {
    ...appTheme.typography.label,
    color: appTheme.colors.surface.onSurfaceVariant,
    fontSize: 11,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: "#000",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: appTheme.colors.charisma.primary,
  },
  logBtn: {
    backgroundColor: appTheme.colors.charisma.containerHigh,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  logBtnText: { ...appTheme.typography.label, color: "#fff", fontSize: 11 },
  socialSection: { gap: 12 },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  viewAll: {
    ...appTheme.typography.label,
    color: appTheme.colors.charisma.primary,
  },
});
