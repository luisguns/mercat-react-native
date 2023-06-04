import { TouchableOpacity, Text, StyleProp, ViewStyle } from "react-native";
import styles from "./style";

export default function PrimaryButton(props: {
  text: string;
  seOnClick?: () => undefined;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <TouchableOpacity
      style={[styles.primaryButton, props.style]}
      onPress={() => {
        if (props.seOnClick) {
          props.seOnClick();
        }
      }}
    >
      <Text style={styles.textPrimaryButton}> {props.text} </Text>
    </TouchableOpacity>
  );
}
