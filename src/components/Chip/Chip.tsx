import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";

interface IChipProps {
  children: React.ReactNode;
}

const Chip: FC<IChipProps> = ({ children }) => {
  return <View style={styles.chip}>{children}</View>;
};

export default Chip;

const styles = StyleSheet.create({
  chip: {
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 1.0,

    elevation: 1,
  },
});
