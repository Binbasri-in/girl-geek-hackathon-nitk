import React from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Text
} from 'react-native';

import { COLORS, FONTS, SIZES } from '../constants';

const HorizontalIconLabelButton = ({
    leftIcon,
    rightIcon,
    label1,
    label2,
    containerStyle,
    labelContainerStyle,
    label1Style,
    label2Style,
    iconStyle,
    onPress
}) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: SIZES.base,
                ...containerStyle
            }}
            onPress={onPress}
        >
            {/* Left Icon */}
            {leftIcon &&
                <Image
                    source={leftIcon}
                    style={{
                        width: 30,
                        height: 30,
                        tintColor: COLORS.dark,
                        ...iconStyle
                    }}
                />
            }

            <View
                style={{
                    flex: 1,
                    ...labelContainerStyle
                }}
            >
                <Text
                    style={{
                        marginLeft: SIZES.radius,
                        ...FONTS.h3,
                        ...label1Style
                    }}
                >
                    {label1}
                </Text>

                {label2 &&
                    <Text
                        style={{
                            marginLeft: SIZES.radius,
                            color: COLORS.grey,
                            ...FONTS.body3,
                            ...label2Style
                        }}
                    >
                        {label2}
                    </Text>
                }
            </View>

            {/* Right Icon */}
            {rightIcon &&
                <Image
                    source={rightIcon}
                    style={{
                        width: 30,
                        height: 30,
                        marginLeft: SIZES.radius,
                        tintColor: COLORS.grey,
                        ...iconStyle
                    }}
                />
            }
        </TouchableOpacity>
    )
}

export default HorizontalIconLabelButton;