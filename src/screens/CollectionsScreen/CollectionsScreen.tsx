import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { CollectionsContext } from "../../context/CollectionsContext";
import { SafeArea } from "../../components/SafeArea";
import { Typography } from "../../components/Typography";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {}

const CollectionsScreen = (props: Props) => {
  const {
    bookmarks,
    collection,
    // finishedAnimes,
    // plannedAnimes,
    // interruptedAnimes,
    // watchingAnimes,
  } = useContext(CollectionsContext);
  console.log(collection);
  return (
    <SafeArea>
      <Button title="LOL" onPress={() => AsyncStorage.clear()} />
      <FlatList
        ListHeaderComponent={<Typography>Bookmark</Typography>}
        data={bookmarks}
        renderItem={({ item }) => <Typography>{item.title}</Typography>}
      />
      <FlatList
        ListHeaderComponent={<Typography>Collection</Typography>}
        data={collection}
        renderItem={({ item }) => (
          <Typography>
            {item.title} - {item.category}
          </Typography>
        )}
      />
    </SafeArea>
  );
};

export default CollectionsScreen;

const styles = StyleSheet.create({});
