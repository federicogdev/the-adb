import { View, Text } from "react-native";
import React, { FC } from "react";

interface ISpacerProps {
  x?: number;
  y?: number;
}

const Spacer: FC<ISpacerProps> = ({ x = 0, y = 0 }) => {
  return <View style={{ height: y, width: x }} />;
};

export default Spacer;
