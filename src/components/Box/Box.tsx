import {
  FlexAlignType,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewProps,
} from "react-native";
import React, { FC } from "react";

interface IBoxProps extends ViewProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
  padding?: number;
  pX?: number;
  pY?: number;
  pTop?: number;
  pBottom?: number;
  pLeft?: number;
  pRight?: number;
  margin?: number;
  mX?: number;
  mY?: number;
  mTop?: number;
  mBottom?: number;
  mLeft?: number;
  mRight?: number;
  flex?: boolean;
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | undefined;
  align?: FlexAlignType | undefined;
  flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
}

const Box: FC<IBoxProps> = ({
  children,
  padding,
  pX,
  pY,
  pTop,
  pBottom,
  pLeft,
  pRight,
  mX,
  mY,
  margin,
  mTop,
  mBottom,
  mLeft,
  mRight,
  flex = false,
  justify = "flex-start",
  align,
  flexDirection = "row",
  style,
  ...rest
}) => {
  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;
  return (
    <View
      {...rest}
      style={[
        {
          margin,
          padding,
          paddingVertical: pY,
          paddingHorizontal: pX,
          paddingLeft: pLeft,
          paddingRight: pRight,
          paddingTop: pTop,
          paddingBottom: pBottom,
          marginVertical: mY,
          marginHorizontal: mX,
          marginLeft: mLeft,
          marginRight: mRight,
          marginTop: mTop,
          marginBottom: mBottom,
          justifyContent: justify,
          alignItems: align,
          flexDirection,
        },
        flex && { flex: 1 },
        passedStyles,
      ]}
    >
      {children}
    </View>
  );
};

export default Box;

const styles = StyleSheet.create({});
