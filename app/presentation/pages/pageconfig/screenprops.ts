import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Modal } from 'react-native'
import { Resource } from '../../../data/helper/Resource'
import { PlaceModel } from '../../../domain/models/placemodel'
import SectionModel from '../../../domain/models/SectionModel'

type ScreenStackProps = {
    PlaceAddress: {
        placeName: string
    }
    PlaceAddresModal: {placeModel: PlaceModel},
    ProgressModal: undefined,
    BottomNavigation: SectionModel
    RegisterScreen: undefined,
    PlaceHome: undefined,
    PlaceName: undefined,
    LoginScreen: undefined
}

export type StackProps = NativeStackNavigationProp<ScreenStackProps>;