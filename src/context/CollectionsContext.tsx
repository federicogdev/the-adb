import React, { FC, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ICollectionsContextProviderProps {
  children: React.ReactNode;
}

interface IBookmarkItem {
  id: number;
  image: string;
  title: string;
  date: string;
}

interface ICollectionItem extends IBookmarkItem {
  category: string;
}

interface ICollectionsContextState {
  bookmarks: IBookmarkItem[];
  collection: ICollectionItem[];
  isBookmarked: (id: number) => boolean;
  isCategory: (id: number, category: string) => boolean;
  bookmarksHandler: (anime: IBookmarkItem) => void;
  addToCollection: (anime: ICollectionItem) => void;
  removeFromCollection: (anime: ICollectionItem) => void;
  isFinished: (id: number) => boolean;
  isPlanned: (id: number) => boolean;
  isWatching: (id: number) => boolean;
  isInterrupted: (id: number) => boolean;
}

const contextDefaultValue: ICollectionsContextState = {
  bookmarks: [],
  collection: [],
  isBookmarked: () => false,
  isCategory: () => false,
  bookmarksHandler: () => {},
  addToCollection: () => {},
  removeFromCollection: () => {},
  isFinished: () => false,
  isPlanned: () => false,
  isWatching: () => false,
  isInterrupted: () => false,
};

export const CollectionsContext =
  createContext<ICollectionsContextState>(contextDefaultValue);

export const CollectionsContextProvider: FC<
  ICollectionsContextProviderProps
> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<IBookmarkItem[]>(
    contextDefaultValue.bookmarks
  );

  const [collection, setCollection] = useState<ICollectionItem[]>(
    contextDefaultValue.collection
  );

  const isBookmarked = (id: number) => {
    return bookmarks.some((_anime) => _anime.id === id);
  };

  const addToBookmarks = (anime: IBookmarkItem) => {
    setBookmarks([anime, ...bookmarks]);
  };

  const removeFromBookmarks = (anime: IBookmarkItem) => {
    setBookmarks(bookmarks.filter((_anime) => _anime.id !== anime.id));
  };

  const bookmarksHandler = (anime: IBookmarkItem) => {
    if (!isBookmarked(anime.id)) {
      addToBookmarks(anime);
    } else {
      removeFromBookmarks(anime);
    }
  };

  const saveBookmarks = async (value: IBookmarkItem[]) => {
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

  const addToCollection = (anime: ICollectionItem) => {
    if (collection.some((el) => el.id === anime.id)) {
      collection.splice(collection.findIndex((x) => x.id === anime.id));
    }
    setCollection([anime, ...collection]);
  };

  const removeFromCollection = (anime: ICollectionItem) => {
    setCollection(collection.filter((el) => el.id !== anime.id));
  };

  const isCategory = (id: number, category: string) =>
    collection.find((el) => el.id === id)?.category === category;

  const isFinished = (id: number) => {
    return collection.find((el) => el.id === id)?.category === "finished";
  };

  const isWatching = (id: number) => {
    return collection.find((el) => el.id === id)?.category === "watching";
  };
  const isPlanned = (id: number) => {
    return collection.find((el) => el.id === id)?.category === "planned";
  };
  const isInterrupted = (id: number) => {
    return collection.find((el) => el.id === id)?.category === "interrupted";
  };

  const saveCollection = async (value: ICollectionItem[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@theadb/collection", jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const loadCollection = async () => {
    try {
      const value = await AsyncStorage.getItem("@theadb/collection");
      if (value !== null) {
        setBookmarks(JSON.parse(value));
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
    saveCollection(collection);
  }, [collection]);

  useEffect(() => {
    loadCollection();
  }, []);

  return (
    <CollectionsContext.Provider
      value={{
        bookmarks,
        collection,
        bookmarksHandler,
        addToCollection,
        removeFromCollection,
        isBookmarked,
        isFinished,
        isInterrupted,
        isPlanned,
        isWatching,
        isCategory,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
};
