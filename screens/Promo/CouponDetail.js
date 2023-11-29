import React from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {
    Header2,
    LineDivider,
    TextButton
} from "../../components";
import { 
    COLORS,
    FONTS,
    SIZES,
    dummyData
} from '../../constants';

const CouponDetail = () => {

    function renderCouponInfoSection() {
        return (
            <View>
                {/* Image */}
                <Image
                    source={dummyData.couponDetails.image}
                    resizeMode='contain'
                    style={{
                        alignSelf: 'center',
                        width: SIZES.width - (SIZES.padding * 2),
                        height: 100,
                        marginVertical: SIZES.margin
                    }}
                />

                {/* Title */}
                <Text
                    style={{
                        ...FONTS.h1,
                        fontSize: 24,
                        color: COLORS.primary
                    }}
                >
                    {dummyData.couponDetails.title}
                </Text>

                {/* Coupon info */}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: SIZES.margin
                    }}
                >
                    <View>
                        <Text
                            style={{
                                ...FONTS.h2,
                                fontSize: 18,
                                color: COLORS.title
                            }}
                        >
                            {dummyData.couponDetails.usage_qty}
                        </Text>

                        <Text
                            style={{
                                ...FONTS.body5,
                                color: COLORS.dark
                            }}
                        >
                            People Used Today
                        </Text>
                    </View>

                    <LineDivider
                        vertical
                        linestyle={{
                            marginHorizontal: 32
                        }}
                    />

                    <View>
                        <Text
                            style={{
                                ...FONTS.h2,
                                fontSize: 18,
                                color: COLORS.title
                            }}
                        >
                            {dummyData.couponDetails.comment_count}
                        </Text>

                        <Text
                            style={{
                                ...FONTS.body5,
                                color: COLORS.dark
                            }}
                        >
                            Comments
                        </Text>
                    </View>
                </View>

                {/* Validity period */}
                <Text
                    style={{
                        ...FONTS.body4,
                        color: COLORS.dark
                    }}
                >
                    From {dummyData.couponDetails.start_date} to {dummyData.couponDetails.end_date}
                </Text>
            </View>
        )
    }

    function renderCouponCodeSection() {
        return (
            <View>
                {/* Instruction 1 */}
                <Text
                    style={{
                        ...FONTS.body4,
                        color: COLORS.grey
                    }}
                >
                    Display this offer to the staff and show them code 
                </Text>

                {/* Coupon code */}
                <View
                    style={{
                        marginVertical: 16
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: SIZES.base
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.h4,
                                color: COLORS.title
                            }}
                        >
                            YOUR COUPON CODE
                        </Text>

                        <TouchableOpacity>
                            <Text
                                style={{
                                    ...FONTS.h5,
                                    color: COLORS.support3
                                }}
                            >
                                Copy Code
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Text
                        style={{
                            ...FONTS.h1,
                            fontSize: 26,
                            lineHeight: 44,
                            color: COLORS.error
                        }}
                    >
                        {dummyData.couponDetails.code}
                    </Text>
                </View>

                {/* Instruction 2 */}
                <View
                    style={{
                        backgroundColor: COLORS.lightGrey,
                        padding: SIZES.margin,
                        borderRadius: 16
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.body4,
                            color: COLORS.grey
                        }}
                    >
                        Cannot be used in connjunction with other discounts or offers
                    </Text>
                </View>
            </View>
        )
    }

    function renderFooter() {
        return (
            <View
                style={{
                    marginHorizontal: SIZES.padding,
                    marginVertical: 32
                }}
            >
                <TextButton
                    label="Use Code"
                    contentContainerStyle={{
                        borderRadius: SIZES.radius,
                        padding: 16
                    }}
                    onPress={() => {
                        console.log('Use Code button pressed')
                    }}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Header2
                title="Coupon Detail"
                containerStyle={{ 
                    marginBottom: SIZES.padding
                }}
            />

            <ScrollView
                style={{
                    marginHorizontal: SIZES.padding
                }}
            >
                {renderCouponInfoSection()}

                <LineDivider
                    linestyle={{
                        marginVertical: 16
                    }}
                />

                {renderCouponCodeSection()}
            </ScrollView>

            {renderFooter()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.light
    }
})

export default CouponDetail;