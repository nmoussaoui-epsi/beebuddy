import { Tabs, usePathname } from "expo-router";
import React from "react";
import { Dimensions, Text, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { CustomIcon } from "@/components/ui/CustomIcon";
import { useChat } from "@/contexts/ChatContext";

const { width: screenWidth } = Dimensions.get("window");
const sideOffset = screenWidth * 0.1; // 10% de l'écran de chaque côté

const TabIcon = ({
  name,
  color,
  focused,
  label,
  isDarkPage,
}: {
  name: "home" | "search" | "chat" | "user";
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
        <CustomIcon
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

  return <CustomIcon size={20} name={name} color={color} />;
};

export default function TabLayout() {
  const pathname = usePathname();
  const { isInChat } = useChat();
  const isDarkPage = pathname === "/profile";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#888888",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: isInChat
          ? { display: "none" }
          : {
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
              name="home"
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
          title: "Match",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="search"
              color={color}
              focused={focused}
              label="Match"
              isDarkPage={isDarkPage}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Chats",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="chat"
              color={color}
              focused={focused}
              label="Chats"
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
              name="user"
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
