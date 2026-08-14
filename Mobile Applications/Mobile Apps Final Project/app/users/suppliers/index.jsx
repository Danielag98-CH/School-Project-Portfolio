import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";

import CustomScreen from "../../../components/CustomScreen";
import CustomText from "../../../components/CustomText";
import Spacer from "../../../components/Spacer";

import { getAllSuppliers, removeSupplier } from "../../../api/suppliers";

export default function AdminSuppliersIndex() {
  const router = useRouter();
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");

  const load = async () => {
    setError("");
    setLoading(true);
    try {
      const data = await getAllSuppliers();
      setSuppliers(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Failed to load suppliers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    setBusyId(id);
    setError("");
    try {
      await removeSupplier(id);
      await load();
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Failed to delete supplier.");
    } finally {
      setBusyId(null);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.Name}</Text>
      <Text style={styles.meta}>{item.email}</Text>
      <Text style={styles.meta}>{item.phone}</Text>

      <Spacer height={10} />

      <View style={styles.actionsRow}>
        <Pressable
          onPress={() => router.push(`/users/suppliers/${item.id}/edit`)}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Edit</Text>
        </Pressable>

        <Pressable
          onPress={() => handleDelete(item.id)}
          style={styles.btn}
          disabled={busyId === item.id}
        >
          <Text style={styles.btnText}>{busyId === item.id ? "Deleting..." : "Delete"}</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <CustomScreen>
      <View style={styles.page}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>← Back</Text>
        </Pressable>

        <CustomText title="Suppliers (Admin)" />
        <Text style={styles.subtitle}>Manage supplier contact info.</Text>

        <Spacer height={12} />

        <Pressable onPress={() => router.push("/users/suppliers/new")} style={styles.primaryBtn}>
          <Text style={styles.primaryText}>+ New Supplier</Text>
        </Pressable>

        <Spacer height={12} />

        {!!error && <Text style={styles.error}>{error}</Text>}

        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={suppliers}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            ListEmptyComponent={<Text style={styles.smallText}>No suppliers found.</Text>}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24 }}
          />
        )}
      </View>
    </CustomScreen>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    maxWidth: 900,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16
  },
  backBtn: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 12
  },
  backBtnText: { fontWeight: "900" },

  subtitle: { opacity: 0.75, marginTop: 6 },

  primaryBtn: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignSelf: "flex-start"
  },
  primaryText: { fontWeight: "900" },

  card: {
    borderWidth: 1,
    borderColor: "#e3e3e3",
    borderRadius: 14,
    padding: 12,
    backgroundColor: "#fff"
  },
  title: { fontWeight: "900", fontSize: 16 },
  meta: { opacity: 0.8, marginTop: 4 },

  actionsRow: { flexDirection: "row", gap: 10 },
  btn: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14
  },
  btnText: { fontWeight: "900" },

  error: { fontWeight: "900", opacity: 0.95, marginTop: 8 },
  smallText: { opacity: 0.75 }
});