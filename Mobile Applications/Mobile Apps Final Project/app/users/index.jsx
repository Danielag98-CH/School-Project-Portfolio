import { StyleSheet, Text, View, Image, Pressable, FlatList } from "react-native";
import { useRouter } from "expo-router";

import CustomScreen from "../../components/CustomScreen";
import CustomText from "../../components/CustomText";
import Spacer from "../../components/Spacer";
import Logo from "../../assets/apothecary.png";

import { useAuth } from "../../components/AuthContext";

export default function UsersIndex() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  const adminItems = [
    { key: "createUser", label: "Create Standard User", onPress: () => router.push("/register") },
    { key: "viewUsers", label: "View Users", onPress: () => router.push("/users/list") },
    { key: "soapIng", label: "Manage Soap Ingredients", onPress: () => router.push("/users/soap-ingredient") },
    { key: "suppliers", label: "Manage Suppliers", onPress: () => router.push("/users/suppliers") },
  ];

  const renderItem = ({ item }) => (
    <Pressable style={styles.row} onPress={item.onPress}>
      <Text style={styles.rowText}>{item.label}</Text>
      <Text style={styles.chev}>›</Text>
    </Pressable>
  );

  return (
    <CustomScreen>
      <View style={styles.page}>
        {/* Back */}
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        {/* Header like Home */}
        <View style={styles.header}>
          <Image source={Logo} style={styles.logo} />
          <CustomText title>Admin Dashboard</CustomText>
          <Text style={styles.subtitle}>
            Welcome back, {user?.firstName}{user?.roleId === 1 || user?.role === "Admin" ? " (Admin)" : ""}!
          </Text>
        </View>

        <Spacer height={16} />

        {/* Admin info card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Signed in</Text>
          <Text style={styles.cardBody}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text style={styles.cardBody}>{user?.email}</Text>
          <Text style={styles.cardBody}>
            Role: {user?.role} (roleId: {user?.roleId})
          </Text>
        </View>

        <Spacer height={16} />

        {/* Admin actions list */}
        <FlatList
          data={adminItems}
          keyExtractor={(item) => item.key}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.sep} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        {/* Logout */}
        <View style={{ marginTop: 16 }}>
          <Pressable onPress={handleLogout} style={styles.logoutBtn}>
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </CustomScreen>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignSelf: "center",
    width: "100%",
    maxWidth: 520,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 18,
  },

  backBtn: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
  backText: {
    fontWeight: "800",
  },

  header: {
    alignItems: "center",
    gap: 6,
  },
  logo: {
    width: 92,
    height: 92,
    marginBottom: 4,
  },
  subtitle: {
    opacity: 0.8,
    textAlign: "center",
  },

  listContent: {
    paddingBottom: 8,
  },
  sep: {
    height: 10,
  },

  row: {
    borderWidth: 1,
    borderColor: "#e3e3e3",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  rowText: {
    fontSize: 16,
    fontWeight: "800",
  },
  chev: {
    fontSize: 22,
    opacity: 0.45,
    marginLeft: 10,
  },

  card: {
    borderWidth: 1,
    borderColor: "#e3e3e3",
    borderRadius: 14,
    padding: 14,
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontWeight: "900",
    fontSize: 16,
    marginBottom: 6,
  },
  cardBody: {
    opacity: 0.85,
    lineHeight: 20,
  },

  logoutBtn: {
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  logoutText: {
    fontWeight: "900",
  },
});