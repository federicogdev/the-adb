import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import React, { FC, useState } from "react";
import { Anime } from "../../models";
import dayjs from "dayjs";

import { Typography } from "../Typography";
import { Spacer } from "../Spacer";
import { useTheme } from "@react-navigation/native";
import { Box } from "../Box";
import { ICollectionAnime } from "../../types/types";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

interface IAnimeCollectionCoverProps {
  anime: ICollectionAnime;
  width?: number;
  multiline?: boolean;
}
const AnimeCollectionCover: FC<IAnimeCollectionCoverProps> = ({
  anime,
  width = 200,
  multiline = true,
}) => {
  const { colors } = useTheme();

  return (
    <View style={{ width }}>
      <Image
        source={{ uri: anime.image }}
        style={[styles.cover, { borderColor: colors.separator, width }]}
      />
      <Spacer y={3} />
      <Box flexDirection="column">
        <Typography size={14} variant="bold" numberOfLines={multiline ? 2 : 1}>
          {anime.title}
        </Typography>
        <Spacer y={2.5} />
        <Typography color="subtext" size={12} numberOfLines={1}>
          {anime.date
            ? dayjs(anime.date).format("MMMM D, YYYY")
            : "No Date Avaiable"}
        </Typography>
      </Box>
    </View>
  );
};

export default AnimeCollectionCover;

const styles = StyleSheet.create({
  cover: { aspectRatio: 4 / 6, borderRadius: 10, borderWidth: 0.5 },
});
