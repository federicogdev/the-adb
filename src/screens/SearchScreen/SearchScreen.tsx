import React, { FC, useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { AppStackParams } from "../../types/navigation";

import { searchAnimes } from "../../utils/api";
import { SafeArea } from "../../components/SafeArea";
import { Box } from "../../components/Box";
import { AnimeCover } from "../../components/AnimeCover";
import { Typography } from "../../components/Typography";

interface ISearchScreenProps {
  navigation: NativeStackNavigationProp<AppStackParams, "AppTabs">;
}

const SearchScreen: FC<ISearchScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const [searchTerm, setSearchTerm] = useState<string>("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Search",
      headerSearchBarOptions: {
        shouldShowHintSearchIcon: true,
        onChangeText: (event) => setSearchTerm(event.nativeEvent.text),
        onSearchButtonPress: () => onClick(),
        hideWhenScrolling: false,
      },
    });
  }, [navigation]);

  const searchedAnimes = useQuery(
    ["searchedAnimes", searchTerm],
    () => searchAnimes(searchTerm),
    { enabled: false }
  );

  const onClick = () => searchedAnimes.refetch();

  if (searchedAnimes.isRefetching)
    return (
      <SafeArea>
        <Box flex justify="center" align="center">
          <ActivityIndicator size={22} color={colors.primary} />
        </Box>
      </SafeArea>
    );

  return (
    <SafeArea>
      {searchedAnimes.data?.data ? (
        <FlatList
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.flatlistWrapper}
          numColumns={3}
          keyExtractor={(item) => item.mal_id.toString()}
          data={searchedAnimes.data?.data}
          renderItem={({ item }) => (
            <View>
              <Pressable
                key={item.mal_id}
                onPress={() =>
                  navigation.push("AnimeDetailsScreen", {
                    id: item.mal_id,
                  })
                }
                style={[{ paddingHorizontal: 5, paddingVertical: 5 }]}
              >
                <AnimeCover
                  anime={item}
                  width={(Dimensions.get("screen").width - 50) / 3}
                  multiline={false}
                />
              </Pressable>
            </View>
          )}
        />
      ) : (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <Box flex justify="center" align="center">
            <Typography
              onPress={() => {
                setSearchTerm("One P");
              }}
            >
              Hello
            </Typography>
          </Box>
        </ScrollView>
      )}
    </SafeArea>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  flatlistWrapper: { paddingHorizontal: 10 },
});
