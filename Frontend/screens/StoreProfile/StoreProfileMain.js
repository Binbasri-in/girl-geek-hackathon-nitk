import React from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    Animated
} from 'react-native';
import { MotiView, useAnimationState } from 'moti'

import {
    Header2,
    IconBadgeButton,
    IconButton,
    TextButton
} from '../../components'
import {
    COLORS,
    FONTS,
    SIZES,
    dummyData,
    constants,
    icons
} from '../../constants';


import StoreTab from "./Store/StoreTab";
import ProductTab from "./Product/ProductTab";
import StoreRecordsTab from "./StoreRecords/StoreRecordsTab";

const store_info_tabs = constants.store_info_tabs.map((store_info_tab) => ({
    ...store_info_tab,
    ref: React.createRef()
}))

const TabIndicator = ({ measureLayout, scrollX }) => {

    const inputRange = store_info_tabs.map((_, i) => i * SIZES.width)

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

        store_info_tabs.forEach(category_tab => {
            category_tab?.ref?.current?.measureLayout(
                containerRef.current,
                (x, y, width, height) => {
                    ml.push({
                        x, y, width, height
                    })

                    if (ml.length === store_info_tabs.length) {
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
            {store_info_tabs.map((item, index) => {
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

const StoreFigure = ({
    icon,
    iconStyle,
    figure,
    label
}) => {
    return (
        <View
            style={{
                alignItems: 'center'
            }}
        >
            <Image
                source={icon}
                resizeMode='contain'
                style={{
                    width: 25,
                    height: 25,
                    ...iconStyle
                }}
            />

            <Text
                style={{
                    ...FONTS.h3,
                    marginTop: SIZES.base,
                    color: COLORS.light
                }}
            >
                {figure}
            </Text>

            <Text
                style={{
                    ...FONTS.body4,
                    color: COLORS.light
                }}
            >
                {label}
            </Text>
        </View>
    )
}

const StoreProfileMain = () => {

    const flatListRef = React.useRef()
    const scrollX = React.useRef(new Animated.Value(0)).current;

    const onTabPress = React.useCallback(tabIndex => {
        flatListRef?.current?.scrollToOffset({
            offset: tabIndex * SIZES.width
        })

        if (tabIndex == 0) {    // Store
            storeCoverAnimationState.transitionTo('showCover')
        } else {
            storeCoverAnimationState.transitionTo('hideCover')
        }
    })

    // Moti

    const storeCoverAnimationState = useAnimationState({
        showCover: {
            opacity: 1,
            height: 230,
            marginBottom: SIZES.padding * 1.5
        },
        hideCover: {
            opacity: 0,
            height: 0,
            marginBottom: 0
        },
    })

    // useEffect


    React.useEffect(() => {
        // Animation
        storeCoverAnimationState.transitionTo('showCover')
    }, [])

    // Render

    function renderHeader() {
        return (
            <Header2
                title={dummyData?.store_info?.name}
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
                            icon={icons.search_fill}
                            iconStyle={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.dark
                            }}
                            onPress={() => {
                                console.log('Search pressed')
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
                            onPress={() => {
                                console.log('Cart pressed')
                            }}
                        />
                    </View>
                }
            />
        )
    }

    function renderStoreCoverSection() {
        return (
            <MotiView
                state={storeCoverAnimationState}
                style={{
                    height: 210,
                    marginTop: SIZES.radius,
                    marginHorizontal: SIZES.padding,
                    marginBottom: SIZES.padding * 1.5
                }}
                transition={{
                    type: 'timing'
                }}
            >
                <ImageBackground
                    source={dummyData?.store_info?.cover_pic}
                    resizeMode='cover'
                    style={{
                        flex: 1,
                        padding: SIZES.radius,
                        paddingBottom: SIZES.padding,
                        borderRadius: SIZES.radius,
                        overflow: 'hidden'
                    }}
                >
                    {/* Profile Picture */}
                    <Image
                        source={dummyData?.store_info?.profile_pic}
                        resizeMode='cover'
                        style={{
                            alignSelf: 'center',
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                        }}
                    />

                    {/* Figures */}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginTop: SIZES.base,
                            marginHorizontal: SIZES.radius
                        }}
                    >
                        <StoreFigure
                            icon={icons.bookmark_fill}
                            iconStyle={{
                                tintColor: COLORS.success
                            }}
                            figure={dummyData?.store_info?.followers}
                            label="Followers"
                        />

                        <StoreFigure
                            icon={icons.cube}
                            iconStyle={{
                                tintColor: COLORS.support2
                            }}
                            figure={dummyData?.store_info?.number_of_products}
                            label="Products"
                        />

                        <StoreFigure
                            icon={icons.star}
                            iconStyle={{
                                tintColor: COLORS.secondary
                            }}
                            figure={dummyData?.store_info?.number_of_reviews}
                            label="Reviews"
                        />
                    </View>
                </ImageBackground>


                {/* Favourite Button */}
                <View
                    style={{
                        position: 'absolute',
                        bottom: -15,
                        left: 0,
                        right: 0,
                        alignItems: 'center',
                    }}
                >
                    <TextButton
                        label="Add to Favourites"
                        contentContainerStyle={{
                            height: 40,
                            paddingHorizontal: SIZES.padding,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.light
                        }}
                        labelStyle={{
                            ...FONTS.h4,
                            color: COLORS.primary
                        }}
                    />
                </View>
            </MotiView>
        )
    }

    function renderTopTabBar() {
        return (
            <View
                style={{
                    marginHorizontal: SIZES.padding,
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
                    data={constants.store_info_tabs}
                    keyExtractor={item => `StoreInfoTabs-${item.id}`}
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
                                {item?.id == 0 && <StoreTab />}
                                {item?.id == 1 && <ProductTab />}
                                {item?.id == 2 && <StoreRecordsTab />}
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
                flex: 1
            }}
        >
            {/* Header */}
            {renderHeader()}

            {/* Store Cover Section */}
            {renderStoreCoverSection()}

            {/* Tab bar */}
            {renderTopTabBar()}

            {/* Tab Content */}
            {renderTabContent()}
        </View>
    )
}

export default StoreProfileMain;