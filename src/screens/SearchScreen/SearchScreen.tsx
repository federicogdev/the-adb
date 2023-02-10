import React, { FC, useLayoutEffect, useState } from "react";
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

interface ISearchScreenProps {
  navigation: NativeStackNavigationProp<AppStackParams, "AppTabs">;
}

const SearchScreen: FC<ISearchScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const [searchTerm, setSearchTerm] = useState<string>("");

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
    fetchAnimes(TopAnimeFilter.bypopularity, 6)
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
                onPress={() =>
                  navigation.push("AnimeDetailsScreen", {
                    id: item.mal_id,
                  })
                }
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
          <Box>
            <Typography>Past searches</Typography>
          </Box>
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
});
