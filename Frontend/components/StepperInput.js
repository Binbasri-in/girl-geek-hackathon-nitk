import React from 'react';
import {
    View,
    Text,
} from 'react-native';

import {
    IconButton
} from "."
import { FONTS, COLORS, icons, SIZES } from "../constants"

const StepperInput = ({
    containerStyle,
    value = 1,
    onAdd,
    onMinus,
}) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                height: 35,
                backgroundColor: COLORS.lightGray2,
                borderRadius: SIZES.radius,
                ...containerStyle
            }}
        >
            <IconButton
                containerStyle={{
                    width: 35,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.secondary
                }}
                icon={icons.minus}
                iconStyle={{
                    height: 20,
                    width: 20,
                    tintColor: COLORS.dark80,
                }}
                onPress={onMinus}
            />

            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: SIZES.base,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.grey20
                }}
            >
                <Text style={{ ...FONTS.h3 }}>{value}</Text>
            </View>


            <IconButton
                containerStyle={{
                    width: 35,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.secondary
                }}
                icon={icons.plus}
                iconStyle={{
                    height: 20,
                    width: 20,
                    tintColor: COLORS.dark80,
                }}
                onPress={onAdd}
            />
        </View>
    )
}

export default StepperInput