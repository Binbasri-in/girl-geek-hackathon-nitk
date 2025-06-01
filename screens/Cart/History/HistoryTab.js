import React from 'react';
import {
    View,
    Text,
    Image,
    FlatList
} from 'react-native';

import {
    TextButton,
    IconButton
} from '../../../components'
import {
    COLORS,
    FONTS,
    SIZES,
    constants,
    dummyData,
    icons
} from '../../../constants';
//cart_history

const HistoryTab = () => {
    return (
        <View
            style={{
                flex: 1
            }}
        >
            <FlatList
                style={{
                    paddingHorizontal: SIZES.padding,
                    marginVertical: SIZES.base
                }}
                data={dummyData.cart_history}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => (
                    <View
                        style={{
                            flexDirection: "row",
                            padding: SIZES.margin,
                            marginBottom: SIZES.radius,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.light,
                        }}
                    >
                        {/* Image */}
                        <View
                            style={{
                                width: 80,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.grey20
                            }}
                        >
                            <Image
                                source={item.img}
                                resizeMode="contain"
                                style={{
                                    width: 60,
                                    height: 100,
                                }}
                            />
                        </View>

                        {/* Order Info */}
                        <View
                            style={{
                                flex: 1,
                                marginLeft: SIZES.radius
                            }}
                        >
                            {/* Status */}
                            <View
                                style={{
                                    flexDirection: 'row'
                                }}
                            >
                                <Text
                                    style={{
                                        ...FONTS.h3,
                                        flex: 1,
                                        color: item?.status_color
                                    }}
                                >
                                    {item.status_desc}
                                </Text>

                                <IconButton
                                    containerStyle={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: SIZES.radius
                                    }}
                                    icon={icons.more_vertical}
                                    iconStyle={{
                                        height: 20,
                                        width: 20,
                                        tintColor: COLORS.grey80,
                                    }}
                                />
                            </View>

                            {/* Order No */}
                            <Text
                                style={{
                                    ...FONTS.h3,
                                }}
                            >
                                Order No #{item.order_no}
                            </Text>

                            {/* Total */}
                            <Text
                                style={{
                                    ...FONTS.body3,
                                }}
                            >
                                $ {item.total.toFixed(2)}
                            </Text>

                            {/* Date Time */}
                            <Text
                                style={{
                                    ...FONTS.body4,
                                    marginTop: SIZES.base,
                                    color: COLORS.grey
                                }}
                            >
                                {item.date_time}
                            </Text>

                            {/* Repurchase Button */}
                            <TextButton
                                label="Repurchase"
                                contentContainerStyle={{
                                    height: 40,
                                    marginTop: SIZES.base,
                                    borderRadius: SIZES.radius,
                                    backgroundColor: COLORS.lightGrey
                                }}
                                labelStyle={{
                                    ...FONTS.h3,
                                    color: COLORS.primary
                                }}
                            />
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

export default HistoryTab;