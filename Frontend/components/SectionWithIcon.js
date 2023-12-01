import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';

import {
    TextButton
} from ".";
import { FONTS, SIZES, COLORS } from "../constants"

const SectionWithIcon = ({
    icon,
    title,
    containerStyle,
    seeMoreOnPress,
    children
}) => {
    return (
        <View
            style={{ ...containerStyle }}
        >
            <View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: 'center',
                        marginHorizontal: SIZES.padding
                    }}
                >
                    {/* Icon */}
                    <View
                        style={{
                            width: 40,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 20,
                            backgroundColor: COLORS.primary
                        }}
                    >
                        <Image
                            source={icon}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.light
                            }}
                        />
                    </View>

                    <Text
                        style={{
                            flex: 1,
                            ...FONTS.h2,
                            marginLeft: SIZES.radius,
                            fontSize: 18
                        }}
                    >
                        {title}
                    </Text>

                    <TextButton
                        label="See more >"
                        contentContainerStyle={{
                            backgroundColor: null
                        }}
                        labelStyle={{
                            color: COLORS.grey,
                            ...FONTS.body4
                        }}
                        onPress={seeMoreOnPress}
                    />
                </View>
            </View>

            {children}
        </View>
    )
}

export default SectionWithIcon