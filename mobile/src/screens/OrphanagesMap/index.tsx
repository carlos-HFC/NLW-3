import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View } from 'react-native';
import { RectButton } from "react-native-gesture-handler";
import MapView, { Marker, Callout } from 'react-native-maps';

import { DEFAULT_POSITION } from "@/constants";
import { api } from "@/services/api";
import { THEME } from "@/styles/theme";

import mapMarker from '@/images/map-marker.png';

import { styles } from "./style";

export function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  const navigation = useNavigation();

  useEffect(() => {
    api.get("/orphanages")
      .then(response => setOrphanages(response.data.orphanages));
  }, []);

  function handleNavigateToCreateOrphanage() {
    navigation.navigate("select-map-position");
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          loadingEnabled
          provider="google"
          style={styles.map}
          initialRegion={DEFAULT_POSITION}
        >
          <Marker
            icon={mapMarker}
            calloutAnchor={{
              x: 2.7,
              y: 0.8
            }}
            coordinate={{
              latitude: -23.4667111,
              longitude: -46.5923237,
            }}
          >
            <Callout
              tooltip
              onPress={void 0}
            >
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>Lar das meninas</Text>
              </View>
            </Callout>
          </Marker>
        </MapView>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>2 orfanatos encontrados</Text>

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