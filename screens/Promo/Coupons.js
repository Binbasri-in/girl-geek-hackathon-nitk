import React from "react";
import {
    View,
    Text,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { 
    COLORS,
    FONTS,
    SIZES,
    images,
    dummyData
} from '../../constants';

const CouponList = ({ title, data }) => {

    const navigation = useNavigation()

    return (
        <View
            style={{
                marginHorizontal: SIZES.padding,
                marginBottom: 16
            }}
        >
            {/* Header */}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 16
                }}
            >
                <Text
                    style={{
                        ...FONTS.h3,
                        color: COLORS.dark
                    }}
                >
                    {title}
                </Text>

                <Text
                    style={{
                        ...FONTS.body5,
                        color: COLORS.grey
                    }}
                >
                    Applicable maximum: 01
                </Text>
            </View>

            {/* Coupuns */}
            {data.map((item, index) => {
                return (
                    <TouchableOpacity
                        key={`coupon-${index}`}
                        style={{
                            marginBottom: 16
                        }}
                        onPress={() => {
                            navigation.navigate("CouponDetail")
                        }}
                    >
                        <ImageBackground
                            source={images.coupon}
                            resizeMode='cover'
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: SIZES.width - (SIZES.padding * 2),
                                height: (SIZES.width - (SIZES.padding * 2)) * 0.45
                            }}
                        >
                            <View
                                style={{
                                    width: '75%',
                                    height: '100%',
                                    padding: SIZES.margin,
                                    justifyContent: 'space-between'
                                }}
                            >
                                <View>
                                    <Text
                                        style={{
                                            ...FONTS.h4,
                                            color: COLORS.title,
                                            marginBottom: SIZES.base
                                        }}
                                    >
                                        {item.title}
                                    </Text>

                                    <Text
                                        style={{
                                            ...FONTS.body5,
                                            color: COLORS.grey
                                        }}
                                    >
                                        {item.usage_qty}
                                    </Text>
                                </View>

                                <View>
                                    <Text
                                        style={{
                                            ...FONTS.h2,
                                            color: COLORS.dark
                                        }}
                                    >
                                        {item.code}
                                    </Text>
                                </View>
                            </View>
                            
                            <View
                                style={{
                                    width: '25%',
                                    alignItems: 'center'
                                }}
                            >
                                <View
                                    style={{
                                        width: 50,
                                        padding: 6,
                                        borderRadius: 4,
                                        backgroundColor: COLORS.secondary
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...FONTS.h5,
                                            color: COLORS.dark,
                                            textAlign: 'center'
                                        }}
                                    >
                                        {item.expiry_date}
                                    </Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const Coupons = () => {
    return (
        <ScrollView style={styles.container}>
            <CouponList
                title={'Discount Coupons'}
                data={dummyData.discountCoupons}
            />

            <CouponList
                title={'Shipping Coupons'}
                data={dummyData.shippingCoupons}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGrey
    }
})

export default Coupons;