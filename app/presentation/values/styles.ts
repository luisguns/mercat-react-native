import { StyleSheet } from "react-native";
import Colors from "./colors";

export default StyleSheet.create({
    primaryInputText: {
        color: Colors.grayScale800,
        backgroundColor: Colors.grayScale050,
        alignSelf: "stretch",
        height: 50,
        borderColor: Colors.primaryDark,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        fontWeight: "500",
        marginTop: 8,
    },

    row: {
        flexDirection: "row",
        alignItems: "stretch",
    },

    cartValueLabelText: {
      fontSize: 14,
      color: Colors.light,
      opacity: 0.7
    },
    cartValueText: {
      fontSize: 18,
      fontWeight: "900",
      color: Colors.light
    },
    cartQuantityItemsText: {
      fontSize: 14,
      color: Colors.light,
      fontWeight: "700"
    }, 
});
