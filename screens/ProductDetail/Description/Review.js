import React from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { Shadow } from 'react-native-shadow-2';
import {
    Header2,
    IconBadgeButton,
    IconButton
} from '../../../components';
import {
    COLORS,
    FONTS,
    SIZES,
    dummyData,
    icons,
    images
} from '../../../constants';

const Review = ({ cartQuantity }) => {

    const navigation = useNavigation()

    function renderHeader() {
        return (
            <Header2
                title="Reviews"
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
                            icon={icons.bookmark_fill}
                            iconStyle={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.dark
                            }}
                            onPress={() => {
                                console.log('bookmark pressed')
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

    function renderProductInfo() {
        return (
            <View
                style={{
                    marginVertical: SIZES.padding,
                    alignSelf: 'center'
                }}
            >
                <Shadow>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: COLORS.light,
                            width: SIZES.width - (SIZES.padding * 2),
                            padding: SIZES.margin,
                            borderRadius: 16
                        }}
                    >
                        {/* Product image */}
                        <Image
                            source={dummyData.productDetail.images[0].image}
                            resizeMode='contain'
                            style={{
                                width: 70,
                                height: 70,
                                marginRight: SIZES.margin
                            }}
                        />

                        <View
                            style={{
                                flexShrink: 1
                            }}
                        >
                            {/* Product name */}
                            <Text
                                style={{
                                    ...FONTS.h4,
                                    color: COLORS.dark,
                                    marginBottom: 4
                                }}
                                numberOfLines={1}
                            >
                                {dummyData.productDetail.name}
                            </Text>

                            {/* Product rating */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginBottom: 4
                                }}
                            >
                                <Image
                                    source={icons.star}
                                    resizeMode='contain'
                                    style={{
                                        width: 16,
                                        height: 16,
                                        marginRight: 4
                                    }}
                                />

                                <Text
                                    style={{
                                        ...FONTS.body5,
                                        color: COLORS.title,
                                        marginRight: SIZES.base
                                    }}
                                >
                                    {dummyData.productDetail.rating}
                                </Text>

                                <Text
                                    style={{
                                        ...FONTS.body5,
                                        color: COLORS.grey
                                    }}
                                >
                                    {`(${dummyData.productDetail.no_of_rating} rating)`}
                                </Text>
                            </View>

                            {/* SKU */}
                            <Text
                                style={{
                                    ...FONTS.body5,
                                    fontSize: 11,
                                    color: COLORS.dark
                                }}
                            >
                                SKU: {dummyData.productDetail.sku}
                            </Text>
                        </View>

                        {/* QR code */}
                        <Image
                            source={dummyData.productDetail.qrcode}
                            resizeMode='contain'
                            style={{
                                width: 48,
                                height: 48,
                                marginLeft: SIZES.margin
                            }}
                        />
                    </View>
                </Shadow>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            {renderHeader()}

            {/* Product info section */}
            {renderProductInfo()}

            {/* Reviews section */}
            <FlatList
                style={{
                    paddingHorizontal: SIZES.padding,
                    marginVertical: SIZES.base 
                }}
                data={dummyData.productReviews}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => (
                    <View
                        style={{
                            backgroundColor: COLORS.light,
                            padding: SIZES.margin,
                            marginBottom: 16,
                            borderRadius: 16
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 16
                            }}
                        >
                            {/* Profile picture */}
                            <Image
                                source={item.profile}
                                resizeMode='contain'
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: SIZES.base,
                                    marginRight: 16
                                }}
                            />

                            <View>
                                {/* Name */}
                                <Text
                                    style={{
                                        ...FONTS.h4,
                                        color: COLORS.dark
                                    }}
                                >
                                    {item.name}
                                </Text>

                                {/* Date */}
                                <Text
                                    style={{
                                        ...FONTS.body5,
                                        fontSize: 11,
                                        color: COLORS.grey
                                    }}
                                >
                                    {item.date}
                                </Text>
                            </View>
                        </View>

                        {/* Review */}
                        <Text
                            style={{
                                ...FONTS.body4,
                                color: COLORS.grey,
                                marginBottom: SIZES.base
                            }}
                        >
                            {item.review}
                        </Text>

                        {/* Rating */}
                        <View
                            style={{
                                flexDirection: 'row',
                                marginBottom: SIZES.base
                            }}
                        >
                            {[...Array(5)].map((_, i) => (
                                    <Image
                                        key={`star-${i}`}
                                        source={icons.star}
                                        resizeMode='contain'
                                        style={{
                                            width: 16,
                                            height: 16,
                                            tintColor: i < item.rating ? null : COLORS.grey
                                        }}
                                    />
                            ))}
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                            }}
                        >
                            {/* Like */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginRight: SIZES.margin
                                }}
                            >
                                <Text
                                    style={{
                                        ...FONTS.h5,
                                        color: COLORS.dark,
                                        marginRight: 4
                                    }}
                                >
                                    {item.like}
                                </Text>

                                <Image
                                    source={icons.heart_fill}
                                    resizeMode='contain'
                                    style={{
                                        width: 16,
                                        height: 16
                                    }}
                                />
                            </View>

                            {/* Comment */}
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                                onPress={() => {
                                    console.log("comment pressed")
                                }}
                            >
                                <Text
                                    style={{
                                        ...FONTS.h5,
                                        color: COLORS.dark,
                                        marginRight: 4
                                    }}
                                >
                                    {item.comment}
                                </Text>

                                <Image
                                    source={icons.message_square_fill}
                                    resizeMode='contain'
                                    style={{
                                        width: 16,
                                        height: 16
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGrey
    }
})

function mapStateToProps(state) {
    return {
        cartQuantity: state.cartReducer.cartQuantity
    }
}

export default connect(mapStateToProps)(Review);