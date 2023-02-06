import React, { useContext } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AppStack } from "./AppStack";

export const Routes = () => {
  const scheme = useColorScheme();

  return (
    <NavigationContainer>
      <AppStack />
      <StatusBar barStyle="dark-content" />
    </NavigationContainer>
  );
};
