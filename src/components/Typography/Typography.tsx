import { useTheme } from "@react-navigation/native";
import React, { FC } from "react";
import { Text, TextProps, TextStyle, StyleSheet } from "react-native";

interface ITypographyProps extends TextProps {
  style?: TextStyle | TextStyle[];
  variant?: "light" | "regular" | "bold" | "mid";
  color?: "primary" | "text" | "subtext";
  size?: number;
}

const Typography: FC<ITypographyProps> = ({
  children,
  variant,
  style,
  color = "text",
  size = 16,
  ...rest
}) => {
  const { colors } = useTheme();
  let textStyle;
  switch (variant) {
    case "light":
      textStyle = styles.light;
      break;
    case "regular":
      textStyle = styles.regular;
      break;
    case "bold":
      textStyle = styles.bold;
      break;
    case "mid":
      textStyle = styles.mid;
      break;
    default:
      textStyle = styles.regular;
      break;
  }

  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return (
    <Text
      style={[
        textStyle,
        { color: colors[color], fontSize: size },
        { ...passedStyles },
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default Typography;

const styles = StyleSheet.create({
  light: { fontWeight: "300" },
  regular: { fontWeight: "normal" },
  mid: { fontWeight: "600" },
  bold: { fontWeight: "700" },
});
