import { View, Image, Text, TouchableOpacity } from 'react-native'
import styles from './style'
import { PlaceModel } from '../../../domain/models/placemodel'
import { SuccessUiState, UiState } from '../../../helper/UiState'
import SectionModel from '../../../domain/models/SectionModel'
import { useNavigation } from '@react-navigation/native'
import { StackProps } from '../../pages/pageconfig/screenprops'


export default function FavoritePlaceItemComponent( props: {placeModel: PlaceModel, pressItem: (item: PlaceModel) => undefined} ) {
    const navigation = useNavigation<StackProps>()

    function sectionListen(state: UiState<SectionModel[]>): undefined {
        const data = state.data
    if (state instanceof SuccessUiState) {
      if(data?.length === 1 ){
        navigation.navigate("BottomNavigation",data[0])
      } else if ( data && data?.length > 1) {
        // CHOSE SECTION SCREEN
      } else {
        navigation.navigate("PlaceHome")
      }
    }
    }
    
    return (
        <TouchableOpacity onPress={() => {props.pressItem(props.placeModel)}}>
        <View style={styles.container}> 
            <Image style={styles.imageLogo} source={require('../../../assets/itemlist_default.png')}/>

            <View style={styles.textContent}>
                <Text style={styles.textTitle}> {props.placeModel.nome} </Text>
                <Text style={styles.textDesc}> {PlaceModel.getCompleteAddress(props.placeModel)} </Text>
            </View>

            <TouchableOpacity style={{elevation: 10}} onPress={() => {
                console.log("SSS")
            }}>
            <Image style={[styles.imageEnd]} source={require('../../../assets/icon_star.png')}/>
            </TouchableOpacity>
        </View>
        </TouchableOpacity>
    )
};

