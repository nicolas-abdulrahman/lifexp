import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Settings } from "lucide-react-native";
import { appTheme } from "../theme";

interface HeaderProps {
  avatarUrl?: string;
  title?: string;
  onSettingsPress?: () => void;
}

export const Header = ({
  avatarUrl = "https://lh3.googleusercontent.com/...",
}: HeaderProps) => {
  return (
    <View style={styles.header}>
      {/* Settings Icon - Positioned Absolutely to the right */}
      {/* Center Section */}
      <View style={styles.centerContainer}>
        <View style={styles.avatarRing}>
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 70,
    backgroundColor: appTheme.colors.quest.background,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Centers the centerContainer
    paddingHorizontal: appTheme.spacing.page,
    borderBottomWidth: 1,
    borderBottomColor: appTheme.colors.border + "40",
    // Subtle shadow to give it depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  settingsButton: {
    position: "absolute",
    right: appTheme.spacing.page,
    zIndex: 10,
  },
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatarRing: {
    width: 46,
    height: 46,
    borderRadius: appTheme.radius.pill,
    padding: 2,
    borderWidth: 2,
    borderColor: appTheme.colors.primary,
    shadowColor: appTheme.colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: appTheme.radius.pill,
  },
  headerTitle: {
    ...appTheme.typography.label,
    color: appTheme.colors.primary,
    marginTop: 4,
    fontSize: 12,
  },
});
