import React, { FC, useLayoutEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Image,
  View,
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
});
