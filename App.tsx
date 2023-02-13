import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
// import { LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CollectionsContextProvider } from "./src/context/CollectionsContext";
import { SearchContextProvider } from "./src/context/SearchContext";
import { SettingsContextProvider } from "./src/context/SettingsContext";
import { Routes } from "./src/navigation/Routes";

interface Props {}

const client = new QueryClient();

const App = (props: Props) => {
  // LogBox.ignoreAllLogs();
  return (
    // <SafeAreaProvider>
    <SearchContextProvider>
      <SettingsContextProvider>
        <QueryClientProvider client={client}>
          <CollectionsContextProvider>
            <Routes />
          </CollectionsContextProvider>
        </QueryClientProvider>
      </SettingsContextProvider>
    </SearchContextProvider>
    // </SafeAreaProvider>
  );
};

export default App;
