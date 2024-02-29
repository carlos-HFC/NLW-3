import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { ScrollView, View, Switch, Text, TextInput, TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { THEME } from "@/styles/theme";

import { styles } from './style';

interface OrphanageDataRouteParams {
  position: {
    latitude: number;
    longitude: number;
  };
}

export function OrphanageData() {
  const route = useRoute();
  const navigation = useNavigation();

  const [open_on_weekends, setOpenOnWeekends] = useState(false);

  const params = route.params as ReactNavigation.RootParamList['orphanage-data'];
  const position = params.position;

  function handleCreateOrphanage() {
    // todo
  }

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      alert('Eita! Precisamos de acesso às suas fotos...');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}
    >
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
      />

      <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        style={styles.input}
      />

      <Text style={styles.label}>Fotos</Text>
      <TouchableOpacity
        style={styles.imagesInput}
        onPress={handleSelectImages}
      >
        <Feather
          name="plus"
          size={THEME.SIZES["2XL"]}
          color={THEME.COLORS.PRIMARY_500}
        />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        style={styles.input}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch
          thumbColor={THEME.COLORS.WHITE}
          trackColor={{
            false: THEME.COLORS.GRAY_300,
            true: THEME.COLORS.GREEN_500
          }}
          value={open_on_weekends}
          onValueChange={setOpenOnWeekends}
        />
      </View>

      <RectButton
        style={styles.nextButton}
        onPress={handleCreateOrphanage}
      >
        <Text style={styles.nextButtonText}>
          Cadastrar
        </Text>
      </RectButton>
    </ScrollView>
  );
}