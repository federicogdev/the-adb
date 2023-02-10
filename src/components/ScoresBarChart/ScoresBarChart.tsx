import React, { FC } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";

import { Box } from "../Box";
import { Spacer } from "../Spacer";
import { Typography } from "../Typography";
import { StatisticsScore } from "../../models";

interface IScoreBarChartProps {
  scores: StatisticsScore[] | undefined;
}
const ScoresBarChart: FC<IScoreBarChartProps> = ({ scores }) => {
  const { colors } = useTheme();
  return (
    <Box flexDirection="row" justify="space-around" align="flex-end" pX={10}>
      {scores?.map((el, i) => (
        <Box flexDirection="column" align="center" key={el.score}>
          <View
            style={{
              height: el.percentage * 2,
              maxHeight: 200,
              backgroundColor: colors.primary,
              width: Dimensions.get("screen").width / 13,
              borderTopRightRadius: 5,
              borderTopLeftRadius: 5,
            }}
          />
          <Spacer y={5} />
          <Typography variant="bold" size={12}>
            {el.score}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ScoresBarChart;

const styles = StyleSheet.create({});
