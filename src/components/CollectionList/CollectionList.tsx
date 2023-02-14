import React, { FC, useContext } from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Box } from "../Box";
import { Typography } from "../Typography";
import { CollectionsContext } from "../../context/CollectionsContext";

import { AppStackParams } from "../../types/navigation";
import { AnimeCollectionCover } from "../AnimeCollectionCover";

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
          See All
        </Typography>
      </Box>

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={animesCollection
          .filter((el) => el.category === collection)
          .slice(0, 9)}
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
            <AnimeCollectionCover anime={item} width={150} />
          </Pressable>
        )}
      />
    </Box>
  );
};

export default CollectionList;

const styles = StyleSheet.create({
  coverWrapper: {
    marginLeft: 15,
  },
  cover: { aspectRatio: 4 / 6, borderRadius: 10, borderWidth: 0.5 },
});
