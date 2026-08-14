import { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";

import CustomScreen from "../../../components/CustomScreen";
import CustomText from "../../../components/CustomText";
import Spacer from "../../../components/Spacer";

import { getSoapById } from "../../../api/soaps";
import { getSoapPhotoById } from "../../../data/soapPhotos";

export default function SoapDetailScreen() {
  const { id } = useLocalSearchParams();
  const soapId = useMemo(() => Number(id), [id]);

  const [soap, setSoap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getSoapById(soapId);
        setSoap(data || null);
      } finally {
        setLoading(false);
      }
    })();
  }, [soapId]);

  const photo = soap ? getSoapPhotoById(soap.soap_id) : null;

  return (
    <CustomScreen>
      <View style={styles.page}>
        {loading ? (
          <ActivityIndicator />
        ) : soap ? (
          <>
            {photo ? (
              <Image source={photo} style={styles.heroImage} resizeMode="cover" />
            ) : (
              <View style={styles.heroPlaceholder}>
                <Text style={styles.placeholderText}>No photo yet</Text>
              </View>
            )}

            <Spacer height={12} />

            <CustomText title={soap.soap_name} />
            <Spacer height={12} />

            {!!soap.description && <Text style={styles.description}>{soap.description}</Text>}
          </>
        ) : (
          <>
            <CustomText title="Not found" />
            <Spacer height={12} />
            <Text style={styles.meta}>No soap found with id {String(id)}.</Text>
          </>
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
    paddingTop: 8,
    paddingBottom: 40
  },

  heroImage: {
    width: "100%",
    height: 240,
    borderRadius: 16
  },
  heroPlaceholder: {
    width: "100%",
    height: 240,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e3e3e3",
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center"
  },
  placeholderText: {
    opacity: 0.6,
    fontWeight: "800"
  },

  description: {
    opacity: 0.9,
    lineHeight: 22,
    fontSize: 15
  },

  meta: {
    marginTop: 6,
    opacity: 0.75,
    fontWeight: "700"
  }
});