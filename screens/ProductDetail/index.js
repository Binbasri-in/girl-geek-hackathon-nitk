import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Animated
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { addToCart } from '../../stores/cart/cartActions';
import {
    Header2,
    IconBadgeButton,
    IconButton,
    ProductOptionsModal,
    ReceiveCouponModal,
    TextButton
} from '../../components'
import {
    COLORS,
    FONTS,
    SIZES,
    constants,
    icons,
    dummyData
} from '../../constants';
import OverviewTab from './Overview/OverviewTab';
import DescriptionTab from './Description/DescriptionTab';

const product_detail_tabs = constants.product_detail_tabs.map((product_detail_tab) => ({
    ...product_detail_tab,
    ref: React.createRef()
}))

const TabIndicator = ({ measureLayout, scrollX }) => {

    const inputRange = product_detail_tabs.map((_, i) => i * SIZES.width)

    const translateX = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map(measure => measure.x)
    })

    return (
        <Animated.View
            style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                height: 5,
                width: 30,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.secondary,
                transform: [{
                    translateX
                }]
            }}
        />
    )
}

const Tabs = ({ scrollX, onTabPress }) => {

    const [measureLayout, setMeasureLayout] = React.useState([])
    const containerRef = React.useRef()

    const tabPosition = Animated.divide(scrollX, SIZES.width)

    React.useEffect(() => {
        let ml = []

        product_detail_tabs.forEach(product_detail_tab => {
            product_detail_tab?.ref?.current?.measureLayout(
                containerRef.current,
                (x, y, width, height) => {
                    ml.push({
                        x, y, width, height
                    })

                    if (ml.length === product_detail_tabs.length) {
                        setMeasureLayout(ml)
                    }
                }
            )
        })
    }, [containerRef.current])

    return (
        <View
            ref={containerRef}
            style={{
                flex: 1,
                flexDirection: 'row'
            }}
        >
            {/* Tab Indicator */}
            {measureLayout.length > 0 && <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />}

            {/* Tabs */}
            {product_detail_tabs.map((item, index) => {
                const textColor = tabPosition.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [COLORS.grey, COLORS.dark, COLORS.grey],
                    extrapolate: 'clamp'
                })

                return (
                    <TouchableOpacity
                        key={`ProductDetailTabs-${index}`}
                        ref={item.ref}
                        style={{
                            marginRight: SIZES.padding
                        }}
                        onPress={() => onTabPress(index)}
                    >
                        <Animated.Text
                            style={{
                                color: textColor,
                                ...FONTS.h4,
                            }}
                        >
                            {item.label}
                        </Animated.Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const ProductDetail = ({ cartQuantity, addToCart }) => {

    const [actionType, setActionType] = React.useState("")
    const [isCouponAvailable, setIsCouponAvailable] = React.useState(true)

    const navigation = useNavigation()
    
    const flatListRef = React.useRef()
    const scrollX = React.useRef(new Animated.Value(0)).current

    const onTabPress = React.useCallback(tabIndex => {
        flatListRef?.current?.scrollToOffset({
            offset: tabIndex * SIZES.width
        })
    })

    // Modal
    const bottomSheetModalRef1 = React.useRef(null)
    const bottomSheetModalRef2 = React.useRef(null)

    const showModal1 = React.useCallback(() => {
        bottomSheetModalRef1.current?.present()
    }, [])

    const hideModal1 = React.useCallback(() => {
        bottomSheetModalRef1.current?.dismiss()
    }, [])

    const hideModal1AddToCart = React.useCallback(() => {
        addToCart()
        bottomSheetModalRef1.current?.dismiss()
    }, [])

    const showModal2 = React.useCallback(() => {
        bottomSheetModalRef2.current?.present()
    }, [])

    const hideModal2 = React.useCallback(() => {
        bottomSheetModalRef2.current?.dismiss()
    }, [])

    React.useEffect(() => {
        if (isCouponAvailable) {
            showModal2()
        }
    }, [])

    function renderHeader() {
        return (
            <Header2
                title="Product Detail"
                rightComponent={
                    <View
                        style={{
                            flexDirection: 'row'
                        }}
                    >
                        <IconButton
                            containerStyle={{
                                marginRight: 16
                            }}
                            icon={icons.share}
                            iconStyle={{
                                width: 25,
                                height: 25
                            }}
                            onPress={() => {
                                console.log('share pressed')
                            }}
                        />

                        <IconButton
                            containerStyle={{
                                marginRight: 16
                            }}
                            icon={icons.message_circle_fill}
                            iconStyle={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.dark
                            }}
                            onPress={() => {
                                navigation.navigate("Message")
                            }}
                        />

                        <IconBadgeButton
                            icon={icons.shoppingCart}
                            iconStyle={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.dark
                            }}
                            showBadge={cartQuantity > 0}
                            badgeContent={cartQuantity}
                            onPress={() => {
                                console.log('cart pressed')
                            }}
                        />
                    </View>
                }
            />
        )
    }


    function renderTopTabBar() {
        return (
            <View
                style={{
                    marginHorizontal: SIZES.padding,
                    marginTop: SIZES.padding,
                    height: 35
                }}
            >
                <Tabs
                    scrollX={scrollX}
                    onTabPress={onTabPress}
                />
            </View>
        )
    }

    function renderTabContent() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                }}
            >
                <Animated.FlatList
                    horizontal
                    ref={flatListRef}
                    scrollEnabled={false}
                    pagingEnabled
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.padding
                    }}
                    snapToAlignment="center"
                    decelerationRate="fast"
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                    data={constants.product_detail_tabs}
                    keyExtractor={item => `ProductDetailTabs-${item.id}`}
                    onScroll={
                        Animated.event([
                            { nativeEvent: { contentOffset: { x: scrollX } } }
                        ], {
                            useNativeDriver: false
                        })
                    }
                    renderItem={({ item, index }) => {
                        return (
                            <View
                                style={{
                                    width: SIZES.width,
                                }}
                            >
                                {item?.id == 0 && <OverviewTab />}
                                {item?.id == 1 && <DescriptionTab />}
                            </View>
                        )
                    }}
                />
            </View>
        )
    }

    function renderFooter() {
        return (
            <View
                style={{
                    backgroundColor: COLORS.light,
                    flexDirection: 'row',
                    height: 96,
                    padding: 20
                }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.lightGrey,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: SIZES.radius,
                        height: 56,
                        width: 56,
                        marginRight: 16
                    }}
                    onPress={() => {
                        setActionType(constants.action_type.cart)
                        showModal1()
                    }}
                >
                    <Image
                        source={icons.plus}
                        resizeMode='contain'
                        style={{
                            height: 24,
                            width: 24
                        }}
                    />
                </TouchableOpacity>

                <TextButton
                    label="Pay Now"
                    contentContainerStyle={{
                        flex: 1,
                        borderRadius: SIZES.radius
                    }}
                    onPress={() => {
                        setActionType(constants.action_type.pay)
                        showModal1()
                    }}
                />
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

            {/* Tab Bar */}
            {renderTopTabBar()}

            {/* Content */}
            {renderTabContent()}

            {/* Footer */}
            {renderFooter()}

            {/* Modal */}
            <ProductOptionsModal
                bottomSheetModalRef={bottomSheetModalRef1}
                hideModal={hideModal1}
                hideModalAddToCart={hideModal1AddToCart}
                buttonLabel={actionType}
                productDetail={dummyData.productDetail}
            />

            <ReceiveCouponModal
                bottomSheetModalRef={bottomSheetModalRef2}
                hideModal={hideModal2}
            />
        </View>
    )
}

function mapStateToProps(state) {
    return {
        cartQuantity: state.cartReducer.cartQuantity
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addToCart: () => { return dispatch(addToCart()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
