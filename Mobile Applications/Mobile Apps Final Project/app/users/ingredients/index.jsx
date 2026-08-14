import { useEffect, useState } from "react";
import { Text,ScrollView, StyleSheet, ActivityIndicator, View, Pressable, FlatList } from "react-native";

import { Link, router } from "expo-router";

import CustomScreen from "../../../components/CustomScreen";
import CustomText from "../../../components/CustomText";
import Spacer from "../../../components/Spacer";
import { getAllIngredients } from "../../../api/ingredients";

export default function AdminIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllIngredients();
        setIngredients(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Link href={`/ingredients/${item.ingredient_id}/benefits`} asChild>
        <Pressable>
          <Text style={styles.nameLink}>{item.ingredient_name}</Text>
        </Pressable>
      </Link>

      <Spacer height={8} />

      <View style={styles.metaRow}>
        <Text style={styles.metaLabel}>Cost</Text>
        <Text style={styles.metaValue}>${Number(item.cost || 0).toFixed(2)}</Text>
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.metaLabel}>Supplier</Text>
        <Text style={styles.metaValue}>{String(item.supplier_id ?? "")}</Text>
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.metaLabel}>Purchased</Text>
        <Text style={styles.metaValue}>{String(item.amount_purchased ?? "")}</Text>
      </View>

      <Spacer height={10} />

      {/* Avoid Link style=... (can break on web); style the child instead */}
      <Link href={`/ingredients/${item.ingredient_id}/benefits`} asChild>
        <Pressable>
          <Text style={styles.linkText}>Read benefits →</Text>
        </Pressable>
      </Link>
    </View>
  );

  return (
    <CustomScreen>
      <View style={styles.page}>

         <Pressable onPress={() => router.back()} style={styles.backBtn}>
                  <Text style={styles.backBtnText}>← Back</Text>
         </Pressable>

        <CustomText title="Ingredients (Admin)" />
        <Text style={styles.subtitle}>View costs, supplier info, and purchased amounts.</Text>
        <Spacer height={16} />

        {loading ? (
          <ActivityIndicator /> ) 
          : (
            <FlatList
              data={ingredients}
              keyExtractor={(item) => String(item.ingredient_id)}
              renderItem={renderItem}
              contentContainerStyle={styles.listContent}
              ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
              ListEmptyComponent={<Text style={styles.smallText}>No ingredients found.</Text>}
              showsVerticalScrollIndicator={false}
            />
        )}

        <Spacer height={16} />

        <Link href="/" asChild>
          <Pressable style={styles.backBtn}>
            <Text style={styles.backBtnText}>Back to Home</Text>
          </Pressable>
        </Link>
      </View>
    </CustomScreen>
  );
}

const styles = StyleSheet.create({
  // Better mobile spacing + centered content width on web
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

  listContent: {
    paddingTop: 8,
    paddingBottom: 8
  },

  card: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    backgroundColor: "#fff"
  },

  nameLink: {
    fontSize: 16,
    fontWeight: "900"
  },

  // Mobile-friendly two-column layout for meta rows
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 6
  },
  metaLabel: {
    fontWeight: "800",
    opacity: 0.7
  },
  metaValue: {
    fontWeight: "700",
    flexShrink: 1,
    textAlign: "right"
  },

  linkText: {
    fontSize: 15,
    fontWeight: "800"
  },

  smallText: {
    opacity: 0.75
  },

  backBtn: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignSelf: "flex-start"
  },
  backBtnText: {
    fontWeight: "900"
  }
});