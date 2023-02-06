import React, { useContext } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { AppStack } from "./AppStack";
import { SettingsContext } from "../context/SettingsContext";
import { getStatusBarColor, getThemeScheme } from "../utils/theme";

export const Routes = () => {
  const scheme = useColorScheme();
  const { theme } = useContext(SettingsContext);

  // let THEME;
  // let STATUS_BAR_STYLE;

  // if (theme === "automatic") {
  //   if (scheme === "dark") {
  //     THEME = CustomDarkTheme;
  //     STATUS_BAR_STYLE = "light-content";
  //   } else {
  //     THEME = CustomLightTheme;
  //     STATUS_BAR_STYLE = "dark-content";
  //   }
  // } else if (theme === "light") {
  //   THEME = CustomLightTheme;
  //   STATUS_BAR_STYLE = "dark-content";
  // } else if (theme === "dark") {
  //   THEME = CustomDarkTheme;
  //   STATUS_BAR_STYLE = "light-content";
  // }

  return (
    <NavigationContainer theme={getThemeScheme(theme, scheme)}>
      <AppStack />
      {/* @ts-ignore */}
      <StatusBar barStyle={getStatusBarColor(theme, scheme)} />
    </NavigationContainer>
  );
};
