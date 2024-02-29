import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { ScrollView, View, Switch, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { api } from "@/services/api";
import { THEME } from "@/styles/theme";

import { styles } from './style';

const INITIAL_STATE_FORM = {
  name: "",
  about: "",
  instructions: "",
  openingHours: "",
  openOnWeekends: true,
  images: [] as ImagePicker.ImagePickerAsset[]
};

export function OrphanageData() {
  const route = useRoute();
  const navigation = useNavigation();

  const [data, setData] = useState(INITIAL_STATE_FORM);

  const { position } = route.params as ReactNavigation.RootParamList['orphanage-data'];

  async function handleCreateOrphanage() {
    const formData = new FormData();

    const keys = Object.entries(data);

    for (const [key, value] of keys) {
      if (typeof value === 'string' || typeof value === 'boolean') {
        formData.append(key, String(value));
      } else {
        data.images.forEach(item => {
          formData.append("images", {
            type: item.mimeType,
            uri: item.uri,
            name: item.fileName
          } as any);
        });
      }
    }

    formData.append("latitude", String(position.latitude));
    formData.append("longitude", String(position.longitude));

    try {
      await api.post('/orphanages', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      navigation.navigate("orphanages-map");
    } catch (error) {
      Alert.alert("Oopss...!", "Houve um erro ao cadastrar o orfanato");
    }
  }

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      return alert('Eita! Precisamos de acesso às suas fotos...');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
    });

    if (result.canceled) return;

    const { assets } = result;

    setData(prev => ({
      ...prev,
      images: [
        ...prev.images,
        ...assets
      ]
    }));
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
        value={data.name}
        onChangeText={name => setData(prev => ({ ...prev, name }))}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={data.about}
        onChangeText={about => setData(prev => ({ ...prev, about }))}
      />

      {/* <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        style={styles.input}
      /> */}

      <Text style={styles.label}>Fotos</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.uploadedImagesContainer}
      >
        {data.images?.map(item => (
          <Image
            key={item.uri}
            source={{ uri: item.uri }}
            style={styles.uploadedImage}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.imagesInput}
        onPress={handleSelectImages}
        disabled={data.images.length >= 6}
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
        value={data.instructions}
        onChangeText={instructions => setData(prev => ({ ...prev, instructions }))}
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        style={styles.input}
        value={data.openingHours}
        onChangeText={openingHours => setData(prev => ({ ...prev, openingHours }))}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch
          thumbColor={THEME.COLORS.WHITE}
          trackColor={{
            false: THEME.COLORS.GRAY_300,
            true: THEME.COLORS.GREEN_500
          }}
          value={data.openOnWeekends}
          onValueChange={openOnWeekends => setData(prev => ({ ...prev, openOnWeekends }))}
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