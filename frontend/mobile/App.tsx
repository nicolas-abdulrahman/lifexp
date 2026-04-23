import React from "react";
import PhoneFrame from "./src/components/PhoneFrame";
import Stats from "./src/screens/Stats";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BottomNav from "./src/components/BottomNav"
export default function App() {
  return (
    <PhoneFrame>
      <NavigationContainer>
      <Tab.Navigator 
        tabBar={(props) => <BottomNav {...props} />} // Use your custom bottom bar
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name="Stats" component={StatsScreen} />
        <Tab.Screen name="Quests" component={QuestsScreen} />
      </Tab.Navigator>

      <Stats />
      <BottomNav/>
    </PhoneFrame>
  );
}
