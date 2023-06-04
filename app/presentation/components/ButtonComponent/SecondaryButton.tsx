import {
    TouchableOpacity,
    Text,
    StyleProp,
    ViewStyle,
    TextStyle,
    View,
    ActivityIndicator,
} from "react-native";
import styles from "./style";
import { useState } from "react";
import Colors from "../../values/colors";

export default function SecondaryButton(props: {
    text: string;
    loading?: boolean;
    seOnClick?: () => undefined;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    size: "Small" | "Medium" | "Large";
}) {
    function createComponent() {
        if (props.loading) {
          return (
            <View style={[styles.secondaryButton, getSize(), props.style]}>
                <ActivityIndicator size={"small"} color={Colors.light} style={{position: "absolute"}}/>
                <Text style={{color: 'rgba(0,0,0,0)'}}>
                    {" "}
                    {props.text}{" "}
                </Text>
            </View>
        );
        }
        return (
            <TouchableOpacity
                style={[styles.secondaryButton, getSize(), props.style]}
                onPress={() => {
                    if (props.seOnClick) {
                        props.seOnClick();
                    }
                }}
            >
                <Text style={[getTextSize(), props.textStyle]}>
                    {" "}
                    {props.text}{" "}
                </Text>
            </TouchableOpacity>
        );
    }

    return createComponent()

    function getSize(): StyleProp<ViewStyle> {
        if (props.size === "Small") {
            return {
                paddingHorizontal: 8,
                height: 32,
            };
        }
        if (props.size === "Medium") {
            return {
                paddingHorizontal: 14,
                height: 38,
            };
        }

        if (props.size === "Large") {
            return {
                paddingHorizontal: 18,
                height: 41,
            };
        }
    }

    function getTextSize(): StyleProp<TextStyle> {
        if (props.size === "Small") {
            return {
                fontSize: 10,
                color: Colors.light,
            };
        }
        if (props.size === "Medium") {
            return {
                fontSize: 12,
                color: Colors.light,
            };
        }

        if (props.size === "Large") {
            return {
                fontSize: 14,
                color: Colors.light,
            };
        }
    }
}
