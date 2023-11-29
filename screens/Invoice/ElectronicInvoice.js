import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import {
    Header2,
    CheckBox,
    FormInput,
    TextButton
} from "../../components";
import {
    SIZES,
    COLORS,
    FONTS,
    icons,
} from "../../constants";

const Section = ({
    containerStyle,
    label,
    children
}) => {
    return (
        <View
            style={{
                paddingHorizontal: SIZES.padding,
                paddingVertical: SIZES.radius,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.light,
                ...containerStyle
            }}
        >
            <Text
                style={{
                    ...FONTS.h3
                }}
            >
                {label}
            </Text>

            {children}
        </View>
    )
}

const ElectronicInvoice = () => {

    // States

    const [termsChecked, setTermsChecked] = React.useState(false)
    const [companyName, setCompanyName] = React.useState("")
    const [taxCode, setTaxCode] = React.useState("")
    const [address, setAddress] = React.useState("")

    // Render

    function renderHeader() {
        return (
            <Header2
                title="Electronic Invoice"
            />
        )
    }

    function renderInvAddrCheckbox() {
        return (
            <CheckBox
                containerStyle={{
                    marginTop: SIZES.radius
                }}
                label="Invoice address is the same as receiving address"
                labelStyle={{
                    ...FONTS.body3,
                    color: COLORS.grey
                }}
                isSelected={termsChecked}
                onPress={() => setTermsChecked(!termsChecked)}
            />
        )
    }

    function renderInvoiceInformation() {
        return (
            <Section
                label="Invoice Information"
                containerStyle={{
                    marginTop: SIZES.padding
                }}
            >
                <View>
                    {/* Company Name */}
                    <FormInput
                        containerStyle={{
                            marginTop: SIZES.radius,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.error,
                        }}
                        placeholder="Company Name"
                        value={companyName}
                        onChange={(text) => setCompanyName(text)}
                        prependComponent={
                            <Image
                                source={icons.shield_fill}
                                style={{
                                    width: 25,
                                    height: 25,
                                    marginRight: SIZES.base
                                }}
                            />
                        }
                    />

                    {/* Tax Code */}
                    <FormInput
                        containerStyle={{
                            marginTop: SIZES.radius,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.error,
                        }}
                        placeholder="Tax Code"
                        value={taxCode}
                        onChange={(text) => setTaxCode(text)}
                        prependComponent={
                            <Image
                                source={icons.shopping_bag_fill}
                                style={{
                                    width: 25,
                                    height: 25,
                                    marginRight: SIZES.base,
                                    tintColor: COLORS.grey
                                }}
                            />
                        }
                    />

                    {/* Address */}
                    <FormInput
                        containerStyle={{
                            marginTop: SIZES.radius,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.error,
                        }}
                        placeholder="Address"
                        value={address}
                        onChange={(text) => setAddress(text)}
                        prependComponent={
                            <Image
                                source={icons.location}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    marginRight: SIZES.base,
                                    tintColor: COLORS.grey
                                }}
                            />
                        }
                    />

                    {/* Footer */}
                    <TextButton
                        label="Detail"
                        contentContainerStyle={{
                            marginTop: SIZES.radius,
                            backgroundColor: null
                        }}
                        labelStyle={{
                            color: COLORS.support3
                        }}
                    />
                </View>
            </Section>
        )
    }

    function renderNote() {
        return (
            <Section
                label="Note"
                containerStyle={{
                    marginTop: SIZES.padding
                }}
            >
                <View>
                    <Text
                        style={{
                            marginTop: SIZES.radius,
                            ...FONTS.body3
                        }}
                    >
                        Lorem ipsum dolor sit amet. Eum nulla sapiente qui explicabo quia sed iure exercitationem sed reiciendis voluptatem. Quo ratione enim qui ipsa nihil et quasi vitae quo recusandae quod.
                    </Text>
                </View>
            </Section>
        )
    }

    function renderFooter() {
        return (
            <Shadow>
                <View
                    style={{
                        width: SIZES.width,
                        paddingTop: SIZES.base,
                        paddingHorizontal: SIZES.padding,
                        paddingBottom: SIZES.padding,
                        backgroundColor: COLORS.light
                    }}
                >
                    {/* Submit */}
                    <TextButton
                        label="Submit"
                        contentContainerStyle={{
                            height: 55,
                            marginTop: SIZES.radius,
                            borderRadius: SIZES.radius
                        }}
                    />

                    {/* Cancel Invoice */}
                    <TextButton
                        label="Cancel Invoice"
                        contentContainerStyle={{
                            height: 45,
                            marginTop: SIZES.radius,
                            backgroundColor: null
                        }}
                        labelStyle={{
                            color: COLORS.grey
                        }}
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
            {/* Header */}
            {renderHeader()}

            {/* Body */}
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding
                }}
            >
                {/* Invoice Address Checkbox */}
                {renderInvAddrCheckbox()}

                {/* Invoice Information */}
                {renderInvoiceInformation()}

                {/* Note */}
                {renderNote()}
            </ScrollView>

            {/* Footer */}
            {renderFooter()}
        </View>
    )
}

export default ElectronicInvoice;