import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { FC, useContext } from "react";
import { RouteProp, useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParams } from "../../types/navigation";
import { Typography } from "../../components/Typography";
import { SafeArea } from "../../components/SafeArea";
import { Box } from "../../components/Box";
import { CollectionsContext } from "../../context/CollectionsContext";
import { FontAwesome } from "@expo/vector-icons";
import dayjs from "dayjs";
import { Spacer } from "../../components/Spacer";

interface IAddToCollectionsScreenProps {
  navigation: NativeStackNavigationProp<
    AppStackParams,
    "AddToCollectionsScreen"
  >;
  route: RouteProp<AppStackParams, "AddToCollectionsScreen">;
}

const AddToCollectionsScreen: FC<IAddToCollectionsScreenProps> = ({
  route,
  navigation,
}) => {
  const { id, image, title, date } = route.params;
  const { colors } = useTheme();
  const {
    animesCollection,
    // isBookmarked,
    // bookmarksHandler,
    addToCollection,
    removeFromCollection,
  } = useContext(CollectionsContext);

  const isCategory = (id: number, category: string) =>
    animesCollection.find((el) => el.id === id)?.category === category;

  return (
    <SafeArea>
      <ScrollView contentContainerStyle={styles.scrollViewWrapper}>
        <Box pX={15}>
          <Box flex align="center">
            <Image source={{ uri: image }} style={styles.image} />
            <Box flex pX={10} flexDirection="column">
              <Typography variant="bold" size={18} style={styles.title}>
                {route.params.title}
              </Typography>
              <Spacer y={10} />
              <Typography color="subtext" numberOfLines={1}>
                {date ? dayjs(date).format("MMMM D, YYYY") : "No Date Avaiable"}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* <Box pX={15} mTop={30} flexDirection="column">
          <Box mBottom={10}>
            <Typography variant="bold" size={13} color="subtext">
              BOOKMARKS
            </Typography>
          </Box>
          <View
            style={[
              styles.collectionListWrapper,
              { backgroundColor: colors.surface },
            ]}
          >
            <Pressable
              style={[
                styles.collectionPressable,
                { borderColor: colors.separator, borderTopWidth: 0 },
              ]}
              onPress={() => bookmarksHandler({ id, title, image, date })}
            >
              <Typography>Bookmarks</Typography>
              <View
                style={[
                  styles.radioCheck,
                  { borderColor: colors.primary },
                  isBookmarked(id!) && {
                    backgroundColor: colors.primary,
                  },
                ]}
              >
                <FontAwesome
                  name="check"
                  style={
                    isBookmarked(id!)
                      ? { display: "flex" }
                      : {
                          display: "none",
                        }
                  }
                  color={"#fff"}
                  size={12}
                />
              </View>
            </Pressable>
          </View>
        </Box> */}

        <Box pX={15} mTop={30} flexDirection="column">
          <Box mBottom={10}>
            <Typography variant="bold" size={13} color="subtext">
              COLLECTIONS
            </Typography>
          </Box>

          <View
            style={[
              styles.collectionListWrapper,
              { backgroundColor: colors.surface },
            ]}
          >
            <Pressable
              style={[
                styles.collectionPressable,
                { borderColor: colors.separator, borderTopWidth: 0 },
              ]}
              onPress={() =>
                isCategory(id!, "planned")
                  ? removeFromCollection({
                      id,
                      title,
                      image,
                      date,
                      category: "planned",
                    })
                  : addToCollection({
                      id,
                      title,
                      image,
                      date,
                      category: "planned",
                    })
              }
            >
              <Typography>Planned</Typography>
              <View
                style={[
                  styles.radioCheck,
                  { borderColor: colors.primary },
                  isCategory(id!, "planned") && {
                    backgroundColor: colors.primary,
                  },
                ]}
              >
                <FontAwesome
                  name="check"
                  style={
                    isCategory(id!, "planned")
                      ? { display: "flex" }
                      : {
                          display: "none",
                        }
                  }
                  color={"#fff"}
                  size={12}
                />
              </View>
            </Pressable>

            {!!date && dayjs(date).unix() * 1000 < Date.now() && (
              <>
                <Pressable
                  style={[
                    styles.collectionPressable,
                    { borderColor: colors.separator, borderTopWidth: 1 },
                  ]}
                  onPress={() =>
                    isCategory(id!, "finished")
                      ? removeFromCollection({
                          id,
                          title,
                          image,
                          date,
                          category: "finished",
                        })
                      : addToCollection({
                          id,
                          title,
                          image,
                          date,
                          category: "finished",
                        })
                  }
                >
                  <Typography>Finished</Typography>
                  <View
                    style={[
                      styles.radioCheck,
                      { borderColor: colors.primary },
                      isCategory(id!, "finished") && {
                        backgroundColor: colors.primary,
                      },
                    ]}
                  >
                    <FontAwesome
                      name="check"
                      style={
                        isCategory(id!, "finished")
                          ? { display: "flex" }
                          : {
                              display: "none",
                            }
                      }
                      color={"#fff"}
                      size={12}
                    />
                  </View>
                </Pressable>

                <Pressable
                  style={[
                    styles.collectionPressable,
                    { borderColor: colors.separator, borderTopWidth: 1 },
                  ]}
                  onPress={() =>
                    isCategory(id!, "watching")
                      ? removeFromCollection({
                          id,
                          title,
                          image,
                          date,
                          category: "watching",
                        })
                      : addToCollection({
                          id,
                          title,
                          image,
                          date,
                          category: "watching",
                        })
                  }
                >
                  <Typography>Watching</Typography>
                  <View
                    style={[
                      styles.radioCheck,
                      { borderColor: colors.primary },
                      isCategory(id!, "watching") && {
                        backgroundColor: colors.primary,
                      },
                    ]}
                  >
                    <FontAwesome
                      name="check"
                      style={
                        isCategory(id!, "watching")
                          ? { display: "flex" }
                          : {
                              display: "none",
                            }
                      }
                      color={"#fff"}
                      size={12}
                    />
                  </View>
                </Pressable>

                <Pressable
                  style={[
                    styles.collectionPressable,
                    { borderColor: colors.separator, borderTopWidth: 1 },
                  ]}
                  onPress={() =>
                    isCategory(id!, "interrupted")
                      ? removeFromCollection({
                          id,
                          title,
                          image,
                          date,
                          category: "interrupted",
                        })
                      : addToCollection({
                          id,
                          title,
                          image,
                          date,
                          category: "interrupted",
                        })
                  }
                >
                  <Typography>Interrupted</Typography>
                  <View
                    style={[
                      styles.radioCheck,
                      { borderColor: colors.primary },
                      isCategory(id!, "interrupted") && {
                        backgroundColor: colors.primary,
                      },
                    ]}
                  >
                    <FontAwesome
                      name="check"
                      style={
                        isCategory(id!, "interrupted")
                          ? { display: "flex" }
                          : {
                              display: "none",
                            }
                      }
                      color={"#fff"}
                      size={12}
                    />
                  </View>
                </Pressable>
              </>
            )}
          </View>
        </Box>
      </ScrollView>
    </SafeArea>
  );
};

export default AddToCollectionsScreen;

const styles = StyleSheet.create({
  image: {
    height: 150,
    aspectRatio: 4 / 6,
    borderRadius: 5,
  },
  title: {},
  scrollViewWrapper: {
    paddingTop: 30,
    paddingBottom: 10,
  },
  collectionListWrapper: {
    flex: 1,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  collectionPressable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderTopWidth: 0.5,
  },
  radioCheck: {
    width: 19,
    height: 19,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    borderWidth: 1,
  },
});
