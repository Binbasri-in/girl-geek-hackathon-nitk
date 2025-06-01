import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet
} from 'react-native';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated';

import {
    Header2
} from "../../components";
import {
    SIZES,
    COLORS,
    FONTS,
    icons
} from "../../constants";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

const TermsOfUse = () => {

    // Ref
    const scrollViewRef = React.useRef()

    // Animation
    const scrollY = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    // Render

    function renderHeader() {
        return (
            <Header2
                title="Terms of Use"
            />
        )
    }

    function renderImage() {

        const inputRange = [0, 200];

        const imageOnScrollAnimatedStyle = useAnimatedStyle(() => {
            return {
                height: interpolate(scrollY.value, inputRange, [150, 50], Extrapolate.CLAMP),
                width: interpolate(scrollY.value, inputRange, [150, 50], Extrapolate.CLAMP),
                top: interpolate(scrollY.value, inputRange, [100, 40], Extrapolate.CLAMP),
                right: interpolate(scrollY.value, inputRange, [SIZES.width / 2 - 75, SIZES.padding], Extrapolate.CLAMP),
            };
        });

        return (
            <Animated.View
                style={[{
                    position: 'absolute',
                    top: 100,
                    right: SIZES.width / 2 - 75,
                    width: 150,
                    height: 150,
                    borderRadius: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: COLORS.primary08
                }, imageOnScrollAnimatedStyle]}
            >
                <Image
                    source={icons.logo}
                    style={{
                        width: "60%",
                        height: "60%",
                        borderRadius: 50
                    }}
                />
            </Animated.View>
        )
    }

    function renderIntroduction() {
        return (
            <View
                style={styles.container}
            >
                <Text
                    style={{
                        ...FONTS.h3
                    }}
                >
                    1. Introduction
                </Text>

                <Text
                    style={{
                        marginTop: SIZES.radius,
                        ...FONTS.body3
                    }}
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut lacus malesuada, tempus ipsum vel, efficitur urna. Maecenas lacinia tellus sem, non suscipit elit semper eget. In hac habitasse platea dictumst. Aliquam ultricies volutpat enim quis sodales. Maecenas accumsan congue laoreet. Morbi ac nunc eget ex viverra dapibus nec ut nisi. Nulla facilisi. Etiam eget imperdiet nulla. Fusce mollis a tortor ac ornare. Aliquam erat volutpat. Phasellus scelerisque quis sem id ornare. Nunc suscipit purus consequat sapien pharetra, a consectetur neque cursus.
                </Text>
            </View>
        )
    }

    function renderCancelOrder() {
        return (
            <View
                style={styles.container}
            >
                <Text
                    style={{
                        ...FONTS.h3
                    }}
                >
                    2. Cancel 
                </Text>

                <Text
                    style={{
                        marginTop: SIZES.radius,
                        ...FONTS.body3
                    }}
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut lacus malesuada, tempus ipsum vel, efficitur urna. Maecenas lacinia tellus sem, non suscipit elit semper eget. In hac habitasse platea dictumst. Aliquam ultricies volutpat enim quis sodales. Maecenas accumsan congue laoreet. Morbi ac nunc eget ex viverra dapibus nec ut nisi. Nulla facilisi. Etiam eget imperdiet nulla. Fusce mollis a tortor ac ornare. Aliquam erat volutpat. Phasellus scelerisque quis sem id ornare. Nunc suscipit purus consequat sapien pharetra, a consectetur neque cursus.
                </Text>
            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1
            }}
        >
            {/* Header */}
            {renderHeader()}

            {/* Image */}
            {renderImage()}

            <AnimatedScrollView
                ref={scrollViewRef}
                style={{
                    marginTop: 30
                }}
                contentContainerStyle={{
                    paddingTop: 150,
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: SIZES.padding,
                }}
                scrollEventThrottle={16}
                onScroll={onScroll}
            >
                {/* Introduction */}
                {renderIntroduction()}

                {/* Cancel Order */}
                {renderCancelOrder()}
            </AnimatedScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: SIZES.padding,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.light
    }
})

export default TermsOfUse;