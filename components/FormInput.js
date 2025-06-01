import React from 'react';
import {
    View,
    Text,
    TextInput
} from 'react-native';

import { FONTS, SIZES, COLORS } from "../constants"

const FormInput = ({
    containerStyle,
    inputContainerStyle,
    placeholder,
    inputStyle,
    value = "",
    prependComponent,
    appendComponent,
    onChange,
    onPress,
    editable,
    secureTextEntry,
    keyboardType = "default",
    autoCompleteType = "off",
    autoCapitalize = "none",
    maxLength,
    placeholderTextColor = COLORS.grey60,
}) => {
    return (
        <View style={{ ...containerStyle }}>
            <View
                style={{
                    flexDirection: 'row',
                    height: SIZES.height > 800 ? 55 : 45,
                    paddingHorizontal: SIZES.radius,
                    borderRadius: SIZES.radius,
                    alignItems: 'center',
                    backgroundColor: COLORS.lightGrey,
                    ...inputContainerStyle
                }}
            >
                {
                    prependComponent
                }
                <TextInput
                    style={{
                        flex: 1,
                        paddingVertical: 0,
                        ...FONTS.body3,
                        ...inputStyle
                    }}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCompleteType={autoCompleteType}
                    autoCapitalize={autoCapitalize}
                    maxLength={maxLength}
                    onChangeText={(text) => onChange(text)}
                    onPressIn={onPress}
                    editable={editable}
                />
                {
                    appendComponent
                }
            </View>
        </View>
    )
}

export default FormInput