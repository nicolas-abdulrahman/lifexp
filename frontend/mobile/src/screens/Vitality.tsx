import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Image } from 'react-native';
import { Heart, Zap, Moon } from 'lucide-react-native';
import { appTheme } from '../theme';
import { OctagonWrapper } from './components/VitalityShapes';
import { CarbsCard, SleepCard, MovementCard } from './components/VitalityBento';

export default function VitalityScreen() {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const pulseStyle = {
    opacity: pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] }),
  };

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>QUEST LOG</Text>
        <Image 
          source={{ uri: 'https://lh3.googleusercontent.com/...' }} 
          style={styles.avatar} 
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero Summary */}
        <View style={styles.heroCard}>
          <View style={styles.heroRow}>
            <OctagonWrapper>
              <Heart fill="#000" color="#000" size={30} />
            </OctagonWrapper>
            <View>
              <Text style={styles.heroName}>VITALITY</Text>
              <Text style={styles.heroSub}>LV. 42 PALADIN STATS</Text>
            </View>
          </View>
        </View>

        {/* Bento Grid */}
        <View style={styles.grid}>
          <CarbsCard />
          <View style={styles.gridRow}>
            <SleepCard />
            <MovementCard />
          </View>
        </View>

        {/* Active Buffs */}
        <View style={styles.buffsSection}>
          <View style={styles.buffsHeader}>
            <Animated.View style={[styles.pulseDot, pulseStyle]} />
            <Text style={styles.buffsTitle}>ACTIVE BUFFS</Text>
          </View>

          <View style={styles.buffItem}>
            <Zap color="#f87171" size={20} />
            <View>
              <Text style={styles.buffName}>METABOLIC SURGE</Text>
              <Text style={styles.buffDesc}>Movement target reached 3 days in a row.</Text>
            </View>
          </View>

          <View style={[styles.buffItem, { opacity: 0.4 }]}>
            <Moon color="#71717a" size={20} />
            <View>
              <Text style={styles.buffName}>DEEP TRANCE</Text>
              <Text style={styles.buffDesc}>Sleep efficiency below 80%. Buff inactive.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: appTheme.colors.quest.background },
  header: { 
    height: 60, 
    backgroundColor: '#000', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    borderBottomWidth: 1, 
    borderColor: '#7f1d1d',
    paddingTop: 10
  },
  headerTitle: { color: '#ef4444', fontSize: 18, fontWeight: '900', letterSpacing: 2 },
  avatar: { width: 32, height: 32, borderRadius: 16, borderWidth: 1, borderColor: '#ef4444' },
  scrollContent: { padding: 20, paddingBottom: 100 },
  heroCard: { 
    backgroundColor: appTheme.colors.quest.surface, 
    borderRadius: 16, 
    padding: 20, 
    borderWidth: 1, 
    borderColor: 'rgba(153, 27, 27, 0.3)',
    marginBottom: 20 
  },
  heroRow: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  heroName: { color: '#fff', fontSize: 24, fontWeight: '900', letterSpacing: -1 },
  heroSub: { color: 'rgba(239, 68, 68, 0.7)', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  grid: { gap: 20 },
  gridRow: { flexDirection: 'row', gap: 20, marginTop: 20 },
  buffsSection: { marginTop: 30 },
  buffsHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 15 },
  pulseDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ef4444' },
  buffsTitle: { color: '#ef4444', fontSize: 12, fontWeight: '900', letterSpacing: 1 },
  buffItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12, 
    padding: 15, 
    backgroundColor: 'rgba(0,0,0,0.4)', 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: 'rgba(153, 27, 27, 0.1)',
    marginBottom: 10 
  },
  buffName: { color: '#fff', fontSize: 12, fontWeight: '800' },
  buffDesc: { color: '#71717a', fontSize: 10 },
});