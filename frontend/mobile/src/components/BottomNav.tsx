import React from "react";
import { View, StyleSheet } from "react-native";
import {
  LayoutList,
  BarChart3,
  Backpack,
  Map as MapIcon, // Renamed to avoid conflict with JS Map if needed, though Lucide exports it as Map
} from "lucide-react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import NavItem from "./NavItem"; 
import { appTheme } from "../theme";

// We use the props provided automatically by React Navigation
export default function BottomNav({ state, navigation }: BottomTabBarProps) {
  
  // React Navigation stores the active tab in state.index
  const currentRouteName = state.routes[state.index].name;

  const handlePress = (tabName: string) => {
    // If we are already on this tab, do nothing (or you can fire a scroll-to-top event)
    if (currentRouteName === tabName) return;
    
    navigation.navigate(tabName);
  };

  return (
    <View style={styles.bottomNav}>
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
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 14,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: "rgba(28,22,42,0.96)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    // Note: React Navigation usually places this at the bottom automatically, 
    // but you can keep position: 'absolute' if you want it to float over content.
  },
});