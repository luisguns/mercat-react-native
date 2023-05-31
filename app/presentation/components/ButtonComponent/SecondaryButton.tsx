import { TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle } from "react-native";
import styles from "./style";

export default function SecondaryButton(props: {
  text: string;
  seOnClick?: () => undefined;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  size: "Small" | "Medium" | "Large"
}) {
  return (
    <TouchableOpacity
      style={[styles.secondaryButton, getSize() , props.style]}
      onPress={() => {
        if (props.seOnClick) {
          props.seOnClick();
        }
      }}
    >
      <Text style={[styles.textPrimaryButton, props.textStyle]}> {props.text} </Text>
    </TouchableOpacity>
  );

  function getSize(): StyleProp<ViewStyle> {
    if( props.size === "Small"){
        return { 
          padding: 8
      };
    }
    if( props.size === "Medium"){
        return { 
          paddingVertical: 14
      };
    }

    if( props.size === "Large"){
        return { 
          paddingVertical: 18
      };
    }
  }
}

