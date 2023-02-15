import { Dimensions, FlatList, Pressable, StyleSheet } from "react-native";
import React, { FC, useContext } from "react";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParams } from "../../types/navigation";
import { CollectionsContext } from "../../context/CollectionsContext";
import { SafeArea } from "../../components/SafeArea";

import { AnimeCollectionCover } from "../../components/AnimeCollectionCover";

interface IAnimesByCollectionsScreenProps {
  navigation: NativeStackNavigationProp<
    AppStackParams,
    "AnimesByCollectionsScreen"
  >;
  route: RouteProp<AppStackParams, "AnimesByCollectionsScreen">;
}
const AnimesByCollectionsScreen: FC<IAnimesByCollectionsScreenProps> = ({
  navigation,
  route,
}) => {
  const { collection } = route.params;
  const { animesCollection } = useContext(CollectionsContext);

  return (
    <SafeArea>
      <FlatList
        contentContainerStyle={styles.flatlistWrapper}
        numColumns={3}
        data={animesCollection.filter((el) => el.category === collection)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.push("AnimeDetailsScreen", {
                id: item.id,
              })
            }
            style={[{ paddingHorizontal: 5, paddingVertical: 5 }]}
          >
            <AnimeCollectionCover
              anime={item}
              width={(Dimensions.get("screen").width - 50) / 3}
              multiline={false}
            />
          </Pressable>
        )}
      />
    </SafeArea>
  );
};

export default AnimesByCollectionsScreen;

const styles = StyleSheet.create({
  flatlistWrapper: { paddingHorizontal: 10 },
});
