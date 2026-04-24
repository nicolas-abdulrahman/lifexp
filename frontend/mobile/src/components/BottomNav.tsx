import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  LayoutList,
  BarChart3,
  Backpack,
  Map as MapIcon,
  Swords, // Added Swords icon
} from "lucide-react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import NavItem from "./NavItem";
import { appTheme } from "../theme";

export default function BottomNav({ state, navigation }: BottomTabBarProps) {
  const currentRouteName = state.routes[state.index].name;

  const handlePress = (tabName: string) => {
    if (currentRouteName === tabName) return;
    navigation.navigate(tabName);
  };

  return (
    <View style={styles.bottomNav}>
      {/* Left Side Items */}
      <View style={styles.navGroup}>
        <NavItem
          icon={LayoutList}
          label="Quests"
          active={currentRouteName === "Quests"}
          onPress={() => handlePress("Quests")}
        />
        <NavItem
          icon={BarChart3}
          label="Stats"
          active={currentRouteName === "Stats"}
          onPress={() => handlePress("Stats")}
        />
      </View>

      {/* CENTER HERO BUTTON: BATTLE */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handlePress("Battle")}
        style={styles.battleButtonContainer}
      >
        <LinearGradient
          colors={appTheme.colors.quest.fabGradient} // Using the same purple gradient as the FAB
          style={styles.battleButton}
        >
          <Swords size={32} color="white" strokeWidth={2.5} />
          <Text style={styles.battleLabel}>BATTLE</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Right Side Items */}
      <View style={styles.navGroup}>
        <NavItem
          icon={Backpack}
          label="Inventory"
          active={currentRouteName === "Inventory"}
          onPress={() => handlePress("Inventory")}
        />
        <NavItem
          icon={MapIcon}
          label="Map"
          active={currentRouteName === "Map"}
          onPress={() => handlePress("Map")}
        />
      </View>
    </View>
  );
}

// Added Text import for the label
import { Text } from "react-native";

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 28, // Extra bottom padding for safe areas
    paddingHorizontal: 20,
    // THEME FIX: Using surface container with opacity for glass effect
    backgroundColor: appTheme.colors.surface.container + "F2",
    borderTopWidth: 1,
    borderTopColor: appTheme.colors.border + "40",
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  navGroup: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  battleButtonContainer: {
    zIndex: 10,
    // This lifts the button slightly above the nav bar
    marginBottom: 20,
  },
  battleButton: {
    width: 70,
    height: 70,
    borderRadius: appTheme.radius.pill,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: appTheme.colors.background,
    // Bloom effect for the center button
    shadowColor: appTheme.colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 10,
  },
  battleLabel: {
    ...appTheme.typography.label,
    color: appTheme.colors.secondary,
    fontSize: 8,
    marginTop: -2,
    fontWeight: "900",
  },
});
