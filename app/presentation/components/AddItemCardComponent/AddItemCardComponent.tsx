import { StyleProp, Text, TextInput, View, ViewStyle } from "react-native";
import styles from "./style";
import defaultStyles from "../../values/styles";

import CheckBox from "@react-native-community/checkbox";
import Colors from "../../values/colors";
import { LabelHighlight } from "../../values/themes";
import { useState } from "react";
import SecondaryButton from "../ButtonComponent/SecondaryButton";
import NumberPickerComponent from "../NumberPickerComponent/NumberPickerComponent";

export default function AddItemCardComponent(props: {
    syle?: StyleProp<ViewStyle>;
}) {

    const [toggleCheckBox, setToggleCheckBox] = useState<boolean>()

    return (
        <View style={[styles.container, props?.syle]}>
            <TextInput
                style={[defaultStyles.primaryInputText, styles.nameTextInput]}
                placeholder="Nome do produto"
            />

            <View style={[defaultStyles.row, {justifyContent: "space-between" }]}>
                <TextInput
                    style={[
                        defaultStyles.primaryInputText,
                        styles.valueTextInput,
                        
                    ]}
                    placeholder="R$ 00"
                />
                <View style={[defaultStyles.row, {alignSelf: "center"}]}>
                    <CheckBox
                        disabled={false}
                        tintColors={{
                            true: Colors.primaryDark,
                            false: Colors.primary,
                        }}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    />
                    <Text style={[LabelHighlight(), {alignSelf: "center", color: Colors.primary}]}>promoção</Text>
                </View>
            </View>

            <View style={[defaultStyles.row, {marginTop: 19, justifyContent: "space-between", alignItems: "center"}]} >
                <NumberPickerComponent/>
                <SecondaryButton 
                size="Medium" 
                text="Adicionar Item" 
                textStyle={{fontWeight: "900"}}
                style={{paddingHorizontal: 32}}/>
            </View>
        </View>
    );
}
