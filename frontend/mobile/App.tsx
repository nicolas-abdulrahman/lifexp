import React from "react";
import PhoneFrame from "./src/components/PhoneFrame";
import Stats from "./src/screens/Stats";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import BottomNav from "./src/components/BottomNav";
import Quests from "./src/screens/quests";
import BattleScreen from "./src/screens/battle";
const Tab = createBottomTabNavigator();
const StatsScreen = () => <Stats />;
const QuestsScreen = () => <Quests />;
const BattleElement = () => <BattleScreen />;
export default function App() {
  return (
    <PhoneFrame>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Stats"
          tabBar={(props) => <BottomNav {...props} />} // Use your custom bottom bar
          screenOptions={{ headerShown: false }}
        >
          <Tab.Screen name="Stats" component={StatsScreen} />
          <Tab.Screen name="Quests" component={QuestsScreen} />
          <Tab.Screen name="Battle" component={BattleElement} />
        </Tab.Navigator>
      </NavigationContainer>
    </PhoneFrame>
  );
}
