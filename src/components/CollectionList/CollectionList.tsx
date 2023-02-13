import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { FC, useContext } from "react";
import { ICollectionAnime } from "../../types/types";
import { Box } from "../Box";
import { Typography } from "../Typography";
import { CollectionsContext } from "../../context/CollectionsContext";
import dayjs from "dayjs";
import { Spacer } from "../Spacer";
import { useNavigation, useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParams } from "../../types/navigation";

interface ICollectionListProps {
  collection: string;
}

const CollectionList: FC<ICollectionListProps> = ({ collection }) => {
  const { animesCollection } = useContext(CollectionsContext);
  const { colors } = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParams, "AppTabs">>();

  return (
    <Box flexDirection="column" mBottom={10} mTop={10}>
      <Box pX={15} mBottom={10} justify="space-between" align="center">
        <Box flexDirection="column">
          <Typography
            variant="bold"
            size={22}
            style={{ textTransform: "capitalize" }}
          >
            {collection}
          </Typography>

          <Typography color="subtext" size={15}>
            {animesCollection.filter((el) => el.category === collection).length}{" "}
            title/s
          </Typography>
        </Box>

        <Typography
          variant="bold"
          color="primary"
          onPress={() => {
            navigation.push("AnimesByCollectionsScreen", {
              collection: collection,
            });
          }}
        >
          See More
        </Typography>
      </Box>

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={animesCollection.filter((el) => el.category === collection)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() =>
              navigation.push("AnimeDetailsScreen", {
                id: item.id,
              })
            }
            style={[
              styles.coverWrapper,
              index ===
                animesCollection.filter((el) => el.category === collection)
                  .length -
                  1 && {
                marginRight: 15,
              },
              { borderColor: colors.separator },
            ]}
          >
            <Image
              source={{ uri: item.image }}
              style={[
                styles.cover,
                { borderColor: colors.separator, width: 120 },
              ]}
            />
            <Spacer y={3} />
            <Box flexDirection="column">
              <Typography size={14} variant="bold" numberOfLines={2}>
                {item.title}
              </Typography>
              <Typography color="subtext" size={12} numberOfLines={1}>
                {item.date
                  ? dayjs(item.date).format("MMMM D, YYYY")
                  : "No Date Avaiable"}
              </Typography>
              <Spacer y={2.5} />
            </Box>
          </Pressable>
        )}
      />
    </Box>
  );
};

export default CollectionList;

const styles = StyleSheet.create({
  coverWrapper: {
    width: 120,
    marginLeft: 15,
  },
  cover: { aspectRatio: 4 / 6, borderRadius: 10, borderWidth: 0.5 },
});
