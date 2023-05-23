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


export default function LoginPage() {
  const repos = new AuthenticatorRepositoryImp()

  const navigation = useNavigation<StackProps>()

  useEffect(() => {
    
  }, [])
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
          keyboardType="email-address"
        />
        <TextInput
          style={[
            defaultStyles.primaryInputText,
            styles.inputTextStyle,
            { marginTop: 26 },
          ]}
          placeholder="Senha"
          secureTextEntry={true}
        />

        <PrimaryButton
          style={{ width: "60%", alignSelf: "center", marginTop: 47 }}
          text="Logar"
          seOnClick={() => {
            console.log("TEXT");
          }}
        />

        <Text style={{ marginTop: 28, color: Colors.grayScale500 }}> Ou </Text>

        <CardListComponent
          listStyle={{ marginTop: 28 }}
          itemClickedByIndex={(index) => {
            console.log(index);
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
