import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { IconButton } from "../components";
import { FONTS, SIZES, icons } from "../constants"

const Header2 = ({ containerStyle, title }) => {

    const navigation = useNavigation();

    return (
        <View
            style={{
                flexDirection: 'row',
                marginTop: SIZES.padding * 2,
                paddingHorizontal: SIZES.padding,
                alignItems: 'center',
                ...containerStyle
            }}
        >
            {/* Back */}
            <IconButton
                icon={icons.arrow_left}
                onPress={() => navigation.goBack()}
            />

            {/* Title */}
            <Text
                style={{
                    marginLeft: SIZES.radius,
                    ...FONTS.h2
                }}
            >
                {title}
            </Text>
        </View>
    )
}

export default Header2