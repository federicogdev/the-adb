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
import { SeeMoreAnimesScreen } from "../screens/SeeMoreAnimesScreen";
import { GenresScreen } from "../screens/GenresScreen";
import { AnimesByGenresScreen } from "../screens/AnimesByGenresScreen";
import { AddToCollectionsScreen } from "../screens/AddToCollectionsScreen";
import AnimesByCollectionsScreen from "../screens/AnimesByCollectionsScreen/AnimesByCollectionsScreen";

const Stack = createNativeStackNavigator<AppStackParams>();

export const AppStack = () => {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const { theme } = useContext(SettingsContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerLargeTitle: true,
        headerBlurEffect: getBlurScheme(theme, scheme),
        headerLargeStyle: {
          backgroundColor: colors.background,
        },
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen
        name="AppTabs"
        component={AppTabs}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="AnimeDetailsScreen"
        component={AnimeDetailsScreen}
        options={{ headerLargeTitle: false, headerTitle: "" }}
      />

      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />

      <Stack.Screen
        name="GenresScreen"
        component={GenresScreen}
        options={{ title: "Genres" }}
      />

      <Stack.Screen
        name="SeeMoreAnimesScreen"
        component={SeeMoreAnimesScreen}
        options={({ route }) => ({
          headerTitle: route.params.title,
        })}
      />
      <Stack.Screen
        name="AnimesByGenresScreen"
        component={AnimesByGenresScreen}
        options={({ route }) => ({
          headerTitle: route.params.genre,
        })}
      />
      <Stack.Screen
        name="AnimesByCollectionsScreen"
        component={AnimesByCollectionsScreen}
        options={({ route }) => ({
          headerTitle:
            route.params.collection.charAt(0).toUpperCase() +
            route.params.collection.slice(1),
        })}
      />

      <Stack.Screen
        name="AddToCollectionsScreen"
        component={AddToCollectionsScreen}
        options={{ presentation: "formSheet", headerShown: false }}
      />
    </Stack.Navigator>
  );
};
