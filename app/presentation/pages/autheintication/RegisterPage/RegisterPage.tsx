import { View, Image, TextInput } from "react-native";
import { useEffect, useState } from "react";
import styles from "./style";
import defaultStyle from "../../../values/styles";
import PrimaryButton from "../../../components/ButtonComponent/PrimaryButton";
import { AuthenticationController } from "../../../controller/AuthenticationController/AuthenticationController";
import { ErrorUiState, LoadingUiState, SuccessUiState, UiState } from "../../../../helper/UiState";
import { UserLoginResponse } from "../../../../data/entity/UserLoginResponse";
import { PROGRESS_SCREEN, closeProgressModal, getCurrentRoute } from "../../../../helper/navigationhelp";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../../pageconfig/screenprops";
import { auth } from "../../../../config/firebaseconfig";
let authController: AuthenticationController
export default function RegisterPage() {

    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [nome, setNome] = useState<string>("");
    const navigation = useNavigation<StackProps>()
    useEffect(() => {
        
        if (!authController) {
            authController = new AuthenticationController();
        }
        if(!authController.newUseObservable.observable){
            setObserver()

        }
    }, []);

    
    function setObserver() {
        authController?.newUseObservable.observe(userRegisterListen)
    }

    function userRegisterListen(state: UiState<UserLoginResponse>): undefined {
        if(state instanceof SuccessUiState) {
            closeProgressModal(navigation)
            alert("Usuario criado com suceesoo")
        }
        if( state instanceof ErrorUiState) {
            closeProgressModal(navigation)
            alert(state.error?.mensage)
        }
        if(state instanceof LoadingUiState) {
            navigation.navigate("ProgressModal")
        }

    }

    function verifyAndRegisterUse() {
        if (authController) {
            authController.createNewUserWithEmailAndPassword(email,senha,nome)
        }
    }

    return (
        <View style={styles.mainContainer}>
            <Image
                style={styles.logoImage}
                source={require("../../../../../assets/icon.png")}
            />
            <TextInput
                onChangeText={(text) => {
                    setEmail(text);
                }}
                placeholder="Email"
                style={[
                    defaultStyle.primaryInputText,
                    {
                        marginTop: 26,
                    },
                ]}
            />
            <TextInput
                onChangeText={(text) => {
                    setSenha(text);
                }}
                placeholder="Senha"
                style={[
                    defaultStyle.primaryInputText,
                    {
                        marginTop: 26,
                    },
                ]}
            />
            <TextInput
                onChangeText={(text) => {
                    setNome(text);
                }}
                placeholder="Nome"
                style={[
                    defaultStyle.primaryInputText,
                    {
                        marginTop: 26,
                    },
                ]}
            />
            <PrimaryButton
                text="Cadastrar"
                seOnClick={() => {
                    verifyAndRegisterUse()
                }}
                style={{ width: "60%", alignSelf: "center", marginTop: 47 }}
            />
        </View>
    );
}
