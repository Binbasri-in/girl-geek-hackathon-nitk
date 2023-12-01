import React from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Text
} from 'react-native';

import { COLORS, FONTS, SIZES } from '../constants';

const IconLabelButton = ({
    bgColor,
    icon,
    label,
    onPress
}) => {
    return (
        <TouchableOpacity
            style={{
                width: 80,
                alignItems: 'center',
                justifyContent: 'center'
            }}
            onPress={onPress}
        >
            <View
                style={{
                    width: 55,
                    height: 55,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: SIZES.radius,
                    backgroundColor: bgColor
                }}
            >
                <Image
                    source={icon}
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30
                    }}
                />
            </View>
            <Text
                style={{
                    marginTop: 5,
                    ...FONTS.body3
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    )
}

export default IconLabelButton;