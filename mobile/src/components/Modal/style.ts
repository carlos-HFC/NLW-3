import { THEME } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  bodySuccess: {
    paddingHorizontal: 32,
    backgroundColor: THEME.COLORS.GREEN_500,
  },
  bodyDanger: {
    paddingHorizontal: 54,
    backgroundColor: THEME.COLORS.RED_500,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.COLORS.WHITE,
    width: 64,
    height: 64,
    borderRadius: 16
  },
  title: {
    marginTop: 32,
    marginBottom: 18,
    fontSize: 40,
    fontFamily: THEME.FONT_FAMILY.EXTRA,
    color: THEME.COLORS.WHITE,
    textAlign: "center"
  },
  description: {
    marginBottom: 24,
    fontSize: THEME.SIZES.XL,
    fontFamily: THEME.FONT_FAMILY.SEMI,
    color: THEME.COLORS.WHITE,
    textAlign: "center"
  },
  footer: {
    flexDirection: "row",
    gap: 8
  },
  button: {
    borderRadius: 20,
    width: 120,
    height: 56,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonSuccess: {
    backgroundColor: THEME.COLORS.GREEN_900,
  },
  buttonDanger: {
    backgroundColor: THEME.COLORS.RED_900,
  },
  cancel: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: THEME.COLORS.RED_900,
  },
  buttonText: {
    color: THEME.COLORS.WHITE,
    fontFamily: THEME.FONT_FAMILY.EXTRA,
    fontSize: THEME.SIZES.SM
  }
});