import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Platform,
} from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { Zap, Shield, Lock, Timer, Hexagon } from "lucide-react-native";
import { appTheme } from "../../theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CENTER = SCREEN_WIDTH / 2;

interface NodeProps {
  label: string;
  level: string;
  icon: React.ReactNode;
  status: "locked" | "active" | "max";
  x: number;
  y: number;
  onPress?: () => void;
}

const SkillNode = ({
  label,
  level,
  icon,
  status,
  x,
  y,
  onPress,
}: NodeProps) => {
  const isLocked = status === "locked";
  const isActive = status === "active";

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.nodeContainer, { left: x - 35, top: y - 35 }]}
    >
      {/* Outer Ring */}
      <View
        style={[
          styles.outerRing,
          {
            borderColor: isLocked
              ? appTheme.colors.skillTree.nodeBorder
              : appTheme.colors.skillTree.secondary,
          },
        ]}
      >
        {/* Inner Pod */}
        <View
          style={[
            styles.innerPod,
            {
              backgroundColor: isLocked
                ? "#0d0f0d"
                : appTheme.colors.skillTree.nodeBg,
            },
          ]}
        >
          {icon}
        </View>
      </View>
      <Text
        style={[styles.nodeLabel, { color: isLocked ? "#7a7287" : "#fff" }]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default function SkillTreeScreen() {
  const [points, setPoints] = useState(2);
  const Container = Platform.OS === "web" ? View : SafeAreaView;

  return (
    <Container style={styles.container}>
      {/* --- Header --- */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>ABILITY SKILL TREE</Text>
          <Text style={styles.subtitle}>ALLOCATE POINTS TO ASCEND</Text>
        </View>
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsText}>{points} POINTS AVAIL</Text>
        </View>
      </View>

      {/* --- Map Canvas --- */}
      <View style={styles.canvas}>
        <Svg
          style={StyleSheet.absoluteFill}
          viewBox={`0 0 ${SCREEN_WIDTH} 800`}
        >
          {/* Ley Lines (Circuitry) */}
          <Path
            d={`M ${CENTER} 600 L ${CENTER} 450 L ${CENTER - 100} 400 M ${CENTER} 450 L ${CENTER + 100} 400 M ${CENTER - 100} 400 L ${CENTER} 250`}
            stroke={appTheme.colors.skillTree.secondary}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity={0.6}
          />
          {/* Glow effect for lines */}
          <Path
            d={`M ${CENTER} 600 L ${CENTER} 450 L ${CENTER - 100} 400 M ${CENTER} 450 L ${CENTER + 100} 400 M ${CENTER - 100} 400 L ${CENTER} 250`}
            stroke={appTheme.colors.skillTree.secondary}
            strokeWidth="8"
            fill="none"
            opacity={0.2}
          />
        </Svg>

        {/* Nodes */}
        <SkillNode
          x={CENTER}
          y={600}
          label="MAX"
          level="MAX"
          status="max"
          icon={
            <Hexagon size={24} color={appTheme.colors.skillTree.secondary} />
          }
        />
        <SkillNode
          x={CENTER - 100}
          y={400}
          label="Lvl 3/3"
          level="Lvl 3/3"
          status="active"
          icon={<Zap size={24} color={appTheme.colors.skillTree.secondary} />}
        />
        <SkillNode
          x={CENTER + 100}
          y={400}
          label="Lvl 0/3"
          level="Lvl 0/3"
          status="locked"
          icon={
            <Shield size={24} color={appTheme.colors.skillTree.nodeBorder} />
          }
        />
        <SkillNode
          x={CENTER}
          y={250}
          label="Req: Agility II"
          level="Locked"
          status="locked"
          icon={<Lock size={24} color={appTheme.colors.skillTree.nodeBorder} />}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#100b1b",
  },
  header: {
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 40,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 1,
  },
  subtitle: {
    color: appTheme.colors.surface.onSurfaceVariant,
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: 4,
  },
  pointsBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appTheme.colors.skillTree.secondary,
    backgroundColor: "rgba(0, 227, 253, 0.1)",
  },
  pointsText: {
    color: appTheme.colors.skillTree.secondary,
    fontSize: 10,
    fontWeight: "bold",
  },
  canvas: {
    flex: 1,
    position: "relative",
  },
  nodeContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  outerRing: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  innerPod: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  nodeLabel: {
    marginTop: 8,
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
});
