import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated
} from 'react-native';
import {
    Header2,
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

import YourCartTab from "./YourCart/YourCartTab";
import ProcessTab from "./Process/ProcessTab";
import HistoryTab from "./History/HistoryTab";

const cart_tabs = constants.cart_tabs.map((cart_tab) => ({
    ...cart_tab,
    ref: React.createRef()
}))

const TabIndicator = ({ measureLayout, scrollX }) => {

    const inputRange = cart_tabs.map((_, i) => i * SIZES.width)

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

        cart_tabs.forEach(category_tab => {
            category_tab?.ref?.current?.measureLayout(
                containerRef.current,
                (x, y, width, height) => {
                    ml.push({
                        x, y, width, height
                    })

                    if (ml.length === cart_tabs.length) {
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
            {cart_tabs.map((item, index) => {
                const textColor = tabPosition.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [COLORS.grey, COLORS.dark, COLORS.grey],
                    extrapolate: 'clamp'
                })

                return (
                    <TouchableOpacity
                        key={`CategoryTabs-${index}`}
                        ref={item.ref}
                        style={{
                            marginRight: SIZES.radius
                        }}
                        onPress={() => {
                            console.log(index)
                            onTabPress(index)
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
    )
}

const Cart = () => {

    const flatListRef = React.useRef()
    const scrollX = React.useRef(new Animated.Value(0)).current;

    const onTabPress = React.useCallback(tabIndex => {
        flatListRef?.current?.scrollToOffset({
            offset: tabIndex * SIZES.width
        })
    })

    function renderHeader() {
        return (
            <Header2
                title="Cart"
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
                            icon={icons.bookmark_fill}
                            iconStyle={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.dark
                            }}
                            onPress={() => {
                                console.log('Bookmark pressed')
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
                            icon={icons.more_horizontal}
                            iconStyle={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.dark
                            }}
                            // showBadge={cartQuantity > 0}
                            // badgeContent={cartQuantity}
                            onPress={() => {
                                console.log('More pressed')
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
                        marginTop: SIZES.radius
                    }}
                    snapToAlignment="center"
                    decelerationRate="fast"
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                    data={constants.cart_tabs}
                    keyExtractor={item => `CategoryTabs-${item.id}`}
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
                                    width: SIZES.width
                                }}
                            >
                                {item?.id == 0 && <YourCartTab />}
                                {item?.id == 1 && <ProcessTab />}
                                {item?.id == 2 && <HistoryTab />}
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

export default Cart;