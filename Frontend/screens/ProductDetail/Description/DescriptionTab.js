import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    TextButton
} from '../../../components';
import {
    COLORS,
    FONTS,
    SIZES,
    dummyData,
    icons
} from '../../../constants';

const DescriptionTab = () => {

    const [isViewMore, setIsViewMore] = React.useState(false)

    const navigation = useNavigation()

    const ProductInfo = ({ label, value, containerStyle }) => {
        return (
            <View
                style={{
                    ...containerStyle,
                    marginBottom: 16
                }}
            >
                <Text
                    style={{
                        ...FONTS.body4,
                        color: COLORS.grey,
                        marginBottom: 4
                    }}
                >
                    {label}
                </Text>

                <Text
                    style={{
                        ...FONTS.body4,
                        color: COLORS.dark
                    }}
                >
                    {value}
                </Text>
            </View>
        )
    }

    const GridProductInfos = ({ labelColumn1, valueColumn1, labelColumn2, valueColumn2 }) => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <ProductInfo
                    label={labelColumn1}
                    value={valueColumn1}
                    containerStyle={{
                        flex: 2
                    }}
                />

                <ProductInfo
                    label={labelColumn2}
                    value={valueColumn2}
                    containerStyle={{
                        flex: 1
                    }}
                />
            </View>
        )
    }

    function renderProductDetail() {
        return (
            <View style={{
                    ...styles.contentContainer,
                    paddingBottom: SIZES.base
                }}
            >
                <Text
                    style={{
                        ...FONTS.h3,
                        color: COLORS.dark,
                        marginBottom: SIZES.radius
                    }}
                >
                    Product Details
                </Text>

                <GridProductInfos
                    labelColumn1='Category'
                    valueColumn1={dummyData.productDetail.category}
                    labelColumn2='Trademark'
                    valueColumn2={dummyData.productDetail.trademark}
                />

                <GridProductInfos
                    labelColumn1='Provided by'
                    valueColumn1={dummyData.productDetail.provider}
                    labelColumn2='Origin'
                    valueColumn2={dummyData.productDetail.origin}
                />

                <GridProductInfos
                    labelColumn1='Warranty form'
                    valueColumn1={dummyData.productDetail.warranty}
                    labelColumn2='Waterproof'
                    valueColumn2={dummyData.productDetail.waterproof}
                />

                <GridProductInfos
                    labelColumn1='Accessories included'
                    valueColumn1={dummyData.productDetail.accessories}
                    labelColumn2='SKU'
                    valueColumn2={`#${dummyData.productDetail.sku}`}
                />
            </View>
        )
    }

    function renderProductDescription() {
        return (
            <View style={styles.contentContainer}>
                <Text
                    style={{
                        ...FONTS.h3,
                        color: COLORS.dark,
                        marginBottom: SIZES.radius
                    }}
                >
                    Product Description
                </Text>

                <Text
                    style={{
                        ...FONTS.body4,
                        color: COLORS.grey
                    }}
                    numberOfLines={isViewMore ? 0 : 5}
                >
                    Over nearly half a century with continuous development, Nike Air Jordan 1 still shows its position in comparison to other lines. Always a priority version in every combination, the Nike Air Jordan 1 Retro Shattered Backboard is a super product that greatly contributes to bringing the heat of Jordan to world reach.
                </Text>

                <TextButton
                    contentContainerStyle={{
                        backgroundColor: 'transparent',
                        marginTop: SIZES.base
                    }}
                    labelStyle={{
                        ...FONTS.h5,
                        color: COLORS.support3
                    }}
                    label={isViewMore ? 'View less' : 'View more'}
                    onPress={() => {
                        setIsViewMore(!isViewMore)
                    }}
                />
            </View>
        )
    }

    function renderProductRating() {
        return (
            <View style={styles.contentContainer}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 6
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.h2,
                            fontSize: 24,
                            color: COLORS.dark,
                            marginRight: 16
                        }}
                    >
                        {dummyData.productDetail.rating}
                    </Text>

                    <Image
                        source={icons.star}
                        resizeMode='contain'
                        style={{
                            width: 22,
                            height: 22
                        }}
                    />
                </View>

                <TextButton
                    contentContainerStyle={{
                        backgroundColor: 'transparent'
                    }}
                    labelStyle={{
                        ...FONTS.h5,
                        color: COLORS.support3
                    }}
                    label='View a rating'
                    onPress={() => {
                        console.log('View a rating pressed')
                    }}
                />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: SIZES.margin
                    }}
                >
                    <TextButton
                        contentContainerStyle={{
                            flex: 1,
                            backgroundColor: COLORS.lightGrey,
                            borderRadius: SIZES.base,
                            paddingVertical: SIZES.base,
                            marginRight: 16
                        }}
                        labelStyle={{
                            ...FONTS.h5,
                            color: COLORS.primary
                        }}
                        label='Ask Product'
                        onPress={() => {
                            navigation.navigate("MessageDetail")
                        }}
                    />

                    <TextButton
                        contentContainerStyle={{
                            flex: 1,
                            backgroundColor: COLORS.lightGrey,
                            paddingVertical: SIZES.base,
                            borderRadius: SIZES.base
                        }}
                        labelStyle={{
                            ...FONTS.h5,
                            color: COLORS.primary
                        }}
                        label='See review'
                        onPress={() => {
                            navigation.navigate("Review")
                        }}
                    />
                </View>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            {renderProductDetail()}
            {renderProductDescription()}
            {renderProductRating()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGrey
    },
    contentContainer: {
        backgroundColor: COLORS.light,
        marginHorizontal: SIZES.padding,
        marginBottom: 16,
        padding: SIZES.padding,
        borderRadius: 16
    }
})

export default DescriptionTab;