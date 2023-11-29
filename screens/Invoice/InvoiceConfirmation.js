import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import {
    Header2,
    Card,
    Card2,
    PriceLabel,
    HorizontalIconLabelButton,
    TextButton
} from "../../components";
import {
    SIZES,
    COLORS,
    FONTS,
    icons,
    dummyData
} from "../../constants";

const InvoiceConfirmation = ({ navigation }) => {

    // Render

    function renderHeader() {
        return (
            <Header2
                title="Invoice Confirmation"
            />
        )
    }

    function renderInfoProduct() {
        return (
            <Card2
                containerStyle={{
                    ...styles.cardContainer,
                    marginTop: 0
                }}
                icon={icons.cube}
                iconStyle={{
                    tintColor: COLORS.grey
                }}
                title="Info Product"
                titleStyle={{
                    color: COLORS.dark
                }}
                buttonLabel="Edit"
                buttonOnClick={() => console.log("Edit")}
            >
                {/* Products */}
                {dummyData?.invoice_confirmation?.products?.map((product, index) => {
                    return (
                        <View
                            key={`product-${index}`}
                            style={{
                                flexDirection: 'row',
                                paddingVertical: SIZES.base,
                            }}
                        >
                            <Image
                                source={product?.img}
                                resizeMode='contain'
                                style={{
                                    width: 80,
                                    height: 80
                                }}
                            />

                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    marginLeft: SIZES.radius
                                }}
                            >
                                {/* Product Title */}
                                <Text
                                    style={{
                                        ...FONTS.body3,
                                        color: COLORS.grey
                                    }}
                                >
                                    {product.title}
                                </Text>


                                {/* Description and Product Price */}
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginTop: SIZES.base
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...FONTS.body3
                                        }}
                                    >
                                        {product?.desc}
                                    </Text>

                                    <Text
                                        style={{
                                            ...FONTS.h3,
                                            color: COLORS.primary
                                        }}
                                    >
                                        $ {product.price.toFixed(2)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )
                })}
            </Card2>
        )
    }

    function renderDeliveryAddress() {
        return (
            <Card
                containerStyle={styles.cardContainer}
                icon={icons.location}
                iconStyle={{
                    tintColor: COLORS.grey
                }}
                title="Delivery Address"
                titleStyle={{
                    color: COLORS.dark
                }}
                buttonLabel="Edit"
                buttonOnClick={() => console.log("Edit")}
            >
                <View>
                    {/* Name */}
                    <Text
                        style={{
                            marginTop: SIZES.base,
                            ...FONTS.body3,
                            color: COLORS.grey
                        }}
                    >
                        {dummyData?.invoice_confirmation?.delivery_addr?.name}
                    </Text>

                    {/* Phone Number */}
                    <Text
                        style={{
                            marginTop: SIZES.base,
                            ...FONTS.body3,
                            color: COLORS.grey
                        }}
                    >
                        {dummyData?.invoice_confirmation?.delivery_addr?.mobile}
                    </Text>

                    {/* Address */}
                    <Text
                        style={{
                            marginTop: SIZES.base,
                            ...FONTS.h3,
                            color: COLORS.primary
                        }}
                    >
                        {dummyData?.invoice_confirmation?.delivery_addr?.address}
                    </Text>
                </View>
            </Card>
        )
    }

    function renderFormOfDelivery() {
        return (
            <Card
                containerStyle={styles.cardContainer}
                icon={icons.car}
                iconStyle={{
                    tintColor: COLORS.grey
                }}
                title="Form of Delivery"
                titleStyle={{
                    color: COLORS.dark
                }}
                buttonLabel="Edit"
                buttonOnClick={() => console.log("Edit")}
            >
                <View>
                    {/* Company and Delivery Type */}
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: SIZES.base
                        }}
                    >
                        {/* Company */}
                        <Text
                            style={{
                                ...FONTS.body3,
                                color: COLORS.primary
                            }}
                        >
                            {dummyData?.invoice_confirmation?.delivery_method?.company}
                        </Text>

                        {/* Phone Number */}
                        <Text
                            style={{
                                marginLeft: SIZES.base,
                                ...FONTS.body3,
                                color: COLORS.grey
                            }}
                        >
                            {dummyData?.invoice_confirmation?.delivery_method?.method}
                        </Text>
                    </View>

                    {/* Date */}
                    <Text
                        style={{
                            marginTop: SIZES.base,
                            ...FONTS.h3,
                            color: COLORS.primary
                        }}
                    >
                        {dummyData?.invoice_confirmation?.delivery_method?.date_of_arrival}
                    </Text>
                </View>
            </Card>
        )
    }

    function renderPaymentMethod() {
        return (
            <Card
                containerStyle={styles.cardContainer}
                icon={icons.credit_card}
                iconStyle={{
                    tintColor: COLORS.grey
                }}
                title="Payment Method"
                titleStyle={{
                    color: COLORS.dark
                }}
                buttonLabel="Edit"
                buttonOnClick={() => console.log("Edit")}
            >
                {/* Method */}
                <Text
                    style={{
                        marginTop: SIZES.base,
                        ...FONTS.body3,
                        color: COLORS.grey
                    }}
                >
                    {dummyData?.invoice_confirmation?.payment_method?.method}
                </Text>

                {/* Card Number */}
                <Text
                    style={{
                        marginTop: SIZES.base,
                        ...FONTS.h3,
                        color: COLORS.primary
                    }}
                >
                    {dummyData?.invoice_confirmation?.payment_method?.card_no}
                </Text>
            </Card>
        )
    }

    function renderSubTotal() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    paddingVertical: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.light
                }}
            >
                {/* Total */}
                <PriceLabel
                    containerStyle={{
                        marginTop: SIZES.base
                    }}
                    label="Total Product"
                    labelStyle={{
                        ...FONTS.body3,
                        color: COLORS.grey
                    }}
                    value={dummyData?.invoice_confirmation?.sub_total}
                    valueStyle={{
                        ...FONTS.h3
                    }}
                />

                {/* Shipping */}
                <PriceLabel
                    containerStyle={{
                        marginTop: SIZES.base
                    }}
                    label="Shipping"
                    labelStyle={{
                        ...FONTS.body3,
                        color: COLORS.grey
                    }}
                    value={dummyData?.invoice_confirmation?.shipping}
                    valueStyle={{
                        ...FONTS.h3
                    }}
                />
            </View>
        )
    }

    function renderFooter() {
        return (
            <Shadow>
                <View
                    style={{
                        width: SIZES.width,
                        paddingTop: SIZES.radius,
                        paddingHorizontal: SIZES.padding,
                        paddingBottom: SIZES.padding,
                        backgroundColor: COLORS.light
                    }}
                >
                    {/* Electronic Invoice */}
                    <HorizontalIconLabelButton
                        containerStyle={{
                            height: 50,
                            justifyContent: 'center',
                            paddingHorizontal: SIZES.radius,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.lightGrey
                        }}
                        leftIcon={icons.inbox}
                        rightIcon={icons.arrow_right}
                        label1="Electronic Invoice"
                        iconStyle={{
                            tintColor: COLORS.grey
                        }}
                        onPress={() => navigation.navigate("ElectronicInvoice")}
                    />

                    {/* Total */}
                    <PriceLabel
                        containerStyle={{
                            marginTop: SIZES.base
                        }}
                        label="Total"
                        labelStyle={{
                            ...FONTS.h2
                        }}
                        value={dummyData?.invoice_confirmation?.total}
                        valueStyle={{
                            ...FONTS.h2,
                            color: COLORS.primary
                        }}
                    />

                    {/* Place Order */}
                    <TextButton
                        label="Order"
                        contentContainerStyle={{
                            height: 55,
                            marginTop: SIZES.radius,
                            borderRadius: SIZES.radius
                        }}
                        onPress={() => navigation.navigate("PaymentMethod")}
                    />
                </View>
            </Shadow>
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

            {/* Content */}
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding,
                    marginTop: SIZES.padding,
                    paddingBottom: SIZES.padding * 2
                }}
            >
                {/* Info Product */}
                {renderInfoProduct()}

                {/* Delivery Address */}
                {renderDeliveryAddress()}

                {/* Form of Delivery */}
                {renderFormOfDelivery()}

                {/* Payment Method */}
                {renderPaymentMethod()}

                {/* Sub Total */}
                {renderSubTotal()}
            </ScrollView>

            {/* Footer */}
            {renderFooter()}
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginTop: SIZES.radius,
        padding: SIZES.padding,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.light
    }
})

export default InvoiceConfirmation;