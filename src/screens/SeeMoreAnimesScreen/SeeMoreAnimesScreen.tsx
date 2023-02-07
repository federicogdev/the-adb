import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Pressable,
  View,
} from "react-native";
import React, { FC } from "react";
import axios from "axios";
import { JikanResponse, Anime } from "../../models";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { SafeArea } from "../../components/SafeArea";
import { AnimeCover } from "../../components/AnimeCover";
import { RouteProp } from "@react-navigation/native";
import { AppStackParams } from "../../types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Box } from "../../components/Box";

interface ISeeMoreAnimeScreenProps {
  navigation: NativeStackNavigationProp<AppStackParams, "SeeMoreAnimesScreen">;
  route: RouteProp<AppStackParams, "SeeMoreAnimesScreen">;
}

const SeeMoreAnimesScreen: FC<ISeeMoreAnimeScreenProps> = ({
  route,
  navigation,
}) => {
  const { title } = route.params;

  const fetchAnimes = ({ pageParam = 1 }): Promise<JikanResponse<Anime[]>> =>
    axios
      .get(
        `https://api.jikan.moe/v4/top/anime?page=${pageParam}&filter=${title}&limit=24`
      )
      .then((res) => res.data);

  const animes = useInfiniteQuery(["moreAnimesList", title], fetchAnimes, {
    getNextPageParam: (_, page) => {
      return page.length + 1;
    },
  });

  const loadMore = () => {
    if (animes.hasNextPage) {
      animes.fetchNextPage();
    }
  };

  if (animes.isLoading)
    return (
      <Box flex justify="center" align="center">
        <ActivityIndicator />
      </Box>
    );
  return (
    <SafeArea>
      <FlatList
        contentContainerStyle={styles.flatlistWrapper}
        numColumns={3}
        keyExtractor={(item) => item.mal_id.toString()}
        data={animes.data?.pages.map((page) => page.data).flat()}
        renderItem={({ item }) => (
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
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.2}
        ListFooterComponent={
          animes.isFetchingNextPage ? (
            <ActivityIndicator size={22} color="red" />
          ) : null
        }
      />
    </SafeArea>
  );
};

export default SeeMoreAnimesScreen;

const styles = StyleSheet.create({
  flatlistWrapper: { paddingHorizontal: 10 },
});
