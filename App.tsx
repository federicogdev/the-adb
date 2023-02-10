import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
// import { LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SearchContextProvider } from "./src/context/SearchContext";
import { SettingsContextProvider } from "./src/context/SettingsContext";
import { Routes } from "./src/navigation/Routes";

interface Props {}

const client = new QueryClient();

const App = (props: Props) => {
  // LogBox.ignoreAllLogs();
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={client}>
        <SettingsContextProvider>
          <SearchContextProvider>
            <Routes />
          </SearchContextProvider>
        </SettingsContextProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
