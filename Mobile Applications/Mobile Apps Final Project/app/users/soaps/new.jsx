import { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

import { useAuth } from "../../../components/AuthContext";

import CustomScreen from "../../../components/CustomScreen";
import CustomText from "../../../components/CustomText";
import Spacer from "../../../components/Spacer";

import { insertSoap } from "../../../api/soaps";

export default function AdminNewSoapScreen() {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();

  // users/_layout already guards this, but keeping it prevents edge-case flashes
  const isAdmin = user?.roleId === 1 || user?.role === "Admin";

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) router.replace("/login");
    else if (!isAdmin) router.replace("/profile");
  }, [isLoading, isAuthenticated, isAdmin]);

  const [soap_name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // This matches your UsersLayout usage: user.firstName exists, so user.id is very likely present too
  const createdBy = user?.id ?? user?.user_id ?? user?.userId;

  const handleSave = async () => {
    setError("");

    if (!soap_name.trim()) {
      setError("Soap name is required.");
      return;
    }
    if (description && description.length > 150) {
      setError("Description must be 150 characters or less.");
      return;
    }
    if (!createdBy) {
      setError("Could not determine created_by (user id).");
      return;
    }

    setSaving(true);
    try {
      const resp = await insertSoap({
        soap_name: soap_name.trim(),
        description: description.trim(),
        created_by: Number(createdBy)
      });

      const newId = resp?.id;
      router.replace(newId ? `/soaps/${newId}` : "/soaps");
    } catch (e) {
      setError(e?.message || "Failed to create soap.");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) return null;

  return (
    <CustomScreen>
      <View style={styles.page}>
        <CustomText title="Create New Soap" />
        <Spacer height={16} />

        {!!error && <Text style={styles.error}>{error}</Text>}

        <Text style={styles.label}>Name</Text>
        <TextInput value={soap_name} onChangeText={setName} style={styles.input} />

        <Text style={styles.label}>Description (max 150)</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          style={[styles.input, styles.multiline]}
          multiline
        />

        <Spacer height={16} />

        <Pressable onPress={handleSave} disabled={saving} style={styles.btn}>
          <Text style={styles.btnText}>{saving ? "Saving..." : "Create"}</Text>
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
    paddingTop: 8,
    paddingBottom: 40
  },
  label: {
    marginTop: 12,
    marginBottom: 6,
    fontWeight: "800",
    opacity: 0.85
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  multiline: {
    minHeight: 90,
    textAlignVertical: "top"
  },
  btn: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: "center"
  },
  btnText: {
    fontWeight: "900"
  },
  error: {
    opacity: 0.9,
    fontWeight: "800"
  }
});