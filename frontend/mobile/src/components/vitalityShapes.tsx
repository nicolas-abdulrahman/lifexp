import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Polygon } from 'react-native-svg';
import { appTheme } from '../theme';

export const OctagonWrapper = ({ children }: any) => (
  <View style={styles.container}>
    <Svg width="64" height="64" viewBox="0 0 100 100">
      <Defs>
        <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={appTheme.colors.quest.accent} />
          <Stop offset="100%" stopColor={appTheme.colors.quest.accentDark} />
        </LinearGradient>
      </Defs>
      <Polygon 
        points="30,0 70,0 100,30 100,70 70,100 30,100 0,70 0,30" 
        fill="url(#grad)" 
      />
    </Svg>
    <View style={styles.content}>{children}</View>
  </View>
);

export const DiamondWrapper = ({ children }: any) => (
  <View style={styles.container}>
    <Svg width="40" height="40" viewBox="0 0 100 100">
      <Polygon 
        points="50,0 100,50 50,100 0,50" 
        fill={appTheme.colors.quest.accent + '33'} 
        stroke={appTheme.colors.quest.accent}
        strokeWidth="4"
      />
    </Svg>
    <View style={styles.content}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  container: { position: 'relative', justifyContent: 'center', alignItems: 'center' },
  content: { position: 'absolute', justifyContent: 'center', alignItems: 'center' },
});