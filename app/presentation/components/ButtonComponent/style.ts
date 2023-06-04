import { StyleSheet } from "react-native";
import Colors from "../../values/colors";

export default StyleSheet.create({
    primaryButton: {
        backgroundColor: Colors.primary,
        height: 55,
        alignItems : "center",
        justifyContent: "center",
        alignSelf: 'stretch',
        borderRadius: 100,
    },

    secondaryButton: {
        backgroundColor: Colors.primaryDark,
        alignItems : "center",
        justifyContent: "center",
        alignSelf: 'stretch',
        borderRadius: 10,
    },
    textPrimaryButton: {
        color: '#fff',
    }
});