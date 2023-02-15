import { ScrollView, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { CollectionsContext } from "../../context/CollectionsContext";
import { SafeArea } from "../../components/SafeArea";

import { useTheme } from "@react-navigation/native";
import { CollectionList } from "../../components/CollectionList";

interface Props {}

const CollectionsScreen = (props: Props) => {
  const { animesCollection } = useContext(CollectionsContext);

  const { colors } = useTheme();

  return (
    <SafeArea>
      <ScrollView>
        {animesCollection.filter((e) => e.category === "finished").length >
          0 && <CollectionList collection="finished" />}
        {animesCollection.filter((e) => e.category === "planned").length >
          0 && <CollectionList collection="planned" />}
        {animesCollection.filter((e) => e.category === "interrupted").length >
          0 && <CollectionList collection="interrupted" />}
        {animesCollection.filter((e) => e.category === "watching").length >
          0 && <CollectionList collection="watching" />}
      </ScrollView>
    </SafeArea>
  );
};

export default CollectionsScreen;

const styles = StyleSheet.create({});
