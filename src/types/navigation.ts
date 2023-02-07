export type AppTabsParams = {
  HomeScreen: undefined;
  SearchScreen: undefined;
  CollectionsScreen: undefined;
};

export type AppStackParams = {
  AppTabs: undefined;
  SettingsScreen: undefined;
  GenresScreen: undefined;
  AnimeDetailsScreen: { id: number };
  SeeMoreAnimesScreen: { title: string };
  AnimesByGenresScreen: { id: number; genre: string };
};
