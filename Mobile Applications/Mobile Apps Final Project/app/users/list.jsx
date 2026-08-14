import { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable, TextInput, Switch, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { router } from "expo-router";
import { useAuth } from "../../components/AuthContext";
import { getAllUsers, updateUser } from "../../api/users";

export default function UsersList() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  // Track per-user UI state
  const [openResetForId, setOpenResetForId] = useState(null);
  const [pwById, setPwById] = useState({});
  const [pw2ById, setPw2ById] = useState({});
  const [savingById, setSavingById] = useState({});

  const isAdmin = user?.roleId === 1 || user?.role === "Admin";

  const loadUsers = async () => {
    setError("");
    try {
      const data = await getAllUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (e) {
      setError("Failed to load users.");
      console.log("getAllUsers error:", e?.response?.data || e?.message || e);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await loadUsers();
      setLoading(false);
    })();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadUsers();
    setRefreshing(false);
  };

  const setSaving = (id, value) => {
    setSavingById((prev) => ({ ...prev, [id]: value }));
  };

  const handleToggleActive = async (u) => {
    if (!isAdmin) return;

    const nextActive = !u.active;

    setUsers((prev) =>
      prev.map((x) => (x.id === u.id ? { ...x, active: nextActive } : x))
    );

    setSaving(u.id, true);

    try {
      await updateUser({
        id: u.id,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        roleId: u.roleId,
        active: nextActive
      });
    } catch (e) {
      // Revert if failed
      setUsers((prev) =>
        prev.map((x) => (x.id === u.id ? { ...x, active: !nextActive } : x))
      );
      Alert.alert("Error", "Failed to update active status.");
      console.log("update active error:", e?.response?.data || e?.message || e);
    } finally {
      setSaving(u.id, false);
    }
  };

  const validatePassword = (id) => {
    const p1 = pwById?.[id] || "";
    const p2 = pw2ById?.[id] || "";

    if (!p1) return "Password is required.";
    if (p1.length < 8) return "Password must be at least 8 characters.";
    if (p1 !== p2) return "Passwords do not match.";
    return "";
  };

  const handleResetPassword = async (u) => {
    const msg = validatePassword(u.id);
    if (msg) {
      Alert.alert("Fix this", msg);
      return;
    }

    setSaving(u.id, true);

    try {
      await updateUser({
        id: u.id,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        roleId: u.roleId,
        active: u.active,
        password: pwById[u.id]
      });

      Alert.alert("Success", `Password updated for ${u.firstName}.`);
      setPwById((prev) => ({ ...prev, [u.id]: "" }));
      setPw2ById((prev) => ({ ...prev, [u.id]: "" }));
      setOpenResetForId(null);
    } catch (e) {
      Alert.alert("Error", "Failed to reset password.");
      console.log("reset password error:", e?.response?.data || e?.message || e);
    } finally {
      setSaving(u.id, false);
    }
  };

  if (loading) {
    return (
      <View style={styles.page}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.page}>

      <Pressable onPress={() => router.back()} style={styles.backBtn}>
                <Text style={styles.backBtnText}>← Back</Text>
      </Pressable>

      <Text style={styles.title}>Users</Text>

      {!!error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.actionsRow}>
        <Pressable onPress={handleRefresh} style={styles.btn}>
          <Text style={styles.btnText}>{refreshing ? "Refreshing..." : "Refresh"}</Text>
        </Pressable>
      </View>

      <View style={{ height: 12 }} />

      {users.map((u) => {
        const saving = !!savingById[u.id];
        const resetOpen = openResetForId === u.id;

        return (
          <View key={u.id} style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.cardTitle}>
                {u.firstName} {u.lastName}
              </Text>
              <Text style={styles.badge}>
                {u.role} (#{u.roleId})
              </Text>
            </View>

            <Text style={styles.mono}>{u.email}</Text>

            <View style={{ height: 12 }} />

            <View style={styles.rowBetween}>
              <View>
                <Text style={styles.label}>Active</Text>
                <Text style={styles.small}>
                  {u.active ? "Enabled" : "Disabled"}
                </Text>
              </View>

              <Switch
                value={!!u.active}
                onValueChange={() => handleToggleActive(u)}
                disabled={!isAdmin || saving}
              />
            </View>

            <View style={{ height: 12 }} />

            <Pressable
              onPress={() => setOpenResetForId(resetOpen ? null : u.id)}
              style={styles.linkBtn}
              disabled={saving}
            >
              <Text style={styles.linkBtnText}>
                {resetOpen ? "Hide Reset Password" : "Reset Password"}
              </Text>
            </Pressable>

            {resetOpen && (
              <View style={styles.resetBox}>
                <Text style={styles.label}>New Password</Text>
                <TextInput
                  style={styles.input}
                  value={pwById?.[u.id] || ""}
                  onChangeText={(t) => setPwById((prev) => ({ ...prev, [u.id]: t }))}
                  secureTextEntry
                  editable={!saving}
                  autoCapitalize="none"
                />

                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  style={styles.input}
                  value={pw2ById?.[u.id] || ""}
                  onChangeText={(t) => setPw2ById((prev) => ({ ...prev, [u.id]: t }))}
                  secureTextEntry
                  editable={!saving}
                  autoCapitalize="none"
                />

                <Pressable
                  onPress={() => handleResetPassword(u)}
                  style={[styles.btn, saving && { opacity: 0.6 }]}
                  disabled={saving}
                >
                  <Text style={styles.btnText}>
                    {saving ? "Saving..." : "Save Password"}
                  </Text>
                </Pressable>
              </View>
            )}
          </View>
        );
      })}

      {users.length === 0 && !error && (
        <Text style={styles.small}>No users found.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 16
  },
  title: {
    fontSize: 22,
    fontWeight: "700"
  },
  errorText: {
    marginTop: 10,
    color: "#cc0000",
    fontWeight: "600"
  },
  actionsRow: {
    marginTop: 12,
    flexDirection: "row",
    gap: 10
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    flex: 1
  },
  badge: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontWeight: "800",
    fontSize: 12,
    alignSelf: "flex-start"
  },
  mono: {
    marginTop: 6,
    opacity: 0.8
  },
  label: {
    fontWeight: "800"
  },
  small: {
    opacity: 0.75,
    marginTop: 2
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: "flex-start"
  },
  btnText: {
    fontWeight: "800"
  },
  linkBtn: {
    alignSelf: "flex-start"
  },
  linkBtnText: {
    fontWeight: "800",
    textDecorationLine: "underline"
  },
  resetBox: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    gap: 8
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10
  }
});