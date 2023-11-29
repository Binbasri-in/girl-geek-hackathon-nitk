import React from "react";
import {
    View,
    Text,
    Animated,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {
    EmptyState,
    FilterBar,
    FilterResultModal,
    Header2,
    IconButton,
    ProductCard
} from '../../../components';
import {
    COLORS,
    FONTS,
    SIZES,
    icons
} from '../../../constants';

const ProductList = ({ route }) => {

    const { selectedSubCategory, products } = route.params

    const [selectedBrand, setSelectedBrand] = React.useState(1)
    const [selectedItem, setSelectedItem] = React.useState({
        id: 0,
        name: "All Products",
        no_of_items: selectedSubCategory.no_of_items
    })


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

    const headerHeight = (SIZES.padding * 3) + 30


    // Modal
    const bottomSheetModalRef = React.useRef(null)

    const showModal = React.useCallback(() => {
        bottomSheetModalRef.current?.present()
    }, [])

    const hideModal = React.useCallback((selectedOption) => {
        bottomSheetModalRef.current?.dismiss()

        // if(selectedOption) {
        //     setSelectedItem(selectedOption)
        // }
    }, [])


    function renderBrandOptions() {
        return (
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                style={{ marginBottom: SIZES.margin }}
                data={selectedSubCategory.brands}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => {
                    if (item.logo) {
                        return (
                            <TouchableOpacity
                                style={{
                                    ...styles.horizontalFlatlistContainer,
                                    backgroundColor: COLORS.light,
                                    borderColor: item.id == selectedBrand ? COLORS.primary : 'transparent',
                                    marginLeft: index == 0 ? SIZES.padding : 0,
                                    paddingHorizontal: SIZES.margin,
                                    paddingVertical: SIZES.base,
                                    height: 60,
                                    width: 100
                                }}
                                onPress={() => {
                                    setSelectedBrand(item.id)
                                }}
                            >
                                <Image
                                    source={item.logo}
                                    resizeMode='contain'
                                    style={{
                                        height: 60 - (SIZES.base * 2),
                                        width: '100%'
                                    }}
                                />
                            </TouchableOpacity>
                        )
                    }
                    else {
                        return (
                            <TouchableOpacity
                                style={{
                                    ...styles.horizontalFlatlistContainer,
                                    backgroundColor: COLORS.light,
                                    borderColor: item.id == selectedBrand ? COLORS.primary : 'transparent',
                                    marginLeft: index == 0 ? SIZES.padding : 0,
                                    paddingHorizontal: SIZES.padding,
                                    paddingVertical: 16
                                }}
                                onPress={() => {
                                    setSelectedBrand(item.id)
                                }}
                            >
                                <Text
                                    style={{
                                        ...FONTS.h3,
                                        color: item.id == selectedBrand ? COLORS.primary : COLORS.dark
                                    }}
                                >
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                }}
            />
        )
    }

    
    function renderCollapsibleStickyHeader() {
        return (
            <View style={{ width: SIZES.width }}>
                {selectedSubCategory.brands && renderBrandOptions()}

                <FilterBar
                    containerStyle={{ marginHorizontal: SIZES.padding }}
                    selectedItem={selectedItem.name}
                    rightComponentLabel={`${selectedItem.no_of_items} ${selectedItem.no_of_items > 1 ? 'Results' : 'Result'}`}
                    leftComponentOnPress={showModal}
                />
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <View
                style={{
                    backgroundColor: COLORS.lightGrey,
                    paddingBottom: SIZES.padding,
                    zIndex: 2
                }}
            >
                <Header2
                    title={selectedSubCategory.name}
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
                                    width: 22,
                                    height: 22
                                }}
                            />

                            <IconButton
                                icon={icons.shoppingCart}
                                iconStyle={{
                                    width: 22,
                                    height: 22,
                                    tintColor: COLORS.dark
                                }}
                            />
                        </View>
                    }
                />
            </View>

            <Animated.View 
                style={{
                    ...styles.header, 
                    transform: [{
                        translateY: scrollY.interpolate({
                            inputRange: [0, collapsibleHeaderHeight],
                            outputRange: [headerHeight, -(collapsibleHeaderHeight - 84) + headerHeight],
                            extrapolate: 'clamp'
                        }),
                    }],
                }}
                onLayout={onLayout}
            >
                {renderCollapsibleStickyHeader()}
            </Animated.View>

            <Animated.FlatList
                style={{
                    marginHorizontal: SIZES.padding,
                    paddingTop: collapsibleHeaderHeight
                }}
                contentContainerStyle={{ 
                    flex: products.length ? 0 : 1,
                    flexDirection: 'column', 
                    paddingBottom: collapsibleHeaderHeight
                }}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={onScroll}
                data={products}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => (
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
                // optionList={}
                option={selectedItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGrey
    },
    header: {
        backgroundColor: COLORS.lightGrey,
        position: 'absolute',
        zIndex: 1
    },
    horizontalFlatlistContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 16,
        marginRight: 16
    }
})

export default ProductList;