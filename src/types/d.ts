import "@react-navigation/native";

declare module "@react-navigation/native" {
  export type ExtendedTheme = {
    dark: boolean;
    colors: {
      primary: string;
      secondary: string;
      tertiary: string;
      danger: string;
      background: string;
      card: string;
      surface: string;
      text: string;
      subtext: string;
      separator: string;
      border: string;
      highlight: string;
      notification: string;
    };
  };
  export function useTheme(): ExtendedTheme;
}
