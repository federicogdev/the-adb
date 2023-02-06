import React, { useContext } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AppTabs } from "./AppTabs";

export const Routes = () => {
  const scheme = useColorScheme();

  return (
    <NavigationContainer>
      <AppTabs />
      <StatusBar barStyle="dark-content" />
    </NavigationContainer>
  );
};
