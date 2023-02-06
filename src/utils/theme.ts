import { ColorSchemeName } from "react-native";
import { BlurEffectTypes } from "react-native-screens";
import { CustomDarkTheme, CustomLightTheme } from "../theme";
import { Themes } from "../types/types";

export const getStatusBarColor = (theme: Themes, scheme: ColorSchemeName) => {
  if (theme === "automatic") {
    if (scheme === "dark") {
      return "light-content";
    } else {
      return "dark-content";
    }
  } else if (theme === "light") {
    return "dark-content";
  } else if (theme === "dark") {
    return "light-content";
  }
};

export const getThemeScheme = (theme: Themes, scheme: ColorSchemeName) => {
  if (theme === "automatic") {
    if (scheme === "dark") {
      return CustomDarkTheme;
    } else {
      return CustomLightTheme;
    }
  } else if (theme === "light") {
    return CustomLightTheme;
  } else if (theme === "dark") {
    return CustomDarkTheme;
  }
};

export const getBlurScheme = (
  theme: Themes,
  scheme: ColorSchemeName
): BlurEffectTypes | undefined => {
  if (theme === "automatic") {
    if (scheme === "dark") {
      return "dark";
    } else {
      return "light";
    }
  } else if (theme === "light") {
    return "light";
  } else if (theme === "dark") {
    return "dark";
  }
};
