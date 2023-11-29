import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';

import { FONTS, SIZES, COLORS } from "../constants"

const PriceLabel = ({
    containerStyle,
    label,
    labelStyle,
    value,
    valueStyle
}) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                ...containerStyle
            }}
        >
            {/* Label */}
            <Text
                style={{
                    flex: 1,
                    ...FONTS.h2,
                    ...labelStyle
                }}
            >
                {label}
            </Text>

            {/* Value */}
            <Text
                style={{
                    ...FONTS.h2,
                    ...valueStyle
                }}
            >
                $ {value.toFixed(2)}
            </Text>
        </View>
    )
}

export default PriceLabel;