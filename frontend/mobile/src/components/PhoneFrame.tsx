import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { colors } from '../theme';

interface PhoneFrameProps {
  children: React.ReactNode;
}

const PHONE_W = 393;
const PHONE_H = 852;

export default function PhoneFrame({ children }: PhoneFrameProps) {
  const { width, height } = useWindowDimensions();

  // On a real device, render children with no extra wrapper at all
  if (Platform.OS !== 'web') {
    return <>{children}</>;
  }

  // Scale the phone shell down so it always fits inside the browser window
  const scale = Math.min(1, (width - 48) / PHONE_W, (height - 48) / PHONE_H);

  return (
    <View style={[styles.screen, { width, height }]}>
      {/* Ambient purple glow behind the phone */}
      <View style={styles.glowOuter} />
      <View style={styles.glowInner} />

      {/* Phone shell — scaled to fit window */}
      <View
        style={[
          styles.shell,
          {
            transform: [{ scale }],
          },
        ]}
      >
        {/* Status bar area + Dynamic Island pill */}
        <View style={styles.statusBar}>
          <View style={styles.dynamicIsland} />
        </View>

        {/* App content fills the rest of the shell */}
        <View style={styles.appWindow}>{children}</View>

        {/* Home indicator */}
        <View style={styles.homeBar}>
          <View style={styles.homeIndicator} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#07040e',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  } as any,

  // Layered ambient glow circles
  glowOuter: {
    position: 'absolute',
    width: 640,
    height: 640,
    borderRadius: 320,
    backgroundColor: colors.primaryDim,
    opacity: 0.07,
  },
  glowInner: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: colors.secondary,
    opacity: 0.04,
  },

  // Phone bezel
  shell: {
    width: PHONE_W,
    height: PHONE_H,
    borderRadius: 54,
    borderWidth: 8,
    borderColor: '#1c1828',
    backgroundColor: colors.surface,
    overflow: 'hidden',
    // Outer ring highlight (simulates the polished frame)
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 32,
    elevation: 24,
  } as any,

  // Status bar strip at top
  statusBar: {
    height: 52,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  // Dynamic Island cutout
  dynamicIsland: {
    width: 120,
    height: 34,
    borderRadius: 20,
    backgroundColor: '#000',
  },

  // The actual app fills remaining space
  appWindow: {
    flex: 1,
    overflow: 'hidden',
  } as any,

  // Home indicator strip
  homeBar: {
    height: 28,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  homeIndicator: {
    width: 130,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
});
