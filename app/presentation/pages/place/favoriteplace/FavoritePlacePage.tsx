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
import SectionController from '../../../controller/SectionController/SectionController';
import SectionModel from '../../../../domain/models/SectionModel';
import SnackbarError from '../../../components/SnackbarComponent/SnackbarComponent';


let placeController: PlaceController
let sectionController: SectionController
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

        if(!sectionController) {
            sectionController = new SectionController()
        }

        if(!placeController.observableFavoritePlaces.observable) {
            setObserver()
        }
        if(!sectionController.observableSectionNewWithPlace.observable) {
            setSectionObserver()
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

    function setSectionObserver() {
        sectionController.observableSectionNewWithPlace.observe(newSectionObserverListen)
    }

    function newSectionObserverListen(state: UiState<SectionModel>): undefined {
        if (state instanceof SuccessUiState) {
              navigation.navigate("BottomNavigation",state.data)

            
          } else if (state instanceof ErrorUiState){
            setLoading(false)
            SnackbarError(state.error?.mensage ? state.error?.mensage?.toString()  : "UNKNOW ERROR")
          } else if (state instanceof LoadingUiState){
              setLoading(true)
          }
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
            SnackbarError(state.error?.mensage?.toString())
        }
    }

    function registerSectionWithFavoritePlace(place: PlaceModel): undefined {
        const uid = auth().currentUser?.uid
        if(uid) {
            sectionController.registerNewAddressAnSection(place, uid)
        }
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
                <Text style={[styles.title]} >Estabelecimentos favoritos</Text>
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
            style={{ height: "90%" }}
            data={placeModel}
            renderItem={(item) => {
                return (
                    <FavoritePlaceItemComponent placeModel={item.item} pressItem={(model) => {
                        registerSectionWithFavoritePlace(model)
                    }} /> 
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




