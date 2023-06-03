import { StyleProp, Text, TextInput, View, ViewStyle   } from "react-native";
import styles from "./style";
import defaultStyles from "../../values/styles";

import CheckBox from "@react-native-community/checkbox";
import Colors from "../../values/colors";
import { LabelHighlight } from "../../values/themes";
import { useEffect, useState } from "react";
import SecondaryButton from "../ButtonComponent/SecondaryButton";
import NumberPickerComponent from "../NumberPickerComponent/NumberPickerComponent";
import { ErrorUiState, LoadingUiState, SuccessUiState, UiState } from "../../../helper/UiState";
import ItemPurchasedModel from "../../../domain/models/ItemPurchased";
import ItemController from "../../controller/ItemController/ItemController";
import SectionModel from "../../../domain/models/SectionModel";
import Snackbar from "react-native-snackbar";
import SnackbarError from "../SnackbarComponent/SnackbarComponent";
const itemController = new ItemController();
const DEFAULT_VALUE_TEXT = "R$ "
export default function AddItemCardComponent(props: {
    syle?: StyleProp<ViewStyle>;
    section?: SectionModel;
    shouldReload: () => undefined
}) {
    const [nameProduct, setNameProduct] = useState<string>();
    const [valueProduct, setValueProduct] = useState<number>();
    const [quantityProduct, setQuantityProduct] = useState<number>(1);
    const [isPromotion, setToggleCheckBox] = useState<boolean>(false);
    const [defaultValueText, setDefaultValueText] = useState<string>("R$ ");
    const [isLoadingState, setIsLoadingState] = useState<boolean>(false);

    useEffect(() => {
        if (!itemController.observableNewItem.observable) {
            setItemObserver();
        }
    }, []);

    function setItemObserver() {
        itemController.observableNewItem.observe(itemObserverListen);
    }

    function itemObserverListen(state: UiState<ItemPurchasedModel>): undefined {
        if(state instanceof LoadingUiState) {
            setIsLoadingState(true)
        } else if(state instanceof SuccessUiState){
            props.shouldReload()
            Snackbar.show({
                text: "Item adicionado",
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: Colors.greenDark,
                textColor: Colors.light,
                action: {
                    text: "Ok",
                    textColor: Colors.light,
                    onPress: () => Snackbar.dismiss()
                }
            })
            setDefaultValueText(DEFAULT_VALUE_TEXT)
            setNameProduct("")
            setQuantityProduct(1)
            setValueProduct(undefined)
            setToggleCheckBox(false)
            setIsLoadingState(false)
        } else if(state instanceof ErrorUiState){
            setIsLoadingState(false)
            SnackbarError(`Ocorreu um erro: ${state.error?.mensage}`)
        } else {
            setIsLoadingState(false)
        }
    }

    function saveNewItem() {
        if (!(nameProduct && valueProduct)) {
            SnackbarError("Preencha todos os campos.")
            return;
        } else {
            if (props.section) {
                const itemPurchased = new ItemPurchasedModel(
                    props.section.id,
                    props.section.place,
                    nameProduct,
                    valueProduct,
                    isPromotion,
                    quantityProduct,
                    props.section.userId,
                    undefined,
                    undefined
                );
                itemController.registerNewItemPurchased(itemPurchased);
            } else {
                //TODO LOGOUT
            }
        }
    }

    function validateValueProductInput(text: string) {
        const valueSplited = text.split(DEFAULT_VALUE_TEXT);
        if (text) {
            if (valueSplited.length === 1) {
                setDefaultValueText(DEFAULT_VALUE_TEXT);
                setValueProduct(undefined);
            } else if (valueSplited.length === 2) {
                setDefaultValueText(text);
                if (Number(valueSplited[1])) {
                    setValueProduct(Number(valueSplited[1]));
                } else {
                    if (!valueSplited[1]) {
                    } else {
                        SnackbarError("Digite apenas numero após o simbolo da moeda")
                    }
                }
            } else {
                return;
            }
        } else {
            return;
        }
    }
    return (
        <View style={[styles.container, props?.syle]}>
            <TextInput
                style={[defaultStyles.primaryInputText, styles.nameTextInput]}
                placeholder="Nome do produto"
                value={nameProduct}
                onChangeText={(text) => {
                    if (text) {
                        //TODO Buscar itens no firestore enquanto digita
                        setNameProduct(text);
                    }
                }}
            />

            <View
                style={[defaultStyles.row, { justifyContent: "space-between" }]}
            >
                <TextInput
                    style={[
                        defaultStyles.primaryInputText,
                        styles.valueTextInput,
                    ]}
                    value={defaultValueText}
                    onChangeText={(text) => {
                        validateValueProductInput(text);
                    }}
                    keyboardType="number-pad"
                />
                <View style={[defaultStyles.row, { alignSelf: "center" }]}>
                    <CheckBox
                        disabled={false}
                        tintColors={{
                            true: Colors.primaryDark,
                            false: Colors.primary,
                        }}
                        value={isPromotion}
                        onValueChange={(newValue) =>
                            setToggleCheckBox(newValue)
                        }
                    />
                    <Text
                        style={[
                            LabelHighlight(),
                            { alignSelf: "center", color: Colors.primary },
                        ]}
                    >
                        promoção
                    </Text>
                </View>
            </View>

            <View
                style={[
                    defaultStyles.row,
                    {
                        marginTop: 19,
                        justifyContent: "space-between",
                        alignItems: "center",
                    },
                ]}
            >
                <NumberPickerComponent
                    numberChanged={(quantity) => {
                        setQuantityProduct(quantity);
                    }}
                />
                <SecondaryButton
                    size="Medium"
                    text="Adicionar Item"
                    loading={isLoadingState}
                    textStyle={{ fontWeight: "900" }}
                    seOnClick={() => {
                        if (props.section) {
                            saveNewItem();
                        } else {
                            //TODO LOGOUT
                        }
                    }}
                />
            </View>
        </View>
    );
}
