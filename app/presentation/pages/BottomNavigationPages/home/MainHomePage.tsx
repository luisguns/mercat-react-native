import {
    Image,
    View,
    Text,
    ScrollView,
    FlatList,
    ActivityIndicator,
} from "react-native";
import styles from "./style";
import DefaultStatusBar from "../../../components/DefaultStatusBar/DefaultStatusBar";
import { useRoute } from "@react-navigation/native";
import SectionModel from "../../../../domain/models/SectionModel";
import Colors from "../../../values/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FocusAwareStatusBar } from "../../../components/DefaultStatusBar/FocusAwareStatusBar";
import ChipsComponent from "../../../components/Chips/ChipsComponent";
import { B } from "../../../components/DefaultComponents/B";
import AddItemCardComponent from "../../../components/AddItemCardComponent/AddItemCardComponent";
import PrimaryCardComponent from "../../../components/CardComponet/PrimaryCardComponent";
import { useEffect, useState } from "react";
import ItemController from "../../../controller/ItemController/ItemController";
import {
    ErrorUiState,
    LoadingUiState,
    SuccessUiState,
    UiState,
} from "../../../../helper/UiState";
import ItemPurchasedModel from "../../../../domain/models/ItemPurchased";
import { SubTitleH3 } from "../../../values/themes";
import CardItemPurchasedList from "../../../components/CardItemPurchasedList/CardItemPurchasedList";
import SnackbarError from "../../../components/SnackbarComponent/SnackbarComponent";

let itemController: ItemController;
export default function MainHomePage() {
    const route = useRoute();
    const insets = useSafeAreaInsets();
    const section = route.params as SectionModel;

    const [purchasedItemList, setPurchasedItemList] = useState<
        ItemPurchasedModel[]
    >([]);
    const [loadingCartListState, setLoadingCartListState] =
        useState<boolean>(false);

    useEffect(() => {
        if (!itemController) {
            itemController = new ItemController();
        }

        if (!itemController.observableGetItemSection?.observable) {
            setObserver();
        }

        itemController.getItemBySection(section.id, true);
    }, []);

    function setObserver() {
        itemController.observableGetItemSection.observe(
            observerGetItemSectionListen
        );
    }

    function observerGetItemSectionListen(
        state: UiState<ItemPurchasedModel[]>
    ): undefined {
        const data = state.data;
        if (state instanceof SuccessUiState) {
            setLoadingCartListState(false);
            setPurchasedItemList(data ? data : []);
        } else if (state instanceof ErrorUiState) {
            setLoadingCartListState(false);
            SnackbarError(`Error: ${state.error?.mensage?.toString()}`);
        } else if (state instanceof LoadingUiState) {
            setLoadingCartListState(true);
        }
    }

    return (
        <View
            style={[
                styles.container,
                {
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                },
            ]}
        >
            <FocusAwareStatusBar
                barStyle="light-content"
                backgroundColor={Colors.grayScale600}
            />
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{
                    flexGrow: 1,
                    backgroundColor: Colors.grayScale600,
                    justifyContent: "flex-end",
                }}
            >
                <View style={styles.topSideContainer}>
                    <ChipsComponent
                        leftIcon={require("../../../../assets/cart_ic.png")}
                        size="Medium"
                        text={placeNameChipsStyled(section)}
                    />
                    <AddItemCardComponent
                        syle={{ marginTop: 50, marginHorizontal: 10 }}
                        section={section}
                        shouldReload={() => {
                            itemController.getItemBySection(section.id,true)
                        }}
                    />

                    <PrimaryCardComponent
                        leftElement={getLeftSideCardCartStyled()}
                        style={{ marginTop: 24, marginHorizontal: 10 }}
                    />
                </View>
                <View style={styles.bottomSideContainer}>
                    <Text
                        style={[
                            SubTitleH3(),
                            {
                                alignSelf: "flex-start",
                                marginTop: 16,
                                marginStart: 12,
                            },
                        ]}
                    >
                        Carrinho
                    </Text>
                    <View
                        style={{
                            flex: 1,
                        }}>
                        {setupBottomSideScreen()}
                    </View>
                </View>
            </ScrollView>
        </View>
    );

    function setupBottomSideScreen() {
        if (loadingCartListState) {
            return (
                <ActivityIndicator
                    size={"large"}
                    color={Colors.primary}
                    style={{
                        position: "absolute",
                        alignSelf: "center",
                        top: 50,
                    }}
                />
            );
        } else {
            return (
                <FlatList
                    nestedScrollEnabled={true}
                    scrollEnabled={false}
                    data={purchasedItemList}
                    renderItem={({ item }) => {
                        return <CardItemPurchasedList itemPurchased={item} />;
                    }}
                />
            );
        }
    }

    function getLeftSideCardCartStyled() {
        return (
            <View>
                <Text
                    style={{
                        color: Colors.lightOpac,
                    }}
                >
                    No carrinho
                </Text>
    
                <Text
                    style={{
                        color: Colors.light,
                        fontSize: 18,
                        fontWeight: "900",
                        marginTop: 8,
                    }}
                >
                    R$ {getTotalValueCartList(purchasedItemList)}
                </Text>
            </View>
        );
    }

}


function placeNameChipsStyled(section: SectionModel): () => JSX.Element {
    return () => {
        return (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontWeight: "400", fontSize: 14 }}>
                    Comprando em: <B children={section.placeName} />
                </Text>
                <Image
                    style={{ width: 10, height: 10, marginLeft: 4 }}
                    source={require("../../../../assets/chevron_down.png")}
                />
            </View>
        );
    };
}

function getTotalValueCartList(purchasedItemList: ItemPurchasedModel[]) : number {
    let totalValue = 0
    purchasedItemList.forEach((item) => { totalValue+=item.value})
    return totalValue
}