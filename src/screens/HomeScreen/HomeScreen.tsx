import React, { FC } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@react-navigation/native";

import { TopAnimeFilter } from "../../models";
import { AppStackParams } from "../../types/navigation";
import { fetchAnimes } from "../../utils/api";
import { Box } from "../../components/Box";
import { SafeArea } from "../../components/SafeArea";
import { AnimeCover } from "../../components/AnimeCover";
import { Spacer } from "../../components/Spacer";
import { Typography } from "../../components/Typography";
import { genres } from "../../data/genres";
import { GenreGrid } from "../../components/GenreGrid";

interface IHomeScreenProps {
  navigation: NativeStackNavigationProp<AppStackParams, "AppTabs">;
}

const HomeScreen: FC<IHomeScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();

  const upcomingAnimes = useQuery(["upcomingAnimes"], () =>
    fetchAnimes(TopAnimeFilter.upcoming, 30)
  );

  const topAnimes = useQuery(
    ["topAnimes"],
    () => fetchAnimes(TopAnimeFilter.bypopularity, 9),
    { enabled: upcomingAnimes.isSuccess }
  );

  if (upcomingAnimes.isLoading && topAnimes.isLoading) {
    return (
      <SafeArea>
        <Box justify="center" align="center" flex>
          <ActivityIndicator color={colors.primary} />
        </Box>
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <ScrollView>
        <Box flexDirection="column" mBottom={20}>
          <Box pX={15} mBottom={20} justify="space-between" align="center">
            <Box flexDirection="column">
              <Typography variant="bold" size={22}>
                Upcoming
              </Typography>

              <Spacer y={3} />
              <Typography color="subtext" size={16}>
                Don't miss those.
              </Typography>
            </Box>

            <Typography variant="bold" color="primary">
              See More
            </Typography>
          </Box>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={upcomingAnimes.data?.data}
            keyExtractor={(item) => item.mal_id.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.push("AnimeDetailsScreen", {
                    id: item.mal_id,
                  })
                }
                style={[
                  styles.coverWrapper,
                  [
                    index === upcomingAnimes.data?.data.length! - 1 && {
                      marginRight: 15,
                    },
                  ],
                ]}
              >
                <AnimeCover anime={item} width={150} />
              </TouchableOpacity>
            )}
          />
        </Box>

        <Box flexDirection="column" mBottom={20}>
          <Box pX={15} mBottom={20} justify="space-between" align="center">
            <Box flexDirection="column">
              <Typography variant="bold" size={22}>
                Popular
              </Typography>

              <Spacer y={3} />
              <Typography color="subtext" size={16}>
                Check users favorites.
              </Typography>
            </Box>

            <Typography variant="bold" color="primary">
              See More
            </Typography>
          </Box>
          <View style={styles.grid}>
            {topAnimes.data?.data.map((item) => (
              <TouchableOpacity
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
              </TouchableOpacity>
            ))}
          </View>
        </Box>

        <Box flexDirection="column" mBottom={20}>
          <Box mBottom={20} justify="space-between" align="center" pX={15}>
            <Typography variant="bold" size={22}>
              Genres
            </Typography>
            <Typography variant="bold" color="primary">
              See More
            </Typography>
          </Box>
          <GenreGrid genres={genres} />
        </Box>
      </ScrollView>
    </SafeArea>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  coverWrapper: { marginLeft: 15 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
  },
});
