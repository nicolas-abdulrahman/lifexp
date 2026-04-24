import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  Circle,
} from "react-native-svg";
import { LinearGradient as ExpoGradient } from "expo-linear-gradient";
import { Flag, Cpu, Share2, Castle, Lock, Plus } from "lucide-react-native";
import { appTheme } from "../theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const MAP_HEIGHT = 1500;

interface MapNodeProps {
  top: string;
  left: string;
  label: string;
  icon: React.ReactNode;
  status: "completed" | "active" | "locked";
}

const MapNode = ({ top, left, label, icon, status }: MapNodeProps) => {
  const isLocked = status === "locked";
  const isActive = status === "active";
  const isCompleted = status === "completed";

  return (
    <View style={[styles.nodeContainer]}>
      {/* Active Pulse Glow */}
      {isActive && <Animated.View style={styles.pulseGlow} />}

      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.nodeCircle,
          {
            borderColor: isLocked
              ? appTheme.colors.map.nodeLocked
              : isActive
                ? appTheme.colors.map.nodeActive
                : appTheme.colors.map.nodeCompleted,
          },
        ]}
      >
        <View style={styles.iconWrapper}>{icon}</View>
      </TouchableOpacity>

      <View
        style={[
          styles.labelBadge,
          {
            borderColor: isActive
              ? appTheme.colors.primary
              : "rgba(197, 154, 255, 0.2)",
            backgroundColor: isActive
              ? "rgba(41, 34, 57, 0.95)"
              : "rgba(22, 11, 24, 0.8)",
          },
        ]}
      >
        <Text
          style={[
            styles.labelText,
            {
              color: isActive
                ? appTheme.colors.primary
                : isLocked
                  ? appTheme.colors.map.nodeLocked
                  : appTheme.colors.surface.onSurface,
            },
          ]}
        >
          {label}
        </Text>
      </View>
    </View>
  );
};

export default function MapScreen() {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.5,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.mapCanvas}
        showsVerticalScrollIndicator={false}
      >
        {/* Parchment Texture Overlay */}
        <View style={styles.parchmentOverlay} />

        {/* Ley Line SVG */}
        <Svg
          style={StyleSheet.absoluteFill}
          viewBox={`0 0 ${SCREEN_WIDTH} ${MAP_HEIGHT}`}
        >
          <Defs>
            <LinearGradient id="leyLineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor={appTheme.colors.map.leyLineStart} />
              <Stop offset="50%" stopColor={appTheme.colors.map.leyLineEnd} />
              <Stop
                offset="100%"
                stopColor={appTheme.colors.map.leyLineStart}
              />
            </LinearGradient>
          </Defs>
          <Path
            d={`M ${SCREEN_WIDTH * 0.2} 150 Q ${SCREEN_WIDTH * 0.5} 300 ${SCREEN_WIDTH * 0.3} 450 T ${SCREEN_WIDTH * 0.7} 600 T ${SCREEN_WIDTH * 0.4} 900 T ${SCREEN_WIDTH * 0.6} 1150 T ${SCREEN_WIDTH * 0.4} 1350`}
            fill="none"
            stroke="url(#leyLineGrad)"
            strokeWidth="6"
            strokeDasharray="12 18"
            strokeLinecap="round"
          />
          <Path
            d={`M ${SCREEN_WIDTH * 0.2} 150 Q ${SCREEN_WIDTH * 0.5} 300 ${SCREEN_WIDTH * 0.3} 450 T ${SCREEN_WIDTH * 0.7} 600 T ${SCREEN_WIDTH * 0.4} 900 T ${SCREEN_WIDTH * 0.6} 1150 T ${SCREEN_WIDTH * 0.4} 1350`}
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeDasharray="12 18"
            strokeLinecap="round"
            opacity={0.5}
          />
        </Svg>

        {/* Nodes */}
        <MapNode
          top="8%"
          left="15%"
          label="Outpost Alpha"
          status="completed"
          icon={<Flag size={18} color={appTheme.colors.map.nodeCompleted} />}
        />
        <MapNode
          top="20%"
          left="60%"
          label="Data Nexus"
          status="completed"
          icon={<Cpu size={18} color={appTheme.colors.map.nodeCompleted} />}
        />
        <MapNode
          top="30%"
          left="25%"
          label="Comms Relay"
          status="completed"
          icon={<Share2 size={18} color={appTheme.colors.map.nodeCompleted} />}
        />

        {/* Active Node */}
        <View style={styles.activeNodeWrapper}>
          <MapNode
            top="40%"
            left="40%"
            label="Project Citadel"
            status="active"
            icon={<Castle size={22} color="#fff" />}
          />
        </View>

        <MapNode
          top="55%"
          left="20%"
          label="The Summit"
          status="locked"
          icon={<Lock size={18} color={appTheme.colors.map.nodeLocked} />}
        />
        <MapNode
          top="68%"
          left="55%"
          label="Echo Base"
          status="locked"
          icon={<Lock size={18} color={appTheme.colors.map.nodeLocked} />}
        />
        <MapNode
          top="76%"
          left="30%"
          label="Sector 7G"
          status="locked"
          icon={<Lock size={18} color={appTheme.colors.map.nodeLocked} />}
        />
        <MapNode
          top="88%"
          left="40%"
          label="Terminus"
          status="locked"
          icon={<Lock size={18} color={appTheme.colors.map.nodeLocked} />}
        />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <ExpoGradient
          colors={appTheme.colors.quest.fabGradient}
          style={styles.fabGradient}
        >
          <Plus color="white" size={30} />
        </ExpoGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.colors.map.parchment,
  },
  mapCanvas: {
    width: SCREEN_WIDTH,
    height: MAP_HEIGHT,
    position: "relative",
  },
  parchmentOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: appTheme.colors.map.parchment,
    opacity: 0.8,
    // Simulate a vignette/inner shadow
    borderWidth: 60,
    borderColor: "rgba(60, 40, 20, 0.4)",
    borderStyle: "solid",
  },
  nodeContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  nodeCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: appTheme.colors.surface.container,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  labelBadge: {
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    //backdropFilter: "blur(10px)", // Note: backdropFilter only works on Web, using opacity for RN
  },
  labelText: {
    ...appTheme.typography.label,
    fontSize: 10,
    fontWeight: "bold",
  },
  activeNodeWrapper: {
    position: "absolute",
    top: "40%",
    left: "40%",
    zIndex: 20,
  },
  pulseGlow: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: appTheme.colors.primary + "40",
    // We use the Animated value here in the actual implementation
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    zIndex: 100,
  },
  fabGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    shadowColor: appTheme.colors.primary,
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
});
