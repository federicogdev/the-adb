import React, { FC, useState, createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Themes } from "../types/types";

interface ISettingsContextProviderProps {
  children: React.ReactNode;
}

type SettingsContextState = {
  theme: Themes;

  selectTheme: (theme: Themes) => void;
};

const contextDefaultValue: SettingsContextState = {
  theme: "automatic",
  selectTheme: () => {},
};

export const SettingsContext =
  createContext<SettingsContextState>(contextDefaultValue);

export const SettingsContextProvider: FC<ISettingsContextProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Themes>(contextDefaultValue.theme);

  const selectTheme = (theme: Themes) => {
    setTheme(theme);
  };

  //Persistence with AsyncStorage

  const saveTheme = async (value: Themes) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@theadb/theme", jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const loadTheme = async () => {
    try {
      const value = await AsyncStorage.getItem("@theadb/theme");
      if (value !== null) {
        setTheme(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadTheme();
  }, []);

  useEffect(() => {
    saveTheme(theme);
  }, [theme]);

  return (
    <SettingsContext.Provider
      value={{
        theme,
        selectTheme,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
