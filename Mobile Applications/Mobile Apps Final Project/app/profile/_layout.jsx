import { Stack, Redirect, Link } from "expo-router";
import { Pressable, Text } from "react-native";
import { useAuth } from "../../components/AuthContext";

export default function ProfileLayout() {
  const { user, isLoading, isAuthenticated, logout } = useAuth();

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  if (user?.active === false) {
    logout?.();
    return <Redirect href="/login" />;
  }

  const isAdmin = user?.roleId === 1 || user?.role === "Admin";
  if (isAdmin) {
    return <Redirect href="/users" />;
  }

  return (
    <Stack screenOptions={{ headerShown: true, 
        headerTitle: user
          ? `Welcome ${user.firstName}`
          : "Profile",
        headerLeft: () => (
          <Link href="/" asChild>
            <Pressable style={{ paddingHorizontal: 12 }}>
              <Text style={{ fontWeight: "700" }}>Home</Text>
            </Pressable>
          </Link>
        ),
    }}>
      <Stack.Screen name="index" options={{ title: "Profile" }} />
    </Stack>
  );
}