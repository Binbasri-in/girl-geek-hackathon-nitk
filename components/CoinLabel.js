import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

import { FONTS, SIZES, COLORS } from "../constants"

const CoinLabel = ({ icon, iconStyle, iconContainerStyle, value, label, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            onPress={onPress}
        >
            {/* Icon */}
            <View
                style={{
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.support1_08,
                    ...iconContainerStyle
                }}
            >
                <Image
                    source={icon}
                    style={{
                        width: 30,
                        height: 30,
                        tintColor: COLORS.support1,
                        ...iconStyle
                    }}
                />
            </View>

            {/* Details */}
            <View
                style={{
                    marginLeft: SIZES.radius
                }}
            >
                <Text
                    style={{
                        ...FONTS.h2,
                        color: COLORS.primary
                    }}
                >
                    {value}
                </Text>

                <Text
                    style={{
                        ...FONTS.body3,
                        color: COLORS.grey
                    }}
                >
                    {label}
                </Text>
            </View>
        </TouchableOpacity>

    )
}

export default CoinLabel;