import React from "react";
import {
    View,
    Text,
    Animated,
    FlatList,
    Image,
    ImageBackground,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {
    FilterBar
} from '../../components';
import { 
    COLORS,
    FONTS,
    SIZES,
    images,
    dummyData
} from '../../constants';

const BrandCoupons = () => {

    const [selectedBrand, setSelectedBrand] = React.useState(1)
    const [selectedItem, setSelectedItem] = React.useState("All Products")

    const [collapsibleHeaderHeight, setCollapsibleHeaderHeight] = React.useState(0)

    const onLayout = (event) => {
        const { height } = event.nativeEvent.layout
        setCollapsibleHeaderHeight(height)
    }

    const scrollY = React.useRef(new Animated.Value(0)).current;  

    const onScroll = Animated.event(
        [
            { 
                nativeEvent: { contentOffset: { y: scrollY } }
            },
        ],
        {
            useNativeDriver: true,
        },
    );

    function renderBrandOptions() {
        return (
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                style={{ marginBottom: SIZES.margin }}
                data={dummyData.brands}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => {
                    if(item.logo) {
                        return (
                            <TouchableOpacity
                                style={{
                                    ...styles.horizontalFlatlistContainer,
                                    backgroundColor: COLORS.light,
                                    borderColor: item.id == selectedBrand ? COLORS.primary : 'transparent',
                                    marginLeft: index == 0 ? SIZES.padding : 0,
                                    padding: SIZES.margin,
                                    height: 60,
                                    width: 100
                                }}
                                onPress={() => {
                                    setSelectedBrand(item.id)
                                }}
                            >
                                <Image
                                    source={item.logo}
                                    resizeMode='contain'
                                    style={{
                                        flex: 1,
                                        height: 60 - (SIZES.margin * 2),
                                        width: 100 - (SIZES.margin * 2)
                                    }}
                                />
                            </TouchableOpacity>
                        )
                    }
                    else {
                        return (
                            <TouchableOpacity
                                style={{
                                    ...styles.horizontalFlatlistContainer,
                                    backgroundColor: COLORS.light,
                                    borderColor: item.id == selectedBrand ? COLORS.primary : 'transparent',
                                    marginLeft: index == 0 ? SIZES.padding : 0,
                                    paddingHorizontal: SIZES.padding,
                                    paddingVertical: 16
                                }}
                                onPress={() => {
                                    setSelectedBrand(item.id)
                                }}
                            >
                                <Text
                                    style={{
                                        ...FONTS.h3,
                                        color: item.id == selectedBrand ? COLORS.primary : COLORS.dark
                                    }}
                                >
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                }}
            />
        )
    }

    function renderCollapsibleStickyHeader() {
        return (
            <Animated.View 
                style={{
                    backgroundColor: COLORS.lightGrey,
                    transform: [{
                        translateY: scrollY.interpolate({
                            inputRange: [0, collapsibleHeaderHeight],
                            outputRange: [0, -(collapsibleHeaderHeight - 84)],
                            extrapolate: 'clamp'
                        }),
                    }],
                }}
                onLayout={onLayout}
            >
                {renderBrandOptions()}

                <FilterBar
                    containerStyle={{ marginHorizontal: SIZES.padding }}
                    selectedItem={selectedItem}
                    rightComponentLabel='233 Results'
                />
            </Animated.View>
        )
    }

    return (
        <View style={styles.container}>
            <Animated.FlatList
                contentContainerStyle={{ 
                    flexDirection: 'column'
                }}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={onScroll}
                data={dummyData.brandCoupons}
                keyExtractor={item => item.id}
                ListHeaderComponent={renderCollapsibleStickyHeader}
                stickyHeaderIndices={[0]}
                renderItem={({item, index}) => (
                    <TouchableOpacity
                        style={{
                            marginVertical: 16,
                            marginRight: (index + 1) % 2 == 0 ? SIZES.padding : 16,
                            marginLeft: (index + 1) % 2 == 0 ? 0 : SIZES.padding,
                            width: (SIZES.width - (SIZES.padding * 2) - 16) / 2
                        }}
                        onPress={() => {
                            console.log(`${item.title} pressed`)
                        }}
                    >
                        <ImageBackground
                            source={images.ticket}
                            resizeMode='cover'
                            style={{
                                alignItems: 'center',
                                paddingHorizontal: SIZES.radius,
                                paddingBottom: SIZES.margin,
                                height: (SIZES.width - (SIZES.padding * 2) - 16) / 2 * 0.65
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginBottom: SIZES.base
                                }}
                            >
                                <View
                                    style={{
                                        width: 48,
                                        height: 48,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 24,
                                        borderWidth: 2,
                                        borderColor: COLORS.light,
                                        backgroundColor: item.color,
                                        marginTop: -16
                                    }}
                                >
                                    <Image
                                        source={item.icon}
                                        resizeMode='contain'
                                        style={{
                                            width: 24,
                                            height: 24,
                                            tintColor: COLORS.light
                                        }}
                                    />
                                </View>

                                <View
                                    style={{
                                        width: 48,
                                        height: 48,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 24,
                                        borderWidth: 2,
                                        borderColor: COLORS.light,
                                        backgroundColor: COLORS.lightGrey,
                                        marginLeft: -16,
                                        marginTop: -16
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...FONTS.h5,
                                            color: COLORS.title
                                        }}
                                    >
                                        {item.discount}
                                    </Text>
                                </View>
                            </View>

                            <View
                                style={{
                                    alignItems: 'center'
                                }}
                            >
                                <Text
                                    style={{
                                        ...FONTS.h4,
                                        lineHeight: 26,
                                        color: COLORS.title,
                                        textAlign: 'center'
                                    }}
                                >
                                    {item.title}
                                </Text>
                                <Text
                                    style={{
                                        ...FONTS.body5,
                                        lineHeight: 18,
                                        color: COLORS.grey,
                                        textAlign: 'center'
                                    }}
                                >
                                    {item.description}
                                </Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGrey
    },
    horizontalFlatlistContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 16,
        marginRight: 16
    }
})

export default BrandCoupons;