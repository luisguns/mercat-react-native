import { View, Image, Text } from 'react-native'
import styles from './style'
import { PlaceModel } from '../../../domain/models/placemodel'


export default function FavoritePlaceItemComponent( props: {placeModel: PlaceModel} ) {
    return (
        <View style={styles.container}> 
            <Image style={styles.imageLogo} source={require('../../../assets/itemlist_default.png')}/>

            <View style={styles.textContent}>
                <Text style={styles.textTitle}> {props.placeModel?.nome} </Text>
                <Text style={styles.textDesc}> {props.placeModel?.getCompleteAddres()} </Text>
            </View>

            <Image style={styles.imageEnd} source={require('../../../assets/icon_star.png')}/>
        </View>
    )
};

