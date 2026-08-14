import { useMemo, useState } from "react";
import { StyleSheet, Text, View, Image, Pressable, FlatList } from "react-native";
import { Link, useRouter } from "expo-router";

import CustomScreen from "../components/CustomScreen";
import Logo from "../assets/apothecary.png";
import CustomText from "../components/CustomText";
import Spacer from "../components/Spacer";
import { useAuth } from "../components/AuthContext";

const TABS = [
  { key: "about", label: "About" },
  { key: "explore", label: "Explore" },
  { key: "account", label: "Account" },
  
];

export default function Home() {
  const router = useRouter();
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("explore");

  const isAdmin = user?.roleId === 1 || user?.role === "Admin";

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  const exploreItems = useMemo(
    () => [
      { key: "soaps", label: "Soaps", href: "/soaps" },
      { key: "ingredients", label: "Ingredients", href: "/ingredients" },
      { key: "contact", label: "Contact", href: "/contact" },
    ],
    []
  );

  const accountItemsLoggedOut = useMemo(
    () => [
      { key: "login", label: "Login", href: "/login" },
      { key: "register", label: "Register", href: "/register" },
    ],
    []
  );

  const accountItemsLoggedIn = useMemo(() => {
    const items = [
      {
        key: "continue",
        label: `Continue to ${isAdmin ? "Admin" : "Profile"}`,
        href: isAdmin ? "/users" : "/profile",
      },
    ];

    if (isAdmin) {
      items.push({
        key: "adminIngredients",
        label: "Ingredients (Admin)",
        href: "/users/ingredients",
      });
    }

    return items;
  }, [isAdmin]);

  const aboutItems = useMemo(
    () => [
      {
        key: "aboutText",
        type: "text",
        title: "About Apothecary Project",
        body:
          "Apothecary Project is a simple app for exploring ingredients and learning their benefits. " +
          "Admins can manage additional inventory details.",
      }
    ],
    []
  );

  const listData = useMemo(() => {
    if (activeTab === "explore") return exploreItems;

    if (activeTab === "account") {
      if (!isAuthenticated) return accountItemsLoggedOut;
      return accountItemsLoggedIn;
    }

    // about tab
    return aboutItems;
  }, [activeTab, exploreItems, accountItemsLoggedOut, accountItemsLoggedIn, aboutItems, isAuthenticated]);

  if (isLoading) return null;

  const renderItem = ({ item }) => {
    if (item.type === "text") {
      return (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardBody}>{item.body}</Text>
        </View>
      );
    }

    return (
      <Link href={item.href} asChild>
        <Pressable style={styles.row}>
          <Text style={styles.rowText}>{item.label}</Text>
          <Text style={styles.chev}>›</Text>
        </Pressable>
      </Link>
    );
  };

  return (
    <CustomScreen>
      <View style={styles.page}>
        <View style={styles.header}>
          <Image source={Logo} style={styles.logo} />
          <CustomText title>Apothecary Project</CustomText>
          <Text style={styles.subtitle}>
            {isAuthenticated
              ? `Welcome back, ${user?.firstName}${isAdmin ? " (Admin)" : ""}!`
              : "Welcome to the Apothecary!"}
          </Text>
        </View>

        <Spacer height={16} />

        {/* Tab / segmented control */}
        <View style={styles.tabs}>
          {TABS.map((t) => {
            const isActive = activeTab === t.key;
            return (
              <Pressable
                key={t.key}
                onPress={() => setActiveTab(t.key)}
                style={[styles.tab, isActive && styles.tabActive]}
              >
                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{t.label}</Text>
              </Pressable>
            );
          })}
        </View>

        <Spacer height={16} />

        {/* List */}
        <FlatList
          data={listData}
          keyExtractor={(item) => item.key}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.sep} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        {/* Logout (only when logged in, and only shown on Account tab) */}
        {isAuthenticated && activeTab === "account" && (
          <View style={{ marginTop: 16 }}>
            <Pressable onPress={handleLogout} style={styles.logoutBtn}>
              <Text style={styles.logoutText}>Logout</Text>
            </Pressable>
          </View>
        )}
      </View>
    </CustomScreen>
  );
}

const styles = StyleSheet.create({
  // centers on mobile, scales on web
  page: {
    flex: 1,
    alignSelf: "center",
    width: "100%",
    maxWidth: 520,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 18,
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

  tabs: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 999,
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  tabActive: {
    backgroundColor: "#111",
  },
  tabText: {
    fontWeight: "800",
    opacity: 0.85,
  },
  tabTextActive: {
    color: "#fff",
    opacity: 1,
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