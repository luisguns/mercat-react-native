import { StyleSheet } from "react-native";
import Colors from "../../../values/colors";

export default StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: Colors.grayScale050,
        paddingHorizontal: 17
    },
    imputText: {
        color: Colors.grayScale800,
        backgroundColor: Colors.grayScale050,
        alignSelf: 'stretch',
        height: 50,
        borderColor: Colors.primaryDark,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        fontWeight: "500"
        
    }, 
    buttonStyle: {
        backgroundColor: Colors.primary,
        width: 226,
        height: 55,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        marginBottom: -100
    },
    textButtonStyle: {
        fontSize: 16,
        color: Colors.light,
        fontWeight: "700"
    },
    titleStyle: {
        alignContent: "center",
        justifyContent: "center",
        alignSelf: 'stretch',
        textAlign: "center",
        fontSize: 15,
        color: Colors.secondary,
        fontWeight: "700"
    }
});