import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "@react-navigation/native";

import { AppTabs } from "./AppTabs";
import { SettingsScreen } from "../screens/SettingsScreen";
import { AnimeDetailsScreen } from "../screens/AnimeDetailsScreen";
import { AppStackParams } from "../types/navigation";
import { getBlurScheme } from "../utils/theme";
import { useColorScheme } from "react-native";
import { SettingsContext } from "../context/SettingsContext";

const Stack = createNativeStackNavigator<AppStackParams>();

export const AppStack = () => {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const { theme } = useContext(SettingsContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        // headerLargeTitle: true,
        headerBlurEffect: getBlurScheme(theme, scheme),
        headerLargeStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="AppTabs"
        component={AppTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AnimeDetailsScreen" component={AnimeDetailsScreen} />

      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
    </Stack.Navigator>
  );
};