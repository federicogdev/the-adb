import React, { FC } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { RouteProp, useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";

import { AppStackParams } from "../../types/navigation";
import { JikanResponse, Anime } from "../../models";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AnimeCover } from "../../components/AnimeCover";
import { Box } from "../../components/Box";
import { SafeArea } from "../../components/SafeArea";

interface IAnimesByGenresScreenProps {
  navigation: NativeStackNavigationProp<AppStackParams, "AnimesByGenresScreen">;
  route: RouteProp<AppStackParams, "AnimesByGenresScreen">;
}
const AnimesByGenresScreen: FC<IAnimesByGenresScreenProps> = ({
  route,
  navigation,
}) => {
  const { colors } = useTheme();
  const { id, genre } = route.params;

  const fetchAnimes = ({ pageParam = 1 }): Promise<JikanResponse<Anime[]>> =>
    axios
      .get(
        `https://api.jikan.moe/v4/anime?genres=${id}&page=${pageParam}&limit=24`
      )
      .then((res) => {
        return res.data;
      });

  const animes = useInfiniteQuery([`${genre}Animes`, id], fetchAnimes, {
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
      <SafeArea>
        <Box flex justify="center" align="center">
          <ActivityIndicator color={colors.primary} size={22} />
        </Box>
      </SafeArea>
    );

  return (
    <SafeArea>
      <FlatList
        contentContainerStyle={styles.flatlistWrapper}
        numColumns={3}
        keyExtractor={(item) => item.mal_id.toString()}
        data={animes.data?.pages.map((page) => page.data).flat()}
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
        onEndReached={loadMore}
        onEndReachedThreshold={0.2}
      />
    </SafeArea>
  );
};

export default AnimesByGenresScreen;

const styles = StyleSheet.create({
  flatlistWrapper: { paddingHorizontal: 10 },
});
