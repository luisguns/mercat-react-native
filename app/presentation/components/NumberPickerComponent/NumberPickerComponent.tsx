import { Image, View, Text, TouchableOpacity } from "react-native";
import styles from "./style";
import { useState } from "react";

export default function NumberPickerComponent() {
    const [number, setNumber] = useState<number>(1);
    return (
        <View style={styles.container}>
            <TouchableOpacity 
            onPress={() => { decrementNumber()}}>
                <Image
                    style={styles.imagePlus}
                    source={require("../../../assets/minus.png")}
                />
            </TouchableOpacity>
            <Text style={styles.numberText}> {number} </Text>

            <TouchableOpacity 
            onPress={() => { setNumber(number+1)}}>
                <Image
                    style={styles.imagePlus}
                    source={require("../../../assets/plus_icon.png")}
                />
            </TouchableOpacity>
        </View>
    );

    function decrementNumber() {
        if(number  > 1) {
            setNumber(number - 1)
        }
    }

}
