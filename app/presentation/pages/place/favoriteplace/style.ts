import { StyleSheet } from "react-native";
import { SubTitleH3 } from "../../../values/themes";

export default StyleSheet.create({
    container: { flex: 1, justifyContent: "center" },
    title: SubTitleH3(),
    emptyFavoriteContainer: { 
        flex: 1,
        marginTop: "45%",
        alignItems: "center",
    },
    imageEmpty: {
        height: "30%",
        resizeMode: "contain"
    },
    emptyText: {
        marginTop: 18
    }
});
