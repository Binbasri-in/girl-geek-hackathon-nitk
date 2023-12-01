import React from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';
import { connect } from 'react-redux';
import {
    Header2,
    IconBadgeButton,
    IconButton
} from "../../components";
import {
    SIZES,
    COLORS,
    FONTS,
    icons,
    dummyData
} from "../../constants";

const HistoryCoin = ({ cartQuantity }) => {

    // Render

    function renderHeader() {
        return (
            <Header2
                title="History Coin"
                containerStyle={{
                    marginBottom: SIZES.padding
                }}
                rightComponent={
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
                }
            />
        )
    }

    function renderHistory() {
        return (
            <FlatList
                style={{ marginBottom: SIZES.margin }}
                data={dummyData.coin_history}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding
                }}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => {
                    return (
                        <View
                            style={{
                                marginBottom: SIZES.padding,
                                padding: SIZES.padding,
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.light,
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.h3,
                                    color: item.color
                                }}
                            >
                                {item.coin_label}
                            </Text>

                            <Text
                                style={{
                                    marginVertical: 3,
                                    ...FONTS.body4,
                                    color: COLORS.grey
                                }}
                            >
                                {item.status_label} - {item.date}
                            </Text>

                            <Text
                                style={{
                                    ...FONTS.body4
                                }}
                            >
                                {item.description}
                            </Text>
                        </View>
                    )
                }}
            />
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

            {/* History List */}
            {renderHistory()}
        </View>
    )
}

function mapStateToProps(state) {
    return {
        cartQuantity: state.cartReducer.cartQuantity
    }
}

export default connect(mapStateToProps)(HistoryCoin);