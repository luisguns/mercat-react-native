import { View, StatusBar } from 'react-native'
import Colors from '../../../values/colors'
import { FocusAwareStatusBar } from '../../../components/DefaultStatusBar/FocusAwareStatusBar'

export default function MainDashboardPage() {
    return (
        <View style={{flex: 1}}> 
            <FocusAwareStatusBar backgroundColor={Colors.grayScale050} barStyle={'dark-content'}/>
        </View>
    )
};

