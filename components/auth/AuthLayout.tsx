import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  compact?: boolean;
}

const { height } = Dimensions.get("window");

export function AuthLayout({
  children,
  title,
  subtitle,
  compact = false,
}: AuthLayoutProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={
          colorScheme === "dark"
            ? ["#1a1a1a", "#2d2d2d", "#1a1a1a"]
            : ["#FFF5E6", "#FFE4B5", "#FFF5E6"]
        }
        style={styles.gradient}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Image
              source={require("@/assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
            {subtitle && (
              <Text style={[styles.subtitle, { color: colors.tabIconDefault }]}>
                {subtitle}
              </Text>
            )}
          </View>

          <View style={[styles.content, compact && styles.contentCompact]}>
            {children}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    paddingTop: height * 0.05,
    paddingBottom: 24,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 20,
  },
  contentCompact: {
    justifyContent: "flex-start",
    paddingTop: 20,
  },
});
