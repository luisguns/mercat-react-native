import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import SectionModel from '../../../../domain/models/SectionModel';
import { NavigationHelpers, ParamListBase, TabNavigationState } from '@react-navigation/native';



export type BottomTabScreenProps = {
    Home: SectionModel,
    Carrinho: SectionModel,
    Historico: undefined
    Perfil: undefined,
    
}

export type BottomTabStack = NativeStackNavigationProp<BottomTabScreenProps>;

