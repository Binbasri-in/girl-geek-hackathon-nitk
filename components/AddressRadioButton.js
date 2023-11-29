import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import {
    COLORS,
    FONTS,
} from "../constants"
import {
    TextAreaInput
} from "../components"

const AddressRadioButton = ({
    containerStyle,
    is_custom_addr,
    label,
    value,
    is_selected,
    onPress
}) => {
    if (is_custom_addr) {
        return (
            <View
                style={{
                    ...containerStyle
                }}
            >
                {/* Address label and radio button */}
                <TouchableOpacity
                    style={{
                        flexDirection: 'row'
                    }}
                    onPress={onPress}
                >
                    <Text
                        style={{
                            flex: 1,
                            ...FONTS.h3
                        }}
                    >
                        Send to a Different Address
                    </Text>

                    {/* Radio Button */}
                    <View
                        style={{
                            ...styles.radioButtonContainer,
                            borderColor: is_selected ? COLORS.primary : COLORS.grey
                        }}
                    >
                        {is_selected &&
                            <View
                                style={styles.radioButton}
                            />
                        }
                    </View>
                </TouchableOpacity>

                {/* Custom Address Input */}
                <TextAreaInput
                    editable={is_selected}
                />
            </View>
        )
    } else {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    ...containerStyle
                }}
                onPress={onPress}
            >
                {/* Address label and value */}
                <View
                    style={{
                        flex: 1
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.h3
                        }}
                    >
                        {label}
                    </Text>
                    <Text
                        style={{
                            ...FONTS.body3,
                            color: COLORS.grey
                        }}
                    >
                        {value}
                    </Text>
                </View>

                {/* Radio Button */}
                <View
                    style={{
                        ...styles.radioButtonContainer,
                        borderColor: is_selected ? COLORS.primary : COLORS.grey
                    }}
                >
                    {is_selected &&
                        <View
                            style={styles.radioButton}
                        />
                    }
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    radioButtonContainer: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 10,
    },
    radioButton: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: COLORS.primary
    }
})

export default AddressRadioButton;