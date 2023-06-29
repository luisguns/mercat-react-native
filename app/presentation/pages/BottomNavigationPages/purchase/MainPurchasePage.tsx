import {
    View,
    StatusBar,
    FlatList,
    TextInput,
    Text,
    Image,
} from "react-native";
import Colors from "../../../values/colors";
import { FocusAwareStatusBar } from "../../../components/DefaultStatusBar/FocusAwareStatusBar";
import React, { useEffect, useState } from "react";
import ItemPurchasedModel from "../../../../domain/models/ItemPurchased";
import ItemController from "../../../controller/ItemController/ItemController";
import {
    ErrorUiState,
    LoadingUiState,
    SuccessUiState,
    UiState,
} from "../../../../helper/UiState";
import SnackbarError from "../../../components/SnackbarComponent/SnackbarComponent";
import CardItemPurchasedList from "../../../components/CardItemPurchasedList/CardItemPurchasedList";
import { useIsFocused, useRoute } from "@react-navigation/native";
import SectionModel from "../../../../domain/models/SectionModel";
import PrimaryCardComponent from "../../../components/CardComponet/PrimaryCardComponent";
import styles from "../../../values/styles";
import style from "./style";
import PrimaryButton from "../../../components/ButtonComponent/PrimaryButton";
import SecondaryButton from "../../../components/ButtonComponent/SecondaryButton";
import { BRLFormat } from "../../../../helper/StringHelper";
import SectionController from "../../../controller/SectionController/SectionController";

let itemController: ItemController;
let sectionController: SectionController;
export default function MainPurchasePage() {
    const route = useRoute();
    const section = route.params as SectionModel;

    const [purchasedItemList, setPurchasedItemList] = useState<
        ItemPurchasedModel[]
    >([]);

    const focus = useIsFocused();

    useEffect(() => {
        if (!itemController) {
            itemController = new ItemController();
        }

        if (!sectionController) {
            sectionController = new SectionController();
        }

        if (!itemController.observableGetItemSection?.observable) {
            setObserver();
        }

        if (!sectionController.observableSectionFinish?.observable) {
            setSectionObserver();
        }
    }, []);

    const isFocused = useIsFocused();

    useEffect(() => {
        itemController.getItemBySection(section.id, true);
    }, [isFocused]);

    function setObserver() {
        itemController.observableGetItemSection.observe(
            observerGetItemSectionListen
        );
    }

    function setSectionObserver() {
        sectionController.observableSectionFinish.observe(
            observerFinishSection
        );
    }

    function observerGetItemSectionListen(
        state: UiState<ItemPurchasedModel[]>
    ): undefined {
        const data = state.data;
        if (state instanceof SuccessUiState) {
            setPurchasedItemList(data ? data : []);
        } else if (state instanceof ErrorUiState) {
            SnackbarError(`Error: ${state.error?.mensage?.toString()}`);
        } else if (state instanceof LoadingUiState) {
        }
    }

    function observerFinishSection(
        state: UiState<SectionModel>
    ): undefined {
        const data = state.data;
        console.log(state)
    }

    return (
        <View
            style={{
                backgroundColor: Colors.grayScale050,
                flex: 1
            }}
        >
            <FocusAwareStatusBar
                backgroundColor={Colors.grayScale050}
                barStyle={"dark-content"}
            />
            <View
                style={[
                    style.topCard,
                    {
                        marginHorizontal: 8,
                        paddingVertical: 12
                    },
                ]}
            >
                <View>
                    <TextInput
                        placeholder="Procurar item"
                        style={[
                            styles.primaryInputText,
                            {
                                height: 37,
                            },
                        ]}
                    />

                    <Image
                        style={{
                            position: "absolute",
                            right: 10,
                            width: 24,
                            height: 24,
                            top: 15
                        }}
                        source={require("../../../../assets/magnify.png")}
                    />
                </View>

                <View
                    style={[
                        styles.row,
                        { justifyContent: "space-between", marginTop: 15 },
                    ]}
                >
                    <View>
                        <Text style={styles.cartValueLabelText}>
                            No carrinho
                        </Text>
                        <Text style={styles.cartValueText}>{getTotalValueCartList(purchasedItemList)}</Text>
                    </View>

                    <Text
                        style={[
                            styles.cartQuantityItemsText,
                            { alignSelf: "center" },
                        ]}
                    >
                        {ItemPurchasedModel.length} Items
                    </Text>
                </View>
                <SecondaryButton size="Medium" text="Finalizar" 
                seOnClick={() => {
                    section.finalValue = getTotalValueNumber(purchasedItemList)
                    sectionController.finishSection(section)
                }}
                style={
                {
                    width: 220,
                    marginTop: 15,
                    alignSelf: "center",
                    backgroundColor: Colors.light
                }}
                textStyle={{
                    color: Colors.grayScale900,
                    fontWeight: "800",
                    fontSize: 16
                }}/>
            </View>
            <FlatList
                scrollEnabled={true}
                data={purchasedItemList}
                renderItem={({ item }) => {
                    return <CardItemPurchasedList itemPurchased={item} />;
                }}
            />
        </View>
    );
}

function getTotalValueCartList(purchasedItemList: ItemPurchasedModel[]) : string {
    let totalValue = 0
    purchasedItemList.forEach((item) => { totalValue+= (item.value * item.quantity)})
    return BRLFormat.format(totalValue)
}

function getTotalValueNumber(purchasedItemList: ItemPurchasedModel[]) : number {
    let totalNumber = 0
    purchasedItemList.forEach((item) => { totalNumber+= (item.value * item.quantity)})
    return totalNumber
}