import React from 'react';
import {
    View,
    TextInput
} from 'react-native';

import { FONTS, SIZES, COLORS } from "../constants"

const TextAreaInput = ({
    containerStyle,
    inputStyle,
    value = "",
    onChange = () => { },
    editable,
}) => {
    return (
        <View
            style={{
                height: 100,
                marginTop: SIZES.radius,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.lightGrey,
                ...containerStyle
            }}
        >
            <TextInput
                style={{
                    flex: 1,
                    padding: SIZES.radius,
                    ...FONTS.body3,
                    ...inputStyle
                }}
                value={value}
                editable={editable}
                multiline={true}
                onChangeText={(text) => onChange(text)}
            />
        </View>
    )
}

export default TextAreaInput;