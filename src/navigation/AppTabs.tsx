import React, { useContext } from "react";
import { useTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { HomeScreen } from "../screens/HomeScreen";
import { CollectionsScreen } from "../screens/CollectionsScreen";
import { SearchScreen } from "../screens/SearchScreen";

import { AppTabsParams } from "../types/navigation";
import { SettingsContext } from "../context/SettingsContext";
import { useColorScheme } from "react-native";
import { getBlurScheme } from "../utils/theme";

const HomeStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();
const CollectionsStack = createNativeStackNavigator();

const Tabs = createBottomTabNavigator<AppTabsParams>();

const HomeScreenStack = () => {
  const { colors } = useTheme();
  const { theme } = useContext(SettingsContext);
  const scheme = useColorScheme();

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTransparent: true,
        // headerLargeTitle: true,
        headerBlurEffect: getBlurScheme(theme, scheme),
        headerLargeStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <HomeStack.Screen component={HomeScreen} name="Explore" />
    </HomeStack.Navigator>
  );
};

const CollectionsScreenStack = () => {
  const { colors } = useTheme();
  const { theme } = useContext(SettingsContext);
  const scheme = useColorScheme();

  return (
    <CollectionsStack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerLargeTitle: true,
        headerBlurEffect: getBlurScheme(theme, scheme),
        headerLargeStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <CollectionsStack.Screen
        component={CollectionsScreen}
        name="Collections"
      />
    </CollectionsStack.Navigator>
  );
};

const SearchScreenStack = () => {
  const { colors } = useTheme();
  const { theme } = useContext(SettingsContext);
  const scheme = useColorScheme();

  return (
    <SearchStack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerLargeTitle: true,
        headerBlurEffect: getBlurScheme(theme, scheme),
        headerLargeStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <SearchStack.Screen component={SearchScreen} name="Search" />
    </SearchStack.Navigator>
  );
};

export const AppTabs = () => {
  const { colors } = useTheme();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.card },
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        component={HomeScreenStack}
        name="HomeScreen"
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "md-home" : "md-home-outline"}
              size={20}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        component={CollectionsScreenStack}
        name="CollectionsScreen"
        options={{
          tabBarLabel: "Collections",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "md-star" : "md-star-outline"}
              size={20}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        component={SearchScreenStack}
        name="SearchScreen"
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "md-search" : "md-search-outline"}
              size={20}
              color={color}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};
