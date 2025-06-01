import React from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    ScrollView,
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
import {
    EmptyState,
    Header2,
    Section
} from '../../../components';
import {
    COLORS,
    FONTS,
    SIZES,
    icons
} from '../../../constants';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const Favorite = ({ route }) => {

    const { selectedCollection } = route.params

    const scrollX = useSharedValue(0)

    const onScroll = useAnimatedScrollHandler((event) => {
        scrollX.value = event.contentOffset.x
    })

    const Dots = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    justifyContent: 'center',
                    bottom: SIZES.radius,
                    left: 0,
                    right: 0
                }}
            >
                {selectedCollection.banners.map((item, index) => {
                    const dotOpacityAnimatedStyle = useAnimatedStyle(() => {
                        return {
                            opacity: interpolate(
                                scrollX.value / (SIZES.width - (SIZES.padding * 2)),
                                [index - 1, index, index + 1],
                                [0.2, 1, 0.2],
                                Extrapolate.CLAMP
                            ),
                        };
                    })

                    return (
                        <Animated.View
                            key={`dot-${index}`}
                            style={[{
                                width: 10,
                                height: 10,
                                borderRadius: 5,
                                marginHorizontal: 4,
                                backgroundColor: COLORS.light
                            }, dotOpacityAnimatedStyle]}
                        />
                    )
                })}
            </View>
        )
    }

    function renderBanner() {
        return (
            <View
                style={{
                    height: 150
                }}
            >
                <AnimatedFlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToAlignment='start'
                    decelerationRate="fast"
                    snapToInterval={SIZES.width - (SIZES.padding * 2)}
                    scrollEventThrottle={16}
                    onScroll={onScroll}
                    data={selectedCollection.banners}
                    keyExtractor={(item) => `banner-${item.id}`}
                    renderItem={({ item, index }) => {
                        return (
                            <View
                                style={{
                                    width: SIZES.width - (SIZES.padding * 2)
                                }}
                            >
                                <Image
                                    source={item.image}
                                    resizeMode="cover"
                                    style={{
                                        width: '100%',
                                        height: '100%'
                                    }}
                                />
                            </View>
                        )
                    }}
                />

                <Dots />
            </View>
        )
    }

    function renderBrandSection() {
        return (
            <Section
                title="Brand Favorite"
                containerStyle={{
                    marginBottom: SIZES.padding
                }}
                seeMoreOnPress={() => {
                    console.log('See more brand favorite pressed')
                }}
            >
                <View
                    style={{
                        backgroundColor: COLORS.light,
                        marginHorizontal: SIZES.padding,
                        marginVertical: 14,
                        borderRadius: 16,
                        overflow: 'hidden'
                    }}
                >
                    {/* Banner */}
                    {selectedCollection.banners && renderBanner()}

                    {/* Brands */}
                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            paddingHorizontal: SIZES.radius,
                            paddingVertical: 6
                        }}
                    >
                        {selectedCollection.brands.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={`brand-${item.id}`}
                                    style={{
                                        width: (SIZES.width - (SIZES.padding * 2) - (SIZES.radius * 2)) / 3,
                                        marginVertical: 6,
                                        alignItems: 'center'
                                    }}
                                    onPress={() => {
                                        console.log(`${item.name} pressed`)
                                    }}
                                >
                                    <Image
                                        source={item.logo}
                                        resizeMode='contain'
                                        style={{
                                            width: 40,
                                            height: 40
                                        }}
                                    />

                                    <Text
                                        style={{
                                            ...FONTS.body5,
                                            fontSize: 9,
                                            lineHeight: 16,
                                            marginTop: SIZES.base,
                                            textAlign: 'center'
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            </Section>
        )
    }

    function renderProductSection() {
        return (
            <Section
                title="Product Favorite"
                seeMoreOnPress={() => {
                    console.log('See more product favorite pressed')
                }}
            >
                <View
                    style={{
                        marginHorizontal: SIZES.padding,
                        marginVertical: 14
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap'
                        }}
                    >
                        {selectedCollection.products.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={`product-${item.id}`}
                                    style={{
                                        backgroundColor: COLORS.light,
                                        borderRadius: 16,
                                        paddingHorizontal: 16,
                                        paddingVertical: SIZES.margin,
                                        marginBottom: 16,
                                        marginRight: (index + 1) % 2 == 0 ? 0 : 16,
                                        width: (SIZES.width - (SIZES.padding * 2) - 16) / 2
                                    }}
                                    onPress={() => {
                                        console.log(`${item.name} pressed`)
                                    }}
                                >
                                    <View 
                                        style={{
                                            flex: 1
                                        }}
                                    >
                                        {/* Product image */}
                                        <Image
                                            source={item.image}
                                            resizeMode='contain'
                                            style={{
                                                alignSelf:'center',
                                                height: 80,
                                                width: '100%'
                                            }}
                                        />

                                        {/* Product name */}
                                        <Text
                                            style={{
                                                ...FONTS.h4,
                                                color: COLORS.dark,
                                                marginVertical: SIZES.radius
                                            }}
                                        >
                                            {item.name}
                                        </Text>
                                    </View>

                                    {/* Price */}
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Text
                                            style={{
                                                ...FONTS.h3,
                                                color: COLORS.primary
                                            }}
                                        >
                                            {item.price}
                                        </Text>

                                        <View
                                            style={{
                                                width: 32,
                                                height: 32,
                                                borderRadius: SIZES.base,
                                                backgroundColor: COLORS.lightGrey,
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Image
                                                source={icons.bookmark_fill}
                                                style={{
                                                    width: 16,
                                                    height: 16
                                                }}
                                            />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            </Section>
        )
    }

    return (
        <View style={styles.container}>
            <Header2
                title={`Collection ${selectedCollection.name}`}
                containerStyle={{ 
                    marginBottom: SIZES.padding 
                }}
            />

            <ScrollView 
                contentContainerStyle={{
                    flexGrow: 1
                }}
            >
                {selectedCollection.brands && renderBrandSection()}

                {selectedCollection.products && renderProductSection()}

                {!selectedCollection.brands && !selectedCollection.products &&
                    <EmptyState
                        label='There is no collection'
                    />
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGrey
    }
})

export default Favorite;