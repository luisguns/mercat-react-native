import { Image, View, Text, TouchableOpacity } from "react-native";
import styles from "./style";
import { useEffect, useState } from "react";

export default function NumberPickerComponent(props: {
    numberChanged: (number: number) => undefined
    initialNumber: number
}) {
    const [number, setNumber] = useState<number>(1);

    useEffect(() => {
        console.log(number)
        setNumber(props.initialNumber)
    }, [])

    useEffect(() => {
        props.numberChanged(number)
    }, [number])
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
