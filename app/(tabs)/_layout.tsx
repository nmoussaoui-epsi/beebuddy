import { Tabs, usePathname } from "expo-router";
import React from "react";
import { Dimensions, Text, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";

const { width: screenWidth } = Dimensions.get("window");
const sideOffset = screenWidth * 0.1; // 10% de l'écran de chaque côté

const TabIcon = ({
  name,
  color,
  focused,
  label,
  isDarkPage,
}: {
  name: any;
  color: string;
  focused: boolean;
  label?: string;
  isDarkPage: boolean;
}) => {
  if (focused && label) {
    return (
      <View
        style={{
          backgroundColor: "#FFFFFF", // Toujours blanc pour l'onglet actif
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 20,
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          minWidth: 80,
          justifyContent: "center",
        }}
      >
        <IconSymbol
          size={18}
          name={name}
          color="#000000" // Toujours noir pour l'icône sur fond blanc
        />
        <Text
          style={{
            color: "#000000", // Toujours noir pour le texte sur fond blanc
            fontSize: 12,
            fontWeight: "500",
          }}
        >
          {label}
        </Text>
      </View>
    );
  }

  return <IconSymbol size={20} name={name} color={color} />;
};

export default function TabLayout() {
  const pathname = usePathname();
  const isDarkPage = pathname === "/profile";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#888888",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          position: "absolute",
          bottom: 40,
          height: 50,
          marginHorizontal: sideOffset,
          backgroundColor: isDarkPage ? "#1A1A1A" : "#3B3B3B",
          borderRadius: 25,
          paddingHorizontal: 16,
          paddingVertical: 16,
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 6,
          elevation: 16,
          overflow: "hidden",
        },
        tabBarItemStyle: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          height: 34,
          paddingVertical: 5,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "600",
          marginTop: 4,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="house.fill"
              color={color}
              focused={focused}
              isDarkPage={isDarkPage}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Matchs",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="magnifyingglass"
              color={color}
              focused={focused}
              label="Matchs"
              isDarkPage={isDarkPage}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="person.fill"
              color={color}
              focused={focused}
              label="Profil"
              isDarkPage={isDarkPage}
            />
          ),
        }}
      />
    </Tabs>
  );
}
