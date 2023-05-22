import { Button, Text, TouchableOpacity, View, LogBox } from "react-native";

import syles from "./style";
import style from "./style";
import Colors from "../../../values/colors";
import { useNavigation, useRoute, useNavigationState } from "@react-navigation/native";
import { PlaceModel } from "../../../../domain/models/placemodel";
import { PlaceDI } from "../../../../di/PlaceDI";
import { useEffect, useState } from "react";
import { PlaceUsecase } from "../../../../domain/usecases/PlaceUsecase";
import { StackProps } from "../../pageconfig/screenprops";
import PlaceController from "../../../controller/PlaceControler/PlaceControler";
import { LoadingUiState, SuccessUiState, UiState } from "../../../../helper/UiState";
import SectionModel from "../../../../domain/models/SectionModel";
import { getCurrentRoute } from "../../../../helper/navigationhelp";

export default function ModalScreen() {
  let placeController: PlaceController
  const navigation = useNavigation<StackProps>();
  const route = useRoute();
  const placeModel = (route.params as {placeModel: PlaceModel}).placeModel;

  useEffect(() => {
    if (PlaceController) {
      placeController = new PlaceController()
    }
    setObserves()
  }, []);

  function setObserves() {
    placeController?.placeRegisterObservable.observe(placeRegisterListen)
  }

  function placeRegisterListen(value : UiState<SectionModel>): undefined {
    if (value instanceof SuccessUiState) {
      if (getCurrentRoute(navigation.getState()) === "ProgressModal"){
        navigation.goBack()
        navigation.navigate("BottomNavigation",value.data)
      }
      
    } else if (value instanceof SuccessUiState){
      if (getCurrentRoute(navigation.getState()) === "ProgressModal"){
        navigation.goBack()
      }
      alert(value.error?.mensage ? value.error?.mensage  : "UNKNOW ERROR")
    } else if (value instanceof LoadingUiState){
        navigation.navigate("ProgressModal", {show: true})
    }
  }

  return (
    <View style={syles.modal}>
      <View style={syles.modalBody}>
        <Text style={style.headerModal}>Confirmar Endereço</Text>

        <View style={style.modalContent}>
          <View style={style.textInline}>
            <Text style={style.textLabelModal}>Nome: </Text>
            <Text style={style.textvalueModal}>{placeModel.nome}</Text>
          </View>
          <View style={style.textInline}>
            <Text style={style.textLabelModal}>Endereço: </Text>
            <Text style={style.textvalueModal}>{placeModel.getCompleteAddres()}</Text>
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
                placeController?.registerNewAddressAnSection(placeModel)
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
