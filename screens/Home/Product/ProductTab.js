import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated';
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';

import {
    COLORS,
    SIZES,
    icons,
    FONTS,
    dummyData,
    images
} from "../../../constants"
import {
    IconLabelButton,
    TextButton,
    Section,
    ProductSoldBar
} from "../../../components";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const ProductTab = () => {

    const navigation = useNavigation();

    const scrollX = useSharedValue(0);

    const onScroll = useAnimatedScrollHandler((event) => {
        scrollX.value = event.contentOffset.x;
    });

    const [isLogin, setIsLogin] = React.useState(true)

    // Render

    const Dots = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    left: SIZES.padding,
                    bottom: SIZES.padding
                }}
            >
                {
                    dummyData.banners.map((item, index) => {
                        const dotOpacityAnimatedStyle = useAnimatedStyle(() => {
                            return {
                                opacity: interpolate(
                                    scrollX.value / (SIZES.width - (SIZES.padding * 2)),
                                    [index - 1, index, index + 1],
                                    [0.2, 1, 0.2],
                                    Extrapolate.CLAMP
                                ),
                            };
                        });

                        return (
                            <Animated.View
                                key={`dot-${index}`}
                                style={[{
                                    borderRadius: 5,
                                    marginHorizontal: 4,
                                    width: 10,
                                    height: 10,
                                    backgroundColor: COLORS.light
                                }, dotOpacityAnimatedStyle]}
                            />
                        )
                    })
                }
            </View>
        )
    }

    function renderBanner() {
        return (
            <View
                style={{
                    height: 180,
                    marginHorizontal: SIZES.padding,
                    borderRadius: SIZES.radius,
                    overflow: 'hidden'
                }}
            >
                <AnimatedFlatList
                    horizontal
                    data={dummyData.banners}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => `Banner-${item.id}`}
                    snapToInterval={SIZES.width - (SIZES.padding * 2)}
                    decelerationRate="fast"
                    scrollEventThrottle={16}
                    onScroll={onScroll}
                    renderItem={({ item }) => {
                        return (
                            <View
                                style={{
                                    width: SIZES.width - (SIZES.padding * 2),
                                }}
                            >
                                <ImageBackground
                                    source={item?.image}
                                    resizeMode="cover"
                                    style={{
                                        flex: 1,
                                        padding: SIZES.padding
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: 'row'
                                        }}
                                    >
                                        {/* Title & Description */}
                                        <View
                                            style={{
                                                flex: 1
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    ...FONTS.h2,
                                                    color: COLORS.light
                                                }}
                                            >
                                                {item?.title}
                                            </Text>

                                            <Text
                                                style={{
                                                    ...FONTS.body3,
                                                    color: COLORS.light
                                                }}
                                            >
                                                {item?.description}
                                            </Text>
                                        </View>

                                        {/* Date */}
                                        <View
                                            style={{
                                                height: 60,
                                                width: 70,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                paddingHorizontal: SIZES.base,
                                                borderRadius: SIZES.radius,
                                                backgroundColor: 'white'
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    textAlign: 'center',
                                                    ...FONTS.h3
                                                }}
                                            >
                                                {item?.date}
                                            </Text>
                                        </View>
                                    </View>
                                </ImageBackground>
                            </View>
                        )
                    }}
                />

                <Dots />
            </View>
        )
    }

    function renderOptions() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    paddingHorizontal: SIZES.padding,
                    backgroundColor: COLORS.lightGrey
                }}
            >
                {/* Row 1 */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <IconLabelButton
                        icon={icons.book_open}
                        label="Event"
                        bgColor={COLORS.primary08}
                    />

                    <IconLabelButton
                        icon={icons.car}
                        label="Transport"
                        bgColor={COLORS.support1_08}
                    />

                    <IconLabelButton
                        icon={icons.video}
                        label="Live"
                        bgColor={COLORS.support2_08}
                    />

                    <IconLabelButton
                        icon={icons.shopping_bag}
                        label="Coin"
                        bgColor={COLORS.support3_08}
                    />
                </View>

                {/* Row 2 */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: SIZES.radius
                    }}
                >
                    <IconLabelButton
                        icon={icons.clock}
                        label="Flash Sale"
                        bgColor={COLORS.error08}
                    />

                    <IconLabelButton
                        icon={icons.search_fill}
                        label="Search"
                        bgColor={COLORS.success08}
                    />

                    <IconLabelButton
                        icon={icons.fire_fill}
                        label="Premium"
                        bgColor={COLORS.support4_08}
                    />

                    <IconLabelButton
                        icon={icons.credit_card}
                        label="Card"
                        bgColor={COLORS.support5_08}
                    />
                </View>
            </View>
        )
    }

    function renderUnauthSection() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    padding: SIZES.padding,
                    backgroundColor: COLORS.light
                }}
            >
                <Text
                    style={{
                        color: COLORS.grey,
                        ...FONTS.body3
                    }}
                >
                    Sign up to enjoy the benefits of the App
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        height: 55,
                        marginTop: SIZES.radius
                    }}
                >
                    <TextButton
                        label="Log In"
                        contentContainerStyle={{
                            flex: 1,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.lightGrey
                        }}
                        labelStyle={{
                            color: COLORS.primary,
                            ...FONTS.h3
                        }}
                    />

                    <TextButton
                        label="Sign Up"
                        contentContainerStyle={{
                            flex: 1,
                            marginLeft: SIZES.radius,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.primary
                        }}
                        labelStyle={{
                            color: COLORS.secondary,
                            ...FONTS.h3
                        }}
                    />
                </View>
            </View>
        )
    }

    function renderFlashDeals() {
        return (
            <Section
                title="Sale time product"
                containerStyle={{
                    marginTop: SIZES.padding,
                }}
                seeMoreOnPress={() => {
                    navigation.navigate("FlashDeal")
                }}
            >
                <FlatList
                    data={dummyData.flashDeals}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{
                        marginTop: SIZES.radius,
                        //marginBottom: SIZES.padding
                    }}
                    decelerationRate="fast"
                    listKey="FlashDeals"
                    keyExtractor={(_, index) => `FlashDeals_${index}`}
                    renderItem={({ item, index }) => {
                        if (index == 0) {
                            return (
                                <View
                                    style={styles.flashDealsContainer}
                                >
                                    <Text
                                        style={{
                                            color: COLORS.light,
                                            ...FONTS.h2
                                        }}
                                    >
                                        {item?.title}
                                    </Text>
                                    <Text
                                        style={{
                                            marginTop: SIZES.padding,
                                            color: COLORS.light,
                                            ...FONTS.body3
                                        }}
                                    >
                                        {item?.desc}
                                    </Text>
                                    <Image
                                        source={images.clock}
                                        resizeMode="contain"
                                        style={{
                                            position: 'absolute',
                                            top: 30,
                                            right: -30,
                                            width: 100,
                                            height: 100
                                        }}
                                    />
                                </View>
                            )
                        } else {
                            return (
                                <View
                                    style={{
                                        ...styles.flashDealsContainer,
                                        marginLeft: SIZES.radius,
                                        marginRight: index == dummyData.flashDeals.length - 1 ? SIZES.padding : 0,
                                        backgroundColor: COLORS.light
                                    }}
                                >
                                    {/* Product Image */}
                                    <Image
                                        source={item?.image}
                                        resizeMode="contain"
                                        style={{
                                            width: 90,
                                            height: 90,
                                        }}
                                    />

                                    {/* Products Sold Bar */}
                                    <ProductSoldBar
                                        percentage={item?.percentage}
                                    />

                                    {/* Description */}
                                    <Text
                                        style={{
                                            marginTop: SIZES.radius,
                                            ...FONTS.body3
                                        }}
                                    >
                                        {`${item?.sold_qty}/${item?.total_qty}`}
                                    </Text>
                                    <Text
                                        style={{
                                            ...FONTS.body3
                                        }}
                                    >
                                        products sold
                                        </Text>
                                </View>
                            )
                        }
                    }}
                />
            </Section>
        )
    }

    function renderPromotionItems() {
        return (
            <Section
                title="Promotion Items"
                containerStyle={{
                    marginTop: SIZES.padding
                }}
                seeMoreOnPress={() => {

                }}
            >
                <FlatList
                    data={dummyData.promoItems}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{
                        marginTop: SIZES.radius
                    }}
                    decelerationRate="fast"
                    listKey="PromotionItems"
                    keyExtractor={(_, index) => `PromotionItems_${index}`}
                    renderItem={({ item, index }) => {
                        if (index == 0) {
                            return (
                                <View
                                    style={{
                                        ...styles.promoItemContainer,
                                        alignItems: "flex-start",
                                        paddingHorizontal: SIZES.padding
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: COLORS.light,
                                            ...FONTS.h2
                                        }}
                                    >
                                        {item?.title}
                                    </Text>
                                    <Text
                                        style={{
                                            marginTop: SIZES.radius,
                                            color: COLORS.light,
                                            ...FONTS.body3
                                        }}
                                    >
                                        {item?.desc}
                                    </Text>
                                    <Image
                                        source={images.cube}
                                        resizeMode="contain"
                                        style={{
                                            position: 'absolute',
                                            top: 30,
                                            right: -30,
                                            width: 100,
                                            height: 100
                                        }}
                                    />
                                </View>
                            )
                        } else {
                            return (
                                <View
                                    style={{
                                        ...styles.promoItemContainer,
                                        marginLeft: SIZES.radius,
                                        marginRight: index == dummyData.flashDeals.length - 1 ? SIZES.padding : 0,
                                        backgroundColor: COLORS.light
                                    }}
                                >
                                    {/* Product Image */}
                                    <Image
                                        source={item?.image}
                                        resizeMode="contain"
                                        style={{
                                            width: 90,
                                            height: 90,
                                            alignSelf: 'center'
                                        }}
                                    />

                                    {/* Name */}
                                    <Text
                                        style={{
                                            marginTop: SIZES.radius,
                                            ...FONTS.body3
                                        }}
                                    >
                                        {item?.name}
                                    </Text>

                                    {/* Price & Discount */}
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            width: "100%",
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <Text
                                            style={{
                                                ...FONTS.h2,
                                                color: COLORS.primary
                                            }}
                                        >
                                            ${item?.price.toFixed(2)}
                                        </Text>
                                        <Text
                                            style={{
                                                ...FONTS.body4,
                                                color: COLORS.grey
                                            }}
                                        >
                                            {item?.discount}
                                        </Text>
                                    </View>
                                </View>
                            )
                        }
                    }}
                />
            </Section>
        )
    }

    function renderCategories() {
        return (
            <Section
                title="You may like"
                containerStyle={{
                    marginTop: SIZES.padding,
                    marginBottom: SIZES.padding
                }}
                seeMoreOnPress={() => {

                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap"
                    }}
                >
                    {dummyData.categories.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={`Categories-${index}`}
                                style={{
                                    width: (SIZES.width - (SIZES.padding * 2) - SIZES.base) / 2,
                                    marginTop: SIZES.radius,
                                    marginLeft: (index + 1) % 2 == 0 ? SIZES.base : SIZES.padding,
                                    borderRadius: SIZES.radius,
                                    overflow: 'hidden',
                                    backgroundColor: COLORS.light
                                }}
                            >
                                {/* Images */}
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: SIZES.base,
                                        marginVertical: SIZES.base
                                    }}
                                >
                                    <View
                                        style={styles.categoryImageContainer}
                                    >
                                        <Image
                                            source={item?.image_1}
                                            resizeMode="contain"
                                            style={styles.categoryImage}
                                        />
                                    </View>

                                    <View
                                        style={styles.categoryImageContainer}
                                    >
                                        <Image
                                            source={item?.image_2}
                                            resizeMode="contain"
                                            style={styles.categoryImage}
                                        />
                                    </View>

                                    <View
                                        style={styles.categoryImageContainer}
                                    >
                                        <Image
                                            source={item?.image_3}
                                            resizeMode="contain"
                                            style={styles.categoryImage}
                                        />
                                    </View>
                                </View>

                                {/* Title & Quantity */}
                                <View
                                    style={{
                                        height: 50,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: item?.bg_color
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...FONTS.h3,
                                            color: COLORS.primary
                                        }}
                                    >
                                        {item?.name}
                                    </Text>
                                    <Text
                                        style={{
                                            ...FONTS.body4
                                        }}
                                    >
                                        {item?.qty} Products
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </Section>
        )
    }

    function renderAuthSection() {
        return (
            <View
                style={{
                    backgroundColor: COLORS.lightGrey
                }}
            >
                {/* Flash Deals */}
                {renderFlashDeals()}

                {/* Promotion */}
                {renderPromotionItems()}

                {/* Categories */}
                {renderCategories()}
            </View>
        )
    }

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1
            }}
        >
            <View>
                {/* Banner */}
                {renderBanner()}

                {/* Options */}
                {renderOptions()}
            </View>

            {/* Auth Section */}
            {isLogin ? renderAuthSection() : renderUnauthSection()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    flashDealsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 200,
        marginLeft: SIZES.padding,
        paddingHorizontal: SIZES.base,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.error
    },
    promoItemContainer: {
        justifyContent: 'center',
        width: 150,
        height: 200,
        marginLeft: SIZES.padding,
        paddingHorizontal: SIZES.base,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.support5
    },
    categoryImageContainer: {
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGrey
    },
    categoryImage: {
        width: 30,
        height: 30
    }
})

export default ProductTab;