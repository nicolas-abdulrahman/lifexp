import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

interface NavItemProps {
  icon: React.ComponentType<{ size: number; color: string }>;
  label: string;
  active?: boolean;
  onPress?: () => void;
}

export default function NavItem({ icon: Icon, label, active = false, onPress }: NavItemProps) {
  const iconColor = active ? colors.secondary : colors.onSurfaceVariant;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <Icon size={22} color={iconColor} />
      <Text style={[styles.label, { color: iconColor }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  label: {
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
});
