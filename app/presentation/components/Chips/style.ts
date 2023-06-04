import { StyleSheet } from "react-native";
import Colors from "../../values/colors";

export default StyleSheet.create({
    containerMedium: {
        height: 27,

        backgroundColor: 'white'
    },
    containerLarge: {
        height: 37,
        backgroundColor: 'white'
    },
    defaultStyle: {
        borderRadius: 16,
        marginHorizontal: 8,
        alignItems: "center",
        flexDirection: "row"
    },
    contentText: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    leftIcon: {
        width: 20,
        height: 20,
        marginLeft: 8,
        tintColor: Colors.grayScale900
    }
});