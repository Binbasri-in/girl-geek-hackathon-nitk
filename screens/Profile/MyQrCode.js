import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet
} from 'react-native';
import { useDynamicAnimation, MotiView } from 'moti';
import { Shadow } from 'react-native-shadow-2';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {
    Header2,
    IconButton,
    TextButton,
    CoinLabel,
    FormInput,
    VerifyAccountModal
} from "../../components";
import {
    SIZES,
    COLORS,
    FONTS,
    icons,
    images
} from "../../constants";

const MyQrCode = () => {

    const [discountCode, setDiscountCode] = React.useState("");

    // Bottom Modal
    const bottomSheetModalRef = Rect.useRef(null);

    // callbacks
    const showModal = React.useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const hideModal = React.useCallback(() => {
        bottomSheetModalRef.current?.dismiss()
    }, []);

    const hideModalWithNavigation = React.useCallback(() => {
        console.log("hideModalWithNavigation")
        bottomSheetModalRef.current?.dismiss()
        //navigation.navigate("SearchProduct")
    }, []);

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
                title="My QR Code"
                containerStyle={{
                    marginBottom: SIZES.padding
                }}
                rightComponent={
                    <View
                        style={{
                            flexDirection: 'row'
                        }}
                    >
                        <IconButton
                            icon={icons.flash}
                            iconStyle={{
                                width: 25,
                                height: 25
                            }}
                        />

                        <IconButton
                            icon={icons.question_mark}
                            containerStyle={{
                                marginLeft: SIZES.base
                            }}
                            iconStyle={{
                                width: 25,
                                height: 25
                            }}
                        />
                    </View>
                }
            />
        )
    }

    function renderQRCode() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 2,
                    alignItems: 'center'
                }}
            >
                <Image
                    source={images.wallet_qrcode}
                    resizeMode="cover"
                    style={{
                        width: 200,
                        height: 200
                    }}
                />

                <Text
                    style={{
                        marginTop: SIZES.radius,
                        ...FONTS.body5,
                        color: COLORS.grey
                    }}
                >
                    Automatically update every 2 minutes
                </Text>
            </View>
        )
    }

    function renderDiscountCode() {
        return (
            <FormInput
                containerStyle={{
                    marginTop: SIZES.padding,
                    borderRadius: SIZES.radius
                }}
                inputContainerStyle={{
                    backgroundColor: COLORS.grey08
                }}
                placeholder="Enter a discount code"
                inputStyle={{
                    marginLeft: SIZES.radius
                }}
                value={discountCode}
                prependComponent={
                    <Image
                        source={icons.price_tag}
                        style={{
                            height: 25,
                            width: 25,
                        }}
                    />
                }
                appendComponent={
                    <IconButton
                        icon={icons.chevron_right}
                        iconStyle={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.dark
                        }}
                    />
                }
                onChange={(text) => {
                    setDiscountCode(text)
                }}
            />
        )
    }

    function renderCoins() {
        return (
            <View
                style={{
                    flexDirection: 'row'
                }}
            >
                {/* Coin */}
                <CoinLabel
                    icon={icons.shoppingBag}
                    value="1000"
                    label="Coin(s)"
                />

                <View
                    style={{
                        width: 2,
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
        )
    }

    function renderWalletInfo() {
        return (
            <MotiView
                delay={200}
                state={motiContainer}
            >
                <Shadow>
                    <View
                        style={styles.container}
                    >
                        {/* Coins and Golds */}
                        {renderCoins()}

                        {/* QR Code */}
                        {renderQRCode()}

                        {/* Discount Code */}
                        {renderDiscountCode()}

                        {/* Footer */}
                        <TextButton
                            label="Connect with Me"
                            contentContainerStyle={{
                                height: 55,
                                marginTop: SIZES.padding,
                                borderRadius: SIZES.radius,
                                backgroundColor: null
                            }}
                            labelStyle={{
                                color: COLORS.primary,
                            }}
                            onPress={() => showModal()}
                        />
                    </View>
                </Shadow>
            </MotiView>
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

            <KeyboardAwareScrollView
                enableOnAndroid={true}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps={"handled"}
                extraScrollHeight={50}
                contentContainerStyle={{
                    marginTop: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: SIZES.padding,
                }}
            >
                {/* Wallet Info */}
                {renderWalletInfo()}
            </KeyboardAwareScrollView>

            {/* VerifyAccountModal */}
            {/* Modal */}
            <VerifyAccountModal
                bottomSheetModalRef={bottomSheetModalRef}
                hideModal={hideModal}
                hideModalWithNavigation={hideModalWithNavigation}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: SIZES.width - (SIZES.padding * 2),
        paddingHorizontal: 20,
        paddingVertical: 25,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.light
    }
})

export default MyQrCode;