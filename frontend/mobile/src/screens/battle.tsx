import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Bolt, Zap, Shield, Timer, Lock } from "lucide-react-native";
import { appTheme } from "../theme";

const b = appTheme.colors.battle;

interface NodeProps {
  label: string;
  subLabel: string;
  icon: any;
  status: "active" | "available" | "locked";
  style: any;
}

const SkillNode = ({
  label,
  subLabel,
  icon: Icon,
  status,
  style,
}: NodeProps) => {
  const isLocked = status === "locked";
  const isAvailable = status === "available";

  return (
    <TouchableOpacity style={[styles.nodeContainer, style]}>
      <View
        style={[
          styles.nodeCircle,
          {
            borderColor: isLocked
              ? b.nodeLocked
              : isAvailable
                ? b.nodeAvailable
                : b.nodeActive,
            backgroundColor: isLocked ? "transparent" : b.surface,
            shadowColor: isLocked
              ? "transparent"
              : isAvailable
                ? b.nodeAvailable
                : b.nodeActive,
          },
        ]}
      >
        <Icon
          size={24}
          color={
            isLocked
              ? b.nodeLocked
              : isAvailable
                ? b.nodeAvailable
                : b.nodeActive
          }
        />
        {isAvailable && <View style={styles.availableDot} />}
      </View>
      <Text
        style={[styles.nodeLabel, { color: isLocked ? b.nodeLocked : "#fff" }]}
      >
        {label}
      </Text>
      <Text
        style={[
          styles.nodeSub,
          {
            color: isLocked
              ? b.nodeLocked
              : isAvailable
                ? b.nodeAvailable
                : b.nodeActive,
          },
        ]}
      >
        {subLabel}
      </Text>
    </TouchableOpacity>
  );
};

export default function BattleScreen() {
  return (
    <View style={styles.container}>
      {/* Points Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>ABILITY SKILL TREE</Text>
          <Text style={styles.subtitle}>Allocate points to ascend</Text>
        </View>
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsValue}>2</Text>
          <Text style={styles.pointsLabel}>POINTS AVAIL</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.treeArea}>
        {/* Tree Lines (Simulated with Views) */}
        <View style={styles.lineLayer}>
          {/* Root to Left */}
          <View
            style={[
              styles.line,
              styles.lineRootLeft,
              { backgroundColor: b.lineActive },
            ]}
          />
          {/* Root to Right */}
          <View
            style={[
              styles.line,
              styles.lineRootRight,
              { backgroundColor: b.lineInactive },
            ]}
          />
          {/* Left to Tier 2 */}
          <View
            style={[
              styles.line,
              styles.lineTier2Left,
              { backgroundColor: b.lineActive },
            ]}
          />
        </View>

        {/* Nodes */}
        <View style={styles.nodesLayer}>
          {/* Root Node */}
          <SkillNode
            label="Awakening"
            subLabel="MAX"
            icon={Bolt}
            status="active"
            style={styles.posRoot}
          />

          {/* Tier 1 */}
          <SkillNode
            label="Agility I"
            subLabel="Lvl 3/3"
            icon={Zap}
            status="active"
            style={styles.posT1Left}
          />
          <SkillNode
            label="Defense I"
            subLabel="Lvl 0/3"
            icon={Shield}
            status="locked"
            style={styles.posT1Right}
          />

          {/* Tier 2 */}
          <SkillNode
            label="Dash"
            subLabel="Lvl 1/5"
            icon={Timer}
            status="available"
            style={styles.posT2Left}
          />
          <SkillNode
            label="Overdrive"
            subLabel="Req: Agility II"
            icon={Lock}
            status="locked"
            style={styles.posT2Center}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: b.bg },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 20,
    paddingTop: 60,
  },
  title: { color: "#fff", fontSize: 24, fontWeight: "900", letterSpacing: -1 },
  subtitle: {
    color: appTheme.colors.surface.onSurfaceVariant,
    fontSize: 12,
    textTransform: "uppercase",
  },
  pointsBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: b.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(197, 154, 255, 0.2)",
  },
  pointsValue: {
    color: appTheme.colors.primary,
    fontSize: 18,
    fontWeight: "900",
    marginRight: 6,
  },
  pointsLabel: {
    color: appTheme.colors.surface.onSurfaceVariant,
    fontSize: 10,
    fontWeight: "800",
  },

  treeArea: { flex: 1, alignItems: "center", paddingBottom: 100 },
  lineLayer: { position: "absolute", width: "100%", height: "100%", zIndex: 0 },
  nodesLayer: { width: "100%", height: 500, zIndex: 1 },

  // Node Styles
  nodeContainer: { position: "absolute", alignItems: "center", width: 100 },
  nodeCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  nodeLabel: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "800",
    marginTop: 8,
    textTransform: "uppercase",
  },
  nodeSub: { fontSize: 10, fontWeight: "700" },
  availableDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: appTheme.colors.tertiary,
    borderWidth: 2,
    borderColor: b.bg,
  },

  // Positioning
  posRoot: {
    bottom: 50,
    left: "calc(50% - 50px)",
    alignSelf: "center",
    left: "auto",
    right: "auto",
    transform: [{ translateX: 0 }],
  }, // Simplified for RN
  posT1Left: { bottom: 150, left: "15%" },
  posT1Right: { bottom: 150, right: "15%" },
  posT2Left: { bottom: 250, left: "5%" },
  posT2Center: {
    bottom: 280,
    alignSelf: "center",
    left: "auto",
    right: "auto",
  },

  // Line Styles
  line: { position: "absolute", width: 2 },
  lineRootLeft: {
    height: 60,
    bottom: 100,
    left: "35%",
    transform: [{ rotate: "-45deg" }],
  },
  lineRootRight: {
    height: 60,
    bottom: 100,
    right: "35%",
    transform: [{ rotate: "45deg" }],
  },
  lineTier2Left: {
    height: 60,
    bottom: 200,
    left: "20%",
    transform: [{ rotate: "-30deg" }],
  },
});
