import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';

import { DEFAULT_POSITION } from "@/constants";

import mapMarker from '@/images/map-marker.png';

import { styles } from './style';

const INITIAL_POSITION = {
  latitude: 0,
  longitude: 0
};

export function SelectMapPosition() {
  const navigation = useNavigation();

  const [position, setPosition] = useState(INITIAL_POSITION);

  function handleSelectMapPosition(event: MapPressEvent) {
    setPosition(event.nativeEvent.coordinate);
  }

  function handleNextStep() {
    navigation.navigate('orphanage-data', { position });
  }

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={DEFAULT_POSITION}
        onPress={handleSelectMapPosition}
        style={styles.mapStyle}
      >
        {position.latitude !== 0 && (
          <Marker
            icon={mapMarker}
            coordinate={position}
          />
        )}
      </MapView>

      {position.latitude !== 0 && (
        <RectButton
          style={styles.nextButton}
          onPress={handleNextStep}
        >
          <Text style={styles.nextButtonText}>
            Próximo
          </Text>
        </RectButton>
      )}
    </View>
  );
}