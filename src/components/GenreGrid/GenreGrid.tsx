import React, { FC } from "react";
import { FlatList, StyleSheet, Text, Pressable, View } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Genre } from "../../data/genres";
import { Typography } from "../Typography";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParams } from "../../types/navigation";

interface IGenreGridProps {
  genres: Genre[][];
}

type INavigationProps = NativeStackNavigationProp<AppStackParams>;

const GenreGrid: FC<IGenreGridProps> = ({ genres }) => {
  const { colors } = useTheme();
  const navigation = useNavigation<INavigationProps>();
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={genres}
      horizontal
      keyExtractor={(item, index) => index.toString()}
      snapToAlignment="start"
      decelerationRate={"fast"}
      //this is hardcoded based on the known value of genres.lenght. need to make it dynamic
      snapToInterval={365}
      renderItem={({ item, index }) => (
        <View
          style={[
            styles.genreChipWrapper,
            index === genres.length - 1 && { marginRight: 15 },
          ]}
        >
          {item.map((el, i) => (
            <Pressable
              key={i}
              style={[
                styles.genreChip,
                {
                  backgroundColor: colors.card,
                  width: i === 0 ? "100%" : "48%",
                },
              ]}
              onPress={() =>
                navigation.push("AnimesByGenresScreen", {
                  id: el.mal_id,
                  genre: el.name,
                })
              }
            >
              <Typography variant="bold" numberOfLines={1} adjustsFontSizeToFit>
                {el.name}
              </Typography>
            </Pressable>
          ))}
        </View>
      )}
    />
  );
};

export default GenreGrid;

const styles = StyleSheet.create({
  genreChipWrapper: {
    width: 350,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginLeft: 15,
  },
  genreChip: {
    marginVertical: 5,
    padding: 15,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 1.0,
    elevation: 1,
  },
});
