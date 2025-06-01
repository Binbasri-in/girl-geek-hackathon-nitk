import React from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
} from 'react-native';
import Animated, {
    Layout,
    FadeIn,
    FadeOut,
} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native';

import {
    TextButton,
    LineDivider,
    OrderSummaryModal
} from '../../../components'
import {
    COLORS,
    FONTS,
    SIZES,
    constants,
    dummyData,
    icons
} from '../../../constants';

const ProcessTab = () => {

    const navigation = useNavigation()

    const [cartOrders, setCartOrders] = React.useState(dummyData.cart_orders)
    const [contentHeights, setContentHeights] = React.useState([]);
    const refArray = React.useRef([])

    React.useEffect(() => {

    }, []);

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
        navigation.navigate("InvoiceInformation")
    }, []);

    function renderContent() {
        return (
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding
                }}
            >
                {cartOrders?.map((item, index) => {
                    const itemRef = React.useRef(null);
                    refArray.current[index] = itemRef;

                    return (
                        <Animated.View
                            layout={Layout.easing()}
                            key={`Main-${index}`}
                            style={{
                                padding: 18,
                                marginBottom: 16,
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.light,
                            }}
                        >
                            {/* Header */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: "center"
                                }}
                            >
                                <Image
                                    source={icons.file_text_fill}
                                    style={{
                                        width: 25,
                                        height: 25,
                                    }}
                                />

                                <Text
                                    style={{
                                        flex: 1,
                                        marginLeft: SIZES.radius,
                                        color: COLORS.primary,
                                        ...FONTS.h3
                                    }}
                                >
                                    Order No #{item.number}
                                </Text>

                                <Image
                                    source={icons.more_vertical}
                                    style={{
                                        width: 25,
                                        height: 25,
                                    }}
                                />
                            </View>

                            {/* Hide or Show Items Button */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginTop: SIZES.base
                                }}
                            >
                                <TextButton
                                    label={item.is_view_summary ? "Hide Item(s)" : "Show Item(s)"}
                                    contentContainerStyle={{
                                        backgroundColor: null
                                    }}
                                    labelStyle={{
                                        color: COLORS.support3,
                                        ...FONTS.h4
                                    }}
                                    onPress={() => {
                                        let newCartOrders = [...cartOrders];
                                        newCartOrders[index].is_view_summary = !newCartOrders[index].is_view_summary;
                                        setCartOrders(newCartOrders);
                                    }}
                                />

                                <TextButton
                                    label={"View order summary"}
                                    contentContainerStyle={{
                                        backgroundColor: null
                                    }}
                                    labelStyle={{
                                        color: COLORS.support3,
                                        ...FONTS.h4
                                    }}
                                    onPress={() => {
                                        showModal()
                                    }}
                                />
                            </View>

                            {/* Items */}
                            {item?.is_view_summary &&
                                <Animated.View
                                    entering={FadeIn.delay(300)}
                                    exiting={FadeOut}
                                >
                                    <LineDivider
                                        linestyle={{
                                            marginVertical: SIZES.radius
                                        }}
                                    />

                                    {item?.items?.map((i, index) => {
                                        return (
                                            <View
                                                key={`i-${index}`}
                                                style={{
                                                    flexDirection: 'row',
                                                    //marginBottom: 16,
                                                    alignItems: 'center',
                                                    //backgroundColor: "red"
                                                }}
                                            >
                                                {/* Item Image */}
                                                <Image
                                                    source={i.image}
                                                    resizeMode='contain'
                                                    style={{
                                                        width: 100,
                                                        height: 100,
                                                    }}
                                                />

                                                <View
                                                    style={{
                                                        flex: 1,
                                                        marginLeft: SIZES.padding,
                                                    }}
                                                >
                                                    {/* Title */}
                                                    <Text
                                                        style={{
                                                            ...FONTS.h4
                                                        }}
                                                    >
                                                        {i?.title}
                                                    </Text>

                                                    {/* Quantity */}
                                                    <Text
                                                        style={{
                                                            ...FONTS.body4,
                                                            color: COLORS.grey80
                                                        }}
                                                    >
                                                        Quantity: {i?.quantity}
                                                    </Text>

                                                    {/* Price */}
                                                    <Text
                                                        style={{
                                                            ...FONTS.h3,
                                                            color: COLORS.primary
                                                        }}
                                                    >
                                                        ${i?.total.toFixed(2)}
                                                    </Text>
                                                </View>
                                            </View>
                                        )
                                    })}
                                </Animated.View>
                            }

                            {/* Footer */}
                            <Animated.View
                                layout={Layout.easing()}
                            >
                                <LineDivider
                                    linestyle={{
                                        marginVertical: SIZES.radius
                                    }}
                                />

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}
                                >
                                    {/* Date */}
                                    <View
                                        style={{
                                            width: 50,
                                            height: 50,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: SIZES.radius,
                                            backgroundColor: COLORS.primary
                                        }}
                                    >
                                        <Text
                                            style={{
                                                ...FONTS.h4,
                                                color: COLORS.light
                                            }}
                                        >
                                            {item?.month}
                                        </Text>
                                        <Text
                                            style={{
                                                ...FONTS.h4,
                                                color: COLORS.light
                                            }}
                                        >
                                            {item?.day}
                                        </Text>
                                    </View>

                                    {/* Total */}
                                    <View
                                        style={{
                                            flex: 1,
                                            marginLeft: SIZES.radius
                                        }}
                                    >
                                        <Text
                                            style={{
                                                ...FONTS.body4,
                                                color: COLORS.grey80
                                            }}
                                        >
                                            Total:
                                        </Text>

                                        <Text
                                            style={{
                                                ...FONTS.h3
                                            }}
                                        >
                                            ${item?.total.toFixed(2)}
                                        </Text>
                                    </View>

                                    {/* Status */}
                                    <Text
                                        style={{
                                            ...FONTS.body4,
                                            color: COLORS.support1
                                        }}
                                    >
                                        {item?.status}
                                    </Text>
                                </View>
                            </Animated.View>
                        </Animated.View>
                    )
                })}

                {/* Modal */}
                <OrderSummaryModal
                    bottomSheetModalRef={bottomSheetModalRef}
                    hideModal={hideModal}
                    hideModalWithNavigation={hideModalWithNavigation}
                />
            </ScrollView>
        )
    }

    return (
        <View
            style={{
                flex: 1
            }}
        >
            {renderContent()}
        </View>
    )
}

export default ProcessTab;
