import {
  View,
  Image,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import styles from "./style";

export default function CardListComponent(props: {
  listStyle?: StyleProp<ViewStyle>;
  itemClickedByIndex: (index: Number) => undefined
}) {
  return (
    <View style={[styles.mainContainer, props.listStyle]}>
      <TouchableOpacity onPress={() => props?.itemClickedByIndex(0)}>
        <View style={[styles.itemListContainer]}>
          <Image source={require("../../../assets/facebook_logo.png")} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props?.itemClickedByIndex(1)}>
        <View style={[styles.itemListContainer]}>
          <Image source={require("../../../assets/google_logo.png")} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props?.itemClickedByIndex(2)}>
        <View style={[styles.itemListContainer]}>
          <Image source={require("../../../assets/apple_logo.png")} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
