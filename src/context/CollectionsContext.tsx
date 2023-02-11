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
  isBookmarked: (id: number) => boolean;
  addToBookmarks: (anime: IBookmarkItem) => void;
  removeFromBookmarks: (anime: IBookmarkItem) => void;
  bookmarksHandler: (game: IBookmarkItem) => void;
}

const contextDefaultValue: ICollectionsContextState = {
  bookmarks: [],
  isBookmarked: () => false,
  addToBookmarks: () => {},
  removeFromBookmarks: () => {},
  bookmarksHandler: () => {},
};

export const CollectionsContext =
  createContext<ICollectionsContextState>(contextDefaultValue);

export const CollectionsContextProvider: FC<
  ICollectionsContextProviderProps
> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<IBookmarkItem[]>(
    contextDefaultValue.bookmarks
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

  useEffect(() => {
    saveBookmarks(bookmarks);
  }, [bookmarks]);

  useEffect(() => {
    loadBookmark();
  }, []);
  return (
    <CollectionsContext.Provider
      value={{
        bookmarks,
        isBookmarked,
        addToBookmarks,
        removeFromBookmarks,
        bookmarksHandler,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
};
