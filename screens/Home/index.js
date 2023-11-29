import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Animated,
    //FlatList,
    ScrollView,
} from "react-native"
import { useNavigation } from '@react-navigation/native';
import { connect } from "react-redux";
// import { Camera, CameraPermissionStatus, useCameraDevices } from 'react-native-vision-camera';

import { toggleCameraModal } from "../../stores/modal/modalActions";

import ProductTab from "./Product/ProductTab";
import ChartTab from "./MyChart/ChartTab";
import ServiceTab from "./Service/ServiceTab";

import {
    DashboardHeader,
    FormInput,
    IconBadgeButton,
    IconButton,
    ScanProductMessageModal
} from "../../components"
import {
    COLORS,
    SIZES,
    icons,
    FONTS,
    lightTheme,
    darkTheme,
    constants,
    dummyData
} from "../../constants"

const home_tabs = constants.home_tabs.map((home_tab) => ({
    ...home_tab,
    ref: React.createRef()
}))

const TabIndicator = ({ measureLayout, scrollX }) => {

    const inputRange = home_tabs.map((_, i) => i * SIZES.width)

    const translateX = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map(measure => measure.x)
    })

    return (
        <Animated.View
            style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                height: 5,
                width: 30,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.secondary,
                transform: [{
                    translateX
                }]
            }}
        />
    )
}

const Tabs = ({ scrollX, onTabPress }) => {

    const [measureLayout, setMeasureLayout] = React.useState([])
    const containerRef = React.useRef()

    const tabPosition = Animated.divide(scrollX, SIZES.width)

    React.useEffect(() => {
        let ml = []

        home_tabs.forEach(home_tab => {
            home_tab?.ref?.current?.measureLayout(
                containerRef.current,
                (x, y, width, height) => {
                    ml.push({
                        x, y, width, height
                    })

                    if (ml.length === home_tabs.length) {
                        setMeasureLayout(ml)
                    }
                }
            )
        })
    }, [containerRef.current])

    return (
        <View
            ref={containerRef}
            style={{
                flex: 1,
                flexDirection: 'row'
            }}
        >
            {/* Tab Indicator */}
            {measureLayout.length > 0 && <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />}

            {/* Tabs */}
            {home_tabs.map((item, index) => {
                const textColor = tabPosition.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [COLORS.light, COLORS.secondary, COLORS.light],
                    extrapolate: 'clamp'
                })

                return (
                    <TouchableOpacity
                        key={`HomeTabs-${index}`}
                        ref={item.ref}
                        style={{
                            marginRight: SIZES.padding
                        }}
                        onPress={() => onTabPress(index)}
                    >
                        <Animated.Text
                            style={{
                                color: textColor,
                                ...FONTS.h4,
                            }}
                        >
                            {item.label}
                        </Animated.Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const Home = ({ navigation, showCameraModal, toggleCameraModal, cartQuantity }) => {

    const bottomSheetModalRef = React.useRef(null);

    // Bottom Sheet
    //const snapPoints = React.useMemo(() => ['60%'], []);

    // callbacks
    const showModal = React.useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const hideModal = React.useCallback(() => {
        toggleCameraModal(false)
        bottomSheetModalRef.current?.dismiss()
    }, []);

    const hideModalWithNavigation = React.useCallback(() => {

        console.log("hideModalWithNavigation")
        toggleCameraModal(false)
        bottomSheetModalRef.current?.dismiss()
        navigation.navigate("ScanProduct")
    }, []);

    const flatListRef = React.useRef()
    const scrollX = React.useRef(new Animated.Value(0)).current;

    const onTabPress = React.useCallback(tabIndex => {
        flatListRef?.current?.scrollToOffset({
            offset: tabIndex * SIZES.width
        })
    })

    const [banners, setBanners] = React.useState(dummyData.banners)

    React.useEffect(() => {
        console.log("showCameraModal")
        console.log(showCameraModal)
        if (showCameraModal) {
            showModal()
        }
    }, [showCameraModal])

    // Render

    function renderHeaderBackground() {
        return (
            <View
                style={{
                    position: "absolute",
                    top: 0,
                    width: "100%",
                    height: 300,
                    backgroundColor: COLORS.primary,

                }}
            />
        )
    }

    function renderHeader() {
        return (
            <DashboardHeader
                title="Home"
                rightComponent={
                    <View
                        style={{
                            flexDirection: "row"
                        }}
                    >
                        <IconButton
                            icon={icons.shoppingBag}
                            iconStyle={{
                                marginRight: SIZES.radius,
                                width: 25,
                                height: 25
                            }}
                        //onPress={() => setIsVisible(!isVisible)}
                        />

                        <IconButton
                            icon={icons.bell}
                            iconStyle={{
                                marginRight: SIZES.radius,
                                width: 25,
                                height: 25
                            }}
                            onPress={() => navigation.navigate("Notification")}
                        />

                        <IconBadgeButton
                            icon={icons.shoppingCart}
                            iconStyle={{
                                width: 25,
                                height: 25
                            }}
                            showBadge={cartQuantity > 0}
                            badgeStyle={{
                                borderColor: COLORS.primary
                            }}
                            badgeContent={cartQuantity}
                            onPress={() => {
                                navigation.navigate("Cart")
                            }}
                        />
                    </View>
                }

            />
        )
    }

    function renderSearchBar() {
        return (
            <FormInput
                containerStyle={{
                    marginTop: SIZES.radius,
                    marginHorizontal: SIZES.padding,
                    borderRadius: SIZES.radius,
                }}
                placeholder="Search Product"
                inputStyle={{
                    marginLeft: SIZES.radius
                }}
                prependComponent={
                    <Image
                        source={icons.search}
                        style={{
                            height: 25,
                            width: 25,
                        }}
                    />
                }
                appendComponent={
                    <IconButton
                        icon={icons.camera}
                        iconStyle={{
                            width: 25,
                            height: 25
                        }}
                        onPress={(e) => {
                            e.preventDefault()
                            console.log("Prevent")
                            toggleCameraModal(!showCameraModal)
                        }}
                    />
                }
                onPress={() => navigation.navigate("SearchProduct")}
                editable={Platform.OS === 'ios' ? false : true}
            />
        )
    }

    function renderTopTabBar() {
        return (
            <View
                style={{
                    marginHorizontal: SIZES.padding,
                    marginTop: SIZES.radius,
                    height: 35
                }}
            >
                <Tabs
                    scrollX={scrollX}
                    onTabPress={onTabPress}
                />
            </View>
        )
    }

    function renderTabContent() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row'
                }}
            >
                <Animated.FlatList
                    horizontal
                    ref={flatListRef}
                    scrollEnabled={false}
                    pagingEnabled
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.padding
                    }}
                    snapToAlignment="center"
                    decelerationRate="fast"
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                    data={constants.home_tabs}
                    keyExtractor={item => `HomeTabs-${item.id}`}
                    onScroll={
                        Animated.event([
                            { nativeEvent: { contentOffset: { x: scrollX } } }
                        ], {
                            useNativeDriver: false
                        })
                    }
                    renderItem={({ item, index }) => {
                        return (
                            <View
                                style={{
                                    width: SIZES.width,
                                }}
                            >
                                {item?.id == 0 && <ProductTab />}
                                {item?.id == 1 && <ChartTab />}
                                {item?.id == 2 && <ServiceTab />}
                            </View>
                        )
                    }}
                />
            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                //backgroundColor: "yellow"
            }}
        >
            {/* Header */}
            {renderHeaderBackground()}
            {renderHeader()}

            {/* Search Bar */}
            {renderSearchBar()}

            {/* Tab Bar */}
            {renderTopTabBar()}

            {/* Content */}
            {renderTabContent()}

            {/* Modal */}
            <ScanProductMessageModal
                bottomSheetModalRef={bottomSheetModalRef}
                hideModal={hideModal}
                hideModalWithNavigation={hideModalWithNavigation}
            />
        </View>
    )
}

function mapStateToProps(state) {
    return {
        showCameraModal: state.modalReducer.showCameraModal,
        cartQuantity: state.cartReducer.cartQuantity,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleCameraModal: (toggleValue) => { return dispatch(toggleCameraModal(toggleValue)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);