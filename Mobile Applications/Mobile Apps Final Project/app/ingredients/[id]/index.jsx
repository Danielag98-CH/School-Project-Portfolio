import { useEffect, useState } from "react";
import { Text, StyleSheet, ActivityIndicator, Pressable } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";

import CustomScreen from "../../../components/CustomScreen";
import CustomText from "../../../components/CustomText";
import Spacer from "../../../components/Spacer";

import { getIngredientById } from "../../../api/ingredients";

export default function IngredientDetail() {
  const { id } = useLocalSearchParams();
  const [ingredient, setIngredient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getIngredientById(id);
      setIngredient(data);
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return (
      <CustomScreen>
        <ActivityIndicator />
      </CustomScreen>
    );
  }

  return (
    <CustomScreen>
      <CustomText title={ingredient.ingredient_name || "Ingredient"} />
      <Spacer height={12} />
      <Spacer height={18} />

      <Link href={`/ingredients/${id}/benefits`} asChild>
        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>Read Benefits</Text>
        </Pressable>
      </Link>

      <Spacer height={12} />
      
      <Link href="/ingredients" asChild>
        <Pressable style={styles.backBtn}>
          <Text style={styles.backText}>Back to Ingredients</Text>
        </Pressable>
      </Link>
    </CustomScreen>
  );
}


const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    alignSelf: "flex-start",
  },
  btnText: { fontWeight: "800" },

  backBtn: {
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  backText: {
    fontWeight: "800",
  },

});