import { StatusBar, View,Text } from 'react-native'
import styles from './style'
import DefaultStatusBar from '../../../components/DefaultStatusBar/DefaultStatusBar'
import { useRoute } from '@react-navigation/native'
import SectionModel from '../../../../domain/models/SectionModel'
import Colors from '../../../values/colors'
import {
    useSafeAreaInsets,
  } from 'react-native-safe-area-context';
import { FocusAwareStatusBar } from '../../../components/DefaultStatusBar/FocusAwareStatusBar'

export default function MainHomePage() {

    const route = useRoute()
    const insets = useSafeAreaInsets();
    const section = route.params as SectionModel
    return (
        <View style={[styles.container, {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }]}> 
            <FocusAwareStatusBar barStyle="light-content" backgroundColor={Colors.grayScale900}/>
            <Text>TEST</Text>
        </View>
    )
};

