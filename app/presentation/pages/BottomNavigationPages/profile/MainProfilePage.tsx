import { View, StatusBar } from 'react-native'
import Colors from '../../../values/colors'
import { FocusAwareStatusBar } from '../../../components/DefaultStatusBar/FocusAwareStatusBar'

export default function MainProfilePage() {
    return (
        <View > 
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor={Colors.grayScale050}/>
        </View>
    )
};

