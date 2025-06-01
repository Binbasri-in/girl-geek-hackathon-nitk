import React from "react";
import {
    View,
    Text,
    Image
} from 'react-native';
import {
    COLORS,
    FONTS,
    images
} from '../constants';

const EmptyState = ({ containerStyle, label }) => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                ...containerStyle
            }}
        >
            <Image
                source={images.not_found}
                resizeMode='contain'
                style={{
                    height: 140,
                    marginBottom: 40
                }}
            />

            <Text
                style={{
                    ...FONTS.body3,
                    fontSize: 15,
                    color: COLORS.grey
                }}
            >
                {label}
            </Text>
        </View>
    )
}

export default EmptyState;