import { THEME } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: THEME.COLORS.GRAY_100,
    borderBottomWidth: 1,
    borderColor: THEME.COLORS.GRAY_200,
    paddingTop: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontFamily: THEME.FONT_FAMILY.SEMI,
    color: THEME.COLORS.GRAY_500,
    fontSize: THEME.SIZES.BASE
  }
});