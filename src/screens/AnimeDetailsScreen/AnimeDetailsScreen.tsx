import React, { FC, useContext, useLayoutEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  ImageBackground,
} from "react-native";
import { RouteProp, useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { AppStackParams } from "../../types/navigation";
import { SafeArea } from "../../components/SafeArea";
import { useQuery } from "@tanstack/react-query";
import { fetchAnimeDetails } from "../../utils/api";
import { Box } from "../../components/Box";
import { Typography } from "../../components/Typography";
import { Spacer } from "../../components/Spacer";
import { shortenNumber } from "../../utils/number";
import { Chip } from "../../components/Chip";

interface IAnimeDetailsScreenProps {
  navigation: NativeStackNavigationProp<AppStackParams, "AnimeDetailsScreen">;
  route: RouteProp<AppStackParams, "AnimeDetailsScreen">;
}
const AnimeDetailsScreen: FC<IAnimeDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme();
  const { id } = route.params;

  const animeDetails = useQuery(["animeDetails", id], () =>
    fetchAnimeDetails(id)
  );

  if (animeDetails.isLoading && animeDetails.isLoading) {
    return (
      <SafeArea>
        <Box flex justify="center" align="center">
          <ActivityIndicator color={colors.primary} size={22} />
        </Box>
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <ScrollView>
        <Box justify="center" mTop={20}>
          <View style={styles.container}>
            <ImageBackground
              resizeMode="cover"
              style={styles.cover}
              source={{
                uri: animeDetails.data?.data.images.jpg.large_image_url,
              }}
            >
              <Pressable
                style={[
                  styles.plusIconWrapper,
                  { backgroundColor: colors.primary },
                ]}
                onPress={() =>
                  navigation.push("AddToCollectionsScreen", {
                    id: animeDetails.data?.data.mal_id!,
                    image: animeDetails.data?.data.images.jpg.large_image_url!,
                    title: animeDetails.data?.data.title!,
                    date: animeDetails.data?.data.aired.from!,
                  })
                }
              >
                <Ionicons name="md-add-outline" size={30} color="#fff" />
              </Pressable>
            </ImageBackground>
          </View>
        </Box>
        <Box pX={20} mTop={20} align="center" justify="center">
          <Typography
            size={22}
            style={styles.title}
            variant="bold"
            numberOfLines={3}
            adjustsFontSizeToFit
          >
            {animeDetails.data?.data.title}
          </Typography>
        </Box>

        {/* STARS */}
        <Box align="center" justify="center" mTop={5}>
          <Typography color="subtext" size={14}>
            {animeDetails.data?.data.score ? animeDetails.data.data.score : "0"}
          </Typography>

          <Spacer x={3} />

          <Ionicons name="star" color={colors.primary} />

          <Typography color="subtext" size={14}>
            {" "}
            by {shortenNumber(animeDetails.data?.data.scored_by)} users
          </Typography>
        </Box>

        {/* RANKINGS POPULARITY MEMBERS */}
        <Box mTop={10} justify="space-around" pX={15}>
          <Chip>
            <Box
              // style={[styles.chip, { backgroundColor: colors.card }]}
              pX={7.5}
              pY={5}
            >
              <Typography size={13} color="subtext">
                Ranked:{" "}
                <Typography size={13} variant="bold">
                  {animeDetails.data?.data.rank
                    ? `#${animeDetails.data.data.rank}`
                    : "N/A"}
                </Typography>
              </Typography>
            </Box>
          </Chip>

          <Chip>
            <Box pX={7.5} pY={5}>
              <Typography size={13} color="subtext">
                Popularity:{" "}
                <Typography size={13} variant="bold">
                  {animeDetails.data?.data.popularity
                    ? `#${animeDetails.data.data.popularity}`
                    : "N/A"}
                </Typography>
              </Typography>
            </Box>
          </Chip>

          <Chip>
            <Box pX={7.5} pY={5}>
              <Typography size={13} color="subtext">
                Members:{" "}
                <Typography size={13} variant="bold">
                  {animeDetails.data?.data
                    ? shortenNumber(animeDetails.data?.data.members!)
                    : "N/A"}
                </Typography>
              </Typography>
            </Box>
          </Chip>
        </Box>

        {/* SYNOPSIS */}
        <Box mTop={20} pX={15} flexDirection="column">
          <Box mBottom={10}>
            <Typography variant="bold" size={13} color="subtext">
              SYNOPSIS
            </Typography>
          </Box>
          <Typography>{animeDetails.data?.data.synopsis}</Typography>
        </Box>

        {/* GENRES */}
        <Box mTop={20} pX={15} flexDirection="column">
          <Box mBottom={10}>
            <Typography variant="bold" size={13} color="subtext">
              GENRES
            </Typography>
          </Box>

          <View style={styles.chipContainer}>
            {animeDetails.data?.data.genres.map((el) => (
              <Pressable
                onPress={() =>
                  navigation.push("AnimesByGenresScreen", {
                    id: el.mal_id,
                    genre: el.name,
                  })
                }
              >
                <Chip style={{ marginRight: 10, padding: 10 }}>
                  <Typography>{el.name}</Typography>
                </Chip>
              </Pressable>
            ))}
          </View>
        </Box>
      </ScrollView>
    </SafeArea>
  );
};

export default AnimeDetailsScreen;

const styles = StyleSheet.create({
  coverImage: {
    height: 250,
    aspectRatio: 4 / 6,
    borderRadius: 10,
    borderWidth: 1,
  },
  title: { textAlign: "center" },
  chip: {
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.0,

    elevation: 1,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },

  container: {
    width: 166,
    aspectRatio: 4 / 6,
    borderRadius: 10,
    borderWidth: 1,
  },
  cover: {
    flex: 1,
    borderRadius: 5,
    justifyContent: "flex-end",
    alignItems: "center",
    overflow: "hidden",
  },
  plusIconWrapper: {
    marginBottom: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
