import React from 'react';
import {
    TouchableOpacity,
    Image
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { COLORS } from '../constants';

const IconButton = ({ containerStyle, icon, iconStyle, withShadow = false, onPress }) => {

    if (withShadow) {
        return (
            <Shadow>
                <TouchableOpacity
                    style={{
                        ...containerStyle
                    }}
                    onPress={onPress}
                >
                    <Image
                        source={icon}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: COLORS.white,
                            ...iconStyle
                        }}
                    />
                </TouchableOpacity>
            </Shadow>
        )
    } else {
        return (
            <TouchableOpacity
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...containerStyle
                }}
                onPress={onPress}
            >
                <Image
                    source={icon}
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30,
                        tintColor: COLORS.white,
                        ...iconStyle
                    }}
                />
            </TouchableOpacity>
        )
    }
}

export default IconButton;