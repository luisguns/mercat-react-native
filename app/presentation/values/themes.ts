import { StyleSheet, TextStyle } from "react-native";
import Colors from "./colors";

export function screenLightWithoutHeader() {
    return {
        headerShown: false,
        contentStyle: {
            backgroundColor: Colors.grayScale050
        },
    };
} 

export function SubTitleH3(): TextStyle {
    return {
        fontWeight: "900",
        alignSelf: "center",
        fontSize: 20,
        marginBottom: 32
    };
} 

export function LabelHighlight(): TextStyle {
    return {
        fontWeight: "bold",
        fontSize: 14,
    };
} 