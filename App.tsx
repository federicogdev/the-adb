import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Routes } from "./src/navigation/Routes";

interface Props {}

const client = new QueryClient();

const App = (props: Props) => {
  return (
    <QueryClientProvider client={client}>
      <Routes />
    </QueryClientProvider>
  );
};

export default App;
