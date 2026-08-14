import { ScrollView, Text, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams, Link, router } from "expo-router";

import CustomScreen from "../../components/CustomScreen";
import CustomText from "../../components/CustomText";
import Spacer from "../../components/Spacer";

import { getBlogPostBySlug } from "../../data/ingredientPosts";

export default function BlogPostScreen() {
  const { slug } = useLocalSearchParams();
  const post = getBlogPostBySlug(slug);

  return (
    <CustomScreen>
      <ScrollView contentContainerStyle={styles.page}>
        <Link href="/" asChild>
            <Pressable>
                <Text style={styles.backLink} onPress={() => router.replace("/")}>
                ← Home
                </Text>
            </Pressable>
        </Link>

        <Spacer height={10} />

        <CustomText title={post?.title || "Blog Post"} />
        <Spacer height={12} />

        {post ? (
          <Text style={styles.body}>{post.body.trim()}</Text> ) 
          : ( <Text>Post not found.</Text> )}

        <Spacer height={24} />
      </ScrollView>
    </CustomScreen>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingBottom: 30,
  },
  backLink: {
    fontWeight: "700",
  },
  body: {
    width: "90%",
    lineHeight: 22,
  },
});