import React from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    FlatList
} from 'react-native';

import {
} from '../../../components'
import {
    COLORS,
    FONTS,
    SIZES,
    dummyData,
    constants,
    icons
} from '../../../constants';


const StoreTab = () => {

    function renderSectionHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                {/* Icon */}
                <View
                    style={{
                        width: 40,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        backgroundColor: COLORS.primary
                    }}
                >
                    <Image
                        source={icons.fire_fill}
                        resizeMode='contain'
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: COLORS.light,
                            //...iconStyle
                        }}
                    />
                </View>

                {/* Title */}
                <Text
                    style={{
                        ...FONTS.h3,
                        marginLeft: SIZES.radius
                    }}
                >
                    Bestsellers
                </Text>
            </View>
        )
    }

    function renderProductInfo(item) {
        return (
            <View
                style={{
                    flex: 1,
                    marginLeft: SIZES.base
                }}
            >
                {/* Name */}
                <Text
                    style={{
                        ...FONTS.h3
                    }}
                >
                    {item.name}
                </Text>

                {/* Ratings */}
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.base
                    }}
                >
                    {/* Ratings Icon */}
                    <Image
                        source={icons?.star}
                        resizeMode='contain'
                        style={{
                            width: 20,
                            height: 20
                        }}
                    />

                    {/* Ratings Figures */}
                    <Text
                        style={{
                            ...FONTS.body4,
                            marginLeft: 3
                        }}
                    >
                        {item?.ratings}
                    </Text>

                    {/* Number of Ratings */}
                    <Text
                        style={{
                            ...FONTS.body4,
                            marginLeft: SIZES.base,
                            color: COLORS.grey
                        }}
                    >
                        ({item?.number_of_ratings} ratings)
                    </Text>
                </View>

                {/* Sales */}
                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    {/* Sales Icon */}
                    <Image
                        source={icons?.shoppingCart}
                        resizeMode='contain'
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.error
                        }}
                    />

                    {/* Ratings Figures */}
                    <Text
                        style={{
                            ...FONTS.body4,
                            marginLeft: 3
                        }}
                    >
                        {item?.number_of_sales} sales
                    </Text>
                </View>

                {/* Total and discounts */}
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.base,
                        alignItems: 'center'
                    }}
                >
                    {/* Total */}
                    <Text
                        style={{
                            ...FONTS.h2,
                            color: COLORS.primary
                        }}
                    >
                        ${item?.price.toFixed(2)}
                    </Text>

                    {/* Discounts */}
                    <Text
                        style={{
                            ...FONTS.body3,
                            marginLeft: SIZES.base,
                            color: COLORS.grey
                        }}
                    >
                        {item?.discount}
                    </Text>
                </View>
            </View>
        )
    }

    function renderRank(item) {
        return (
            <View
                style={{
                    position: 'absolute',
                    top: -20,
                    right: 10,
                }}
            >
                <ImageBackground
                    source={icons.bookmark_fill}
                    resizeMode='contain'
                    imageStyle={{
                        tintColor: item?.rank_color
                    }}
                    style={{
                        width: 50,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.h3,
                            color: COLORS.light,
                        }}
                    >
                        {item?.rank}
                    </Text>
                </ImageBackground>
            </View>
        )
    }

    function renderStoreList() {
        return (
            <FlatList
                data={dummyData?.store_info?.best_sellers}
                keyExtractor={item => item.id}
                ListHeaderComponent={renderSectionHeader}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding
                }}
                renderItem={({ item, index }) => (
                    <View
                        style={{
                            flexDirection: 'row',
                            padding: SIZES.padding,
                            marginTop: SIZES.padding,
                            alignItems: 'center',
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.light
                        }}
                    >
                        {/* Product Image */}
                        <Image
                            source={item?.image}
                            resizeMode='contain'
                            style={{
                                width: 80,
                                height: 80
                            }}
                        />

                        {/* Product Info */}
                        {renderProductInfo(item)}

                        {/* Rank */}
                        {renderRank(item)}
                    </View>
                )}
            />
        )
    }

    return (
        <View
            style={{
                flex: 1
            }}
        >
            {/* Store List */}
            {renderStoreList()}
        </View>
    )
}

export default StoreTab;