import { Dimensions, StyleSheet } from "react-native";

import { THEME } from "@/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagesContainer: {
    height: 240,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 240,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 24,
  },
  title: {
    color: '#4D6F80',
    fontSize: 30,
    fontFamily: THEME.FONT_FAMILY.BOLD,
  },
  description: {
    fontFamily: THEME.FONT_FAMILY.SEMI,
    color: THEME.COLORS.TEAL_400,
    lineHeight: 24,
    marginTop: 16,
  },
  mapContainer: {
    borderRadius: 20,
    borderWidth: 1.2,
    borderColor: THEME.COLORS.PRIMARY_200,
    marginTop: 40,
    backgroundColor: THEME.COLORS.PRIMARY_50,
  },
  mapStyle: {
    width: "100%",
    height: 150,
  },
  routesContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routesText: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    color: THEME.COLORS.PRIMARY_600
  },
  separator: {
    height: 0.8,
    width: '100%',
    backgroundColor: THEME.COLORS.GRAY_200,
    marginVertical: 40,
  },
  scheduleContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  contactButton: {
    backgroundColor: THEME.COLORS.GREEN_600,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 40,
  },
  contactButtonText: {
    fontFamily: THEME.FONT_FAMILY.EXTRA,
    color: THEME.COLORS.WHITE,
    fontSize: THEME.SIZES.BASE,
    marginLeft: 16,
  }
});