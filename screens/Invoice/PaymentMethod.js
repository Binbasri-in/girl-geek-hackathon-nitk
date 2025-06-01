import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ImageBackground
} from 'react-native';

import {
    Header2,
    TextButton,
    PaymentSuccessfulModal
} from "../../components";
import {
    SIZES,
    COLORS,
    FONTS,
    icons,
    dummyData
} from "../../constants";

const PaymentMethod = ({ navigation }) => {

    const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState("")
    var defaultCard = dummyData?.list_of_cards.find(function (card) {
        return card.is_default
    });

    // Modal
    const bottomSheetModalRef = React.useRef(null)

    const showModal = React.useCallback(() => {
        bottomSheetModalRef.current?.present()
    }, [])

    const hideModal = React.useCallback((selectedOption) => {
        bottomSheetModalRef.current?.dismiss()
    }, [])

    const hideModalWithNavigation = React.useCallback(() => {
        bottomSheetModalRef.current?.dismiss()
    }, []);

    // Render

    function renderHeader() {
        return (
            <Header2
                title="Payment Method"
            />
        )
    }

    function renderPaymentMethodOptions() {
        return (
            <View
                style={{
                    marginTop: SIZES.radius
                }}
            >
                {/* Title */}
                <Text
                    style={{
                        ...FONTS.h3
                    }}
                >
                    Select Payment Method
                </Text>

                {/* Selection */}
                <View
                    style={{
                        marginTop: SIZES.radius,
                        paddingVertical: SIZES.base,
                        paddingHorizontal: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.light
                    }}
                >
                    {dummyData?.payment_methods?.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={`payment_method-${index}`}
                                style={{
                                    flexDirection: 'row',
                                    marginVertical: SIZES.base,
                                    alignItems: 'center'
                                }}
                                onPress={() => setSelectedPaymentMethod(item.id)}
                            >
                                {/* Logo */}
                                <View
                                    style={{
                                        width: 100,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: SIZES.radius,
                                        backgroundColor: COLORS.lightGrey
                                    }}
                                >
                                    <Image
                                        source={item.icon}
                                        resizeMode='contain'
                                        style={{
                                            width: 80,
                                            height: 50,
                                        }}
                                    />
                                </View>

                                {/* Label */}
                                <Text
                                    style={{
                                        flex: 1,
                                        ...FONTS.h3,
                                        marginLeft: SIZES.radius
                                    }}
                                >
                                    {item?.name}
                                </Text>

                                {/* Radio Button */}
                                <View
                                    style={{
                                        width: 25,
                                        height: 25,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 15,
                                        borderWidth: 2,
                                        borderColor: selectedPaymentMethod == item.id ? COLORS.primary : COLORS.grey60,
                                        backgroundColor: selectedPaymentMethod == item.id ? COLORS.primary : null
                                    }}
                                >
                                    {selectedPaymentMethod == item.id &&
                                        <Image
                                            source={icons.checkmark}
                                            resizeMode='contain'
                                            style={{
                                                width: 20,
                                                height: 20,
                                                tintColor: COLORS.light
                                            }}
                                        />
                                    }
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        )
    }

    function renderDefaultCard() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                }}
            >
                <ImageBackground
                    source={defaultCard?.bg_img}
                    resizeMode='cover'
                    style={{
                        height: 210,
                        padding: SIZES.radius,
                        justifyContent: 'flex-end',
                        borderRadius: 16,
                        overflow: 'hidden'
                    }}
                >
                    {/* Card Number */}
                    <Text
                        style={{
                            ...FONTS.h2,
                            color: COLORS.light
                        }}
                    >
                        {defaultCard?.card_no}
                    </Text>

                    {/* Name and Type */}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                flex: 1,
                                ...FONTS.h2,
                                color: COLORS.light
                            }}
                        >
                            {defaultCard?.name}
                        </Text>

                        <Image
                            source={defaultCard?.icon}
                            resizeMode='contain'
                            style={{
                                width: 50,
                                height: 50,
                            }}
                        />
                    </View>
                </ImageBackground>

                {/* See All Cards */}
                <TextButton
                    label="See all cards"
                    contentContainerStyle={{
                        marginTop: SIZES.radius,
                        backgroundColor: null
                    }}
                    labelStyle={{
                        color: COLORS.support3
                    }}
                    onPress={() => navigation.navigate("ManageCard")}
                />
            </View>
        )
    }

    function renderFooter() {
        return (
            <View>
                <TextButton
                    label="Confirm"
                    contentContainerStyle={{
                        height: 55,
                        marginHorizontal: SIZES.padding,
                        marginBottom: SIZES.padding,
                        borderRadius: SIZES.radius,
                    }}
                    onPress={showModal}
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

            {/* Body */}
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding
                }}
            >
                {/* Payment Method Options */}
                {renderPaymentMethodOptions()}

                {/* Default Card */}
                {renderDefaultCard()}
            </ScrollView>

            {/* Footer */}
            {renderFooter()}

            {/* Modal */}
            <PaymentSuccessfulModal
                orderNumber="123456"
                bottomSheetModalRef={bottomSheetModalRef}
                hideModal={hideModal}
                hideModalWithNavigation={hideModalWithNavigation}
            />
        </View>
    )
}

export default PaymentMethod;