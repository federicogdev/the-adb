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
    finishedAnimes,
    plannedAnimes,
    interruptedAnimes,
    watchingAnimes,
  } = useContext(CollectionsContext);
  return (
    <SafeArea>
      <Button title="LOL" onPress={() => AsyncStorage.clear()} />
      <FlatList
        ListHeaderComponent={<Typography>Bookmark</Typography>}
        data={bookmarks}
        renderItem={({ item }) => <Typography>{item.title}</Typography>}
      />
      <FlatList
        ListHeaderComponent={<Typography>Watching</Typography>}
        data={watchingAnimes}
        renderItem={({ item }) => <Typography>{item.title}</Typography>}
      />
      <FlatList
        ListHeaderComponent={<Typography>Planned</Typography>}
        data={plannedAnimes}
        renderItem={({ item }) => <Typography>{item.title}</Typography>}
      />
      <FlatList
        ListHeaderComponent={<Typography>Interrupted</Typography>}
        data={interruptedAnimes}
        renderItem={({ item }) => <Typography>{item.title}</Typography>}
      />
      <FlatList
        ListHeaderComponent={<Typography>Finished</Typography>}
        data={finishedAnimes}
        renderItem={({ item }) => <Typography>{item.title}</Typography>}
      />
    </SafeArea>
  );
};

export default CollectionsScreen;

const styles = StyleSheet.create({});
