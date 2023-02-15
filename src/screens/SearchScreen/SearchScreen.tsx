import React, { FC, useContext, useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { AppStackParams } from "../../types/navigation";

import { fetchAnimes, searchAnimes } from "../../utils/api";
import { SafeArea } from "../../components/SafeArea";
import { Box } from "../../components/Box";
import { AnimeCover } from "../../components/AnimeCover";
import { Typography } from "../../components/Typography";
import { TopAnimeFilter } from "../../models";
import { AnimeHorizontal } from "../../components/AnimeHorizontal";
import { SearchContext } from "../../context/SearchContext";

interface ISearchScreenProps {
  navigation: NativeStackNavigationProp<AppStackParams, "AppTabs">;
}

const SearchScreen: FC<ISearchScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const {
    searchHistory,
    addToSearchHistory,
    removeFromSearchHistory,
    clearHistory,
  } = useContext(SearchContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Search",
      headerSearchBarOptions: {
        shouldShowHintSearchIcon: true,
        onChangeText: (event) => setSearchTerm(event.nativeEvent.text),
        onSearchButtonPress: () => onClick(),
        hideWhenScrolling: false,
      },
    });
  }, [navigation]);

  const searchedAnimes = useQuery(
    ["searchedAnimes", searchTerm],
    () => searchAnimes(searchTerm),
    { enabled: false }
  );

  const onClick = () => searchedAnimes.refetch();

  const popularAnimes = useQuery(["popularAnimes"], () =>
    fetchAnimes(TopAnimeFilter.bypopularity, 12)
  );

  if (searchedAnimes.isRefetching && popularAnimes.isLoading)
    return (
      <SafeArea>
        <Box flex justify="center" align="center">
          <ActivityIndicator size={22} color={colors.primary} />
        </Box>
      </SafeArea>
    );

  return (
    <SafeArea>
      {searchedAnimes.data?.data ? (
        <FlatList
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.flatlistWrapper}
          numColumns={3}
          keyExtractor={(item) => item.mal_id.toString()}
          data={searchedAnimes.data?.data}
          renderItem={({ item }) => (
            <View>
              <Pressable
                key={item.mal_id}
                onPress={() => {
                  navigation.push("AnimeDetailsScreen", {
                    id: item.mal_id,
                  });

                  addToSearchHistory({
                    id: item.mal_id,
                    title:
                      item.title.length > 15
                        ? item.title.slice(0, 15)
                        : item.title,
                  });
                }}
                style={[{ paddingHorizontal: 5, paddingVertical: 5 }]}
              >
                <AnimeCover
                  anime={item}
                  width={(Dimensions.get("screen").width - 50) / 3}
                  multiline={false}
                />
              </Pressable>
            </View>
          )}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewWrapper}>
          {searchHistory.length > 0 && (
            <Box flexDirection="column" mBottom={20}>
              <Box justify="space-between" mBottom={10} pX={15}>
                <Typography size={22} variant="bold">
                  Recents{" "}
                </Typography>
                <Typography color="primary" onPress={() => clearHistory()}>
                  Clear
                </Typography>
              </Box>

              <View>
                {searchHistory.slice(0, 5).map((el, i) => (
                  <View
                    style={[
                      styles.searchTermWrapper,
                      i === 0 && { borderTopWidth: 0 },
                      { borderColor: colors.separator },
                    ]}
                    key={i}
                  >
                    <Typography
                      size={18}
                      color="primary"
                      onPress={() =>
                        navigation.push("AnimeDetailsScreen", { id: el.id })
                      }
                    >
                      {el.title}
                    </Typography>
                  </View>
                ))}
              </View>
            </Box>
          )}

          <Box flexDirection="column" pX={15}>
            <Typography size={22} variant="bold">
              Popular
            </Typography>
            <Box flexDirection="column" mTop={10}>
              {popularAnimes.data?.data.map((item, key) => (
                <Pressable
                  key={item.mal_id}
                  onPress={() =>
                    navigation.push("AnimeDetailsScreen", {
                      id: item.mal_id,
                    })
                  }
                  style={[{ paddingHorizontal: 5, paddingVertical: 5 }]}
                >
                  <AnimeHorizontal anime={item} />
                </Pressable>
              ))}
            </Box>
          </Box>
        </ScrollView>
      )}
    </SafeArea>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  flatlistWrapper: { paddingHorizontal: 10 },
  scrollViewWrapper: { paddingVertical: 20 },
  searchHistoryWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  searchHistoryChip: {
    padding: 7.5,
    borderRadius: 5,
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 7.5,
    marginRight: 5,
  },
  chipLeft: {
    flex: 4 / 5,
  },
  chipRight: { flex: 0.4 / 5 },
  searchTermWrapper: {
    borderTopWidth: 0.5,
    marginLeft: 15,
    paddingVertical: 7.5,
  },
});
