import React, { FC } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Genre } from "../../data/genres";
import { Typography } from "../Typography";

interface IGenreGridProps {
  genres: Genre[][];
}

const GenreGrid: FC<IGenreGridProps> = ({ genres }) => {
  const { colors } = useTheme();
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
            <TouchableOpacity
              key={i}
              style={[
                styles.genreChip,
                {
                  backgroundColor: colors.card,
                  width: i === 0 ? "100%" : "48%",
                },
              ]}
            >
              <Typography variant="bold" numberOfLines={1} adjustsFontSizeToFit>
                {el.name}
              </Typography>
            </TouchableOpacity>
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
  },
});
