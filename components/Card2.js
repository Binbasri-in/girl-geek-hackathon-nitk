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

const Card2 = ({
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
                ...containerStyle
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
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

                <Text
                    style={{
                        flex: 1,
                        marginLeft: SIZES.radius,
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
    )
}

export default Card2;