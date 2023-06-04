import { StyleSheet } from "react-native";
import Colors from "../../values/colors";

export default StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },

    itemListContainer: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: Colors.grayScale800,
        borderRadius: 12,
        marginHorizontal: 4
    }
});