import Snackbar from 'react-native-snackbar'
import Colors from '../../values/colors';
export default function SnackbarError(mensage?: string, action?: () => undefined){
    return Snackbar.show({
        text: mensage ? mensage : "",
        textColor: Colors.light,
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
            text: "Ok",
            textColor: Colors.light,
            onPress: () => {
                if(action) {
                    action()
                    return
                }
                Snackbar.dismiss()
            }
        }
    });
}