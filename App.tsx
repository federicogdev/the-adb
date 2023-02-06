import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { SettingsContextProvider } from "./src/context/SettingsContext";
import { Routes } from "./src/navigation/Routes";

interface Props {}

const client = new QueryClient();

const App = (props: Props) => {
  return (
    <QueryClientProvider client={client}>
      <SettingsContextProvider>
        <Routes />
      </SettingsContextProvider>
    </QueryClientProvider>
  );
};

export default App;
