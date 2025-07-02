import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "disabled";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  badge?: string;
}

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  style,
  textStyle,
  badge,
}: ButtonProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size]];

    switch (variant) {
      case "primary":
        return [
          ...baseStyle,
          { backgroundColor: "#ebff57" },
          disabled && styles.disabled,
        ];
      case "secondary":
        return [
          ...baseStyle,
          { backgroundColor: colors.tabIconDefault + "20" },
          disabled && styles.disabled,
        ];
      case "outline":
        return [
          ...baseStyle,
          {
            borderWidth: 1,
            borderColor: "#ebff57",
            backgroundColor: "transparent",
          },
          disabled && styles.disabled,
        ];
      case "disabled":
        return [
          ...baseStyle,
          { backgroundColor: colors.tabIconDefault + "30" },
          styles.disabled,
        ];
      default:
        return baseStyle;
    }
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`${size}Text`]];

    switch (variant) {
      case "primary":
        return [...baseStyle, { color: "#000000" }];
      case "secondary":
        return [...baseStyle, { color: colors.text }];
      case "outline":
        return [...baseStyle, { color: "#ebff57" }];
      case "disabled":
        return [...baseStyle, { color: colors.tabIconDefault }];
      default:
        return baseStyle;
    }
  };

  const isDisabled = disabled || loading || variant === "disabled";

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[getButtonStyle(), style]}
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator
            color={variant === "primary" ? "#000000" : colors.tint}
            size="small"
          />
        ) : (
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
        )}
      </TouchableOpacity>
      {badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  button: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  small: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  medium: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  large: {
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: "600",
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  badge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#ebff57",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000000",
  },
});
