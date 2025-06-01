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
                                                    ...FONTS.h4,
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
                        icon={icons.gift_fill}
                        label="Workolic"
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
                        icon={icons.clipboard}
                        label="Checklist"
                        bgColor={COLORS.error08}
                    />

                    <IconLabelButton
                        icon={icons.search_fill}
                        label="Scan"
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



    function renderCategories() {
        return (
            <Section
                title="Your Statistics"
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
                                        style={[styles.categoryImageContainer,{backgroundColor:'lightgreen'}]}
                                    >
                                        
                                        
                                    </View>

                                    <View
                                         style={[styles.categoryImageContainer,{backgroundColor:'lightgreen'}]}
                                    >
                                        {/* <Image
                                            source={item?.image_2}
                                            resizeMode="contain"
                                            style={styles.categoryImage}
                                        /> */}
                                    </View>

                                    <View
                                        style={styles.categoryImageContainer}
                                    >
                                        
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
                                        {item?.qty}
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