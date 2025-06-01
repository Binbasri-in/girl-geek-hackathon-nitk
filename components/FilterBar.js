import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import {
    COLORS,
    FONTS,
    SIZES,
    icons
} from '../constants';

const FilterBar = ({ containerStyle, selectedItem, leftComponentOnPress, rightComponentLabel, rightComponentOnPress }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: COLORS.light,
                paddingHorizontal: SIZES.margin,
                paddingVertical: 10,
                marginBottom: 16,
                borderRadius: 16,
                height: 68,
                ...containerStyle
            }}
        >
            {/* Left component */}
            <TouchableWithoutFeedback
                onPress={leftComponentOnPress}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row'
                    }}
                >
                    <Image
                        source={icons.filter}
                        style={{
                            height: 20,
                            width: 20
                        }}
                    />

                    <Text
                        style={{
                            ...FONTS.body4,
                            color: COLORS.dark,
                            marginLeft: SIZES.base,
                            marginRight: SIZES.radius
                        }}
                    >
                        Filter
                    </Text>

                    <Text
                        style={{
                            ...FONTS.h4,
                            color: COLORS.dark
                        }}
                    >
                        {selectedItem}
                    </Text>
                </View>
            </TouchableWithoutFeedback>

            {/* Vertical line divider */}
            <View
                style={{
                    backgroundColor: COLORS.lightGrey,
                    marginRight: 16,
                    width: 1,
                    height: '100%'
                }}
            />

            {/* Right component */}
            <TouchableWithoutFeedback
                onPress={rightComponentOnPress}
            >
                <View>
                    <Text
                        style={{
                            ...FONTS.h4,
                            color: COLORS.dark
                        }}
                    >
                        {rightComponentLabel}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default FilterBar;