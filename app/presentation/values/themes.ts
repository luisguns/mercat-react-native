import { StyleSheet } from "react-native";
import Colors from "./colors";

export function screenLightWithoutHeader() {
    return {
        headerShown: false,
        contentStyle: {
            backgroundColor: Colors.light
        }
    };
} 