import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView
} from 'react-native';
import { MotiView } from 'moti'

import {
    Header2,
    TextButton
} from '../../components';

import {
    icons,
    images,
    dummyData,
    COLORS,
    SIZES,
    FONTS
} from '../../constants';

const ShippingInformation = () => {

    // Render

    function renderHeader() {
        return (
            <Header2
                title="Shipping Information"
            />
        )
    }

    function renderInfo() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    padding: SIZES.padding,
                    marginTop: SIZES.radius,
                    marginHorizontal: SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.light
                }}
            >
                <Image
                    source={images.chair_01}
                    style={{
                        width: 60,
                        height: 60,
                    }}
                />

                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        marginLeft: SIZES.radius
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.body3,
                            color: COLORS.grey
                        }}
                    >
                        Shipping Unit
                    </Text>

                    <Text
                        style={{
                            ...FONTS.h3
                        }}
                    >
                        Sku: #123456789
                    </Text>
                </View>

                <TextButton
                    label="Copy"
                    contentContainerStyle={{
                        backgroundColor: null
                    }}
                    labelStyle={{
                        color: COLORS.support3
                    }}
                />
            </View>
        )
    }

    function renderShippingStatus() {
        return (
            <View
                style={{
                    flexGrow: 1,
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    marginBottom: SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.light
                }}
            >
                <ScrollView
                    contentContainerStyle={{
                        padding: SIZES.padding
                    }}
                >
                    {dummyData?.shipping_status?.map((item, index) => {
                        return (
                            <View
                                key={`shipping_status-${index}`}
                                style={{
                                    height: 80,
                                }}
                            >
                                {/* Dotted line */}
                                {index < dummyData?.shipping_status.length - 1 &&
                                    <View
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            bottom: 0,
                                            left: 7,
                                            width: 5,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        {[1, 2, 3, 4, 5].map((_, index) => {
                                            return (
                                                <View
                                                    key={`dotted_line-${index}`}
                                                    style={{
                                                        width: 2,
                                                        height: 10,
                                                        marginTop: SIZES.base,
                                                        backgroundColor: COLORS.grey60
                                                    }}
                                                />
                                            )
                                        })}
                                    </View>
                                }

                                {/* Information */}
                                <View
                                    style={{
                                        flexDirection: 'row',
                                    }}
                                >
                                    {/* Checkmark */}
                                    {item?.is_current_status &&
                                        <View
                                            style={{
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 20,
                                                height: 20,
                                                borderRadius: 10,
                                                borderWidth: 2,
                                                borderColor: COLORS.secondary,
                                                backgroundColor: COLORS.light
                                            }}
                                        >
                                            <MotiView
                                                style={{
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: 5,
                                                    backgroundColor: COLORS.secondary
                                                }}
                                                from={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{
                                                    loop: true,
                                                    duration: 500
                                                }}
                                            />
                                        </View>
                                    }

                                    {!item?.is_current_status &&
                                        <View
                                            style={{
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 20,
                                                height: 20,
                                                borderRadius: 10,
                                                backgroundColor: item?.date_time ? COLORS.primary : COLORS.secondary
                                            }}
                                        >
                                            {item?.date_time != "" &&
                                                <Image
                                                    source={icons.checkmark_bold}
                                                    style={{
                                                        width: 10,
                                                        height: 10,
                                                        tintColor: COLORS.light
                                                    }}
                                                />
                                            }
                                        </View>
                                    }

                                    {/* Label and date */}
                                    <View
                                        style={{
                                            marginLeft: SIZES.radius
                                        }}
                                    >
                                        <Text
                                            style={{
                                                ...FONTS.h3
                                            }}
                                        >
                                            {item?.label}
                                        </Text>

                                        {item?.date_time != "" &&
                                            <Text
                                                style={{
                                                    ...FONTS.body3,
                                                    marginTop: SIZES.base,
                                                    color: COLORS.grey
                                                }}
                                            >
                                                {item?.date_time}
                                            </Text>
                                        }
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
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

            {/* Shipping Info */}
            {renderInfo()}

            {/* Status */}
            {renderShippingStatus()}
        </View>
    )
}

export default ShippingInformation;