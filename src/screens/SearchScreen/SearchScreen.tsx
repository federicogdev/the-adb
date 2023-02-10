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
import { Ionicons } from "@expo/vector-icons";

import { fetchAnimes, searchAnimes } from "../../utils/api";
import { SafeArea } from "../../components/SafeArea";
import { Box } from "../../components/Box";
import { AnimeCover } from "../../components/AnimeCover";
import { Typography } from "../../components/Typography";
import { TopAnimeFilter } from "../../models";
import { AnimeHorizontal } from "../../components/AnimeHorizontal";
import { SearchContext } from "../../context/SearchContext";
import { Spacer } from "../../components/Spacer";

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
                    title: item.title,
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
        <ScrollView>
          {searchHistory.length > 0 && (
            <Box flexDirection="column" pX={15} mBottom={20}>
              <Box justify="space-between" mBottom={10}>
                <Typography size={22} variant="bold">
                  Past searches
                </Typography>
                <Typography color="primary" onPress={() => clearHistory()}>
                  Clear
                </Typography>
              </Box>
              <View style={styles.searchHistoryWrapper}>
                {searchHistory.map((el, index) => (
                  <Pressable
                    style={[
                      styles.searchHistoryChip,
                      { backgroundColor: colors.card },
                    ]}
                    key={index}
                    onPress={() =>
                      navigation.navigate("AnimeDetailsScreen", { id: el.id })
                    }
                  >
                    <Typography>{el.title}</Typography>
                    <Spacer x={5} />
                    <Ionicons
                      name="close"
                      color={colors.primary}
                      size={18}
                      onPress={() =>
                        removeFromSearchHistory({ id: el.id, title: el.title })
                      }
                    />
                  </Pressable>
                ))}
              </View>
            </Box>
          )}

          <Box flexDirection="column" pX={15}>
            <Typography size={22} variant="bold">
              Popular
            </Typography>
            <>
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
            </>
          </Box>
        </ScrollView>
      )}
    </SafeArea>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  flatlistWrapper: { paddingHorizontal: 10 },
  searchHistoryWrapper: {
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  searchHistoryChip: {
    padding: 7.5,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 7.5,
    marginRight: 5,
  },
});
