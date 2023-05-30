import { Text, View } from 'react-native'
import styles from './style'
import DefaultStatusBar from '../../../components/DefaultStatusBar/DefaultStatusBar'
import { useRoute } from '@react-navigation/native'
import SectionModel from '../../../../domain/models/SectionModel'

export default function MainHomePage() {

    const route = useRoute()
    const section = route.params as SectionModel
    return (
        <View style={styles.container}> 
            <DefaultStatusBar/>
            <Text>{section?.placeName}</Text>
        </View>
    )
};

