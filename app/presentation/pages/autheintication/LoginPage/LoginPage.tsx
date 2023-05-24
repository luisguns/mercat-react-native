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

const repos = new AuthenticatorRepositoryImp()
let authController: AuthenticationController
export default function LoginPage() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const navigation = useNavigation<StackProps>()

  useEffect(() => {
    if(!authController){
      authController = new AuthenticationController()
    }
  }, [])
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
