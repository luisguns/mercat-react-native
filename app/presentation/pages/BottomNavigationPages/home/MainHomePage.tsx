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
                    flexGrow: 2,
                    backgroundColor: Colors.grayScale600,
                    justifyContent: "flex-end",
                }}
            >
                <View style={styles.topSideContainer}>
                    <ChipsComponent
                        leftIcon={require("../../../../assets/cart_ic.png")}
                        size="Medium"
                        text={
                            textStyled(section)
                        }
                    />
                </View>
                <View style={styles.bottomSideContainer}></View>
            </ScrollView>
        </View>
    );
}
function textStyled(section: SectionModel): () => JSX.Element {
  return () => { return (
    <View style={{flexDirection: "row", alignItems: "center"}}>
      <Text style={{ fontWeight: "400", fontSize: 14 }}>
        Comprando em: <B children={section.placeName} />
      </Text>
      <Image style={{width: 10, height: 10, marginLeft: 4}} source={require("../../../../assets/chevron_down.png")}/>
    </View>
  )};
}

