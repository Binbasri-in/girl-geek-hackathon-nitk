import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';

import {
    FONTS,
    SIZES,
    COLORS,
    icons
} from "../constants"
import {
    CheckBox,
    StepperInput
} from "../components"


const CartItemCard = ({
    containerStyle,
    item
}) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: SIZES.radius,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.light,
                ...containerStyle
            }}
        >
            {/* Item Image */}
            <Image
                source={item?.image}
                resizeMode='contain'
                style={{
                    marginRight: SIZES.radius,
                    width: 100,
                    height: 100
                }}
            />

            {/* Cart Item Content */}
            <View
                style={{
                    flex: 1
                }}
            >
                {/* Title and Checkbox */}
                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <Text
                        style={{
                            flex: 1,
                            ...FONTS.h3
                        }}
                    >
                        {item?.title}
                    </Text>

                    <CheckBox
                        isSelected={true}
                    //onPress={() => setTermsChecked(!termsChecked)}
                    />
                </View>

                {/* Price */}
                <Text
                    style={{
                        marginTop: SIZES.base,
                        color: COLORS.primary,
                        ...FONTS.h3
                    }}
                >
                    ${item?.price.toFixed(2)}
                </Text>

                {/* Out of Stock */}
                <Text
                    style={{
                        marginTop: SIZES.base,
                        color: item?.stock_qty > 0 ? COLORS.grey80 : COLORS.error,
                        ...FONTS.h4
                    }}
                >
                    {item?.stock_qty > 0 ? `Available Stock ${item?.stock_qty}` : 'Out of Stock'}
                </Text>

                <StepperInput
                    containerStyle={{
                        marginTop: SIZES.base,
                        width: 160,
                    }}
                    value={item?.qty}
                />
            </View>
        </View>
    )
}

export default CartItemCard;