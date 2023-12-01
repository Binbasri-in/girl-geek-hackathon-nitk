import React from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity
} from "react-native"
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { Shadow } from 'react-native-shadow-2';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated';

import {
    DashboardHeader,
    IconBadgeButton,
    IconButton,
    TextButton,
    CoinLabel,
    HorizontalIconLabelButton
} from "../../components"
import {
    COLORS,
    SIZES,
    icons,
    FONTS
} from "../../constants"

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

const HEADER_HEIGHT = 250;

const Profile = ({ cartQuantity }) => {

    const navigation = useNavigation();

    const scrollViewRef = React.useRef()
    const scrollY = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    // Render

    function renderHeaderBackground() {

        const inputRange = [0, 100];

        const headerHeightAnimatedStyle = useAnimatedStyle(() => {
            return {
                height: interpolate(scrollY.value, inputRange, [HEADER_HEIGHT, 230], Extrapolate.CLAMP),
            };
        });

        return (
            <Animated.View
                style={[{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: HEADER_HEIGHT,
                    backgroundColor: COLORS.primary
                }, headerHeightAnimatedStyle]}
            >

            </Animated.View>
        )
    }

    function renderHeader() {

        return (
            <View
                style={{
                    zIndex: 1
                }}
            >
                {renderHeaderBackground()}

                {renderHeaderTopBar()}

                {/* Profile */}
                {renderProfile()}

                {/* Coins */}
                {renderCoins()}
            </View>
        )
    }

    function renderHeaderTopBar() {
        return (
            <DashboardHeader
                title="Profile"
                rightComponent={
                    <View
                        style={{
                            flexDirection: "row"
                        }}
                    >
                        <IconButton
                            icon={icons.bell}
                            iconStyle={{
                                marginRight: SIZES.radius,
                                width: 25,
                                height: 25
                            }}
                            onPress={() => navigation.navigate("Notification")}
                        />

                        

                        <IconButton
                            icon={icons.qr_code}
                            iconStyle={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.light
                            }}
                            onPress={() => navigation.navigate("MyQrCode")}
                        />
                    </View>
                }

            />
        )
    }

    function renderProfile() {

        const headerHideOnScrollAnimatedStyle = useAnimatedStyle(() => {
            return {
                opacity: interpolate(scrollY.value, [80, 0], [0, 1], Extrapolate.CLAMP)
            };
        });

        return (
            <Animated.View
                style={[{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: SIZES.radius,
                    marginHorizontal: SIZES.padding
                }, headerHideOnScrollAnimatedStyle]}
            >
                {/* Profile Image */}
                <Image
                    source={icons.logo}
                    style={{
                        height: 60,
                        width: 60,
                        borderRadius: 30
                    }}
                />

                {/* Info */}
                <View
                    style={{
                        flex: 1,
                        alignItems: 'flex-start',
                        marginLeft: SIZES.radius
                    }}
                >
                    <Text
                        numberOfLines={1}
                        style={{
                            ...FONTS.h3,
                            color: COLORS.light
                        }}
                    >
                        RAGHAV KUMAR JHA
                    </Text>

                    <Text
                        style={{
                            ...FONTS.body3,
                            color: COLORS.light
                        }}
                    >
                        3k followers
                    </Text>

                    <TextButton
                        label="Personal Info"
                        contentContainerStyle={{
                            backgroundColor: null
                        }}
                        labelStyle={{
                            color: COLORS.secondary,
                            ...FONTS.h3
                        }}
                        onPress={() => navigation.navigate("PersonalInfo")}
                    />
                </View>

                {/* Change Account */}
                <TextButton
                    label="Manager"
                    contentContainerStyle={{
                        height: 40,
                        paddingHorizontal: SIZES.base,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.secondary
                    }}
                    labelStyle={{
                        color: COLORS.dark,
                        ...FONTS.h3
                    }}
                />
            </Animated.View>
        )
    }

    function renderCoins() {

        const inputRange = [0, 100];

        const coinsOnScrollAnimatedStyle = useAnimatedStyle(() => {
            return {
                transform: [
                    {
                        translateY: interpolate(scrollY.value, inputRange, [0, -90], Extrapolate.CLAMP),
                    }
                ],
            };
        });

        return (
            <Animated.View
                style={[{
                    position: 'absolute',
                    top: 170,
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                }, coinsOnScrollAnimatedStyle]}
            >
                <Shadow>
                    <View
                        style={{
                            flexDirection: 'row',
                            height: 100,
                            width: SIZES.width - (SIZES.padding * 2),
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.light
                        }}
                    >
                        {/* Coin */}
                        <CoinLabel
                            icon={icons.shoppingBag}
                            value="1000"
                            label="Coin(s)"
                            onPress={() => navigation.navigate("MyCoin")}
                        />

                        <View
                            style={{
                                width: 2,
                                marginVertical: SIZES.radius,
                                backgroundColor: COLORS.lightGrey
                            }}
                        />

                        {/* Loyalty Program */}
                        <CoinLabel
                            icon={icons.book_open}
                            value="1000"
                            label="Gold"
                            iconStyle={{
                                tintColor: COLORS.success
                            }}
                            iconContainerStyle={{
                                backgroundColor: COLORS.success08
                            }}
                        />
                    </View>
                </Shadow>
            </Animated.View>
        )
    }

    function renderOptionSection1() {
        return (
            <View
                style={{
                    padding: SIZES.radius,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.light
                }}
            >
                <HorizontalIconLabelButton
                    leftIcon={icons.globe1}
                    label1="Social Network Connection"
                />

                <HorizontalIconLabelButton
                    leftIcon={icons.price_tag}
                    label1="Promotion Code"
                    label2="You've 4 promotions"
                />

                <HorizontalIconLabelButton
                    leftIcon={icons.gift}
                    label1="Bonus Gift"
                />

                <HorizontalIconLabelButton
                    leftIcon={icons.layers}
                    label1="Performance"
                />

                <HorizontalIconLabelButton
                    leftIcon={icons.layout}
                    label1="AI Suggestion"
                />
            </View>
        )
    }

    function renderOptionSection2() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    padding: SIZES.radius,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.light
                }}
            >
    
                <HorizontalIconLabelButton
                    rightIcon={icons.chevron_right}
                    label1="Favourite"
                />

                <HorizontalIconLabelButton
                    rightIcon={icons.chevron_right}
                    label1="Calendar"
                />

                <HorizontalIconLabelButton
                    rightIcon={icons.chevron_right}
                    label1="Setting"
                    onPress={() => navigation.navigate("Settings")}
                />

                <HorizontalIconLabelButton
                    rightIcon={icons.chevron_right}
                    label1="Support"
                    onPress={() => navigation.navigate("Support")}
                />

                <HorizontalIconLabelButton
                    rightIcon={icons.chevron_right}
                    label1="Terms of Use"
                    onPress={() => navigation.navigate("TermsOfUse")}
                />
            </View>
        )
    }

    function renderLogoutButton() {
        return (
            <TextButton
                label="Logout"
                contentContainerStyle={{
                    marginTop: SIZES.radius,
                    height: 50,
                    borderWidth: 2,
                    borderRadius: SIZES.radius,
                    borderColor: COLORS.primary,
                    backgroundColor: COLORS.light
                }}
                labelStyle={{
                    color: COLORS.primary,
                    ...FONTS.h3
                }}
            />
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.lightGrey
            }}
        >
            {/* Header */}
            {renderHeader()}

            {/* Options */}
            <AnimatedScrollView
                ref={scrollViewRef}
                contentContainerStyle={{
                    marginTop: 150,
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: 170
                }}
                scrollEventThrottle={16}
                onScroll={onScroll}
            >
                {renderOptionSection1()}
                {renderOptionSection2()}
                {renderLogoutButton()}
            </AnimatedScrollView>
        </View>
    )
}

function mapStateToProps(state) {
    return {
        cartQuantity: state.cartReducer.cartQuantity,
    }
}

export default connect(mapStateToProps)(Profile);