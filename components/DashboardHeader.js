import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';

import { COLORS, FONTS, SIZES, icons } from "../constants"

const DashboardHeader = ({ containerStyle, title, titleStyle, rightComponent }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                height: 90,
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 35,
                paddingHorizontal: SIZES.padding,
                ...containerStyle
            }}
        >
            {/* Profile Image */}
            <Image source={icons.logo}
                style={{
                    height: 35,
                    width: 35,
                    borderRadius: 10
                }}
            />
            {/* Title */}
            <View style={{ flex: 1 }}>
                <Text
                    style={{
                        marginLeft: SIZES.radius, 
                        color: COLORS.light,
                        ...FONTS.h2,
                        ...titleStyle
                    }}
                >
                    {title}
                </Text>
            </View>

            {/* Right component */}
            {
                rightComponent
            }
        </View>
    )
}

export default DashboardHeader