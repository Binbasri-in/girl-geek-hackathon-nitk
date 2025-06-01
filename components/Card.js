import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';

import {
    TextButton
} from '.';

import {
    COLORS,
    SIZES,
    FONTS
} from '../constants';

const Card = ({
    containerStyle,
    icon,
    iconStyle,
    title,
    titleStyle,
    buttonLabel,
    buttonOnClick,
    children
}) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                ...containerStyle
            }}
        >
            <Image
                source={icon}
                resizeMode='contain'
                style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.light,
                    ...iconStyle
                }}
            />

            <View
                style={{
                    flex: 1,
                    marginLeft: SIZES.radius
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                    }}
                >
                    <Text
                        style={{
                            flex: 1,
                            ...FONTS.h3,
                            color: COLORS.light,
                            ...titleStyle
                        }}
                    >
                        {title}
                    </Text>

                    {buttonLabel &&
                        <TextButton
                            label={buttonLabel}
                            contentContainerStyle={{
                                backgroundColor: null
                            }}
                            labelStyle={{
                                color: COLORS.support3
                            }}
                            onPress={buttonOnClick}
                        />
                    }
                </View>

                {children}
            </View>
        </View>
    )
}

export default Card;