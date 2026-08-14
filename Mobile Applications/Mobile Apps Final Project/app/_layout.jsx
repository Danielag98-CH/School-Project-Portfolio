
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { Slot } from "expo-router";
import { AuthProvider } from "../components/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.body}>
          <Slot />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2026 Apothecary Project • Created by Christian, D</Text>
        </View>
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  headerText: { fontWeight: "900" },
  body: { flex: 1 },
  footer: {
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  footerText: { opacity: 0.7 }
});