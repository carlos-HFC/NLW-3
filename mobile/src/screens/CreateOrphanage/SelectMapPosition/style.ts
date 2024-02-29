import { Dimensions, StyleSheet } from "react-native";

import { THEME } from "@/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: "100%",
  },
  nextButton: {
    backgroundColor: THEME.COLORS.PRIMARY_500,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: THEME.FONT_FAMILY.EXTRA,
    fontSize: THEME.SIZES.BASE,
    color: THEME.COLORS.WHITE,
  }
});