import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  PanResponder,
} from "react-native";
import { appTheme } from "../../theme";

interface DraggableNodeProps {
  id: string; // ✅ FIX: was missing from interface
  initialTop: number;
  initialLeft: number;
  label: string;
  icon: React.ReactNode;
  status: "completed" | "active" | "locked";
}

export const DraggableNode = ({
  initialTop,
  initialLeft,
  label,
  icon,
  status,
}: DraggableNodeProps) => {
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      // ✅ FIX: also intercept from parent (prevents ScrollView stealing touches)
      onStartShouldSetPanResponderCapture: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        // Optional: flatten offset here if you want to persist position
      },
    }),
  ).current;

  const isLocked = status === "locked";
  const isActive = status === "active";

  return (
    // ✅ FIX: panHandlers go directly on Animated.View — no wrapper needed
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.nodeContainer,
        {
          top: initialTop,
          left: initialLeft,
          transform: pan.getTranslateTransform(),
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        // ✅ FIX: onPress must NOT conflict with panResponder
        onPress={() => {}}
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
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  nodeContainer: {
    position: "absolute",
    alignItems: "center",
    zIndex: 10,
  },
  nodeCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: appTheme.colors.surface.container,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8, // Android shadow / z-order
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  iconWrapper: { justifyContent: "center", alignItems: "center" },
  labelBadge: {
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  labelText: {
    ...appTheme.typography.label,
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
});
