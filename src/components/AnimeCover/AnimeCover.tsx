import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import React, { FC, useState } from "react";
import { Anime } from "../../models";
import dayjs from "dayjs";

import { Typography } from "../Typography";
import { Spacer } from "../Spacer";
import { useTheme } from "@react-navigation/native";
import { Box } from "../Box";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

interface IAnimeCoverProps {
  anime: Anime;
  width?: number;
  multiline?: boolean;
}
const AnimeCover: FC<IAnimeCoverProps> = ({
  anime,
  width = 200,
  multiline = true,
}) => {
  const { colors } = useTheme();

  return (
    <View style={{ width }}>
      <Image
        source={{ uri: anime.images.jpg.large_image_url }}
        style={[styles.cover, { borderColor: colors.separator, width }]}
      />
      <Spacer y={3} />
      <Box flexDirection="column">
        <Typography size={14} variant="bold" numberOfLines={multiline ? 2 : 1}>
          {anime.title}
        </Typography>
        <Spacer y={2.5} />
        <Typography color="subtext" size={12} numberOfLines={1}>
          {anime.aired.from
            ? dayjs(anime.aired.from).format("MMMM D, YYYY")
            : "No Date Avaiable"}
        </Typography>
      </Box>
    </View>
  );
};

export default AnimeCover;

const styles = StyleSheet.create({
  cover: { aspectRatio: 4 / 6, borderRadius: 10, borderWidth: 0.5 },
});
