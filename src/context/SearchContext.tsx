import React, { FC, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ISearchContextProviderProps {
  children: React.ReactNode;
}

interface ISearchItem {
  id: number;
  title: string;
}

interface ISearchContextState {
  searchHistory: ISearchItem[];
  removeFromSearchHistory: (item: ISearchItem) => void;
  addToSearchHistory: (item: ISearchItem) => void;
  clearHistory: () => void;
}

const contextDefaultValue: ISearchContextState = {
  searchHistory: [],
  removeFromSearchHistory: () => {},
  addToSearchHistory: () => {},
  clearHistory: () => {},
};

export const SearchContext =
  createContext<ISearchContextState>(contextDefaultValue);

export const SearchContextProvider: FC<ISearchContextProviderProps> = ({
  children,
}) => {
  const [searchHistory, setSearchHistory] = useState<ISearchItem[]>(
    contextDefaultValue.searchHistory
  );

  const addToSearchHistory = (item: ISearchItem) => {
    if (searchHistory.some((e) => e.id === item.id)) {
      searchHistory.splice(searchHistory.findIndex((x) => x.id === item.id));
    }

    setSearchHistory([item, ...searchHistory]);
  };

  const removeFromSearchHistory = (item: ISearchItem) => {
    setSearchHistory(searchHistory.filter((el) => el.id !== item.id));
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  const saveSearchHistory = async (value: ISearchItem[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@theadb/searchHistory", jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const loadSearchHistory = async () => {
    try {
      const value = await AsyncStorage.getItem("@theadb/searchHistory");

      if (value !== null) {
        setSearchHistory(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadSearchHistory();
  }, []);
  useEffect(() => {
    saveSearchHistory(searchHistory);
  }, [searchHistory]);

  return (
    <SearchContext.Provider
      value={{
        searchHistory,
        addToSearchHistory,
        removeFromSearchHistory,
        clearHistory,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
