import React from 'react';
import {
    View,
    Text,
    Animated,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import {
    EmptyState,
    FilterBar,
    FilterResultModal,
    Header2,
    IconBadgeButton,
    IconButton,
    ProductCard
} from '../../../components';
import {
    COLORS,
    FONTS,
    SIZES,
    icons
} from '../../../constants';

const SubCategory = ({ route, cartQuantity }) => {

    const { selectedCategory } = route.params

    const navigation = useNavigation();

    // Filter bar
    const totalProducts = () => {
        let total = 0

        selectedCategory.sub_categories?.forEach(sub_category => {
            total += sub_category.no_of_items
        })

        return total
    }
    
    const [selectedItem, setSelectedItem] = React.useState({
        id: 0,
        name: "All Products",
        no_of_items: totalProducts()
    })

    const [productList, setProductList] = React.useState(null)

    React.useEffect(() => {
        if (selectedItem.id == 0) {
            setProductList(selectedCategory.products)
        }
        else {
            let products = selectedCategory.products.filter(item => item.category_id == selectedItem.id)

            setProductList(products)
        }
    }, [selectedItem])



    // Collapsible Header
    const [collapsibleHeaderHeight, setCollapsibleHeaderHeight] = React.useState(0)

    const onLayout = (event) => {
        const { height } = event.nativeEvent.layout
        setCollapsibleHeaderHeight(height)
    }

    const scrollY = React.useRef(new Animated.Value(0)).current

    const onScroll = Animated.event(
        [
            { 
                nativeEvent: { contentOffset: { y: scrollY } }
            },
        ],
        {
            useNativeDriver: true,
        },
    )



    // Modal
    const bottomSheetModalRef = React.useRef(null)

    const showModal = React.useCallback(() => {
        bottomSheetModalRef.current?.present()
    }, [])

    const hideModal = React.useCallback((selectedOption) => {
        bottomSheetModalRef.current?.dismiss()

        if(selectedOption) {
            setSelectedItem(selectedOption)
        }
    }, [])



    function renderSubCategoryOptions() {
        return (
            <View
                style={{
                    marginBottom: 35
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginHorizontal: SIZES.padding
                    }}
                >
                    {selectedCategory.sub_categories?.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={`subcategory-${index}`}
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
                                    navigation.navigate("ProductList", { 
                                        selectedSubCategory: item,
                                        products: selectedCategory.products.filter(product => product.category_id == item.id) 
                                    });
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
                                                    borderRadius:SIZES.base,
                                                    marginHorizontal: 3,
                                                    width: 44,
                                                    height: 44,
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <Image
                                                    source={item}
                                                    resizeMode='contain'
                                                    style={{
                                                        width: 35,
                                                        height: 35,
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

                <TouchableOpacity
                    style={{
                        alignItems: 'center'
                    }}
                    onPress={() => {
                        console.log('View all category pressed')
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.h5,
                            color: COLORS.support3
                        }}
                    >
                        View all category
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function renderCollapsibleStickyHeader() {
        return (
            <Animated.View 
                style={{
                    backgroundColor: COLORS.lightGrey,
                    transform: [{
                        translateY: scrollY.interpolate({
                            inputRange: [0, collapsibleHeaderHeight],
                            outputRange: [0, -(collapsibleHeaderHeight - 84)],
                            extrapolate: 'clamp'
                        }),
                    }],
                }}
                onLayout={onLayout}
            >
                {selectedCategory.sub_categories && renderSubCategoryOptions()}

                <FilterBar
                    containerStyle={{ marginHorizontal: SIZES.padding }}
                    selectedItem={selectedItem.name}
                    rightComponentLabel={`${selectedItem.no_of_items} ${selectedItem.no_of_items > 1 ? 'Results' : 'Result'}`}
                    leftComponentOnPress={showModal}
                />
            </Animated.View>
        )
    }

    return (
        <View style={styles.container}>
            <Header2
                title={selectedCategory.name}
                containerStyle={{
                    marginBottom: SIZES.padding
                }}
                rightComponent={
                    <View
                        style={{
                            flexDirection: 'row'
                        }}
                    >
                        <IconButton
                            containerStyle={{
                                marginRight: 16
                            }}
                            icon={icons.share}
                            iconStyle={{
                                width: 25,
                                height: 25
                            }}
                        />

                        <IconBadgeButton
                            icon={icons.shoppingCart}
                            iconStyle={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.dark
                            }}
                            showBadge={cartQuantity > 0}
                            badgeContent={cartQuantity}
                        />
                    </View>
                }
            />

            <Animated.FlatList
                contentContainerStyle={{ 
                    flex: selectedCategory.products ? 0 : 1,
                    flexDirection: 'column'
                }}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={onScroll}
                data={productList}
                keyExtractor={item => item.id}
                ListHeaderComponent={renderCollapsibleStickyHeader}
                stickyHeaderIndices={[0]}
                renderItem={({ item, index }) => (
                    <ProductCard
                        containerStyle={{
                            marginBottom: 16,
                            marginRight: (index + 1) % 2 == 0 ? SIZES.padding : 16,
                            marginLeft: (index + 1) % 2 == 0 ? 0 : SIZES.padding,
                            width: (SIZES.width - (SIZES.padding * 2) - 16) / 2
                        }}
                        item={item}
                        onPress={() => {
                            console.log(`${item.name} pressed`)
                            navigation.navigate("ProductDetail")
                        }}
                    />
                )}
                ListEmptyComponent={
                    <EmptyState
                        label='There is no product'
                    />
                }
            />

            {/* Modal */}
            <FilterResultModal
                bottomSheetModalRef={bottomSheetModalRef}
                hideModal={(selectedOption) => hideModal(selectedOption)}
                optionList={selectedCategory.sub_categories}
                option={selectedItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGrey
    }
})

function mapStateToProps(state) {
    return {
        cartQuantity: state.cartReducer.cartQuantity,
    }
}

export default connect(mapStateToProps)(SubCategory);