import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';

import { FONTS, SIZES, COLORS, icons } from "../constants"

const CheckBox = ({
    containerStyle,
    isSelected,
    onPress,
    label,
    labelStyle
}) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                ...containerStyle
            }}
            onPress={onPress}
        >
            <View
                style={{
                    width: 25,
                    height: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: SIZES.base,
                    borderWidth: 3,
                    borderColor: isSelected ? COLORS.primary : COLORS.grey,
                    backgroundColor: isSelected ? COLORS.primary : null
                }}
            >
                {isSelected &&
                    <Image
                        source={icons.checkmark}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.light
                        }}
                    />
                }
            </View>

            {label &&
                <Text
                    style={{
                        flex: 1,
                        marginLeft: SIZES.base,
                        ...FONTS.body5,
                        lineHeight: 20,
                        ...labelStyle
                    }}
                >
                    {label}
                </Text>
            }
        </TouchableOpacity>
    )
}

export default CheckBox;