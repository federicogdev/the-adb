import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SettingsContextProvider } from "./src/context/SettingsContext";
import { Routes } from "./src/navigation/Routes";

interface Props {}

const client = new QueryClient();

const App = (props: Props) => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={client}>
        <SettingsContextProvider>
          <Routes />
        </SettingsContextProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
