import React from 'react';
import {
    View,
    Text
} from 'react-native';

import {
    Header2,
    IconButton,
    TextButton,
    ReelContainer,
} from "../../components";
import {
    SIZES,
    COLORS,
    FONTS,
    icons
} from "../../constants";

const BonusSpins = () => {

    // Render

    function renderHeader() {
        return (
            <Header2
                title="Bonus spins"
                rightComponent={
                    <IconButton
                        icon={icons.headphones_fill}
                        iconStyle={{
                            width: 25,
                            height: 25
                        }}
                    />
                }
            />
        )
    }

    function renderDescription() {
        return (
            <View
                style={{
                    alignItems: 'flex-start',
                    marginTop: SIZES.padding,
                    paddingHorizontal: SIZES.padding
                }}
            >
                <Text style={{ ...FONTS.h2 }}>Hi ByProgrammers!</Text>
                <Text
                    style={{
                        marginTop: SIZES.base,
                        ...FONTS.body3
                    }}
                >
                    You have 5 bonus spins left.
                </Text>

                <TextButton
                    label="Buy more spins"
                    contentContainerStyle={{
                        marginVertical: SIZES.base,
                        backgroundColor: null
                    }}
                    labelStyle={{
                        color: COLORS.support3,
                        ...FONTS.h3
                    }}
                />
            </View>
        )
    }

    function renderSpins() {
        return (
            <ReelContainer />
        )
    }

    return (
        <View
            style={{
                flex: 1
            }}
        >
            {/* Header */}
            {renderHeader()}

            {/* Descriptions */}
            {renderDescription()}

            {/* Spins */}
            {renderSpins()}
        </View>
    )
}

export default BonusSpins;