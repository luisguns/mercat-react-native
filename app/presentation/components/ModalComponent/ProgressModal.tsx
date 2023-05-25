import { ActivityIndicator, View } from 'react-native'
import styles from './style'
import { useRoute } from '@react-navigation/native'

export default function ProgressModal() {

    const route = useRoute
    return (
        <View style={styles.modal}> 
            <ActivityIndicator size="large" color="#0000ff" style={styles.modalBody}/>
        </View>
    )
};

