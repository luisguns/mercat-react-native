import { StyleSheet } from "react-native";
import Colors from "../../../values/colors";

export default StyleSheet.create({
    container: {
        flex: 1
    },

    topSideContainer: {
        backgroundColor: Colors.grayScale600,
        paddingBottom: 35
    }, 
    bottomSideContainer: {
        backgroundColor: Colors.light,
        flex: 1,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },

    square: {
        backgroundColor: 'blue',
        width: 100,
        height: 100
    }

});