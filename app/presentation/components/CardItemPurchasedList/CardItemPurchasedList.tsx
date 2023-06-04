import { Image, Text, TouchableOpacity, View } from 'react-native'
import styles from './style'
import ItemPurchasedModel from '../../../domain/models/ItemPurchased'
import { BRLFormat } from '../../../helper/StringHelper'

export default function CardItemPurchasedList(props: {
    itemPurchased: ItemPurchasedModel
}) {
    return (
        <TouchableOpacity onPress={() => {}}>
        <View style={styles.container}> 
            <Image style={styles.imageLogo} source={require('../../../assets/itemlist_default.png')}/>

            <View style={styles.textContent}>
                <Text style={styles.textTitle}> {props.itemPurchased.name} </Text>
                <Text style={styles.textDesc}> {props.itemPurchased.quantity} </Text>
            </View>

            <Text style={styles.textValue}> {BRLFormat.format(props.itemPurchased.value)} </Text>
        </View>
        </TouchableOpacity>
    )
};

