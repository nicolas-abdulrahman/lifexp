import React from "react";
import PhoneFrame from "./src/components/PhoneFrame";
import Stats from "./src/screens/stats";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import BottomNav from "./src/components/BottomNav";
import Quests from "./src/screens/quests/quest2";
import BattleScreen from "./src/screens/battle/index";
import MapScreen from "./src/screens/map/index";
import VitalityScreen from "./src/screens/skills/Vitality";
import SkillTreeScreen from "./src/screens/skilltree/index";

const Tab = createBottomTabNavigator();
const StatsScreen = () => <Stats />;
const QuestsScreen = () => <Quests />;
const BattleElement = () => <BattleScreen />;
const MapElement = () => <MapScreen />;
const VitalityElement = () => <VitalityScreen />;
const SkillTreeElement = () => <SkillTreeScreen />;

export default function App() {
  return (
    <PhoneFrame>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Battle"
          tabBar={(props) => <BottomNav {...props} />} // Use your custom bottom bar
          screenOptions={{ headerShown: false }}
        >
          <Tab.Screen name="Stats" component={StatsScreen} />
          <Tab.Screen name="Quests" component={QuestsScreen} />
          <Tab.Screen name="Battle" component={BattleElement} />
          <Tab.Screen name="Inventory" component={SkillTreeElement} />
          <Tab.Screen name="Map" component={MapElement} />
        </Tab.Navigator>
      </NavigationContainer>
    </PhoneFrame>
  );
}
