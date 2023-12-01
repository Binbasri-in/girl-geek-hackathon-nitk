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
    Header2,
    TextRadioButton
} from "../../components";
import {
    SIZES,
    COLORS,
    FONTS,
    icons
} from "../../constants";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

const Settings = () => {

    // State
    const [notification, setNotification] = React.useState(true)
    const [askBeforeBuy, setAskBeforeBuy] = React.useState(false)
    const [colorBlindMode, setColorBlindMode] = React.useState(false)
    const [setupWidget, setSetupWidget] = React.useState(false)
    const [personalComm, setPersonalComm] = React.useState(false)
    const [subLanguage, setSubLanguage] = React.useState(false)
    const [sound, setSound] = React.useState(false)

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
                title="Settings"
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
                    source={icons.settings}
                    style={{
                        width: "60%",
                        height: "60%",
                        borderRadius: 50
                    }}
                />
            </Animated.View>
        )
    }

    function renderSection1() {
        return (
            <View
                style={styles.container}
            >
                <TextRadioButton
                    label="Notifications"
                    value={notification}
                    onPress={() => setNotification(!notification)}
                />

                <TextRadioButton
                    label="Dark Mode"
                    value={askBeforeBuy}
                    onPress={() => setAskBeforeBuy(!askBeforeBuy)}
                />

                <TextRadioButton
                    label="Color blind mode"
                    value={colorBlindMode}
                    onPress={() => setColorBlindMode(!colorBlindMode)}
                />

                <TextRadioButton
                    label="Setup Width"
                    value={setupWidget}
                    onPress={() => setSetupWidget(!setupWidget)}
                />
            </View>
        )
    }

    function renderSection2() {
        return (
            <View
                style={styles.container}
            >
                <TextRadioButton
                    label="Personal Communication"
                    value={personalComm}
                    onPress={() => setPersonalComm(!personalComm)}
                />

                <TextRadioButton
                    label="Sub Langugage"
                    value={subLanguage}
                    onPress={() => setSubLanguage(!subLanguage)}
                />

                <TextRadioButton
                    label="Sound"
                    value={sound}
                    onPress={() => setSound(!sound)}
                />
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
                {/* Section 1 */}
                {renderSection1()}

                {/* Section 2 */}
                {renderSection2()}
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

export default Settings;