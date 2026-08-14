import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";

import CustomScreen from "../../../components/CustomScreen";
import CustomText from "../../../components/CustomText";
import Spacer from "../../../components/Spacer";

import { getAllSoaps } from "../../../api/soaps";

export default function SoapIngredientAdminHome() {
  const router = useRouter();
  const [soaps, setSoaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllSoaps();
        setSoaps(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => router.push(`/users/soap-ingredient/${item.soap_id}`)}
      style={styles.row}
    >
      <Text style={styles.rowText}>{item.soap_name}</Text>
      <Text style={styles.chev}>›</Text>
    </Pressable>
  );

  return (
    <CustomScreen>
      <View style={styles.page}>
         <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>← Back</Text>
         </Pressable>

        <CustomText title="Soap Ingredients (Admin)" />
        <Text style={styles.subtitle}>Select a soap to manage its ingredient list.</Text>
        <Spacer height={16} />

        {loading ? (
          <ActivityIndicator /> ) 
          : (
            <FlatList
              data={soaps}
              keyExtractor={(item) => String(item.soap_id)}
              renderItem={renderItem}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
              ListEmptyComponent={<Text style={styles.smallText}>No soaps found.</Text>}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 16 }}
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
  row: {
    borderWidth: 1,
    borderColor: "#e3e3e3",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff"
  },
  rowText: {
    fontSize: 16,
    fontWeight: "900"
  },
  chev: {
    fontSize: 22,
    opacity: 0.45,
    marginLeft: 10
  },
  smallText: {
    opacity: 0.75
  }
});