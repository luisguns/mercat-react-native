import { View, StatusBar } from 'react-native'
import Colors from '../../../values/colors'
import { FocusAwareStatusBar } from '../../../components/DefaultStatusBar/FocusAwareStatusBar'


export default function MainPurchasePage() {
    return (
        <View > 
            <FocusAwareStatusBar backgroundColor={Colors.grayScale050} barStyle={'dark-content'}/>
        </View>
    )
};

