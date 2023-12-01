import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';

import { FONTS, SIZES, COLORS } from "../constants"

const PriceLabelWithIcon = ({ containerStyle, icon, label, value }) => {
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                ...containerStyle
            }}
        >
            {/* Icon */}
            <Image
                source={icon}
                style={{
                    width: 30,
                    height: 30,
                    tintColor: COLORS.grey60
                }}
            />

            {/* Label */}
            <Text
                style={{
                    flex: 1,
                    marginLeft: SIZES.radius,
                    color: COLORS.grey,
                    ...FONTS.body3
                }}
            >
                {label}
            </Text>

            {/* Value */}
            <Text
                style={{
                    ...FONTS.body3
                }}
            >
                $ {value.toFixed(2)}
            </Text>
        </View>
    )
}

export default PriceLabelWithIcon;