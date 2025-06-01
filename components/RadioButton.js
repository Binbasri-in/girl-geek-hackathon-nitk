import React from "react";
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import {
    COLORS,
    FONTS
} from "../constants";

const RadioButton = ({
    containerStyle,
    title,
    subtitle,
    isSelected,
    onPress
}) => {
    return (
        <TouchableOpacity 
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                ...containerStyle
            }}
            onPress={onPress}
        >
            <View>
                <Text
                    style={{
                        ...FONTS.h3,
                        color: COLORS.dark
                    }}
                >
                    {title}
                </Text>

                <Text
                    style={{
                        ...FONTS.body3,
                        color: COLORS.grey,
                        marginTop: 4
                    }}
                >
                    {subtitle}
                </Text>
            </View>

            <View>
                <View
                    style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: isSelected ? COLORS.primary : COLORS.grey,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {isSelected &&
                        <View
                            style={{
                                width: 10,
                                height: 10,
                                borderRadius: 5,
                                backgroundColor: COLORS.primary
                            }}
                        />
                    }
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default RadioButton;