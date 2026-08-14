import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useRouter } from "expo-router";

import CustomScreen from "../../../components/CustomScreen";
import CustomText from "../../../components/CustomText";
import Spacer from "../../../components/Spacer";

import { insertSupplier } from "../../../api/suppliers";

export default function AdminNewSupplier() {
  const router = useRouter();

  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setError("");

    if (!Name.trim()) return setError("Name is required.");
    if (!email.trim()) return setError("Email is required.");
    if (!phone.trim()) return setError("Phone is required.");

    setSaving(true);
    try {
      await insertSupplier({
        Name: Name.trim(),
        email: email.trim(),
        phone: phone.trim()
      });
      router.replace("/users/suppliers");
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Failed to create supplier.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <CustomScreen>
      <View style={styles.page}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>← Back</Text>
        </Pressable>

        <CustomText title="New Supplier" />
        <Spacer height={12} />

        {!!error && <Text style={styles.error}>{error}</Text>}

        <Text style={styles.label}>Name</Text>
        <TextInput value={Name} onChangeText={setName} style={styles.input} placeholder="Supplier name" />

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="supplier@example.com"
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Phone</Text>
        <TextInput value={phone} onChangeText={setPhone} style={styles.input} placeholder="1-800-..." />

        <Spacer height={16} />

        <Pressable onPress={handleSave} disabled={saving} style={styles.primaryBtn}>
          <Text style={styles.primaryText}>{saving ? "Saving..." : "Create"}</Text>
        </Pressable>
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

  label: { marginTop: 12, marginBottom: 6, fontWeight: "800", opacity: 0.85 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10 },

  primaryBtn: { borderWidth: 1, borderRadius: 12, paddingVertical: 12, alignItems: "center", marginTop: 8 },
  primaryText: { fontWeight: "900" },

  error: { fontWeight: "900", opacity: 0.95 }
});