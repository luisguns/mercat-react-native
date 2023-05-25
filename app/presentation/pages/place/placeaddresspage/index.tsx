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
import CheckBox from "@react-native-community/checkbox";
import { auth } from "../../../../config/firebaseconfig";

const user = auth().currentUser
export default function PlaceAddressPage() {
  const route = useRoute();
  const [address, setAddress] = useState<string>();
  const [addressBairro, setAddressBairo] = useState<string>();
  const [addressCidade, setAddressCidade] = useState<string>();
  const [addresEstado, setAddresEstado] = useState<string>();
  const [toggleCheckBox, setToggleCheckBox] = useState<boolean>();
  const placename = (route.params as { placeName: String }).placeName;
  const navigations = useNavigation<StackProps>();


  function createAddresPlaceModel(): PlaceModel | undefined {
    if ( !address || !addressBairro || !addressCidade ||!addresEstado ){
      alert("Preencha todos os campos")
      return
    } else {
      return new PlaceModel(placename.toString(),address,addressBairro,addressCidade,addresEstado, toggleCheckBox)
    }
  }


  return (
    <View>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.grayScale050} />
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
            onChangeText={(text) => {
              setAddress(text)
            }}
          />

          <TextInput
            style={styles.individualInputText}
            selectionColor={Colors.primaryDark}
            placeholder="Bairro"
            onChangeText={(text) => {
              setAddressBairo(text)
            }}
          />

          <View style={styles.inlineFormsImputContainer}>
            <TextInput
              style={styles.inlineFormsImputItem}
              selectionColor={Colors.primaryDark}
              placeholder="Cidade"
              onChangeText={(text) => {
                setAddressCidade(text)
              }}
            />

            <TextInput
              style={styles.inlineFormsImputItem}
              selectionColor={Colors.primaryDark}
              placeholder="Estado"
              onChangeText={(text) => {
                setAddresEstado(text)
              }}
            />
          </View>

          <View style={[styles.textInline, {alignItems: "center", marginTop: 8}]}>
            <CheckBox
            disabled={false}
            value={toggleCheckBox}
            tintColors={{true: Colors.primaryDark, false: Colors.primary}}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
            />
            <Text>Favoritar estabelecimento</Text>
          </View>
          
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              Keyboard.dismiss();
              let place = createAddresPlaceModel()
              if(place) {
                navigations.navigate("PlaceAddresModal", {placeModel: place});
              }
            }}
          >
            <Text style={styles.textButtonStyle}> Finalizar </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
