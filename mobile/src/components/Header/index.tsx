import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Text, View } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

import { Modal } from "../Modal";

import { THEME } from "@/styles/theme";

import { styles } from "./style";

interface HeaderProps {
  title: string;
  showCancel?: boolean;
}

export function Header({ title, showCancel = true }: HeaderProps) {
  const navigation = useNavigation();

  const [confirmNavigation, setConfirmNavigation] = useState(false);

  function handleConfirmNavigationToHomeScreen() {
    setConfirmNavigation(false);
    navigation.navigate("orphanages-map");
  }

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather
          name="arrow-left"
          size={THEME.SIZES["2XL"]}
          color={THEME.COLORS.PRIMARY_500}
        />
      </BorderlessButton>

      <Text style={styles.title}>
        {title}
      </Text>

      {showCancel
        ? (
          <BorderlessButton onPress={() => setConfirmNavigation(true)}>
            <Feather
              name="x"
              size={THEME.SIZES["2XL"]}
              color={THEME.COLORS.RED_500}
            />
          </BorderlessButton>
        ) : (
          <View style={{ width: THEME.SIZES["2XL"] }} />
        )}

      <Modal
        visible={confirmNavigation}
        variant="danger"
        onConfirm={handleConfirmNavigationToHomeScreen}
        onRequestClose={() => setConfirmNavigation(false)}
      />
    </View>
  );
}