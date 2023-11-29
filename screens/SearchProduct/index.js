import React from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
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
    FormInput,
    Header2,
    IconButton,
    Section
} from '../../components';
import {
    COLORS,
    FONTS,
    SIZES,
    icons,
    dummyData
} from '../../constants';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const SearchProduct = ({ navigation }) => {

    const [searchProduct, setSearchProduct] = React.useState("")

    const scrollX = useSharedValue(0);

    const onScroll = useAnimatedScrollHandler((event) => {
        scrollX.value = event.contentOffset.x;
    });

    const Dots = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    justifyContent: 'center',
                    bottom: SIZES.padding,
                    left: 0,
                    right: 0,
                }}
            >
                {dummyData.featuredProducts.map((item, index) => {
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

    function renderFeaturedSection() {
        return (
            <View
                style={{
                    height: 280,
                    marginBottom: 43,
                    marginHorizontal: SIZES.padding,
                    borderRadius: SIZES.padding,
                    overflow: 'hidden'
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
                    data={dummyData.featuredProducts}
                    keyExtractor={(item) => `featured-${item.id}`}
                    renderItem={({ item, index }) => {
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
                                    <View>
                                        <Text
                                            style={{
                                                ...FONTS.h4,
                                                color: COLORS.light
                                            }}
                                        >
                                            Featured
                                        </Text>

                                        <Text
                                            style={{
                                                ...FONTS.h2,
                                                fontSize: 24,
                                                lineHeight: 44,
                                                color: COLORS.light
                                            }}
                                        >
                                            {item?.title}
                                        </Text>
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

    function renderTopKeySection() {
        return (
            <View>
                <Section
                    title="Top Key Search"
                    containerStyle={{ marginBottom: SIZES.radius }}
                    seeMoreOnPress={() => {
                        console.log("See More button pressed")
                    }}
                >
                    <View
                        style={{ 
                            marginHorizontal: SIZES.padding,
                            marginTop: SIZES.radius,
                            marginBottom: 16
                        }}
                    >
                        {dummyData.topSearch.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={`topKey-${index}`}
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        backgroundColor: COLORS.light,
                                        paddingHorizontal: SIZES.margin,
                                        paddingVertical: SIZES.base,
                                        marginBottom: 16,
                                        borderRadius: 16
                                    }}
                                    onPress={() => {
                                        console.log(`${item.keyword} pressed`)
                                    }}
                                >
                                    <View 
                                        style={{ 
                                            flexDirection: 'row',
                                            alignItems: 'center' 
                                        }}
                                    >
                                        <Image
                                            source={item.image}
                                            style={{
                                                height: 44,
                                                width: 44,
                                                marginRight: 16,
                                                borderRadius: SIZES.base
                                            }}
                                        />

                                        <Text
                                            style={{
                                                ...FONTS.h3,
                                                color: COLORS.dark
                                            }}
                                        >
                                            {item.keyword}
                                        </Text>
                                    </View>

                                    <View 
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Text
                                            style={{
                                                ...FONTS.body4,
                                                color: COLORS.grey
                                            }}
                                        >
                                            {`(${item.result} product)`}
                                        </Text>

                                        <Image
                                            source={icons.arrow_right_up}
                                            style={{
                                                height: 20,
                                                width: 20,
                                                marginLeft: SIZES.base
                                            }}
                                        />
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </Section>
            </View>
        )
    }

    function renderSuggestedSection() {
        return (
            <View 
                style={{ 
                    marginHorizontal: SIZES.padding, 
                    marginBottom: 16 
                }}
            >
                <Text
                    style={{
                        ...FONTS.h2,
                        fontSize: 18,
                        marginBottom: SIZES.radius
                    }}
                >
                    Suggest to you
                </Text>

                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }}
                >
                    {dummyData.suggestedSearch.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={`suggested-${index}`}
                                style={{
                                    backgroundColor: COLORS.light,
                                    paddingHorizontal: SIZES.margin,
                                    paddingVertical: SIZES.base,
                                    marginRight: SIZES.radius,
                                    marginBottom: 16,
                                    borderRadius: SIZES.base
                                }}
                                onPress={() => {
                                    console.log(`${item.keyword} pressed`)
                                }}
                            >
                                <Text
                                    style={{
                                        ...FONTS.h5
                                    }}
                                >
                                    {item.keyword}
                                </Text>    
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        )
    }

    function renderEmptyInputSection() {
        return (
            <ScrollView>
                {renderFeaturedSection()}
                {renderTopKeySection()}
                {renderSuggestedSection()}
            </ScrollView>
        )
    }

    function renderWithInputSection() {
        return (
            <View
                style={{
                    flex: 1,
                    marginTop: 16,
                    marginHorizontal: SIZES.padding
                }}
            >
                <Text
                    style={{
                        ...FONTS.h2,
                        fontSize: 18,
                        marginBottom: SIZES.radius
                    }}
                >
                    Recent Search
                </Text>

                <FlatList
                    snapToAlignment='start'
                    decelerationRate='fast'
                    snapToInterval={78}
                    scrollEventThrottle={16}
                    data={dummyData.recentSearch}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: COLORS.light,
                                padding: SIZES.margin,
                                marginBottom: 16,
                                borderRadius: 16
                            }}
                            onPress={() => {
                                console.log(`${item.keyword} pressed`)
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.h4,
                                    color: COLORS.dark
                                }}
                            >
                                {item.keyword}
                            </Text>

                            <Image
                                source={icons.arrow_right_up}
                                style={{
                                    height: 20,
                                    width: 20
                                }}
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <Header2
                title={'Search'}
                containerStyle={{ marginBottom: SIZES.padding }}
                rightComponent={!searchProduct &&
                    <IconButton
                        containerStyle={{
                            marginRight: 16
                        }}
                        icon={icons.filter}
                        iconStyle={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.dark
                        }}
                    />
                }
            />

            {/* Search Bar */}
            <FormInput
                containerStyle={{
                    marginBottom: 16,
                    marginTop: SIZES.radius,
                    marginHorizontal: SIZES.padding,
                    borderRadius: SIZES.radius
                }}
                inputContainerStyle={{
                    backgroundColor: COLORS.light
                }}
                placeholder="Search Product"
                inputStyle={{
                    marginLeft: SIZES.radius
                }}
                value={searchProduct}
                prependComponent={
                    <Image
                        source={icons.search_fill}
                        style={{
                            height: 25,
                            width: 25,
                            tintColor: COLORS.grey,
                        }}
                    />
                }
                appendComponent={
                    <IconButton
                        icon={icons.camera_fill}
                        iconStyle={{
                            width: 25,
                            height: 25
                        }}
                        onPress={() => navigation.navigate("ScanProduct")}
                    />
                }
                onChange={(text) => {
                    setSearchProduct(text)
                }}
            />

            {/* Content */}
            { searchProduct ? renderWithInputSection() : renderEmptyInputSection() }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGrey
    },
})

export default SearchProduct;