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
import Svg, { Circle } from "react-native-svg";
import { Heart, Shield, Plus } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { appTheme } from "../../theme";

const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function QuestsScreen() {
  const Container = Platform.OS === "web" ? View : SafeAreaView;

  return (
    <Container style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>QUEST LOG</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Vitality Hero Card ── */}
        <View style={styles.heroCard}>
          <View style={styles.heroLeft}>
            <View style={styles.ringContainer}>
              <Svg width={90} height={90} viewBox="0 0 100 100">
                <Circle
                  cx="50"
                  cy="50"
                  r={RADIUS}
                  stroke="rgba(255,59,59,0.2)"
                  strokeWidth="6"
                  fill="none"
                />
                <Circle
                  cx="50"
                  cy="50"
                  r={RADIUS}
                  stroke={appTheme.colors.quest.primaryRed}
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={`${CIRCUMFERENCE * 0.8}`}
                  strokeLinecap="round"
                />
              </Svg>
              <View style={styles.ringCenter}>
                <Heart
                  size={30}
                  color={appTheme.colors.quest.primaryRed}
                  fill={appTheme.colors.quest.primaryRed}
                />
              </View>
            </View>
          </View>
          <View style={styles.heroRight}>
            <Text style={styles.heroLabel}>VITALITY</Text>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>Lvl 42</Text>
            </View>
          </View>
        </View>

        {/* ── Carbs Intake Card ── */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View style={styles.iconCircle}>
              <Shield size={18} color={appTheme.colors.quest.primaryBlue} />
            </View>
            <Text style={styles.progressLabel}>CARBS INTAKE</Text>
          </View>

          <View style={styles.statRow}>
            <View style={styles.valueBadge}>
              <Text style={styles.valueText}>250 / 250</Text>
            </View>
          </View>

          <View style={styles.barBg}>
            <View style={styles.barFill} />
          </View>
        </View>

        {/* ── Bento Grid (Bottom) ── */}
        <View style={styles.bentoGrid}>
          {/* Chart Card */}
          <View style={styles.bentoCard}>
            <View style={styles.chartContainer}>
              {[40, 70, 60, 90, 40].map((h, i) => (
                <View
                  key={i}
                  style={[
                    styles.chartBar,
                    { height: `${h}%`, opacity: 0.3 + i * 0.1 },
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Ring Card */}
          <View style={styles.bentoCard}>
            <View style={styles.ringCenterContainer}>
              <Svg width="80" height="80" viewBox="0 0 100 100">
                <Circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke={appTheme.colors.quest.primaryBlue}
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="200 50"
                  strokeLinecap="round"
                />
              </Svg>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ── Floating Action Button (FAB) ── */}
      <TouchableOpacity style={styles.fabContainer}>
        <LinearGradient colors={["#ffffff", "#e0e0e0"]} style={styles.fab}>
          <Plus size={30} color={appTheme.colors.background} />
        </LinearGradient>
      </TouchableOpacity>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.colors.quest.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
    gap: 20,
  },
  // Vitality Card
  heroCard: {
    backgroundColor: appTheme.colors.quest.surface,
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  heroLeft: {
    marginRight: 20,
  },
  ringContainer: {
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  ringCenter: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  heroRight: {
    flex: 1,
    justifyContent: "center",
  },
  heroLabel: {
    fontSize: 24,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: 1,
  },
  levelBadge: {
    backgroundColor: "#000",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  levelText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  // Progress Card
  progressCard: {
    backgroundColor: appTheme.colors.quest.surface,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(74, 111, 165, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: appTheme.colors.quest.primaryBlue + "40",
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: appTheme.colors.quest.primaryBlue,
    textTransform: "uppercase",
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  valueBadge: {
    backgroundColor: "#000",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  valueText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  barBg: {
    height: 12,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 6,
    overflow: "hidden",
  },
  barFill: {
    width: "100%",
    height: "100%",
    backgroundColor: "#222", // Matching the image's dark bar
  },
  // Bento Grid
  bentoGrid: {
    flexDirection: "row",
    gap: 16,
  },
  bentoCard: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: appTheme.colors.quest.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  chartContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    paddingBottom: 10,
  },
  chartBar: {
    width: 12,
    backgroundColor: "#888",
    borderRadius: 2,
  },
  ringCenterContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  // FAB
  fabContainer: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    zIndex: 100,
  },
  fab: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.5)",
  },
});
