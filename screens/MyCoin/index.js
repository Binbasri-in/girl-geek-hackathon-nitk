import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { useDynamicAnimation, MotiView } from 'moti';
import { Shadow } from 'react-native-shadow-2';

import {
    Header2,
    IconButton,
    TextButton,
    HorizontalIconLabelButton
} from "../../components";
import {
    SIZES,
    COLORS,
    FONTS,
    icons
} from "../../constants";

const RedeemCard = ({ containerStyle, title, description }) => {
    return (
        <View
            style={{
                marginTop: SIZES.radius,
                paddingVertical: SIZES.padding,
                paddingHorizontal: SIZES.padding,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.support1,
                ...containerStyle
            }}
        >
            <Text
                style={{
                    ...FONTS.h2,
                    fontSize: 21,
                    color: COLORS.light
                }}
            >
                {title}
            </Text>

            <Text
                style={{
                    marginTop: SIZES.radius,
                    ...FONTS.body3,
                    color: COLORS.light
                }}
            >
                {description}
            </Text>

            <View
                style={{
                    marginTop: SIZES.padding,
                    alignItems: 'flex-end'
                }}
            >
                <TextButton
                    label="Redeem Now"
                    labelStyle={{
                        color: COLORS.primary
                    }}
                    contentContainerStyle={{
                        height: 50,
                        paddingHorizontal: SIZES.radius,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.light
                    }}
                />
            </View>
        </View>
    )
}
const MyCoin = ({ navigation }) => {

    // Moti
    const motiContainer = useDynamicAnimation(() => ({
        opacity: 0,
        marginTop: SIZES.padding * 2
    }));

    React.useEffect(() => {
        motiContainer.animateTo({
            opacity: 1,
            marginTop: SIZES.padding
        });
    }, [])

    // Render

    function renderHeader() {
        return (
            <Header2
                title="My Coin"
                containerStyle={{
                    marginBottom: SIZES.padding
                }}
                rightComponent={
                    <IconButton
                        icon={icons.headphones_fill}
                        iconStyle={{
                            width: 25,
                            height: 25
                        }}
                    />
                }
            />
        )
    }

    function renderCoinSection() {
        return (
            <View
                style={{
                    paddingVertical: SIZES.radius,
                    alignItems: 'center'
                }}
            >
                <Shadow>
                    <TouchableOpacity
                        style={styles.container}
                        onPress={() => navigation.navigate("HistoryCoin")}
                    >
                        {/* Image and full name */}
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                source={icons.shopping_bag_fill}
                                style={{
                                    width: 50,
                                    height: 50,
                                }}
                            />

                            <Text
                                style={{
                                    width: 50,
                                    ...FONTS.body3,
                                    marginLeft: SIZES.radius
                                }}
                            >
                                You have
                            </Text>

                            <Text
                                style={{
                                    flex: 1,
                                    textAlign: 'center',
                                    ...FONTS.h3,
                                    color: COLORS.primary
                                }}
                            >
                                1000 coins
                            </Text>

                            <Image
                                source={icons.chevron_right}
                                style={{
                                    width: 40,
                                    height: 40
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                </Shadow>
            </View>
        )
    }

    function renderOptions() {
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
                    label1="Buy coins"
                />

                <HorizontalIconLabelButton
                    rightIcon={icons.chevron_right}
                    label1="Earn coins"
                />

                <HorizontalIconLabelButton
                    rightIcon={icons.chevron_right}
                    label1="Learn more about coins"
                />

                <HorizontalIconLabelButton
                    rightIcon={icons.chevron_right}
                    label1="Bonus Spins"
                    onPress={() => navigation.navigate("BonusSpins")}
                />
            </View>
        )
    }

    function renderRedeemGiftCodes() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding
                }}
            >
                <Text
                    style={{
                        ...FONTS.body3,
                        color: COLORS.grey
                    }}
                >
                    Redeem gift codes
                </Text>

                <RedeemCard
                    title="Invite friend and get 5% off"
                    description="Share the app with your friends and get 5% off on your next purchase"
                    containerStyle={{
                        backgroundColor: COLORS.support1
                    }}
                />

                <RedeemCard
                    title="Invite friend and get 5% off"
                    description="Share the app with your friends and get 5% off on your next purchase"
                    containerStyle={{
                        backgroundColor: COLORS.support3
                    }}
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

            {/* Coin Section */}
            {renderCoinSection()}

            <ScrollView
                contentContainerStyle={{
                    //paddingTop: SIZES.padding,
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: SIZES.padding,
                }}
            >
                {/* Options */}
                {renderOptions()}

                {/* Redeem Gift Codes */}
                {renderRedeemGiftCodes()}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        //alignSelf: 'center',
        width: SIZES.width - (SIZES.padding * 2),
        paddingHorizontal: 20,
        paddingVertical: 25,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.light
    }
})

export default MyCoin;