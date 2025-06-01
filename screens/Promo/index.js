import React from 'react';
import {
    View,
    Text,
    FlatList,
    ScrollView,
    TouchableOpacity,
    Animated
} from 'react-native';
import { connect } from 'react-redux';
import {
    DashboardHeader,
    IconBadgeButton,
    IconButton
} from '../../components'
import {
    COLORS,
    FONTS,
    SIZES,
    constants,
    icons
} from '../../constants';
import Coupons from './Coupons';
import BrandCoupons from './BrandCoupons'

const promo_tabs = constants.promo_tabs.map((promo_tab) => ({
    ...promo_tab,
    ref: React.createRef()
}))

const TabIndicator = ({ measureLayout, scrollX }) => {

    const inputRange = promo_tabs.map((_, i) => i * SIZES.width)

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
    const scrollContainerRef = React.useRef()

    const tabPosition = Animated.divide(scrollX, SIZES.width)

    React.useEffect(() => {
        let ml = []

        promo_tabs.forEach(promo_tab => {
            promo_tab?.ref?.current?.measureLayout(
                containerRef.current,
                (x, y, width, height) => {
                    ml.push({
                        x, y, width, height
                    })

                    if (ml.length === promo_tabs.length) {
                        setMeasureLayout(ml)
                    }
                }
            )
        })
    }, [containerRef.current])

    const scrollTo = (index) => {
        if (measureLayout[index].x > (SIZES.width * 0.5)) {
            scrollContainerRef?.current?.scrollTo({
                x: measureLayout[index].x - (SIZES.width * 0.25),
                animated: true,
            })
        }
        else {
            scrollContainerRef?.current?.scrollTo({
                x: 0,
                animated: true,
            })
        }
    }

    return (
        <ScrollView
            ref={scrollContainerRef}
            horizontal
            showsHorizontalScrollIndicator={false}
        >
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
                {promo_tabs.map((item, index) => {
                    const textColor = tabPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [COLORS.grey, COLORS.dark, COLORS.grey],
                        extrapolate: 'clamp'
                    })

                    return (
                        <TouchableOpacity
                            key={`PromoTabs-${index}`}
                            ref={item.ref}
                            style={{
                                marginRight: SIZES.padding
                            }}
                            onPress={() => {
                                onTabPress(index)
                                scrollTo(index)
                            }}
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
        </ScrollView>
    )
}

const Promo = ({ cartQuantity }) => {
    
    const flatListRef = React.useRef()
    const scrollX = React.useRef(new Animated.Value(0)).current;

    const onTabPress = React.useCallback(tabIndex => {
        flatListRef?.current?.scrollToOffset({
            offset: tabIndex * SIZES.width
        })
    })

    function renderHeader() {
        return (
            <DashboardHeader
                title="Promo"
                titleStyle={{
                    color: COLORS.dark
                }}
                rightComponent={
                    <View
                        style={{
                            flexDirection: "row"
                        }}
                    >
                        <IconButton
                            icon={icons.shoppingBag}
                            iconStyle={{
                                marginRight: SIZES.radius,
                                width: 25,
                                height: 25,
                                tintColor: COLORS.dark
                            }}
                            onPress={() => {
                                console.log('shopping bag pressed')
                            }}
                        />

                        <IconButton
                            icon={icons.bell}
                            iconStyle={{
                                marginRight: SIZES.radius,
                                width: 25,
                                height: 25,
                                tintColor: COLORS.dark
                            }}
                            onPress={() => navigation.navigate("Notification")}
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
                    marginTop: SIZES.radius,
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
                    data={constants.promo_tabs}
                    keyExtractor={item => `PromoTabs-${item.id}`}
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
                                {item?.id == 0 && <Coupons />}
                                {item?.id == 1 && <Coupons />}
                                {item?.id == 2 && <Coupons />}
                                {item?.id == 3 && <BrandCoupons />}
                            </View>
                        )
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
        </View>
    )
}

function mapStateToProps(state) {
    return {
        cartQuantity: state.cartReducer.cartQuantity,
    }
}

export default connect(mapStateToProps)(Promo);
