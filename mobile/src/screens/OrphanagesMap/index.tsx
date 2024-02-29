import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Text, View } from 'react-native';
import { RectButton } from "react-native-gesture-handler";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';

import { DEFAULT_POSITION } from "@/constants";
import { api } from "@/services/api";
import { THEME } from "@/styles/theme";

import mapMarker from '@/images/map-marker.png';

import { styles } from "./style";

export function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  const navigation = useNavigation();

  useFocusEffect(useCallback(() => {
    api.get("/orphanages")
      .then(response => setOrphanages(response.data.orphanages));
  }, []));

  function handleNavigateToOrphanageDetails(id: string) {
    navigation.navigate("orphanage-details", { id });
  }

  function handleNavigateToCreateOrphanage() {
    navigation.navigate("select-map-position");
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        zoomControlEnabled
        initialRegion={DEFAULT_POSITION}
      >
        {orphanages.map(item => (
          <Marker
            key={item.id}
            icon={mapMarker}
            calloutAnchor={{
              x: 2.7,
              y: 0.8
            }}
            coordinate={{
              latitude: Number(item.latitude),
              longitude: Number(item.longitude),
            }}
          >
            <Callout
              tooltip
              onPress={() => handleNavigateToOrphanageDetails(item.id)}
            >
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{item.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>

        <RectButton
          style={styles.createOrphanageButton}
          onPress={handleNavigateToCreateOrphanage}
        >
          <Feather
            name="plus"
            size={THEME.SIZES.LG}
            color={THEME.COLORS.WHITE}
          />
        </RectButton>
      </View>
    </View>
  );
}