import { StyleSheet } from "react-native";

export default StyleSheet.create({
    mainContainer: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: '20%',
    },
    topSide: {
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "stretch"
    },
    footerCriarConta: {
        flexDirection: "row",
        marginTop: "20%"
    },
    logoImage: {
        width: 118,
        height: 118,
    },
    inputTextStyle: {
        marginHorizontal: 15
    },
    footerTextNormal: {
        fontSize: 12
    },
    footerTextHighlight: {
        fontSize: 12,
        fontWeight: "900"
    },
});