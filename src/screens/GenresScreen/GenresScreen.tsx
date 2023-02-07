import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGenres } from "../../utils/api";
import { SafeArea } from "../../components/SafeArea";
import { Box } from "../../components/Box";
import { useTheme } from "@react-navigation/native";
import { Typography } from "../../components/Typography";
import { Ionicons } from "@expo/vector-icons";
import { Spacer } from "../../components/Spacer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParams } from "../../types/navigation";
interface IGenresScreenProps {
  navigation: NativeStackNavigationProp<AppStackParams, "GenresScreen">;
}

const GenresScreen: FC<IGenresScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const genres = useQuery(["genres"], fetchGenres);

  if (genres.isLoading) {
    return (
      <SafeArea>
        <Box justify="center" align="center" flex>
          <ActivityIndicator color={colors.primary} />
        </Box>
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <FlatList
        contentContainerStyle={styles.flatlist}
        data={genres.data?.data}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.genresTile, { backgroundColor: colors.card }]}
            onPress={() =>
              navigation.push("AnimesByGenresScreen", {
                id: item.mal_id,
                genre: item.name,
              })
            }
          >
            <Box flexDirection="column">
              <Typography variant="bold">{item.name}</Typography>

              <Spacer y={3} />
              <Typography color="subtext" size={14}>
                {item.count} titles
              </Typography>
            </Box>
            <Ionicons name="chevron-forward" color={colors.primary} size={20} />
          </Pressable>
        )}
      />
    </SafeArea>
  );
};

export default GenresScreen;

const styles = StyleSheet.create({
  flatlist: { paddingHorizontal: 15 },
  genresTile: {
    padding: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    borderRadius: 7.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
