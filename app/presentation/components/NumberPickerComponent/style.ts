import { StyleSheet } from "react-native";
import Colors from "../../values/colors";

export default StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: Colors.grayScale900,
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 12,
        alignItems: "center"
    },
    imagePlus: {
        width: 14,
        height: 14
    },
    imageMinus: {
        
    },
    numberText: {
        color: Colors.light,
        marginHorizontal: 12,
        fontSize: 16,
        fontWeight: "bold"
    }
});