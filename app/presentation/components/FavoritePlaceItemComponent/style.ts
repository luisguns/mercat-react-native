import { StyleSheet } from "react-native";
import Colors from "../../values/colors";

export default StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 1,
        alignContent: "stretch",
        justifyContent: "space-between",
        height: 70,
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.grayScale800,
        marginHorizontal: 24,
        borderRadius: 12

    },
    imageLogo: {
        width: 28,
        height: 28,
        marginStart: 23
        
    },
    textContent: {
        flex: 1,
        marginStart: 14
    },
    imageEnd: {
        width: 18,
        height: 18,
        marginEnd: 18
    },

    textTitle: {
        fontSize: 14,
        fontWeight: "900"
    },

    textDesc: {
        fontSize: 12,
        fontWeight: "500"
    },
});