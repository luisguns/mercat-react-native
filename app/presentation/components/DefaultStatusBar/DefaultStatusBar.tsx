import { StatusBar } from 'react-native'
import Colors from '../../values/colors'

export default function DefaultStatusBar() {
    return (
        <StatusBar barStyle="dark-content" backgroundColor={Colors.grayScale050} />
    )
};

