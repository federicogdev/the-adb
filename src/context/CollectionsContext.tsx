import React, { FC, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ICollectionAnime } from "../types/types";

interface ICollectionsContextProviderProps {
  children: React.ReactNode;
}

interface ICollectionsContextState {
  animesCollection: ICollectionAnime[];
  addToCollection: (anime: ICollectionAnime) => void;
  removeFromCollection: (anime: ICollectionAnime) => void;
}

const contextDefaultValue: ICollectionsContextState = {
  animesCollection: [],
  addToCollection: () => {},
  removeFromCollection: () => {},
};

export const CollectionsContext =
  createContext<ICollectionsContextState>(contextDefaultValue);

export const CollectionsContextProvider: FC<
  ICollectionsContextProviderProps
> = ({ children }) => {
  const [animesCollection, setAnimeCollection] = useState<ICollectionAnime[]>(
    contextDefaultValue.animesCollection
  );

  const addToCollection = (anime: ICollectionAnime) => {
    if (animesCollection.some((el) => el.id === anime.id)) {
      animesCollection.splice(
        animesCollection.findIndex((_anime) => _anime.id === anime.id)
      );
    }

    setAnimeCollection([anime, ...animesCollection]);
  };

  const removeFromCollection = (anime: ICollectionAnime) => {
    setAnimeCollection(animesCollection.filter((el) => el.id !== anime.id));
  };

  const saveAnimesCollection = async (value: ICollectionAnime[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@theadb/animesCollection", jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const loadCollection = async () => {
    try {
      const value = await AsyncStorage.getItem("@theadb/animesCollection");
      if (value !== null) {
        setAnimeCollection(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCollection();
  }, []);

  useEffect(() => {
    saveAnimesCollection(animesCollection);
  }, [animesCollection]);

  return (
    <CollectionsContext.Provider
      value={{ animesCollection, addToCollection, removeFromCollection }}
    >
      {children}
    </CollectionsContext.Provider>
  );
};
