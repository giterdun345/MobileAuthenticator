import { Image } from "react-native";

interface IHeaderLogoProps {
  height?: number;
  sx?: any; // StyleProp<ImageStyle>;
}

export default function HeaderLogo({ height = 20, sx }: IHeaderLogoProps) {
  return (
    <Image
      style={{
        width: "100%",
        height,
        ...sx,
      }}
      source={require("../../../assets/headerLogo.png")}
      resizeMode="contain"
    />
  );
}
