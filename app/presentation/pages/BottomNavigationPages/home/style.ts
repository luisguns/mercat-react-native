import { StyleSheet } from "react-native";
import Colors from "../../../values/colors";

export default StyleSheet.create({
    container: {
        flex: 1
    },

    topSideContainer: {
        backgroundColor: Colors.grayScale600,
        flex: 1
    }, 
    bottomSideContainer: {
        backgroundColor: Colors.light,
        height: "50%",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },

    square: {
        backgroundColor: 'blue',
        width: 100,
        height: 100
    }

});