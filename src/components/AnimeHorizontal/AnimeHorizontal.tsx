import { StyleSheet, Image, View, Dimensions } from "react-native";
import React, { FC } from "react";
import { Anime } from "../../models";
import { Box } from "../Box";
import { Typography } from "../Typography";
import { Spacer } from "../Spacer";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { shortenNumber } from "../../utils/number";

interface IAnimeHorizontalProps {
  anime: Anime;
}

const AnimeHorizontal: FC<IAnimeHorizontalProps> = ({ anime }) => {
  const { colors } = useTheme();
  return (
    <Box flex align="center">
      <Image
        source={{ uri: anime.images.jpg.large_image_url }}
        style={[styles.image, { borderColor: colors.separator }]}
      />

      <Box flexDirection="column" flex pX={10}>
        <Typography size={18} variant="bold">
          {anime.title}
        </Typography>
        <Spacer y={5} />
        <Typography numberOfLines={5} size={14} style={{ flexWrap: "nowrap" }}>
          {anime.synopsis}
        </Typography>
        <Spacer y={5} />
        <Typography color="subtext" size={14}>
          {anime.score} <Ionicons name="star" color={colors.primary} /> /{" "}
          {shortenNumber(anime.scored_by)} reviews
        </Typography>
      </Box>
    </Box>
  );
};

export default AnimeHorizontal;

const styles = StyleSheet.create({
  image: { width: 120, aspectRatio: 4 / 6, borderRadius: 10, borderWidth: 1 },
});
