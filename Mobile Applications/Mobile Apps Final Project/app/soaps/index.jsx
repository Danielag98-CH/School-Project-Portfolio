import { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Pressable, FlatList, useWindowDimensions, Image } from "react-native";
import { useRouter } from "expo-router";

import CustomScreen from "../../components/CustomScreen";
import CustomText from "../../components/CustomText";
import Spacer from "../../components/Spacer";

import { useAuth } from "../../components/AuthContext";

import { getAllSoaps } from "../../api/soaps";
import { getSoapPhotoById } from "../../data/soapPhotos";

export default function SoapsIndex() {
  const router = useRouter();

  const { user, isAuthenticated, isLoading } = useAuth();
  const isAdmin = user?.roleId === 1 || user?.role === "Admin";

  const [soaps, setSoaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();

  const numColumns = width >= 720 ? 2 : 1;

  useEffect(() => {
    (async () => {
      try {
        const soapData = await getAllSoaps();
        setSoaps(Array.isArray(soapData) ? soapData : []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const renderItem = ({ item }) => {
    const photo = getSoapPhotoById(item.soap_id);

    return (
      <Pressable
        onPress={() => router.push(`/soaps/${item.soap_id}`)}
        style={StyleSheet.flatten([styles.card, numColumns > 1 ? styles.cardGrid : null])}
      >
        {photo ? (
          <Image source={photo} style={styles.cardImage} resizeMode="cover" />
        ) : (
          <View style={styles.cardImagePlaceholder}>
            <Text style={styles.placeholderText}>No photo</Text>
          </View>
        )}

        <View style={styles.cardBody}>
          <Text style={styles.title}>{item.soap_name}</Text>

          {!!item.description && (
            <Text style={styles.description} numberOfLines={3}>
              {item.description}
            </Text>
          )}

          <View style={styles.metaRow}>
            <Text style={styles.cta}>View →</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <CustomScreen>
      <View style={styles.page}>
        <CustomText title="Soaps" />
        <Text style={styles.subtitle}>Tap a soap to view details.</Text>

        {!isLoading && isAuthenticated && isAdmin && (
          <Pressable
            onPress={() => router.push("/users/soaps/new")}
            style={styles.newBtn}
            accessibilityRole="button"
          >
            <Text style={styles.newBtnText}>+ New Soap</Text>
          </Pressable>
        )}

        <Spacer height={16} />

        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={soaps}
            key={numColumns}
            numColumns={numColumns}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.soap_id)}
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
    maxWidth: 900,
    paddingHorizontal: 16,
    paddingTop: 8
  },

  subtitle: {
    opacity: 0.75,
    marginTop: 6
  },

  newBtn: {
    marginTop: 12,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignSelf: "flex-start"
  },
  newBtnText: {
    fontWeight: "900"
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
    marginBottom: 12,
    backgroundColor: "#fff"
  },
  cardGrid: {
    flex: 1
  },

  cardImage: {
    width: "100%",
    height: 150
  },
  cardImagePlaceholder: {
    width: "100%",
    height: 150,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center"
  },
  placeholderText: {
    opacity: 0.6,
    fontWeight: "800"
  },

  cardBody: {
    padding: 14,
    gap: 8
  },

  title: {
    fontSize: 16,
    fontWeight: "900"
  },

  description: {
    opacity: 0.85,
    lineHeight: 20
  },

  metaRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  cta: {
    fontWeight: "800"
  }
});