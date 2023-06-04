import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./style";
import Colors from "../../values/colors";

//TODO change to generic component
export default function FloatingActionButton(props: {
    onPress: () => undefined;
    hasTitle: boolean
}) {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            {!props.hasTitle ? imageOnly() : imageAndTitle()}
        </TouchableOpacity>
    );
}
function imageOnly() {
    return <View>
        <Image style={styles.image} source={require("../../../assets/plus_icon.png")} />
    </View>;
}

function imageAndTitle() {
    return <View style={{ 
        flexDirection: "row",
        alignItems: "center"
        }}>
        <Text style={{
            color: Colors.light,
            marginEnd: 12,
            fontWeight: "500"
        }}>Adicionar</Text>
        <Image style={styles.image} source={require("../../../assets/plus_icon.png")} />
    </View>;
}



