import { FlatList, View, Text, Image, ActivityIndicator } from "react-native";
import styles from "./style";
import FavoritePlaceItemComponent from "../../../components/FavoritePlaceItemComponent/FavoritePlaceItemComponent";
import DefaultStatusBar from "../../../components/DefaultStatusBar/DefaultStatusBar";
import { PlaceModel } from "../../../../domain/models/placemodel";
import FloatingActionButton from "../../../components/FloatingActionButton/FloatingActionButton";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../../pageconfig/screenprops";
import { LabelHighlight } from "../../../values/themes";
import Colors from "../../../values/colors";

let favoritePlaceList: PlaceModel[] = [];
export default function FavoritePlacePage() {
    const navigation = useNavigation<StackProps>()
    favoritePlaceList.push(
        new PlaceModel(
            "Festival",
            "Rua medicina",
            "Universitario",
            "Cascavel",
            "PR"
        )
    );
    return containerPage();

    function containerPage() {
        return (
            <View style={styles.container}>
                <DefaultStatusBar />
                <Text style={styles.title} >Estabelecimentos favoritos</Text>
                {emptyFavoritePlaces()}
                <FloatingActionButton hasTitle={true} onPress={() => {navigation.navigate("PlaceName")}} />
            </View>
        )
    }

    function loadingBody() {
        return <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <DefaultStatusBar />
            <ActivityIndicator color={Colors.primary} size={"large"}/>
        </View>
    }

    function haveFavoritePlaces() {
        return <FlatList
            style={{ flex: 1 }}
            data={favoritePlaceList}
            renderItem={(item) => {
                return (
                    <FavoritePlaceItemComponent placeModel={item.item} />
                );
            } } />;    
    }

    function emptyFavoritePlaces() {
        return <View style={styles.emptyFavoriteContainer}>
            <Image style={styles.imageEmpty} source={require("../../../../assets/illustration_empty.png")}/>
            <Text style={[LabelHighlight(), styles.emptyText]}> Nenhum estabelecimento favoritado </Text>
        </View>
    }
}


