import { StyleSheet } from "react-native";
import Colors from "../../values/colors";

export default StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        position: "absolute",
        bottom: 27,
        right: 22,
        backgroundColor: Colors.primaryDark,
        padding: 20,
    },
    title: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
    },
    image: {
        width: 14,
        height: 14
    }
});