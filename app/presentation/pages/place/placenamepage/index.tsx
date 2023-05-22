import {
  TextInput,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
} from "react-native";
import styles from "./style";
import {useNavigation } from "@react-navigation/native";
import Colors from "../../../values/colors";
import { StackProps } from "../../pageconfig/screenprops";
import { useState } from "react";

export default function PlaceNamePage() {
  const [myNamePlace, setNamePlace] = useState<string>('')
  const navigations = useNavigation<StackProps>();
  return (
    <View>
      <StatusBar barStyle="light-content" backgroundColor={"#ffffff"} />
      <View style={styles.container}>
        <TextInput
          style={styles.imputText}
          selectionColor={Colors.primaryDark}
          placeholder="Nome do local"
          onChangeText={(text) => {
            setNamePlace(text)
          }}
        />
        <TouchableOpacity style={styles.buttonStyle} onPress={() => { navigateToAdrresPlace();}}>
          <Text style={styles.textButtonStyle}> Proximo </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  function navigateToAdrresPlace() {
    if (myNamePlace) {
      navigations.navigate("PlaceAddress", { placeName: myNamePlace });
    } else {
      alert("Preencha o campo de nome")
    }
  }
}
