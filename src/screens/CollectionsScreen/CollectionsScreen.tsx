import { ScrollView, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { CollectionsContext } from "../../context/CollectionsContext";
import { SafeArea } from "../../components/SafeArea";

import { useTheme } from "@react-navigation/native";
import { CollectionList } from "../../components/CollectionList";

interface Props {}

const CollectionsScreen = (props: Props) => {
  const {
    // bookmarks,
    // collection,
    animesCollection,
    // finishedAnimes,
    // plannedAnimes,
    // interruptedAnimes,
    // watchingAnimes,
  } = useContext(CollectionsContext);

  const { colors } = useTheme();

  return (
    <SafeArea>
      <ScrollView>
        <CollectionList collection="finished" />
        <CollectionList collection="planned" />
        <CollectionList collection="interrupted" />
        <CollectionList collection="watching" />
      </ScrollView>
    </SafeArea>
  );
};

export default CollectionsScreen;

const styles = StyleSheet.create({});
