import { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Pressable, TextInput } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import CustomScreen from "../../../../components/CustomScreen";
import CustomText from "../../../../components/CustomText";
import Spacer from "../../../../components/Spacer";

import { getSoapById } from "../../../../api/soaps";
import { getAllIngredients } from "../../../../api/ingredients";
import { getSoapIngredientsForSoap, insertSoapIngredient, updateSoapIngredient, removeSoapIngredient } from "../../../../api/soap-ingredient";

export default function SoapIngredientForSoapAdmin() {
  const { soapId } = useLocalSearchParams();
  const soap_id = useMemo(() => Number(soapId), [soapId]);

  const [soap, setSoap] = useState(null);
  const [allIngredients, setAllIngredients] = useState([]);

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  // add form
  const [ingredient_id, setIngredientId] = useState("");
  const [amount_used, setAmountUsed] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [loadError, setLoadError] = useState("");

  const logHttpError = (label, e) => {
    const status = e?.response?.status;
    const url = (e?.response?.config?.baseURL || "") + (e?.response?.config?.url || "");
    const msg = e?.response?.data?.message;
    console.log(`[${label}]`, "status:", status, "url:", url, "message:", msg, "raw:", e?.message);
  };

  const refresh = async () => {
    setLoadError("");
    try {
      const data = await getSoapIngredientsForSoap(soap_id);
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      logHttpError("getSoapIngredientsForSoap", e);
      setRows([]);
      setLoadError(e?.response?.data?.message || e?.message || "Failed to load soap ingredients.");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const soapPromise = getSoapById(soap_id).catch((e) => {
          logHttpError("getSoapById", e);
          return null;
        });

        const ingPromise = getAllIngredients().catch((e) => {
          logHttpError("getAllIngredients", e);
          return [];
        });

        const [soapData, ingredientData] = await Promise.all([soapPromise, ingPromise]);

        setSoap(soapData);
        setAllIngredients(Array.isArray(ingredientData) ? ingredientData : []);

        await refresh();
      } finally {
        setLoading(false);
      }
    })();
  }, [soap_id]);

  const ingredientNameById = useMemo(() => {
    const map = new Map();

    for (const i of allIngredients) {
      const id = Number(i.ingredient_id ?? i.id ?? i.ingredientId);
      const name = i.ingredient_name ?? i.ingredientName ?? i.name;

      if (Number.isInteger(id) && name) {
        map.set(id, name);
      }
    }

    return map;
  }, [allIngredients]);

  const validateAdd = () => {
    const iid = Number(ingredient_id);
    if (!Number.isInteger(iid) || iid <= 0) return "ingredient_id must be a positive integer.";
    if (!amount_used?.trim()) return "amount_used is required.";
    if (amount_used.trim().length > 30) return "amount_used must be 30 characters or less.";
    return "";
  };

  const handleAdd = async () => {
    setError("");
    const msg = validateAdd();
    if (msg) {
      setError(msg);
      return;
    }

    setSaving(true);
    try {
      await insertSoapIngredient({
        soap_id,
        ingredient_id: Number(ingredient_id),
        amount_used: amount_used.trim()
      });

      setIngredientId("");
      setAmountUsed("");
      await refresh();
    } catch (e) {
      const status = e?.response?.status;
      if (status === 409) setError("That ingredient is already linked to this soap.");
      else if (status === 400) setError("Invalid soap_id or ingredient_id.");
      else setError(e?.message || "Failed to add ingredient.");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateAmount = async (row, nextAmount) => {
    const trimmed = (nextAmount ?? "").trim();

    if (!trimmed) {
      await refresh();
      return;
    }
    if (trimmed.length > 30) {
      await refresh();
      return;
    }

    try {
      await updateSoapIngredient({
        soap_id: soap_id,
        ingredient_id: Number(row.ingredient_id),
        amount_used: trimmed
      });
    } catch (e) {
      await refresh();
    }
  };

  const handleRemove = async (row) => {
    setSaving(true);
    try {
      await removeSoapIngredient(soap_id, Number(row.ingredient_id));
      await refresh();
    } finally {
      setSaving(false);
    }
  };

  const renderRow = ({ item }) => {
    const iid = Number(item.ingredient_id ?? item.id ?? item.ingredientId);

    const name =
      item.ingredient_name ||
      item.ingredientName ||
      ingredientNameById.get(iid) ||
      `Ingredient #${iid || item.ingredient_id}`;

    return (
      <View style={styles.card}>
        <Text style={styles.title}>{name}</Text>

        <Spacer height={10} />

        <Text style={styles.label}>Amount used</Text>
        <TextInput
          defaultValue={String(item.amount_used ?? "")}
          onEndEditing={(e) => handleUpdateAmount(item, e.nativeEvent.text)}
          style={styles.input}
          placeholder="e.g. 2 oz"
        />

        <Spacer height={10} />

        <Pressable onPress={() => handleRemove(item)} style={styles.dangerBtn} disabled={saving}>
          <Text style={styles.dangerText}>Remove</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <CustomScreen>
      <View style={styles.page}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>← Back</Text>
        </Pressable>

        <CustomText title={soap?.soap_name ? `Manage: ${soap.soap_name}` : `Manage Soap #${soap_id}`} />
        <Text style={styles.subtitle}>Add, edit, or remove ingredients for this soap.</Text>

        <Spacer height={16} />

        {!!loadError && <Text style={styles.error}>{loadError}</Text>}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Add ingredient</Text>
          <Spacer height={10} />

          {!!error && <Text style={styles.error}>{error}</Text>}

          <Text style={styles.label}>Ingredient ID</Text>
          <TextInput
            value={ingredient_id}
            onChangeText={setIngredientId}
            style={styles.input}
            placeholder="e.g. 3"
            keyboardType="numeric"
          />

          <Spacer height={10} />

          <Text style={styles.label}>Amount used (max 30)</Text>
          <TextInput
            value={amount_used}
            onChangeText={setAmountUsed}
            style={styles.input}
            placeholder="e.g. 2 oz"
          />

          <Spacer height={12} />

          <Pressable onPress={handleAdd} disabled={saving} style={styles.primaryBtn}>
            <Text style={styles.primaryText}>{saving ? "Saving..." : "Add to soap"}</Text>
          </Pressable>

          <Spacer height={10} />

          <Text style={styles.help}>Tip: ingredient IDs come from your Ingredients list.</Text>
        </View>

        <Spacer height={16} />

        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={rows}
            keyExtractor={(item) => String(item.ingredient_id)}
            renderItem={renderRow}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            ListEmptyComponent={<Text style={styles.smallText}>No ingredients linked yet.</Text>}
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
  subtitle: {
    opacity: 0.75,
    marginTop: 6
  },

  card: {
    borderWidth: 1,
    borderColor: "#e3e3e3",
    borderRadius: 14,
    padding: 12,
    backgroundColor: "#fff"
  },

  sectionTitle: {
    fontWeight: "900",
    fontSize: 16
  },
  title: {
    fontWeight: "900",
    fontSize: 16
  },
  label: {
    fontWeight: "800",
    opacity: 0.8,
    marginBottom: 6
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10
  },

  primaryBtn: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center"
  },
  primaryText: {
    fontWeight: "900"
  },

  dangerBtn: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center"
  },
  dangerText: {
    fontWeight: "900"
  },

  help: {
    opacity: 0.7
  },
  smallText: {
    opacity: 0.75
  },
  error: {
    opacity: 0.95,
    fontWeight: "900"
  }
});