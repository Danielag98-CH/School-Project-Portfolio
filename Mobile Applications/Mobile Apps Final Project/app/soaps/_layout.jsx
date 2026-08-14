import { Stack, Link, useRouter } from "expo-router";
import { Pressable, Text } from "react-native";

export default function SoapsLayout() {
  const router = useRouter();

  const handleBack = () => {
    try {
      router.back();
    } catch {
      router.replace("/");
    }
  };

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "Soaps",
        headerLeft: () => (
          <Pressable onPress={handleBack} style={{ paddingHorizontal: 12, paddingVertical: 8 }}>
            <Text style={{ fontWeight: "800" }}>Back</Text>
          </Pressable>
        ),
        headerRight: () => (
          <Link href="/" asChild>
            <Pressable style={{ paddingHorizontal: 12, paddingVertical: 8 }}>
              <Text style={{ fontWeight: "800" }}>Home</Text>
            </Pressable>
          </Link>
        )
      }}
    />
  );
}