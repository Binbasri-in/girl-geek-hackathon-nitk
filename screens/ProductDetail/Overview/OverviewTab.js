import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import {
    Section,
    TextButton,
    Timer
} from '../../../components';
import {
    COLORS,
    FONTS,
    SIZES,
    dummyData,
    icons
} from '../../../constants';

const OverviewTab = () => {

    const navigation = useNavigation();

    const [isPromotion, setIsPromotion] = React.useState(true)
    const [isFavorite, setIsFavorite] = React.useState(false)

    const [viewableIndex, setViewableIndex] = React.useState(0)

    const flatListRef1 = React.useRef()
    const flatListRef2 = React.useRef()

    const scrollImageToIndex = (index) => {
        flatListRef1.current.scrollToIndex({
            animated: true,
            index: index
        })
    }

    const scrollPaginatorToIndex = (index) => {
        flatListRef2.current.scrollToIndex({
            animated: true,
            index: index,
            viewPosition: 0.5
        })
    }

    const viewabilityConfigCallbackPairs = React.useRef([{
        viewabilityConfig: {
            waitForInteraction: false,
            viewAreaCoveragePercentThreshold: 50
        },
        onViewableItemsChanged
    }])

    const onViewableItemsChanged = ({ viewableItems }) => {
        console.log("onViewableItemsChanged")
        scrollPaginatorToIndex(viewableItems[0].index)
        setViewableIndex(viewableItems[0].index)
    }

    function renderProductSection() {
        return (
            <View
                style={{
                    backgroundColor: COLORS.light,
                    marginBottom: SIZES.padding
                }}
            >
                <View>
                    {/* Product image */}
                    <FlatList
                        ref={flatListRef1}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        snapToAlignment='start'
                        decelerationRate="fast"
                        snapToInterval={SIZES.width}
                        scrollEventThrottle={16}
                        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                        data={dummyData.productDetail.images}
                        listKey="ProductImages"
                        keyExtractor={(item) => `productImage-${item.id}`}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    style={{
                                        width: SIZES.width,
                                        marginBottom: 16
                                    }}
                                >
                                    <Image
                                        source={item.image}
                                        resizeMode="contain"
                                        style={{
                                            width: SIZES.width,
                                            height: 250
                                        }}
                                    />
                                </TouchableOpacity>
                            )
                        }}
                    />

                    {/* Page indicator */}
                    <View
                        style={{
                            backgroundColor: COLORS.dark08,
                            borderRadius: SIZES.base,
                            width: 50,
                            height: 24,
                            position: 'absolute',
                            justifyContent: 'center',
                            alignItems: 'center',
                            bottom: 21,
                            right: 25
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.h5,
                                color: COLORS.grey
                            }}
                        >
                            {viewableIndex + 1}/{dummyData.productDetail.images.length}
                        </Text>
                    </View>

                    {/* Previous button */}
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            justifyContent: 'center',
                            paddingLeft: SIZES.margin,
                            height: '100%',
                            left: 0
                        }}
                        disabled={viewableIndex == 0}
                        onPress={() => {
                            scrollImageToIndex(viewableIndex - 1)
                            scrollPaginatorToIndex(viewableIndex - 1)
                            setViewableIndex(viewableIndex - 1)
                        }}
                    >
                        <Image
                            source={icons.arrow_left2}
                            resizeMode='contain'
                            style={{
                                width: 24,
                                height: 24,
                                tintColor: viewableIndex == 0 ? COLORS.grey60 : COLORS.dark
                            }}
                        />
                    </TouchableOpacity>

                    {/* Next button */}
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            justifyContent: 'center',
                            paddingRight: SIZES.margin,
                            height: '100%',
                            right: 0
                        }}
                        disabled={viewableIndex == (dummyData.productDetail.images.length - 1)}
                        onPress={() => {
                            scrollImageToIndex(viewableIndex + 1)
                            scrollPaginatorToIndex(viewableIndex + 1)
                            setViewableIndex(viewableIndex + 1)
                        }}
                    >
                        <Image
                            source={icons.arrow_right}
                            resizeMode='contain'
                            style={{
                                width: 24,
                                height: 24,
                                tintColor: viewableIndex == (dummyData.productDetail.images.length - 1) ? COLORS.grey60 : COLORS.dark
                            }}
                        />
                    </TouchableOpacity>
                </View>

                {/* Paginator */}
                <View
                    style={{
                        alignItems: 'center',
                        marginHorizontal: SIZES.padding,
                        marginBottom: 16
                    }}
                >
                    <FlatList
                        ref={flatListRef2}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        decelerationRate="fast"
                        scrollEventThrottle={16}
                        data={dummyData.productDetail.images}
                        listKey="Pagination"
                        keyExtractor={(item) => `pagination-${item.id}`}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    style={{
                                        marginRight: index < (dummyData.productDetail.images.length - 1) ? SIZES.base : 0,
                                        borderRadius: SIZES.base,
                                        borderColor: index == viewableIndex ? COLORS.primary : COLORS.lightGrey,
                                        borderWidth: 1,
                                        width: 32,
                                        height: 32,
                                        overflow: 'hidden'
                                    }}
                                    onPress={() => {
                                        scrollImageToIndex(index)
                                        scrollPaginatorToIndex(index)
                                        setViewableIndex(index)
                                    }}
                                >
                                    <Image
                                        source={item.image}
                                        resizeMode="contain"
                                        style={{
                                            width: 32,
                                            height: 32
                                        }}
                                    />
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>

                {/* Promo countdown timer */}
                {isPromotion &&
                    <Timer
                        containerStyle={{
                            marginHorizontal: 30
                        }}
                        dateTime={dummyData.productDetail.promotion_end}
                    />
                }

                {/* Product details */}
                <View
                    style={{
                        marginHorizontal: SIZES.padding,
                        marginTop: 16,
                        marginBottom: 32,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <View
                        style={{
                            flex: 1
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.h2,
                                fontSize: 18,
                                color: COLORS.dark,
                                marginBottom: SIZES.base
                            }}
                        >
                            {dummyData.productDetail.name}
                        </Text>

                        <Text
                            style={{
                                ...FONTS.body3,
                                color: COLORS.dark,
                                marginBottom: SIZES.base
                            }}
                        >
                            SKU: {dummyData.productDetail.sku}
                        </Text>

                        <Text
                            style={{
                                ...FONTS.body5,
                                color: COLORS.title
                            }}
                        >
                            Available Stock {dummyData.productDetail.stock}
                        </Text>
                    </View>

                    <View
                        style={{
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                            marginLeft: SIZES.padding
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: 44,
                                height: 44,
                                borderRadius: SIZES.base,
                                backgroundColor: COLORS.lightGrey,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            onPress={() => {
                                setIsFavorite(!isFavorite)
                            }}
                        >
                            <Image
                                source={isFavorite ? icons.bookmark_fill : icons.bookmark}
                                resizeMode='contain'
                                style={{
                                    width: 22,
                                    height: 22
                                }}
                            />
                        </TouchableOpacity>

                        <Text
                            style={{
                                ...FONTS.h2,
                                fontSize: 18,
                                color: COLORS.primary
                            }}
                        >
                            {dummyData.productDetail.price}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    function renderInterestedSection() {
        return (
            <Section
                title="Maybe Interested"
                containerStyle={{
                    marginBottom: 32
                }}
                seeMoreOnPress={() => {
                    console.log('See more maybe interested pressed')
                }}
            >
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToAlignment='start'
                    decelerationRate="fast"
                    scrollEventThrottle={16}
                    style={{
                        marginTop: SIZES.radius
                    }}
                    data={dummyData.interestedProducts}
                    listKey="InterestedProducts"
                    keyExtractor={item => `interested-${item.id}`}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            style={{
                                backgroundColor: COLORS.light,
                                marginLeft: index == 0 ? SIZES.padding : 0,
                                marginRight: 16,
                                paddingVertical: SIZES.margin,
                                paddingHorizontal: SIZES.base,
                                borderRadius: 16,
                                width: 120
                            }}
                            onPress={() => {
                                console.log(`${item.name} pressed`)
                            }}
                        >
                            <View
                                style={{
                                    flexGrow: 1
                                }}
                            >
                                {/* Product image */}
                                <Image
                                    source={item.image}
                                    resizeMode='contain'
                                    style={{
                                        height: 48,
                                        width: '100%'
                                    }}
                                />

                                {/* Product name */}
                                <Text
                                    style={{
                                        ...FONTS.body5,
                                        color: COLORS.dark,
                                        marginVertical: SIZES.base
                                    }}
                                >
                                    {item.name}
                                </Text>
                            </View>

                            {/* Price & discount */}
                            <View
                                style={{
                                    flexDirection: 'row'
                                }}
                            >
                                <Text
                                    style={{
                                        ...FONTS.h4,
                                        color: COLORS.primary,
                                        marginRight: SIZES.base
                                    }}
                                >
                                    {item.price}
                                </Text>

                                <Text
                                    style={{
                                        ...FONTS.body5,
                                        fontSize: 10,
                                        color: COLORS.grey
                                    }}
                                >
                                    {item.discount}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </Section>
        )
    }

    function renderBundleSection() {
        return (
            <Section
                title="Usually Bought Together"
                containerStyle={{
                    marginBottom: 32,
                }}
                seeMoreOnPress={() => {
                    console.log('See more usually bought together pressed')
                }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.light,
                        marginHorizontal: SIZES.padding,
                        marginTop: SIZES.radius,
                        padding: SIZES.margin,
                        borderRadius: 16
                    }}
                    onPress={() => {
                        console.log("Bundle product pressed")
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        {dummyData.bundleProducts.map((item, index) => {

                            return (
                                <View
                                    key={`bundle-${index}`}
                                    style={{
                                        flexDirection: 'row'
                                    }}
                                >
                                    <View
                                        style={{
                                            alignItems: 'center'
                                        }}
                                    >
                                        {/* Product image */}
                                        <Image
                                            source={item.image}
                                            resizeMode='contain'
                                            style={{
                                                height: 80,
                                                width: 80
                                            }}
                                        />

                                        {/* Price */}
                                        <Text
                                            style={{
                                                ...FONTS.h5,
                                                color: COLORS.primary
                                            }}
                                        >
                                            {item.price}
                                        </Text>
                                    </View>

                                    {index < (dummyData.bundleProducts.length - 1) &&
                                        <Image
                                            source={icons.plus}
                                            resizeMode='contain'
                                            style={{
                                                marginTop: 32,
                                                marginHorizontal: 6,
                                                height: 16,
                                                width: 16,
                                                tintColor: COLORS.grey
                                            }}
                                        />
                                    }
                                </View>
                            )
                        })}
                    </View>

                    <Text
                        style={{
                            ...FONTS.body5,
                            color: COLORS.grey,
                            marginTop: SIZES.base,
                            textAlign: 'center'
                        }}
                    >
                        Buy 3 products, reduce 30%
                    </Text>
                </TouchableOpacity>
            </Section>
        )
    }

    function renderStoreInfo() {
        return (
            <View
                style={{
                    marginHorizontal: SIZES.padding,
                    marginBottom: 32
                }}
            >
                <Text
                    style={{
                        ...FONTS.h2,
                        fontSize: 18,
                        marginBottom: SIZES.radius,
                    }}
                >
                    Info Store
                </Text>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: COLORS.light,
                        paddingVertical: SIZES.margin,
                        paddingHorizontal: 16,
                        borderRadius: 16
                    }}
                >
                    <Image
                        source={require("../../../assets/images/dummy/shoe_16.png")}
                        resizeMode='contain'
                        style={{
                            height: 48,
                            width: 48,
                            borderRadius: 24,
                            marginRight: 16
                        }}
                    />

                    <View
                        style={{
                            flex: 1
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("StoreProfileMain")
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.h3,
                                    color: COLORS.title
                                }}
                            >
                                Store Pathr
                            </Text>
                        </TouchableOpacity>

                        <Text
                            style={{
                                ...FONTS.body5,
                                color: COLORS.grey
                            }}
                        >
                            4567k follower
                        </Text>
                    </View>

                    <TextButton
                        contentContainerStyle={{
                            backgroundColor: COLORS.lightGrey,
                            borderRadius: SIZES.base,
                            paddingVertical: SIZES.base,
                            paddingHorizontal: 30
                        }}
                        labelStyle={{
                            color: COLORS.primary
                        }}
                        label="Follow"
                        onPress={() => {
                            console.log('Follow button pressed')
                        }}
                    />
                </View>
            </View>
        )
    }

    function renderViewedSection() {
        return (
            <View
                style={{
                    marginBottom: 32
                }}
            >
                <Text
                    style={{
                        ...FONTS.h2,
                        fontSize: 18,
                        marginHorizontal: SIZES.padding,
                        marginBottom: SIZES.radius
                    }}
                >
                    Viewed Products
                </Text>

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToAlignment='start'
                    decelerationRate="fast"
                    scrollEventThrottle={16}
                    data={dummyData.viewedProducts}
                    listKey="ViewedProducts"
                    keyExtractor={item => `viewed-${item.id}`}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            style={{
                                backgroundColor: COLORS.light,
                                marginLeft: index == 0 ? SIZES.padding : 0,
                                marginRight: 16,
                                paddingVertical: SIZES.margin,
                                paddingHorizontal: 22,
                                borderRadius: 16,
                                width: 120,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onPress={() => {
                                console.log(`Viewed product ${index} pressed`)
                            }}
                        >
                            {/* Product image */}
                            <Image
                                source={item.image}
                                resizeMode='contain'
                                style={{
                                    height: 72,
                                    width: 72
                                }}
                            />

                            {/* Price */}
                            <Text
                                style={{
                                    ...FONTS.h5,
                                    color: COLORS.primary,
                                    marginTop: SIZES.base
                                }}
                            >
                                {item.price}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        )
    }

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1
            }}
        >
            {renderProductSection()}
            {renderInterestedSection()}
            {renderBundleSection()}
            {renderStoreInfo()}
            {renderViewedSection()}
        </ScrollView>
    )
}

export default OverviewTab;