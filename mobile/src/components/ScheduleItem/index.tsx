import { Feather } from '@expo/vector-icons';
import { PropsWithChildren } from "react";
import { Text, View } from "react-native";

import { THEME } from "@/styles/theme";

import { styles } from "./style";

interface ScheduleItemProps extends PropsWithChildren {
  variant?: "green" | "red";
  icon: "info" | "clock";
}

function selectVariant(variant?: ScheduleItemProps['variant']) {
  switch (variant) {
    case "green":
      return {
        iconColor: THEME.COLORS.GREEN_500,
        containerStyle: styles.itemGreen,
        textStyle: styles.textGreen
      };
    case "red":
      return {
        iconColor: THEME.COLORS.RED_500,
        containerStyle: styles.itemRed,
        textStyle: styles.textRed
      };
    default:
      return {
        iconColor: THEME.COLORS.PRIMARY_400,
        containerStyle: styles.itemBlue,
        textStyle: styles.textBlue
      };
  }
}

export function ScheduleItem(props: ScheduleItemProps) {
  const variant = selectVariant(props.variant);

  return (
    <View style={[styles.item, variant.containerStyle]}>
      <Feather
        name={props.icon}
        size={40}
        color={variant.iconColor}
      />
      <Text style={[styles.text, variant.textStyle]}>
        {props.children}
      </Text>
    </View>
  );
}