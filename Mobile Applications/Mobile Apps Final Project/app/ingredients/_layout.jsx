import { Stack, Link, useRouter } from "expo-router";
import { Pressable, Text } from "react-native";

export default function IngredientsLayout() {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack?.()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  return (
    <Stack
      screenOptions={{
        headerShown: true,

        headerLeft: () => (
          <Pressable
            onPress={handleBack}
            style={{ paddingHorizontal: 12, paddingVertical: 8 }} >
            <Text style={{ fontWeight: "800" }}>Back</Text>
          </Pressable>
        ),

        headerRight: () => (
          <Link href="/" asChild>
            <Pressable style={{ paddingHorizontal: 12, paddingVertical: 8 }}>
              <Text style={{ fontWeight: "800" }}>Home</Text>
            </Pressable>
          </Link>)
        }} >
          
      <Stack.Screen name="index" options={{ title: "Ingredients" }} />
      </Stack>
  );
}