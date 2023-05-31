import { StyleProp, View, ViewStyle } from "react-native";
import styles from "./style";

type PrimaryCardProps = {
    leftElement?: JSX.Element;
    style?: StyleProp<ViewStyle>;
};
export default function PrimaryCardComponent(props: PrimaryCardProps) {
    return (
        <View style={[styles.container, props.style]}>
            <View >
                {props?.leftElement}
            </View>
        </View>
    );

}
