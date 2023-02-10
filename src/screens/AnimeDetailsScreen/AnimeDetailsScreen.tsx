import React, { FC, useLayoutEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Image,
  View,
  Pressable,
} from "react-native";
import { RouteProp, useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { AppStackParams } from "../../types/navigation";
import { SafeArea } from "../../components/SafeArea";
import { useQuery } from "@tanstack/react-query";
import { fetchAnimeDetails, fetchAnimeStatistics } from "../../utils/api";
import { Box } from "../../components/Box";
import { Typography } from "../../components/Typography";
import { Spacer } from "../../components/Spacer";
import { shortenNumber } from "../../utils/number";
import { ScoresBarChart } from "../../components/ScoresBarChart";

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="md-bookmark-outline"
          size={22}
          color={colors.primary}
          onPress={() => navigation.push("SettingsScreen")}
        />
      ),
    });
  }, [navigation]);

  const animeDetails = useQuery(["animeDetails", id], () =>
    fetchAnimeDetails(id)
  );

  const animeStatistics = useQuery(
    ["animeStatistics", id],
    () => fetchAnimeStatistics(id),
    {
      enabled: animeDetails.isSuccess,
    }
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
        <Box justify="center" align="center" mTop={20}>
          <Image
            source={{ uri: animeDetails.data?.data.images.jpg.large_image_url }}
            style={[styles.coverImage, { borderColor: colors.separator }]}
          />
        </Box>
        {/* TITLE */}
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
          <Box
            style={[styles.chip, { backgroundColor: colors.card }]}
            pX={7.5}
            pY={5}
          >
            <Typography size={13} color="subtext">
              Ranked:{" "}
              <Typography size={13} variant="bold">
                #{animeDetails.data?.data.rank}
              </Typography>
            </Typography>
          </Box>

          <Box style={{ backgroundColor: colors.card }} pX={7.5} pY={5}>
            <Typography size={13} color="subtext">
              Popularity:{" "}
              <Typography size={13} variant="bold">
                #{animeDetails.data?.data.popularity}
              </Typography>
            </Typography>
          </Box>

          <Box style={{ backgroundColor: colors.card }} pX={7.5} pY={5}>
            <Typography size={13} color="subtext">
              Members:{" "}
              <Typography size={13} variant="bold">
                {shortenNumber(animeDetails.data?.data.members!)}
              </Typography>
            </Typography>
          </Box>
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
            {animeDetails.data?.data.genres.map((el, i) => (
              //TODO: Give a color to each specific genres?
              <Box
                key={i}
                style={[
                  styles.chip,
                  { backgroundColor: colors.card, marginBottom: 5 },
                ]}
                mRight={5}
                pX={7.5}
                pY={5}
                mBottom={7.5}
              >
                <Pressable
                  onPress={() => {
                    navigation.push("AnimesByGenresScreen", {
                      id: el.mal_id,
                      genre: el.name,
                    });
                  }}
                >
                  <Typography size={14}>{el.name}</Typography>
                </Pressable>
              </Box>
            ))}
          </View>
        </Box>

        {/* STATISTICS */}
        {/* {animeStatistics.data?.data.scores &&
          animeStatistics.data?.data.scores.length > 0 && (
            <Box mTop={20} flexDirection="column">
              <Box mBottom={30} pX={15} justify="space-between" align="center">
                <Typography variant="bold" size={13} color="subtext">
                  SCORES
                </Typography>

                <Typography
                  size={13}
                  color="primary"
                  onPress={
                    () => {}
                    // navigation.push("AnimeReviewsScreen", { animeId: animeId })
                  }
                >
                  See Reviews
                </Typography>
              </Box>

              <ScoresBarChart scores={animeStatistics.data?.data.scores} />
            </Box>
          )} */}
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
  chip: { borderRadius: 5 },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
});
