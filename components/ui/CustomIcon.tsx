import React from "react";
import { Image } from "react-native";

interface CustomIconProps {
  name: "home" | "search" | "chat" | "user";
  size?: number;
  color?: string;
}

export const CustomIcon: React.FC<CustomIconProps> = ({
  name,
  size = 24,
  color = "#000000",
}) => {
  const getIcon = () => {
    switch (name) {
      case "home":
        return require("../../assets/images/home-angle-svgrepo-com.png");
      case "search":
        return require("../../assets/images/library.png");
      case "chat":
        return require("../../assets/images/chat-round-dots-svgrepo-com.png");
      case "user":
        return require("../../assets/images/user-svgrepo-com.png");
      default:
        return require("../../assets/images/home-angle-svgrepo-com.png");
    }
  };

  return (
    <Image
      source={getIcon()}
      style={{
        width: size,
        height: size,
        tintColor: color,
      }}
      resizeMode="contain"
    />
  );
};
