import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Modal } from 'react-native'
import { Resource } from '../../../data/helper/Resource'
import { PlaceModel } from '../../../domain/models/placemodel'

type ScreenStackProps = {
    PlaceAddress: {
        placeName: string
    }
    PlaceAddresModal: undefined,
    ProgressModal: {
        show: boolean
    },
    BottomNavigation: PlaceModel
}

export type StackProps = NativeStackNavigationProp<ScreenStackProps>;