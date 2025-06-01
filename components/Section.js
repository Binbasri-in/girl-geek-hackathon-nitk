import React from 'react';
import {
    View,
    Text
} from 'react-native';

import {
    TextButton
} from "../components";
import { FONTS, SIZES, COLORS } from "../constants"

const Section = ({
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
                        marginHorizontal: SIZES.padding
                    }}
                >
                    <Text
                        style={{
                            flex: 1,
                            ...FONTS.h2,
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
                            ...FONTS.body3
                        }}
                        onPress={seeMoreOnPress}
                    />
                </View>
            </View>

            {children}
        </View>
    )
}

export default Section