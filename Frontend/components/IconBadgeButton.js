import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { 
    COLORS,
    FONTS,
    SIZES
} from '../constants';

const IconBadgeButton = ({
    containerStyle,
    icon,
    iconStyle,
    showBadge = false,
    badgeContent,
    badgeStyle,
    badgeContentStyle,
    onPress 
}) => {

    function renderBadge() {
        if (badgeContent != null) {
            return (
                <View
                    style={{
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: COLORS.error,
                        borderColor: COLORS.lightGrey,
                        borderWidth: 1,
                        borderRadius: 7,
                        height: 14,
                        minWidth: 14,
                        paddingHorizontal: 2,
                        top: -4,
                        right: badgeContent < 100 ? -4 : -8,
                        ...badgeStyle
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.h5,
                            fontSize: 9,
                            lineHeight: 12,
                            color: COLORS.light,
                            ...badgeContentStyle
                        }}
                    >
                        {badgeContent < 100 ? badgeContent : "99+" }
                    </Text>
                </View>
            )
        }
        else {
            return (
                <View
                    style={{
                        position: 'absolute',
                        backgroundColor: COLORS.error,
                        borderColor: COLORS.lightGrey,
                        borderWidth: 1,
                        borderRadius: 4.5,
                        width: 9,
                        height: 9,
                        top: 0,
                        right: -1,
                        ...badgeStyle
                    }}
                />
            )
        }
    }

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

            {showBadge && renderBadge()}
        </TouchableOpacity>
    )
}

export default IconBadgeButton;