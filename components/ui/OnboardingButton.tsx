import React from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

interface OnboardingButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  variant?: "primary" | "secondary";
}

export const OnboardingButton = ({
  title,
  onPress,
  disabled,
  style,
  variant = "primary",
}: OnboardingButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    style={[
      styles.button,
      variant === "primary" ? styles.primary : styles.secondary,
      disabled && styles.disabled,
      style,
    ]}
    activeOpacity={0.8}
  >
    <Text
      style={[
        styles.text,
        variant === "primary" ? styles.primaryText : styles.secondaryText,
      ]}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: "#C4FF00",
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#C4FF00",
  },
  disabled: {
    backgroundColor: "rgba(196,255,0,0.3)",
    borderColor: "rgba(196,255,0,0.3)",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryText: {
    color: "#000",
  },
  secondaryText: {
    color: "#C4FF00",
  },
});
