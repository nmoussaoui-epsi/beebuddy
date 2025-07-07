import { Stack } from "expo-router";

export default function LegalLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: "modal",
      }}
    >
      <Stack.Screen name="terms" />
      <Stack.Screen name="privacy" />
      <Stack.Screen name="legal-notices" />
      <Stack.Screen name="data-management" />
    </Stack>
  );
}
