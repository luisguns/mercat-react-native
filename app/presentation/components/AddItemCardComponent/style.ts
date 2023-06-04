import { StyleSheet } from "react-native";
import Colors from "../../values/colors";

export default StyleSheet.create({
    container: {
        alignContent: "stretch",
        borderRadius: 12,
        backgroundColor: Colors.grayScale050,
        padding: 12,
    },
    nameTextInput: {
        height: 41
    },
    valueTextInput: {
        width: "55%",
        height: 41
    }
});