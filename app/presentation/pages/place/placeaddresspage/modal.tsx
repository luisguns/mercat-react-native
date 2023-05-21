import { Button, Text, TouchableOpacity, View, LogBox } from "react-native";

import syles from "./style";
import style from "./style";
import Colors from "../../../values/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { PlaceModel } from "../../../../domain/models/placemodel";
import { PlaceDI } from "../../../../di/PlaceDI";
import { useEffect, useState } from "react";
import { PlaceUsecase } from "../../../../domain/usecases/PlaceUsecase";
import { StackProps } from "../../pageconfig/screenprops";
import { Resource } from "../../../../data/helper/Resource";


export default function ModalScreen() {
  const [placeUsecase, setPlaceUsecase] = useState<PlaceUsecase>();
  const navigation = useNavigation<StackProps>();

  const route = useRoute();

  useEffect(() => {
    if (!placeUsecase) {
      setPlaceUsecase(PlaceDI.getPlaceUsecase());
    }
  }, []);
  return (
    <View style={syles.modal}>
      <View style={syles.modalBody}>
        <Text style={style.headerModal}>Confirmar Endereço</Text>

        <View style={style.modalContent}>
          <View style={style.textInline}>
            <Text style={style.textLabelModal}>Nome: </Text>
            <Text style={style.textvalueModal}>Mulfato</Text>
          </View>
          <View style={style.textInline}>
            <Text style={style.textLabelModal}>Endereço: </Text>
            <Text style={style.textvalueModal}>Rua tal endereco tal</Text>
          </View>
        </View>
        <View style={style.modalFooter}>
          <View
            style={[
              style.textInline,
              {
                alignSelf: "flex-end",
                marginBottom: 20,
                marginEnd: 24,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text
                style={{
                  color: Colors.grayScale900,
                  fontWeight: "400",
                  fontSize: 16,
                }}
              >
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                let placeModel = new PlaceModel(
                  "Teste",
                  "Teste",
                  "Teste",
                  "Teste",
                  "Teste"
                );
                navigation.navigate("ProgressModal", { show: true });
                await placeUsecase
                  ?.saveAddress(placeModel)
                  .then((value) => {
                    navigation.goBack();
                    if (value?.data) {
                      placeModel.id = value?.data;
                      console.log(placeModel)
                      navigation.navigate("BottomNavigation",placeModel)
                    }
                  })
                  .catch(() => {
                    navigation.goBack();
                  });
              }}
            >
              <Text
                style={{
                  color: Colors.primaryDark,
                  fontWeight: "900",
                  fontSize: 16,
                  marginStart: 20,
                }}
              >
                Confirmar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
