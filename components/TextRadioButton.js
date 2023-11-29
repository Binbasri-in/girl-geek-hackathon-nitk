import React from 'react';
import {
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import { MotiView, useAnimationState } from 'moti'

import { FONTS, COLORS, SIZES } from "../constants";

const TextRadioButton = ({
    contentContainerStyle,
    label,
    labelStyle,
    value,
    onPress
}) => {

    const animationState = useAnimationState({
        on: {
            left: 20,
        },
        off: {
            left: 5
        },
    })

    const colorAnimationState = useAnimationState({
        on: {
            backgroundColor: COLORS.primary
        },
        off: {
            backgroundColor: COLORS.grey
        },
    })

    React.useEffect(() => {
        // Animation
        if (value) {
            animationState.transitionTo('on')
            colorAnimationState.transitionTo('on')
        } else {
            animationState.transitionTo('off')
            colorAnimationState.transitionTo('off')
        }
    }, [value])

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 40,
                ...contentContainerStyle
            }}
        >
            <Text
                style={{
                    flex: 1,
                    ...FONTS.h3,
                    ...labelStyle
                }}
            >
                {label}
            </Text>

            <TouchableOpacity
                onPress={onPress}
            >
                <MotiView
                    state={colorAnimationState}
                    style={{
                        justifyContent: 'center',
                        height: 25,
                        width: 45,
                        borderRadius: 25,
                        backgroundColor: COLORS.primary
                    }}
                >
                    <MotiView
                        state={animationState}
                        style={{
                            position: "absolute",
                            height: 20,
                            width: 20,
                            borderRadius: 10,
                            backgroundColor: "white",
                        }}
                    />
                </MotiView>
            </TouchableOpacity>
        </View>
    )
}

export default TextRadioButton;