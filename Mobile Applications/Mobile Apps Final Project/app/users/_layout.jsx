import { Stack, Redirect, Link } from "expo-router";
import { Pressable, Text } from "react-native";
import { useAuth } from "../../components/AuthContext"; 

export default function UsersLayout() {
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
  if (!isAdmin) {
    return <Redirect href="/profile" />;
  }

  return (
    <Stack screenOptions={{ headerShown: true,
        headerTitle: user
          ? `Welcome ${user.firstName} (Admin)`
          : "Admin",
        headerLeft: () => (
          <Link href="/" asChild>
            <Pressable style={{ paddingHorizontal: 12 }}>
              <Text style={{ fontWeight: "700" }}>Home</Text>
            </Pressable>
          </Link>
        ),

    }}>
      <Stack.Screen name="index" options={{ title: "Admin" }} />
      <Stack.Screen name="list" options={{ title: "Users" }} />
      <Stack.Screen name="soaps/new" options={{ title: "Create New Soap" }} />
      <Stack.Screen name="soap-ingredient/index" options={{ title: "Soap Ingredients" }} />
      <Stack.Screen name="soap-ingredient/[soapId]/index" options={{ title: "Manage Soap Ingredients" }} />
      <Stack.Screen name="suppliers/index" options={{ title: "Suppliers" }} />
      <Stack.Screen name="suppliers/new" options={{ title: "New Supplier" }} />
      <Stack.Screen name="suppliers/[id]/edit" options={{ title: "Edit Supplier" }} />
    </Stack>
  );
}