import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { FC } from "react";
import { useTheme } from "@react-navigation/native";

interface IChipProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

const Chip: FC<IChipProps> = ({ children, style }) => {
  const { colors } = useTheme();

  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;
  return (
    <View
      style={[
        styles.chip,
        { backgroundColor: colors.card },
        { ...passedStyles },
      ]}
    >
      {children}
    </View>
  );
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
