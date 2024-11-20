import { Text } from "react-native";

type TFontWeightTypes =
  | "extraLight"
  | "light"
  | "regular"
  | "medium"
  | "semiBold"
  | "bold";

export default function Typography({
  children,
  weight,
  size = 20,
  color = "white",
  elipsisMode,
  numberOfLines,
  sx = {},
}: {
  children: string | React.ReactNode;
  weight: TFontWeightTypes;
  size?: number;
  color?: "white" | "black" | "#00e29e" | "#efce6c" | "#E00043";
  elipsisMode?: "head" | "middle" | "tail" | "clip" | undefined;
  numberOfLines?: number;
  sx?: any;
}) {
  const format = () => {
    const styleProps = {
      fontSize: size,
      color: color,
      ...sx,
    };

    switch (weight) {
      case "extraLight":
        return {
          ...styleProps,
          fontFamily: "Inter200",
        };
      case "light":
        return {
          ...styleProps,
          fontFamily: "Inter300",
        };
      case "regular":
        return {
          ...styleProps,
          fontFamily: "Inter400",
        };
      case "medium":
        return {
          ...styleProps,
          fontFamily: "Inter500",
        };
      case "semiBold":
        return {
          ...styleProps,
          fontFamily: "Inter600",
        };
      case "bold":
        return {
          ...styleProps,
          fontFamily: "Inter700",
        };
      default:
        return styleProps;
    }
  };
  return (
    <Text
      style={format()}
      ellipsizeMode={elipsisMode}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
}
