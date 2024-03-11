import { FontAwesome } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, View, ScrollView, Text, TouchableOpacity, Linking } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { RectButton } from 'react-native-gesture-handler';

import { Loading } from "@/components/Loading";
import { ScheduleItem } from "@/components/ScheduleItem";

import { DEFAULT_POSITION } from "@/constants";
import { api } from "@/services/api";
import { THEME } from "@/styles/theme";

import mapMarker from '@/images/map-marker.png';

import { styles } from "./style";

export function OrphanageDetails() {
  const route = useRoute();
  const params = route.params as ReactNavigation.RootParamList['orphanage-details'];

  const [orphanage, setOrphanage] = useState<Orphanage>();

  useEffect(() => {
    api.get(`/orphanages/${params.id}`)
      .then(response => setOrphanage(response.data.orphanage));
  }, [params.id]);

  if (!orphanage) {
    return (
      <Loading />
    );
  }

  function handleOpenGoogleMaps() {
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`);
  }

  function handleOpenWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${orphanage.whatsapp}`);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {orphanage.images.map(item => (
            <Image
              key={item.id}
              style={styles.image}
              source={{ uri: item.url }}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{orphanage.name}</Text>
        <Text style={styles.description}>
          {orphanage.about}
        </Text>

        <View style={styles.mapContainer}>
          <MapView
            initialRegion={{
              ...DEFAULT_POSITION,
              latitude: Number(orphanage.latitude),
              longitude: Number(orphanage.longitude),
            }}
            provider={PROVIDER_GOOGLE}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}
          >
            <Marker
              icon={mapMarker}
              coordinate={{
                ...DEFAULT_POSITION,
                latitude: Number(orphanage.latitude),
                longitude: Number(orphanage.longitude),
              }}
            />
          </MapView>

          <TouchableOpacity
            style={styles.routesContainer}
            onPress={handleOpenGoogleMaps}
          >
            <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        <Text style={styles.title}>Instruções para visita</Text>
        <Text style={styles.description}>{orphanage.instructions}</Text>

        <View style={styles.scheduleContainer}>
          <ScheduleItem icon="clock">
            Segunda à sexta {orphanage.openingHours}
          </ScheduleItem>

          <ScheduleItem
            icon="info"
            variant={orphanage.openOnWeekends ? "green" : "red"}
          >
            {orphanage.openOnWeekends
              ? "Atendemos fim de semana"
              : "Não atendemos fim de semana"}
          </ScheduleItem>
        </View>

        <RectButton
          style={styles.contactButton}
          onPress={handleOpenWhatsapp}
        >
          <FontAwesome
            name="whatsapp"
            size={THEME.SIZES["2XL"]}
            color={THEME.COLORS.WHITE}
          />
          <Text style={styles.contactButtonText}>Entrar em contato</Text>
        </RectButton>
      </View>
    </ScrollView>
  );

}