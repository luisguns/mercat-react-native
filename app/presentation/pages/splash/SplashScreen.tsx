import { View, Image,ActivityIndicator, StatusBar } from 'react-native'
import styles from './style'
import Colors from '../../values/colors'
import {useEffect} from 'react'
import { AuthenticationController } from '../../controller/AuthenticationController/AuthenticationController'
import SectionController from '../../controller/SectionController/SectionController'
import { auth } from '../../../config/firebaseconfig'
import { useNavigation } from '@react-navigation/native'
import { StackProps } from '../pageconfig/screenprops'
import { SuccessUiState, UiState } from '../../../helper/UiState'
import SectionModel from '../../../domain/models/SectionModel'


let sectionController: SectionController

export default function SplashScreen() {
    const navigation = useNavigation<StackProps>()

    useEffect(() => {


        if (!sectionController) {
            sectionController = new SectionController()
        }


        if(!sectionController.observableSectionGet.observable) {
            setSectionObserver()
        }

        if (!auth().currentUser) {
            navigation.replace('LoginScreen')
        } else {
            const uid = auth().currentUser?.uid
            if(uid){
                sectionController.getSectionByUid(uid, false)
            } else {
                singOut()
            }
        }
    }, [])

    function setSectionObserver() {
        sectionController.observableSectionGet.observe(observerSectionListen)
    }

    function observerSectionListen(state: UiState<SectionModel[]>): undefined {
        const data = state.data
        if (state instanceof SuccessUiState) {
            if(data?.length && data.length == 1) {
                navigation.replace('BottomNavigation', data[0])
            } else if (data?.length && data.length > 1) {
                // HAVE TO GO CHOSEN SCREEN
            } else if (data?.length == 0) {
                navigation.replace('PlaceHome')
            }
        }
    }

    async function singOut() {
        await auth().signOut()
        .then(() => {
            navigation.replace('LoginScreen')
        })
    }

    return (
        <View style={styles.container}> 
            <StatusBar backgroundColor={Colors.grayScale050} barStyle={"dark-content"}/>
            <Image source={require("../../../../assets/splash.png")} style={{
                width: '50%',
                height: '50%',
            }}/>

            <ActivityIndicator size={'large'} color={Colors.primary}/>
        </View>
    )
};



