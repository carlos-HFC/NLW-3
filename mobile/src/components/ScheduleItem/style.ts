import { StyleSheet } from "react-native";

import { THEME } from "@/styles/theme";

export const styles = StyleSheet.create({
  item: {
    width: '48%',
    padding: 20,
    borderWidth: 1,
    borderRadius: 20,
  },
  itemBlue: {
    backgroundColor: THEME.COLORS.PRIMARY_50,
    borderColor: THEME.COLORS.PRIMARY_200,
  },
  itemGreen: {
    backgroundColor: THEME.COLORS.GREEN_100,
    borderColor: THEME.COLORS.GREEN_200,
  },
  itemRed: {
    backgroundColor: THEME.COLORS.RED_100,
    borderColor: THEME.COLORS.RED_200,
  },
  text: {
    fontFamily: THEME.FONT_FAMILY.SEMI,
    fontSize: THEME.SIZES.BASE,
    lineHeight: 24,
    marginTop: 20,
  },
  textBlue: {
    color: THEME.COLORS.TEAL_400
  },
  textGreen: {
    color: THEME.COLORS.GREEN_500
  },
  textRed: {
    color: THEME.COLORS.RED_500
  },
});