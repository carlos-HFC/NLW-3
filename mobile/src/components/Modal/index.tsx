import { Feather } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";
import { Image, Modal as ModalContainer, ModalProps as MProps, Text, TouchableOpacity, View } from "react-native";

import successImg from '@/images/success.png';
import { THEME } from "@/styles/theme";

import { styles } from "./style";

interface ModalProps extends MProps {
  variant?: "success" | "danger";
  onConfirm?(): void;
}

function selectVariant(variant?: ModalProps['variant']) {
  switch (variant) {
    case "danger":
      return {
        containerStyle: styles.bodyDanger,
        statusBar: THEME.COLORS.RED_500,
        titleText: "Cancelar cadastro",
        image: (
          <View style={styles.icon}>
            <Feather name="x" size={32} color={THEME.COLORS.RED_500} />
          </View>
        ),
        description: "Tem certeza que quer \n cancelar esse cadastro?",
        buttonStyle: styles.buttonDanger,
        buttonText: "Sim"
      };
    case "success":
    default:
      return {
        containerStyle: styles.bodySuccess,
        statusBar: THEME.COLORS.GREEN_500,
        titleText: "Ebaaa!",
        image: <Image source={successImg} />,
        description: "O cadastro deu certo e foi enviado ao administrador para ser aprovado. Agora é só esperar 🙂",
        buttonStyle: styles.buttonSuccess,
        buttonText: "Ok"
      };
  }
}

export function Modal(props: ModalProps) {
  const variant = selectVariant(props.variant);

  return (
    <ModalContainer {...props}>
      <StatusBar backgroundColor={variant.statusBar} />
      <View style={[styles.container, variant.containerStyle]}>
        {variant.image}

        <Text style={[styles.title, props.variant === 'danger' && { fontSize: 32 }]}>{variant.titleText}</Text>
        <Text style={styles.description}>
          {variant.description}
        </Text>

        <View style={styles.footer}>
          {props.variant === 'danger' && (
            <TouchableOpacity
              activeOpacity={.5}
              style={[styles.button, styles.cancel]}
              onPress={props.onRequestClose}
            >
              <Text style={styles.buttonText}>
                Não
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            activeOpacity={.5}
            style={[styles.button, variant.buttonStyle]}
            onPress={props.onConfirm}
          >
            <Text style={styles.buttonText}>
              {variant.buttonText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalContainer>
  );
}