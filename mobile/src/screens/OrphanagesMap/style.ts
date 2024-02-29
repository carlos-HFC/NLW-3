import { Dimensions, StyleSheet } from "react-native";

import { THEME } from "@/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    position: "relative"
  },
  map: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255,255,255,.8)",
    borderRadius: 16,
    justifyContent: "center"
  },
  calloutText: {
    color: THEME.COLORS.PRIMARY_600,
    fontSize: THEME.SIZES.SM,
    fontFamily: THEME.FONT_FAMILY.BOLD
  },
  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: THEME.COLORS.WHITE,
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3
  },
  footerText: {
    color: THEME.COLORS.GRAY_500,
    fontFamily: THEME.FONT_FAMILY.BOLD
  },
  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: THEME.COLORS.PRIMARY_500,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});
