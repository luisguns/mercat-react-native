import {useEffect, useState} from 'react'
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
import PlaceController from "../../../controller/PlaceControler/PlaceControler";
import { ErrorUiState, LoadingUiState, SuccessUiState, UiState } from '../../../../helper/UiState';
import { auth } from '../../../../config/firebaseconfig';
import UserSingleton from '../../../../helper/UserSingleton';


let placeController: PlaceController
export default function FavoritePlacePage() {
    const navigation = useNavigation<StackProps>()

    const [loadinState, setLoading] = useState<boolean>(true)
    const [emptyState, setEmptyState] = useState<boolean>(false)
    const [havePlacesState, setHavePlaces] = useState<boolean>(false)
    const [placeModel, setPlaceModel] = useState<PlaceModel[]>([])

    useEffect(() => {
        if(!placeController) {
            placeController = new PlaceController()
        }
        if(!placeController.observableFavoritePlaces.observable) {
            setObserver()
        }

        if(placeController.observableFavoritePlaces.observable) {
            const uid = auth().currentUser?.uid;
            if(uid) {
                placeController.getFavoritePlaces(uid)
            }
        }
    }, [])

    return loadinState ? loadingBody() : containerPage();

    function setObserver() {
        placeController.observableFavoritePlaces.observe(favoriteObserverListen)
    }

    function favoriteObserverListen(state: UiState<PlaceModel[]>): undefined {
        const listPlace = state.data
        if(state instanceof LoadingUiState) {
            setLoading(true)
        } else if (state instanceof SuccessUiState && listPlace) {
            setLoading(false)
            if (listPlace){
                if( listPlace?.length == 0 ) {
                    
                    setEmptyState(true)
                    setHavePlaces(false)
                } else {
                    setPlaceModel(listPlace)
                    setEmptyState(false)
                    setHavePlaces(true)
                }
            }
        } else if (state instanceof ErrorUiState) {
            alert(state.error?.mensage)
        }
    }

    function registerSectionWithFavoritePlace(place: PlaceModel): undefined {
        //TODO Apos selecionar favorito criar nova seção
        console.log(place)
    }

    function containerPage() {

        let component = errorPlaces();
        if ( havePlacesState ) {
            component = haveFavoritePlaces()
        } else if ( emptyState) {
            component = emptyFavoritePlaces()
        }
        return (
            <View style={styles.container}>
                <DefaultStatusBar />
                <Text style={styles.title} >Estabelecimentos favoritos</Text>
                {component}
                <FloatingActionButton hasTitle={emptyState} onPress={() => {navigation.navigate("PlaceName")}} />
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
            data={placeModel}
            renderItem={(item) => {
                return (
                    <FavoritePlaceItemComponent placeModel={item.item} pressItem={registerSectionWithFavoritePlace} /> 
                );
            } } />;    
    }

    function emptyFavoritePlaces() {
        return <View style={styles.emptyFavoriteContainer}>
            <Image style={styles.imageEmpty} source={require("../../../../assets/illustration_empty.png")}/>
            <Text style={[LabelHighlight(), styles.emptyText]}> Nenhum estabelecimento favoritado </Text>
        </View>
    }

    function errorPlaces() {
        return <View style={styles.emptyFavoriteContainer}>
            <Text style={[LabelHighlight(), styles.emptyText]}> Houve um erro, tente mais tarde </Text>
        </View>
    }
}




