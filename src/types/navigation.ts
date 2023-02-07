export type AppTabsParams = {
  HomeScreen: undefined;
  SearchScreen: undefined;
  CollectionsScreen: undefined;
};

export type AppStackParams = {
  AppTabs: undefined;
  SettingsScreen: undefined;
  AnimeDetailsScreen: { id: number };
  SeeMoreAnimesScreen: { title: string };
};
