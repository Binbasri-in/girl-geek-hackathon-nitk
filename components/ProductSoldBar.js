import React from 'react';
import {
    View,
    Text
} from 'react-native';

import { SIZES, COLORS } from "../constants"

const ProductSoldBar = ({ percentage }) => {
    return (
        <View
            style={{
                height: 20,
                width: "100%",
                marginTop: SIZES.radius,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.grey20
            }}
        >
            <View
                style={{
                    flex: 1,
                    width: percentage,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.error
                }}
            />
        </View>
    )
}

export default ProductSoldBar;