import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';

import {
    SectionWithIcon,
    FilterBar,
    ProductCard
} from '../../../components'
import {
    COLORS,
    FONTS,
    SIZES,
    dummyData,
    constants,
    icons
} from '../../../constants';

const ProductTab = () => {

    // Render

    function renderCategories() {
        return (
            <SectionWithIcon
                icon={icons.grid}
                title="Categories"
                seeMoreOnPress={() => {
                    console.log('Categories see more on pressed')
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginHorizontal: SIZES.padding,
                        marginTop: SIZES.radius
                    }}
                >
                    {dummyData?.store_info?.product_categories.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={`product-category-${index}`}
                                style={{
                                    backgroundColor: COLORS.light,
                                    borderRadius: 16,
                                    paddingVertical: 16,
                                    marginBottom: 16,
                                    marginRight: (index + 1) % 2 == 0 ? 0 : 16,
                                    width: (SIZES.width - (SIZES.padding * 2) - 16) / 2,
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    console.log(`${item.name} pressed`)
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginBottom: SIZES.base
                                    }}
                                >
                                    {item.images.map((item, index) => {
                                        return (
                                            <View
                                                key={`image-${index}`}
                                                style={{
                                                    backgroundColor: COLORS.lightGrey,
                                                    borderRadius: SIZES.base,
                                                    marginHorizontal: 3,
                                                    width: 44,
                                                    height: 44,
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <Image
                                                    source={item.image}
                                                    resizeMode='contain'
                                                    style={{
                                                        width: 35,
                                                        height: 35,
                                                        borderRadius: SIZES.radius
                                                    }}
                                                />
                                            </View>
                                        )
                                    })}
                                </View>

                                <Text
                                    style={{
                                        ...FONTS.h5,
                                        color: COLORS.title
                                    }}
                                >
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </SectionWithIcon>
        )
    }

    function renderProduct() {
        return (
            <SectionWithIcon
                icon={icons.cube_outline}
                title="Product"
                containerStyle={{
                    marginTop: SIZES.radius
                }}
                seeMoreOnPress={() => {
                    console.log('Categories see more on pressed')
                }}
            >
                {/* Filter Bar */}
                <FilterBar
                    containerStyle={{
                        marginTop: SIZES.radius,
                        marginHorizontal: SIZES.padding
                    }}
                    selectedItem={dummyData?.store_info?.filtered_products?.type}
                    rightComponentLabel={`${dummyData?.store_info?.filtered_products?.number_of_results} Results`}
                //leftComponentOnPress={showModal}
                />

                {/* Product List */}
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginHorizontal: SIZES.padding,
                        marginTop: SIZES.radius,
                        marginBottom: SIZES.radius
                    }}
                >
                    {dummyData?.store_info?.filtered_products?.products.map((item, index) => {
                        return (
                            <ProductCard
                                containerStyle={{
                                    marginBottom: 16,
                                    marginRight: (index + 1) % 2 == 0 ? 0 : 16,
                                    width: (SIZES.width - (SIZES.padding * 2) - 16) / 2
                                }}
                                item={item}
                                onPress={() => {
                                    console.log(`${item.name} pressed`)
                                }}
                            />
                        )
                    })}
                </View>
            </SectionWithIcon>
        )
    }

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <ScrollView>
                {/* Categories */}
                {renderCategories()}

                {/* Product */}
                {renderProduct()}
            </ScrollView>
        </View>
    )
}

export default ProductTab;