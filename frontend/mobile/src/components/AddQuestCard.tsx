import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { PlusCircle } from "lucide-react-native";
import { appTheme } from "../theme";

export const AddQuestCard = ({ onPress }: { onPress?: () => void }) => {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <PlusCircle size={32} color={appTheme.colors.surface.onSurfaceVariant} />
      <Text style={styles.label}>NEW QUEST</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "47%",
    aspectRatio: 1,
    borderRadius: appTheme.radius.soft,
    backgroundColor: appTheme.colors.surface.container,
    borderWidth: 2,
    borderColor: appTheme.colors.surface.onSurfaceVariant + "40",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  label: {
    ...appTheme.typography.label,
    color: appTheme.colors.surface.onSurfaceVariant,
  },
});
