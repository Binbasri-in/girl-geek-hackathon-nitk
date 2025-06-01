import React from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import { Shadow } from 'react-native-shadow-2';
import { useNavigation } from '@react-navigation/native';

import {
    COLORS,
    FONTS,
    SIZES,
    icons,
    dummyData
} from '../../../constants';

import {
    CartItemCard,
    FormInput,
    TextButton,
    PriceLabel,
    PriceLabelWithIcon,
    ShippingModal
} from '../../../components'

const YourCartTab = () => {

    const navigation = useNavigation();

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
        navigation.navigate("InvoiceConfirmation")
    }, []);

    function renderCouponSection() {
        return (
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.radius,
                    }}
                >
                    <FormInput
                        containerStyle={{
                            flex: 1,
                            borderRadius: SIZES.radius,
                        }}
                        inputContainerStyle={{
                            backgroundColor: COLORS.light
                        }}
                        placeholder="Coupon"
                        value=""
                        prependComponent={
                            <Image
                                source={icons.price_tag_fill}
                                style={{
                                    width: 25,
                                    height: 25,
                                    marginRight: SIZES.base
                                }}
                            />
                        }
                    />

                    <TextButton
                        label="Apply"
                        contentContainerStyle={{
                            width: 100,
                            marginLeft: SIZES.radius,
                            borderRadius: SIZES.radius
                        }}
                        onPress={() => {
                        }}
                    />
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.base
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.body4,
                            color: COLORS.grey80
                        }}
                    >
                        See more coupon
                    </Text>

                    <TextButton
                        label="See all"
                        labelStyle={{
                            color: COLORS.primary80
                        }}
                        contentContainerStyle={{
                            marginLeft: SIZES.base,
                            borderRadius: SIZES.radius,
                            backgroundColor: null
                        }}
                        onPress={() => {
                        }}
                    />
                </View>
            </View>
        )
    }

    function renderProvisionalInvoice() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    padding: SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.light
                }}
            >
                <PriceLabelWithIcon
                    icon={icons.credit_card}
                    label="Sub Total"
                    value={469}
                />

                <PriceLabelWithIcon
                    icon={icons.car}
                    label="Delivery"
                    value={37}
                    containerStyle={{
                        marginTop: SIZES.base
                    }}
                />

                <PriceLabelWithIcon
                    icon={icons.price_tag_fill}
                    label="Tax (5%)"
                    value={7}
                    containerStyle={{
                        marginTop: SIZES.base
                    }}
                />

                <PriceLabelWithIcon
                    icon={icons.clipboard}
                    label="Provisional Invoice"
                    value={415}
                    containerStyle={{
                        marginTop: SIZES.base
                    }}
                />
            </View>
        )
    }

    function renderCartList() {
        return (
            <KeyboardAwareFlatList
                data={dummyData.cart_list}
                keyExtractor={item => `cart_list-${item.id}`}
                enableOnAndroid={true}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps={"handled"}
                extraScrollHeight={30}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: SIZES.padding
                }}
                renderItem={({ item, index }) => (
                    <CartItemCard
                        containerStyle={{
                            marginTop: index > 0 ? SIZES.radius : 0,
                        }}
                        item={item}
                    />
                )}
                ListFooterComponent={
                    <View>
                        {/* Coupon */}
                        {renderCouponSection()}

                        {/* Provisional Invoice */}
                        {renderProvisionalInvoice()}
                    </View>
                }
            />
        )
    }

    function renderFooter() {
        return (
            <Shadow>
                <View
                    style={{
                        width: SIZES.width,
                        padding: SIZES.padding,
                        backgroundColor: COLORS.light
                    }}
                >
                    <PriceLabel
                        label="Total"
                        value={415}
                    />

                    <TextButton
                        label="Check Out"
                        contentContainerStyle={{
                            height: 50,
                            marginTop: SIZES.radius,
                            borderRadius: SIZES.radius
                        }}
                        onPress={() => showModal()}
                    />
                </View>
            </Shadow>
        )
    }

    return (
        <View
            style={{
                flex: 1
            }}
        >
            {/* Cart List */}
            {renderCartList()}

            {/* Footer */}
            {renderFooter()}

            {/* Modal */}
            <ShippingModal
                bottomSheetModalRef={bottomSheetModalRef}
                hideModal={hideModal}
                hideModalWithNavigation={hideModalWithNavigation}
            />
        </View>
    )
}

export default YourCartTab;