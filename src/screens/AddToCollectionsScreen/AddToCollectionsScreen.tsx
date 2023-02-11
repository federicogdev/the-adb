import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParams } from "../../types/navigation";
import { Typography } from "../../components/Typography";
import { SafeArea } from "../../components/SafeArea";
import { Box } from "../../components/Box";

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
  const { id, image, title } = route.params;
  return (
    <SafeArea>
      {/* <View
        style={{ justifyContent: "center", alignItems: "center", padding: 10 }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            width: 40,
            height: 2,
            borderRadius: 10,
          }}
        />
      </View> */}
      <ScrollView contentContainerStyle={styles.scrollViewWrapper}>
        <Box pX={15}>
          <Box flex align="center">
            <Image source={{ uri: image }} style={styles.image} />
            <Box flex pX={10}>
              <Typography variant="bold" size={18} style={styles.title}>
                {route.params.title}
              </Typography>
            </Box>
          </Box>
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
  },
  title: {},
  scrollViewWrapper: {
    paddingTop: 30,
    paddingBottom: 10,
  },
});
