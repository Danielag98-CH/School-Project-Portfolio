import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../components/AuthContext"; 


export default function ProfileIndex() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "600" }}>Your Profile</Text>

      <Text style={{ fontSize: 16 }}>
        Name: {user?.firstName} {user?.lastName}
      </Text>
      <Text style={{ fontSize: 16 }}>Email: {user?.email}</Text>
      <Text style={{ fontSize: 16 }}>Role: {user?.role}</Text>

      <Pressable
        onPress={handleLogout}
        style={{
          marginTop: 16,
          paddingVertical: 12,
          paddingHorizontal: 14,
          borderRadius: 8,
          borderWidth: 1,
          alignSelf: "flex-start",
        }}
      >
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
}