import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false, // Empêcher le retour par geste
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="profile-setup" />
      <Stack.Screen name="cv-setup" />
      <Stack.Screen name="project-setup" />
    </Stack>
  );
}
