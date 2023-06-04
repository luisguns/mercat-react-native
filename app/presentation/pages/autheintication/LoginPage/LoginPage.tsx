import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import defaultStyles from "../../../values/styles";
import PrimaryButton from "../../../components/ButtonComponent/PrimaryButton";
import CardListComponent from "../../../components/CardListComponent/CardListComponent";
import Colors from "../../../values/colors";
import { AuthenticatorRepositoryImp } from "../../../../data/repository/Authenticator/AuthenticatorRepositoryImp";
import { useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../../pageconfig/screenprops";
import { AuthenticationController } from "../../../controller/AuthenticationController/AuthenticationController";
import { ErrorUiState, LoadingUiState, SuccessUiState, UiState } from "../../../../helper/UiState";
import { UserLoginResponse } from "../../../../data/entity/UserLoginResponse";
import {closeProgressModal, getCurrentRoute } from '../../../../helper/navigationhelp'
import SectionController from "../../../controller/SectionController/SectionController";
import SectionModel from "../../../../domain/models/SectionModel";
import { StatusBar } from "expo-status-bar";
import UserSingleton from "../../../../helper/UserSingleton";
import SnackbarError from "../../../components/SnackbarComponent/SnackbarComponent";

const repos = new AuthenticatorRepositoryImp()
let authController: AuthenticationController
let sectionConroller: SectionController
export default function LoginPage() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const navigation = useNavigation<StackProps>()

  useEffect(() => {
    if(!authController){
      authController = new AuthenticationController()
    }

    if(!sectionConroller){
      sectionConroller = new SectionController()
    }

    if(!authController.loginObservable.observable){
      authController?.loginObservable.observe(loginGoogleObserver)
    }

    if(!sectionConroller.observableSectionGet.observable){
      sectionConroller?.observableSectionGet.observe(getSectionObserver)
    }
  }, [])

  function loginGoogleObserver(state: UiState<UserLoginResponse>): undefined {

    const data = state.data
    if(state instanceof SuccessUiState) {
      closeProgressModal(navigation)
      UserSingleton.Instance.fromUserLogin(data?.success)
      sectionConroller.getSectionByUid(data?.success?.uid ? data?.success?.uid : "", false)
    } else if (state instanceof ErrorUiState) {
      if (state.error?.code === -1 ){
        closeProgressModal(navigation)
        SnackbarError("Ocorreu um erro, tente novamente mais tarde")
        return
      } 

      SnackbarError(state.error?.mensage?.toString())
    } else if ( state instanceof LoadingUiState){
      navigation.navigate("ProgressModal")
    }
  }

  function getSectionObserver(state: UiState<SectionModel[]>): undefined {
    const data = state.data
    if (state instanceof SuccessUiState) {
      if(data?.length === 1 ){
        navigation.replace("BottomNavigation",data[0])
      } else if ( data && data?.length > 1) {
        // CHOSE SECTION SCREEN
      } else {
        navigation.navigate("PlaceHome")
      }
    }
  }

  function processLoginOption(index: Number) {
    if(index === 1 && authController){
      authController.singInWithGoogle()
    }
  }

  function singInWithEmailAndPassword() {
    if(authController) {
      if(email.length > 0 && password.length > 0){
        authController.singInWithEmail(email,password)
      }
    }
  }

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={"#ffffff"}/>
      <View style={styles.topSide}>
        <Image
          style={styles.logoImage}
          source={require("../../../../../assets/icon.png")}
        />
        <TextInput
          style={[
            defaultStyles.primaryInputText,
            styles.inputTextStyle,
            { marginTop: 26 },
          ]}
          placeholder="Email"
          onChangeText={(value) => setEmail(value)}
          keyboardType="email-address"
        />
        <TextInput
          style={[
            defaultStyles.primaryInputText,
            styles.inputTextStyle,
            { marginTop: 26 },
          ]}
          onChangeText={(value) => setPassword(value)}
          placeholder="Senha"
          secureTextEntry={true}
        />

        <PrimaryButton
          style={{ width: "60%", alignSelf: "center", marginTop: 47 }}
          text="Logar"
          seOnClick={() => {
            singInWithEmailAndPassword();
          }}
        />

        <Text style={{ marginTop: 28, color: Colors.grayScale500 }}> Ou </Text>

        <CardListComponent
          listStyle={{ marginTop: 28 }}
          itemClickedByIndex={(index) => {
            processLoginOption(index)
          }}
        />
      </View>

    <TouchableOpacity onPress={() => { navigation.navigate("RegisterScreen") }}>
      <View style={styles.footerCriarConta}>
        <Text style={styles.footerTextNormal}>Não tem conta? </Text>
        <Text style={styles.footerTextHighlight}>Cadastrar agora </Text>
      </View>
    </TouchableOpacity>
    </View>
  );
}
