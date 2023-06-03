import { Image, View, Text, ScrollView } from "react-native";
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

export default function MainHomePage() {
    const route = useRoute();
    const insets = useSafeAreaInsets();
    const section = route.params as SectionModel;
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
                    />

                    <PrimaryCardComponent
                        leftElement={getLeftSideCardCartStyled()}
                        style={{ marginTop: 24, marginHorizontal: 10 }}
                    />
                </View>
                <View style={styles.bottomSideContainer}></View>
            </ScrollView>
        </View>
    );
}

function getLeftSideCardCartStyled() {
    return (
        <View>
            <Text style={{
                color: Colors.lightOpac
            }}>No carrinho</Text>

            <Text style={{
                color: Colors.light,
                fontSize: 18,
                fontWeight: "900",
                marginTop: 8,
            }}>R$ 400.00</Text>
        </View>
    );
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
