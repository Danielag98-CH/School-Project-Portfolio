import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Pressable, FlatList, Image, useWindowDimensions } from "react-native";
import { Link, router } from "expo-router";

import CustomScreen from "../../components/CustomScreen";
import CustomText from "../../components/CustomText";
import Spacer from "../../components/Spacer";

import { getAllIngredients } from "../../api/ingredients";
import { getIngredientPostById } from "../../data/ingredientPosts";

export default function IngredientsIndex() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();

  // Responsive columns (1 on mobile-ish, 2 on wider screens)
  const numColumns = width >= 720 ? 2 : 1;

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllIngredients();
        setIngredients(data || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const renderItem = ({ item }) => {
    const post = getIngredientPostById(item.ingredient_id);
    const pressableStyle = StyleSheet.flatten([
      styles.card,
      numColumns > 1 ? styles.cardGrid : null
    ]);
    return (
      <Link href={`/ingredients/${item.ingredient_id}/benefits`} asChild>
        <Pressable style={pressableStyle}>
          <View style={styles.imageWrap}>
            {post?.heroImage ? (
              <Image source={post.heroImage} style={styles.image} /> ) 
              : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.placeholderText}>No image</Text>
              </View>
            )}
          </View>

          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{item.ingredient_name}</Text>

            {!!post?.summary && (
              <Text style={styles.cardSummary} numberOfLines={3}>
                {post.summary}
              </Text>
            )}

            <Text style={styles.cardCta}>Read benefits →</Text>
          </View>
        </Pressable>
      </Link>
    );
  };

  return (
    <CustomScreen>
      <View style={styles.page}>

        <CustomText title="Ingredients" />
        <Text style={styles.subtitle}>
          Tap an ingredient to read a blog-style post about its benefits.
        </Text>

        <Spacer height={16} />

        {loading ? (
          <ActivityIndicator /> ) 
          : (
            <FlatList
              data={ingredients}
              key={numColumns} 
              numColumns={numColumns}
              renderItem={renderItem}
              keyExtractor={(item) => String(item.ingredient_id)}
              contentContainerStyle={styles.list}
              columnWrapperStyle={numColumns > 1 ? styles.row : null}
              showsVerticalScrollIndicator={false}
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
    maxWidth: 900, // nice on web
    paddingHorizontal: 16,
    paddingTop: 8
  },

  topRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  navBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 10
  },
  navBtnText: {
    fontWeight: "800"
  },

  subtitle: {
    opacity: 0.75,
    marginTop: 6
  },

  list: {
    paddingBottom: 40
  },
  row: {
    gap: 12
  },

  card: {
    borderWidth: 1,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 12
  },
  cardGrid: {
    flex: 1
  },

  imageWrap: {
    height: 160,
    backgroundColor: "#eee"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  placeholderText: {
    opacity: 0.6,
    fontWeight: "700"
  },

  cardBody: {
    padding: 14,
    gap: 8
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "900"
  },
  cardSummary: {
    opacity: 0.8,
    lineHeight: 20
  },
  cardCta: {
    fontWeight: "800"
  }
});