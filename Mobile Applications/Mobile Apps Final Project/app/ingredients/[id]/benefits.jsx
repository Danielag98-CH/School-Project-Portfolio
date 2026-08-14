//new stylized version 

import { ScrollView, View, Text, StyleSheet, Image } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";

import CustomScreen from "../../../components/CustomScreen";
import CustomText from "../../../components/CustomText";
import Spacer from "../../../components/Spacer";

import { getIngredientPostById } from "../../../data/ingredientPosts";

export default function IngredientBenefits() {
  const { id } = useLocalSearchParams();
  const post = getIngredientPostById(id);

  return (
    <CustomScreen>

      <Stack.Screen
        options={{
          title: post?.title || "Ingredient Benefits",
        }} />


      <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
        <CustomText title={post?.title || "Ingredient Benefits"} />
        <Spacer height={12} />

        {post?.heroImage ? (
          <Image source={post.heroImage} style={styles.heroImage} />
        ) : null}

        <Spacer height={12} />

        {post ? (
          <>
            <Text style={styles.summary}>{post.summary}</Text>
            <Spacer height={18} />

            {post.sections?.map((section, index) => (
              <View key={index} style={styles.section}>
                <Text style={styles.sectionHeading}>{section.heading}</Text>
                <Spacer height={6} />
                <Text style={styles.sectionBody}>{section.body}</Text>
              </View>
            ))}
          </>
        ) : (
          <Text style={styles.empty}>
            No post yet for this ingredient. Add it in data/ingredientPosts.js.
          </Text>
        )}

        <Spacer height={30} />
      </ScrollView>
    </CustomScreen>
  );
}

const styles = StyleSheet.create({
  page: {
    width: "100%",
    alignSelf: "center",
    maxWidth: 900,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 40
  },

  heroImage: {
    width: "100%",
    height: 220,
    borderRadius: 16
  },

  summary: {
    fontSize: 14,
    opacity: 0.85,
    lineHeight: 20
  },

  section: {
    marginBottom: 16,
    padding: 14,
    borderWidth: 1,
    borderRadius: 16
  },
  sectionHeading: {
    fontWeight: "900",
    fontSize: 15
  },
  sectionBody: {
    opacity: 0.85,
    lineHeight: 20
  },

  empty: {
    opacity: 0.7
  }
});

