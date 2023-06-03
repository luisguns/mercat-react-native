import { StyleSheet } from "react-native";
import Colors from "../../../values/colors";

export default StyleSheet.create({
    container: {
        flex: 1
    },

    topSideContainer: {
        backgroundColor: Colors.grayScale600,
        paddingBottom: 35,
        flex: 1,
    }, 
    bottomSideContainer: {
        backgroundColor: Colors.light,
        borderTopLeftRadius: 16,
        flex: 1,
        borderTopRightRadius: 16
    },

    square: {
        backgroundColor: 'blue',
        width: 100,
        height: 100
    }

});