import React from 'react';
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
    FilterBar,
    Header2,
    IconButton,
    ProductSoldBar
} from '../../../components';
import { 
    COLORS,
    FONTS,
    SIZES,
    icons,
    images,
    dummyData
} from '../../../constants';

const FlashDeal = () => {

    const [selectedSale, setSelectedSale] = React.useState(2)
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


    function renderBanner() {
        return (
            <ImageBackground
                source={images.banner03}
                resizeMode='cover'
                style={{
                    borderRadius: 16,
                    overflow: 'hidden',
                    marginHorizontal: SIZES.padding,
                    marginBottom: SIZES.margin
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: SIZES.padding
                    }}
                >
                    <View 
                        style={{
                            flex: 1
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.h3,
                                fontSize: 19,
                                lineHeight: 33,
                                color: COLORS.light
                            }}
                        >
                            FLASH SALE 12
                        </Text>

                        <Text
                            style={{
                                ...FONTS.body5,
                                fontSize: 10,
                                color: COLORS.light
                            }}
                        >
                            Stay tune and check your notif everyday
                        </Text>
                    </View>
                    
                    <View
                        style={{
                            backgroundColor: COLORS.light,
                            borderRadius: SIZES.base,
                            paddingHorizontal: 16,
                            paddingVertical: 9,
                            width: 70
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.h5,
                                textAlign: 'center'
                            }}
                        >
                            24 hours
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        )
    }

    function renderSaleSchedule() {
        return (
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToAlignment='start'
                decelerationRate='fast'
                snapToInterval={106}
                scrollEventThrottle={16}
                style={{ marginBottom: SIZES.margin }}
                data={dummyData.flashSales}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => (
                    <TouchableOpacity
                        style={{
                            ...styles.horizontalFlatlistContainer,
                            backgroundColor: item.status == 'Done Flash' ? COLORS.grey : COLORS.light,
                            borderColor: item.id == selectedSale ? COLORS.primary : 'transparent',
                            marginLeft: index == 0 ? SIZES.padding : 0,
                            paddingVertical: 16,
                            width: 90
                        }}
                        disabled={item.status == 'Done Flash'}
                        onPress={() => {
                            setSelectedSale(item.id)
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.h3,
                                fontSize: 19,
                                lineHeight: 30,
                                color: item.status == 'Done Flash' ? COLORS.light : item.id == selectedSale ? COLORS.primary : COLORS.dark,
                                marginBottom: 6
                            }}
                        >
                            {item.time}
                        </Text>

                        <Text
                            style={{
                                ...FONTS.body5,
                                color: item.status == 'Done Flash' ? COLORS.light : item.id == selectedSale ? COLORS.primary : COLORS.dark,
                            }}
                        >
                            {item.status}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        )
    }

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
                {renderBanner()}
                {renderSaleSchedule()}
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
            <Header2
                title={'Flash Deal'}
                containerStyle={{
                    marginBottom: SIZES.padding
                }}
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
                            icon={icons.flash}
                            iconStyle={{
                                width: 25,
                                height: 25
                            }}
                        />

                        <IconButton
                            icon={icons.question_mark}
                            iconStyle={{
                                width: 25,
                                height: 25
                            }}
                        />
                    </View>
                }
            />

            <Animated.FlatList
                contentContainerStyle={{ 
                    flexDirection: 'column'
                }}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={onScroll}
                data={dummyData.flashSaleItems}
                keyExtractor={item => item.id}
                ListHeaderComponent={renderCollapsibleStickyHeader}
                stickyHeaderIndices={[0]}
                renderItem={({item, index}) => (
                    <TouchableOpacity
                        style={{
                            backgroundColor: COLORS.light,
                            borderRadius: 16,
                            paddingHorizontal: 16,
                            paddingVertical: SIZES.margin,
                            marginBottom: 16,
                            marginRight: (index + 1) % 2 == 0 ? SIZES.padding : 16,
                            marginLeft: (index + 1) % 2 == 0 ? 0 : SIZES.padding,
                            width: (SIZES.width - (SIZES.padding * 2) - 16) / 2
                        }}
                        onPress={() => {
                            console.log(`${item.name} pressed`)
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

                        {/* Price & discount */}
                        <View
                            style={{
                                flexDirection: 'row'
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.h3,
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

                        {/* Product sold bar & quantity */}
                        <ProductSoldBar
                            percentage={item.percentage}
                        />

                        <Text
                            style={{
                                ...FONTS.body5,
                                color: COLORS.grey,
                                marginTop: SIZES.base
                            }}
                        >
                            {item.sold_qty}/{item.total_qty} products sold
                        </Text>
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

export default FlashDeal;