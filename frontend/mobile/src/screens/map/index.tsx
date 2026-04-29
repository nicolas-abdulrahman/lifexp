// map.tsx — add SVG trail line back

import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import { LinearGradient as ExpoGradient } from "expo-linear-gradient";
import { Flag, Plus } from "lucide-react-native";
import { appTheme } from "../../theme";
import { DraggableNode } from "./draggableNode";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const MAP_HEIGHT = 1500;

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.canvas}>
          {/* ✅ SVG rendered first = sits beneath the node */}
          <Svg
            style={{ position: "absolute", top: 0, left: 0 }}
            width={SCREEN_WIDTH}
            height={MAP_HEIGHT}
            viewBox={`0 0 ${SCREEN_WIDTH} ${MAP_HEIGHT}`}
          >
            <Defs>
              <LinearGradient
                id="leyLineGrad"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <Stop
                  offset="0%"
                  stopColor={appTheme.colors.map.leyLineStart}
                />
                <Stop offset="50%" stopColor={appTheme.colors.map.leyLineEnd} />
                <Stop
                  offset="100%"
                  stopColor={appTheme.colors.map.leyLineStart}
                />
              </LinearGradient>
            </Defs>
            <Path
              d={`
                M 40  80
                Q 220 200  160 350
                T 240 550
                T 80  750
                T 260 950
                T 90  1150
                T 240 1350
              `}
              fill="none"
              stroke="url(#leyLineGrad)"
              strokeWidth="6"
              strokeDasharray="12 18"
              strokeLinecap="round"
            />
          </Svg>

          {/* ✅ Node rendered after SVG = sits on top */}
          <DraggableNode
            id="1"
            initialTop={30}
            initialLeft={20}
            label="Ajeitar o Trello"
            status="completed"
            icon={<Flag size={18} color={appTheme.colors.map.nodeCompleted} />}
          />
          <DraggableNode
            id="2"
            initialTop={30}
            initialLeft={20}
            label="Codar o LifeXP"
            status="completed"
            icon={<Flag size={18} color={appTheme.colors.map.nodeCompleted} />}
          />
          <DraggableNode
            id="3"
            initialTop={30}
            initialLeft={20}
            label="Criar telas"
            status="completed"
            icon={<Flag size={18} color={appTheme.colors.map.nodeCompleted} />}
          />
        </View>

        <TouchableOpacity style={styles.fab}>
          <ExpoGradient
            colors={appTheme.colors.quest.fabGradient}
            style={styles.fabGradient}
          >
            <Plus color="white" size={30} />
          </ExpoGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.colors.map.parchment,
  },
  canvas: {
    width: SCREEN_WIDTH,
    height: MAP_HEIGHT,
  },
  fab: { position: "absolute", bottom: 30, right: 20, zIndex: 100 },
  fabGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    elevation: 10,
  },
});
