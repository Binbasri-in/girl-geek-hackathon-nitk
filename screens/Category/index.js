import React from 'react';
import {
    View,
    Text,
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
import GeneralTab from './General/GeneralTab';
import CollectionTab from './Collection/CollectionTab';

const category_tabs = constants.category_tabs.map((category_tab) => ({
    ...category_tab,
    ref: React.createRef()
}))

const TabIndicator = ({ measureLayout, scrollX }) => {

    const inputRange = category_tabs.map((_, i) => i * SIZES.width)

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

        category_tabs.forEach(category_tab => {
            category_tab?.ref?.current?.measureLayout(
                containerRef.current,
                (x, y, width, height) => {
                    ml.push({
                        x, y, width, height
                    })

                    if (ml.length === category_tabs.length) {
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
            {category_tabs.map((item, index) => {
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

const Category = ({ cartQuantity }) => {
    
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
                title="Category"
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
                            icon={icons.options}
                            iconStyle={{
                                marginRight: SIZES.radius,
                                width: 25,
                                height: 25
                            }}
                            onPress={() => {
                                console.log('options pressed')
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
                    data={constants.category_tabs}
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
                                    width: SIZES.width,
                                }}
                            >
                                {item?.id == 0 && <GeneralTab />}
                                {item?.id == 1 && <CollectionTab />}
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

export default connect(mapStateToProps)(Category);
