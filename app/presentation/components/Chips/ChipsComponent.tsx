import { View, Text, StyleProp, ViewStyle, Image, ImageSourcePropType } from 'react-native'
import styles from './style'

export type ChipsProps =  { 
    text: () => JSX.Element
    size: "Large" | "Medium",
    style?: StyleProp<ViewStyle>
    leftIcon?:  ImageSourcePropType
}
export default function ChipsComponent(props : ChipsProps) {
    return (
        <View style={[
            props.size ===  "Large" ? styles.containerLarge : styles.containerMedium,
            styles.defaultStyle,
            props?.style,
            ]}> 
            { props.leftIcon ? <Image style={styles.leftIcon} source={props.leftIcon}/> : undefined}
            <View style={styles.contentText}>
                {props.text()}
            </View>
        </View>
    )
};

