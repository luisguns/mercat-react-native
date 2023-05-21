import {
  TextInput,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  Keyboard,
} from "react-native";
import styles from "./style";
import { useNavigation, useRoute } from "@react-navigation/native";
import Colors from "../../../values/colors";
import { useState } from "react";
import { StackProps } from "../../pageconfig/screenprops";
import { Resource, SuccessResource } from "../../../../data/helper/Resource";
import { PlaceModel } from "../../../../domain/models/placemodel";

export default function PlaceAddressPage() {
  const route = useRoute();
  const [addressPlace, setAddressPlace] = useState<string>();
  const placename = (route.params as { placeName: String }).placeName;
  const navigations = useNavigation<StackProps>();
  return (
    <View>
      <StatusBar barStyle="light-content" backgroundColor={"#ffffff"} />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={[styles.textInline, { alignSelf: "center" }]}>
            <Text style={styles.textNamePlace}>Nome: </Text>
            <Text style={styles.textNameValuePlace}>{placename}</Text>
          </View>
          <TextInput
            style={styles.individualInputText}
            selectionColor={Colors.primaryDark}
            placeholder="Endereço do local"
          />

          <TextInput
            style={styles.individualInputText}
            selectionColor={Colors.primaryDark}
            placeholder="Bairro"
          />

          <View style={styles.inlineFormsImputContainer}>
            <TextInput
              style={styles.inlineFormsImputItem}
              selectionColor={Colors.primaryDark}
              placeholder="Cidade"
            />

            <TextInput
              style={styles.inlineFormsImputItem}
              selectionColor={Colors.primaryDark}
              placeholder="Estado"
            />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              Keyboard.dismiss();
              navigations.navigate("PlaceAddresModal");
            }}
          >
            <Text style={styles.textButtonStyle}> Finalizar </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
