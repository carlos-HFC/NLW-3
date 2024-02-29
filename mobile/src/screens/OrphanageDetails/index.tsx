import { Feather, FontAwesome } from '@expo/vector-icons';
import { Image, View, ScrollView, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { RectButton } from 'react-native-gesture-handler';

import { DEFAULT_POSITION } from "@/constants";
import { THEME } from "@/styles/theme";

import mapMarker from '@/images/map-marker.png';

import { styles } from "./style";

export function OrphanageDetails() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
        <ScrollView
          horizontal
          pagingEnabled
        >
          <Image
            style={styles.image}
            source={{ uri: 'https://fmnova.com.br/images/noticias/safe_image.jpg' }}
          />
          <Image
            style={styles.image}
            source={{ uri: 'https://fmnova.com.br/images/noticias/safe_image.jpg' }}
          />
          <Image
            style={styles.image}
            source={{ uri: 'https://fmnova.com.br/images/noticias/safe_image.jpg' }}
          />
        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>Orf. Esperança</Text>
        <Text style={styles.description}>
          Presta assistência a crianças de 06 a 15 anos que se encontre em situação de risco e/ou vulnerabilidade social.
        </Text>

        <View style={styles.mapContainer}>
          <MapView
            initialRegion={DEFAULT_POSITION}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}
          >
            <Marker
              icon={mapMarker}
              coordinate={DEFAULT_POSITION}
            />
          </MapView>

          <View style={styles.routesContainer}>
            <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
          </View>
        </View>

        <View style={styles.separator} />

        <Text style={styles.title}>Instruções para visita</Text>
        <Text style={styles.description}>Venha como se sentir a vontade e traga muito amor e paciência para dar.</Text>

        <View style={styles.scheduleContainer}>
          <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
            <Feather
              name="clock"
              size={40}
              color={THEME.COLORS.PRIMARY_400}
            />
            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>Segunda à Sexta 8h às 18h</Text>
          </View>

          <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
            <Feather
              name="info"
              size={40}
              color={THEME.COLORS.GREEN_400}
            />
            <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>Atendemos fim de semana</Text>
          </View>
        </View>

        <RectButton
          style={styles.contactButton}
          onPress={() => {}}
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