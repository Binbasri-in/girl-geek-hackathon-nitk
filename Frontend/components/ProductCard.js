import React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import {
    COLORS,
    FONTS,
    SIZES,
    icons
} from "../constants";

const ProductCard = ({
    containerStyle,
    item,
    onPress
}) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: COLORS.light,
                borderRadius: 16,
                paddingHorizontal: 16,
                paddingVertical: SIZES.margin,
                ...containerStyle
            }}
            onPress={onPress}
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
                        marginVertical: SIZES.base
                    }}
                >
                    {item.name}
                </Text>
            </View>

            {/* Rating */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: SIZES.base
                }}
            >
                <Image
                    source={icons.star}
                    style={{
                        width: 16,
                        height: 16
                    }}
                />

                <Text
                    style={{
                        ...FONTS.body4,
                        color: COLORS.title,
                        marginLeft: SIZES.base,
                        marginRight: 4
                    }}
                >
                    {item.rating}
                </Text>

                <Text
                    style={{
                        ...FONTS.body4,
                        color: COLORS.grey
                    }}
                >
                    ({item.no_of_rating} rating)
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

            {/* Extra offer */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: SIZES.base
                }}
            >
                <Image
                    source={item.extra_offer.icon}
                    style={{
                        width: 16,
                        height: 16,
                        tintColor: item.extra_offer.color
                    }}
                />

                <Text
                    style={{
                        ...FONTS.body5,
                        color: COLORS.dark,
                        marginLeft: SIZES.base,
                    }}
                >
                    {item.extra_offer.title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default ProductCard;