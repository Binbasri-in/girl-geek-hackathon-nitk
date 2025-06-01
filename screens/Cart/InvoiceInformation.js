import React from 'react';
import {
    View,
    Text,
    ScrollView,
    Image
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import {
    Header2,
    LineDivider,
    TextButton,
    HorizontalIconLabelButton,
    PriceLabel,
    PostReviewModal
} from '../../components';

import {
    icons,
    COLORS,
    SIZES,
    FONTS
} from '../../constants';

const CardDetail = ({
    icon,
    iconStyle,
    title,
    titleStyle,
    buttonLabel,
    buttonOnClick,
    children
}) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                padding: SIZES.radius,
                borderRadius: SIZES.radius
            }}
        >
            <Image
                source={icon}
                resizeMode='contain'
                style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.light,
                    ...iconStyle
                }}
            />

            <View
                style={{
                    flex: 1,
                    marginLeft: SIZES.radius
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                    }}
                >
                    <Text
                        style={{
                            flex: 1,
                            ...FONTS.h3,
                            color: COLORS.light,
                            ...titleStyle
                        }}
                    >
                        {title}
                    </Text>

                    {buttonLabel &&
                        <TextButton
                            label={buttonLabel}
                            contentContainerStyle={{
                                backgroundColor: null
                            }}
                            labelStyle={{
                                color: COLORS.support3
                            }}
                            onPress={buttonOnClick}
                        />
                    }
                </View>

                {children}
            </View>
        </View>
    )
}

const InvoiceInformation = ({
    navigation
}) => {

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
        //navigation.navigate("InvoiceInformation")
    }, []);

    // Render

    function renderHeader() {
        return (
            <Header2
                title="Invoice Information"
            />
        )
    }

    function renderStatus() {
        return (
            <View
                style={{
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.support1
                }}
            >
                <CardDetail
                    icon={icons.file_text_fill}
                    title="Completed order"
                >
                    <Text
                        style={{
                            ...FONTS.body4,
                            marginTop: SIZES.base,
                            color: COLORS.light,
                        }}
                    >
                        Payment completed: 1st June 2023 12:00pm
                    </Text>
                </CardDetail>
            </View>
        )
    }

    function renderAddress() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.light
                }}
            >
                {/* Address */}
                <CardDetail
                    icon={icons.location}
                    iconStyle={{
                        tintColor: COLORS.grey
                    }}
                    title="Address"
                    titleStyle={{
                        color: COLORS.dark
                    }}
                    buttonLabel="Edit"
                    buttonOnClick={() => console.log("Edit")}
                >
                    <View
                        style={{
                            marginTop: SIZES.base,
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.body4,
                                marginTop: SIZES.base,
                                color: COLORS.grey,
                            }}
                        >
                            Jack Tiong
                        </Text>

                        <Text
                            style={{
                                ...FONTS.body4,
                                marginTop: SIZES.base,
                                color: COLORS.grey,
                            }}
                        >
                            +6016123456789
                        </Text>

                        <Text
                            style={{
                                ...FONTS.body4,
                                marginTop: SIZES.base,
                                color: COLORS.grey,
                            }}
                        >
                            byprogrammers@gmail.com
                        </Text>

                        <Text
                            style={{
                                ...FONTS.body4,
                                marginTop: SIZES.base,
                                color: COLORS.grey,
                            }}
                        >
                            123, Kuching, Sarawak, Malaysia
                        </Text>
                    </View>
                </CardDetail>

                <LineDivider
                    linestyle={{
                        alignSelf: 'center',
                        marginVertical: SIZES.radius,
                        width: "90%"
                    }}
                />

                {/* Shipping Information */}
                <CardDetail
                    icon={icons.car}
                    iconStyle={{
                        tintColor: COLORS.grey
                    }}
                    title="Shipping Information"
                    titleStyle={{
                        color: COLORS.dark
                    }}
                    buttonLabel="View"
                    buttonOnClick={() => navigation.navigate("ShippingInformation")}
                >
                    <View>
                        <Text
                            style={{
                                ...FONTS.h4,
                                marginTop: SIZES.base,
                                color: COLORS.primary,
                            }}
                        >
                            Completed order
                        </Text>

                        <Text
                            style={{
                                ...FONTS.body4,
                                marginTop: SIZES.base,
                                color: COLORS.grey,
                            }}
                        >
                            1st June 2023 8:00pm
                        </Text>
                    </View>
                </CardDetail>
            </View>
        )
    }

    function renderTotal() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    paddingHorizontal: SIZES.radius,
                    paddingVertical: SIZES.radius,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.light
                }}
            >
                <Text
                    style={{
                        ...FONTS.h3
                    }}
                >
                    Total Amount
                </Text>

                <PriceLabel
                    containerStyle={{
                        marginTop: SIZES.base
                    }}
                    label="Total Product"
                    labelStyle={{
                        ...FONTS.body3
                    }}
                    value={270}
                    valueStyle={{
                        ...FONTS.h3
                    }}
                />

                <PriceLabel
                    containerStyle={{
                        marginTop: SIZES.base
                    }}
                    label="Shipping"
                    labelStyle={{
                        ...FONTS.body3
                    }}
                    value={20}
                    valueStyle={{
                        ...FONTS.h3
                    }}
                />

                <LineDivider
                    linestyle={{
                        marginVertical: SIZES.radius,
                    }}
                />

                <Text
                    style={{
                        textAlign: 'right',
                        ...FONTS.h3
                    }}
                >
                    $290.00
                </Text>
            </View>
        )
    }

    function renderContent() {
        return (
            <ScrollView
                contentContainerStyle={{
                    marginTop: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: SIZES.padding * 2
                }}
            >
                {/* Status */}
                {renderStatus()}

                {/* Address */}
                {renderAddress()}

                {/* Total */}
                {renderTotal()}
            </ScrollView>
        )
    }

    function renderFooter() {
        return (
            <Shadow>
                <View
                    style={{
                        paddingHorizontal: SIZES.padding,
                        paddingTop: SIZES.radius,
                        paddingBottom: SIZES.padding,
                        width: SIZES.width,
                        backgroundColor: COLORS.light
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row'
                        }}
                    >
                        <HorizontalIconLabelButton
                            containerStyle={{
                                flex: 1,
                                height: 50,
                                justifyContent: 'center',
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.lightGrey
                            }}
                            leftIcon={icons.message_circle}
                            label1="Contact"
                            labelContainerStyle={{
                                flex: 0
                            }}
                            label1Style={{
                                color: COLORS.primary
                            }}
                            iconStyle={{
                                tintColor: COLORS.primary
                            }}
                        />

                        <HorizontalIconLabelButton
                            containerStyle={{
                                flex: 1,
                                height: 50,
                                justifyContent: 'center',
                                marginLeft: SIZES.radius,
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.lightGrey
                            }}
                            leftIcon={icons.star_outline}
                            label1="Rating"
                            labelContainerStyle={{
                                flex: 0
                            }}
                            label1Style={{
                                color: COLORS.primary
                            }}
                            iconStyle={{
                                tintColor: COLORS.primary
                            }}
                            onPress={() => showModal()}
                        />
                    </View>

                    <TextButton
                        contentContainerStyle={{
                            height: 60,
                            marginTop: SIZES.radius,
                            borderRadius: SIZES.base,
                        }}
                        labelStyle={{
                            //color: COLORS.primary
                        }}
                        label="Repurchase"
                        onPress={() => {
                            console.log('Repurchase')
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

            {/* Content */}
            {renderContent()}

            {/* Footer */}
            {renderFooter()}

            {/* Modal */}
            <PostReviewModal
                bottomSheetModalRef={bottomSheetModalRef}
                hideModal={hideModal}
                hideModalWithNavigation={hideModalWithNavigation}
            />
        </View>
    )
}

export default InvoiceInformation;