import React, { FC, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ICollectionsContextProviderProps {
  children: React.ReactNode;
}

interface ICollectionItem {
  id: number;
  image: string;
  title: string;
  date: string;
}

interface ICollectionsContextState {
  bookmarks: ICollectionItem[];
  finishedAnimes: ICollectionItem[];
  plannedAnimes: ICollectionItem[];
  watchingAnimes: ICollectionItem[];
  interruptedAnimes: ICollectionItem[];
  isBookmarked: (id: number) => boolean;
  bookmarksHandler: (game: ICollectionItem) => void;
  isFinished: (id: number) => boolean;
  finishedAnimesHandler: (game: ICollectionItem) => void;
  isPlanned: (id: number) => boolean;
  plannedAnimesHandler: (game: ICollectionItem) => void;
  isWatching: (id: number) => boolean;
  watchingAnimesHanlder: (game: ICollectionItem) => void;
  isInterrupted: (id: number) => boolean;
  interruptedAnimesHanlder: (game: ICollectionItem) => void;
}

const contextDefaultValue: ICollectionsContextState = {
  bookmarks: [],
  finishedAnimes: [],
  watchingAnimes: [],
  interruptedAnimes: [],
  plannedAnimes: [],
  isBookmarked: () => false,
  bookmarksHandler: () => {},
  isFinished: () => false,
  finishedAnimesHandler: () => {},
  isPlanned: () => false,
  plannedAnimesHandler: () => {},
  isWatching: () => false,
  watchingAnimesHanlder: () => {},
  isInterrupted: () => false,
  interruptedAnimesHanlder: () => {},
};

export const CollectionsContext =
  createContext<ICollectionsContextState>(contextDefaultValue);

export const CollectionsContextProvider: FC<
  ICollectionsContextProviderProps
> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<ICollectionItem[]>(
    contextDefaultValue.bookmarks
  );
  const [finishedAnimes, setFinishedAnimes] = useState<ICollectionItem[]>(
    contextDefaultValue.finishedAnimes
  );
  const [plannedAnimes, setPlannedAnimes] = useState<ICollectionItem[]>(
    contextDefaultValue.plannedAnimes
  );
  const [watchingAnimes, setWatchingAnimes] = useState<ICollectionItem[]>(
    contextDefaultValue.watchingAnimes
  );
  const [interruptedAnimes, setInterruptedAnimes] = useState<ICollectionItem[]>(
    contextDefaultValue.bookmarks
  );

  const isBookmarked = (id: number) => {
    return bookmarks.some((_anime) => _anime.id === id);
  };

  const addToBookmarks = (anime: ICollectionItem) => {
    setBookmarks([anime, ...bookmarks]);
  };

  const removeFromBookmarks = (anime: ICollectionItem) => {
    setBookmarks(bookmarks.filter((_anime) => _anime.id !== anime.id));
  };

  const bookmarksHandler = (anime: ICollectionItem) => {
    if (!isBookmarked(anime.id)) {
      addToBookmarks(anime);
    } else {
      removeFromBookmarks(anime);
    }
  };

  const saveBookmarks = async (value: ICollectionItem[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@theadb/bookmarks", jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const loadBookmark = async () => {
    try {
      const value = await AsyncStorage.getItem("@theadb/bookmarks");
      if (value !== null) {
        setBookmarks(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isFinished = (id: number) => {
    return finishedAnimes.some((_anime) => _anime.id === id);
  };

  const addToFinishedAnimes = (anime: ICollectionItem) => {
    setFinishedAnimes([anime, ...finishedAnimes]);
  };

  const removeFromFinishedAnimes = (anime: ICollectionItem) => {
    setFinishedAnimes(
      finishedAnimes.filter((_anime) => _anime.id !== anime.id)
    );
  };

  const finishedAnimesHandler = (anime: ICollectionItem) => {
    if (!isFinished(anime.id)) {
      removeFromFinishedAnimes(anime);
      removeFromInterruptedAnimes(anime);
      removeFromWatchingAnimes(anime);
      removeFromPlannedAnimes(anime);
    } else {
      addToFinishedAnimes(anime);
      removeFromInterruptedAnimes(anime);
      removeFromWatchingAnimes(anime);
      removeFromPlannedAnimes(anime);
    }
  };

  const saveFinishedAnimes = async (value: ICollectionItem[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@theadb/finishedAnimes", jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const loadFinishedItems = async () => {
    try {
      const value = await AsyncStorage.getItem("@theadb/finishedAnimes");
      if (value !== null) {
        setFinishedAnimes(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isPlanned = (id: number) => {
    return plannedAnimes.some((_anime) => _anime.id === id);
  };

  const addToPlannedAnimes = (anime: ICollectionItem) => {
    setPlannedAnimes([anime, ...plannedAnimes]);
  };

  const removeFromPlannedAnimes = (anime: ICollectionItem) => {
    setPlannedAnimes(plannedAnimes.filter((_anime) => _anime.id !== anime.id));
  };

  const plannedAnimesHandler = (anime: ICollectionItem) => {
    if (!isPlanned(anime.id)) {
      removeFromFinishedAnimes(anime);
      removeFromInterruptedAnimes(anime);
      removeFromWatchingAnimes(anime);
      removeFromPlannedAnimes(anime);
    } else {
      removeFromFinishedAnimes(anime);
      removeFromInterruptedAnimes(anime);
      removeFromWatchingAnimes(anime);
      addToPlannedAnimes(anime);
    }
  };

  const savePlannedAnimes = async (value: ICollectionItem[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@theadb/plannedAnimes", jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const loadPlannedItems = async () => {
    try {
      const value = await AsyncStorage.getItem("@theadb/plannedAnimes");
      if (value !== null) {
        setFinishedAnimes(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isWatching = (id: number) => {
    return watchingAnimes.some((_anime) => _anime.id === id);
  };

  const addToWatchingAnimes = (anime: ICollectionItem) => {
    setWatchingAnimes([anime, ...watchingAnimes]);
  };

  const removeFromWatchingAnimes = (anime: ICollectionItem) => {
    setWatchingAnimes(
      watchingAnimes.filter((_anime) => _anime.id !== anime.id)
    );
  };

  const watchingAnimesHanlder = (anime: ICollectionItem) => {
    if (!isWatching(anime.id)) {
      removeFromFinishedAnimes(anime);
      removeFromInterruptedAnimes(anime);
      removeFromWatchingAnimes(anime);
      removeFromPlannedAnimes(anime);
    } else {
      removeFromFinishedAnimes(anime);
      removeFromInterruptedAnimes(anime);
      addToWatchingAnimes(anime);
      removeFromPlannedAnimes(anime);
    }
  };

  const saveWatchingAnimes = async (value: ICollectionItem[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@theadb/watchingAnimes", jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const loadWatchingAnimes = async () => {
    try {
      const value = await AsyncStorage.getItem("@theadb/watchingAnimes");
      if (value !== null) {
        setFinishedAnimes(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isInterrupted = (id: number) => {
    return interruptedAnimes.some((_anime) => _anime.id === id);
  };

  const addToInterruptedAnimes = (anime: ICollectionItem) => {
    setInterruptedAnimes([anime, ...interruptedAnimes]);
  };

  const removeFromInterruptedAnimes = (anime: ICollectionItem) => {
    setInterruptedAnimes(
      interruptedAnimes.filter((_anime) => _anime.id !== anime.id)
    );
  };

  const interruptedAnimesHanlder = (anime: ICollectionItem) => {
    if (!isWatching(anime.id)) {
      removeFromFinishedAnimes(anime);
      removeFromInterruptedAnimes(anime);
      removeFromWatchingAnimes(anime);
      removeFromPlannedAnimes(anime);
    } else {
      addToInterruptedAnimes(anime);
      removeFromFinishedAnimes(anime);
      removeFromWatchingAnimes(anime);
      removeFromPlannedAnimes(anime);
    }
  };

  const saveInterruptedAnimes = async (value: ICollectionItem[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@theadb/interruptedAnimes", jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const loadInterruptedAnimes = async () => {
    try {
      const value = await AsyncStorage.getItem("@theadb/watchingAnimes");
      if (value !== null) {
        setFinishedAnimes(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    saveBookmarks(bookmarks);
  }, [bookmarks]);

  useEffect(() => {
    loadBookmark();
  }, []);

  useEffect(() => {
    saveFinishedAnimes(finishedAnimes);
  }, [finishedAnimes]);

  useEffect(() => {
    loadFinishedItems();
  }, []);

  useEffect(() => {
    savePlannedAnimes(plannedAnimes);
  }, [plannedAnimes]);

  useEffect(() => {
    loadPlannedItems();
  }, []);

  useEffect(() => {
    saveWatchingAnimes(watchingAnimes);
  }, [watchingAnimes]);

  useEffect(() => {
    loadWatchingAnimes();
  }, []);

  useEffect(() => {
    saveInterruptedAnimes(interruptedAnimes);
  }, [interruptedAnimes]);

  useEffect(() => {
    loadInterruptedAnimes();
  }, []);

  return (
    <CollectionsContext.Provider
      value={{
        bookmarks,
        isBookmarked,
        bookmarksHandler,
        finishedAnimes,
        isFinished,
        finishedAnimesHandler,
        plannedAnimes,
        isPlanned,
        plannedAnimesHandler,
        interruptedAnimes,
        isInterrupted,
        interruptedAnimesHanlder,
        watchingAnimes,
        isWatching,
        watchingAnimesHanlder,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
};
