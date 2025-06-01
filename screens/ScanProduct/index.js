import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking
} from 'react-native';
import { MotiView, useAnimationState } from 'moti'
import { Shadow } from 'react-native-shadow-2';
import { Svg, Defs, Rect, Mask, Circle, Text as SvgText } from 'react-native-svg';

import {
    IconButton,
    TextButton,
    ScanFailModal
} from "../../components"
import {
    COLORS,
    SIZES,
    icons,
    FONTS,
    constants,
    images
} from "../../constants"
import { Camera } from 'expo-camera';

const ScanProduct = ({ navigation }) => {

    // States
    const [isFailed, setIsFailed] = React.useState(true)
    const [selectedOption, setSelectedOption] = React.useState(constants.scan_product_option.camera)  // QR or Camera
    const [barcode, setBarcode] = React.useState('');
    const [isScanned, setIsScanned] = React.useState(false);

    const [hasPermission, setHasPermission] = React.useState(null);
    const [type, setType] = React.useState(Camera.Constants.Type.back);

    // Bottom Modal
    const bottomSheetModalRef = React.useRef(null);

    // Bottom Sheet
    //const snapPoints = React.useMemo(() => ['60%'], []);

    // callbacks
    const showModal = React.useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const hideModal = React.useCallback(() => {
        bottomSheetModalRef.current?.dismiss()
    }, []);

    const hideModalWithNavigation = React.useCallback(() => {
        console.log("hideModalWithNavigation")
        bottomSheetModalRef.current?.dismiss()
        navigation.navigate("SearchProduct")
    }, []);


    // Moti
    const loaderAnimationState = useAnimationState({
        start: {
            opacity: 1,
        },
        stop: {
            opacity: 0
        },
    })

    const productAnimationState = useAnimationState({
        hide: {
            opacity: 0,
            translateY: -10,
        },
        show: {
            opacity: 1,
            translateY: 10
        }
    })

    React.useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    React.useEffect(() => {
        // Animation
        loaderAnimationState.transitionTo('stop')
        productAnimationState.transitionTo('hide')
    }, [])

    // Render

    function CameraFrame() {
        return (
            <Svg height="100%" width="100%">
                <Defs>
                    <Mask id="mask" x="0" y="0" height="100%" width="100%">
                        <Rect height="100%" width="100%" fill="#fff" />
                        <Rect
                            x="18%"
                            y="30%"
                            width="250"
                            height="250"
                            fill="black"
                        />
                    </Mask>
                </Defs>

                <Rect height="100%" width="100%" fill="rgba(0, 0, 0, 0.8)" mask="url(#mask)" />

                {/* Frame border */}
                <Rect
                    x="18%"
                    y="30%"
                    width="250"
                    height="250"
                    strokeWidth="5"
                    stroke="#fff"
                />
            </Svg>
        )
    };


    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    paddingTop: SIZES.padding * 2,
                    paddingBottom: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    alignItems: 'center',
                    backgroundColor: COLORS.light,
                    zIndex: 1
                }}
            >
                <IconButton
                    icon={icons.close}
                    onPress={() => navigation.goBack()}
                />

                <Text
                    style={{
                        flex: 1,
                        marginLeft: SIZES.radius,
                        ...FONTS.h2
                    }}
                >
                    {selectedOption == constants.scan_product_option.camera ? "Scan Camera" : "Scan QR Code"}
                </Text>

                <IconButton
                    icon={icons.flash}
                    iconStyle={{
                        width: 25,
                        height: 25
                    }}
                />

                <IconButton
                    icon={icons.question_mark}
                    containerStyle={{
                        marginLeft: SIZES.base
                    }}
                    iconStyle={{
                        width: 25,
                        height: 25
                    }}
                />
            </View>
        )
    }

    function renderCamera() {
        return (
            <View
                style={{
                    flex: 1
                }}
            >
                <Camera
                    style={{
                        flex: 1
                    }}
                    type={type}
                    onBarCodeScanned={(result) => {
                        console.log("SCANNED")
                        console.log(result.data)
                        if (selectedOption == constants.scan_product_option.qr) {
                            setBarcode(result.data);
                            productAnimationState.transitionTo('show')
                        }
                    }}

                />

                {/* Loading View */}
                <MotiView
                    state={loaderAnimationState}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.dark60
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.h2,
                            color: COLORS.light
                        }}
                    >
                        Searching
                    </Text>
                </MotiView>

                {/* Scan Button */}
                {selectedOption == constants.scan_product_option.camera &&
                    <View
                        style={{
                            position: 'absolute',
                            alignItems: 'center',
                            bottom: SIZES.padding,
                            left: 0,
                            right: 0
                        }}
                    >
                        <IconButton
                            withShadow
                            icon={icons.scan}
                            containerStyle={{
                                height: 60,
                                width: 60,
                                borderRadius: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: COLORS.light
                            }}
                            iconStyle={{
                                width: 50,
                                height: 50,
                                tintColor: COLORS.primary
                            }}
                            onPress={() => {
                                if (isFailed) {
                                    showModal()
                                } else {
                                    loaderAnimationState.transitionTo('start')

                                    setTimeout(() => {
                                        loaderAnimationState.transitionTo('stop')
                                        productAnimationState.transitionTo('show')
                                    }, 2000)
                                }
                            }}
                        />
                    </View>
                }

                {/* QR Code Camera Frame */}
                {selectedOption == constants.scan_product_option.qr &&
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0
                        }}
                    >
                        <CameraFrame />

                        {/* Label 1 */}
                        <View
                            style={{
                                position: 'absolute',
                                top: "15%",
                                left: 0,
                                right: 0,
                                alignItems: 'center',
                                //backgroundColor: 'red'
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.h1,
                                    color: COLORS.light
                                }}
                            >
                                Scan...
                            </Text>
                        </View>

                        {/* Label 2 */}
                        <View
                            style={{
                                position: 'absolute',
                                top: (SIZES.height * 0.3) + 220,
                                left: 0,
                                right: 0,
                                alignItems: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.body3,
                                    color: COLORS.light
                                }}
                            >
                                Align the code to be in the middle of the box
                            </Text>
                        </View>
                    </View>
                }

                {/* Product */}
                <MotiView
                    state={productAnimationState}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 120,
                        paddingVertical: SIZES.radius,
                        alignItems: 'center',
                        zIndex: 1
                    }}
                >
                    <Shadow>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                width: SIZES.width - (SIZES.padding * 2),
                                alignItems: 'center',
                                paddingHorizontal: SIZES.radius,
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.light
                            }}
                        >
                            {/* Image */}
                            <Image
                                source={images.luggage_01}
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 30
                                }}
                            />

                            {/* Product name and SKU */}
                            <View
                                style={{
                                    flex: 1,
                                    marginLeft: SIZES.radius
                                }}
                            >
                                <Text
                                    style={{
                                        ...FONTS.h3,
                                        color: COLORS.primary
                                    }}
                                >
                                    Vali Sakos
                                </Text>

                                <Text
                                    style={{
                                        ...FONTS.body4
                                    }}
                                >
                                    SKU: 7583593
                                </Text>
                            </View>

                            {/* Price */}
                            <Text
                                style={{
                                    ...FONTS.h3,
                                    color: COLORS.primary
                                }}
                            >
                                $ 67.00
                            </Text>
                        </TouchableOpacity>
                    </Shadow>
                </MotiView>
            </View>
        )
    }

    function renderFooter() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 90,
                    paddingTop: SIZES.radius,
                    paddingHorizontal: SIZES.radius,
                    backgroundColor: COLORS.light
                }}
            >
                <TextButton
                    label="Scan QR Code"
                    contentContainerStyle={{
                        flex: 1,
                        height: 55,
                        borderRadius: SIZES.radius,
                        backgroundColor: selectedOption == constants.scan_product_option.qr ? COLORS.primary : COLORS.lightGrey
                    }}
                    labelStyle={{
                        ...FONTS.h3,
                        color: selectedOption == constants.scan_product_option.qr ? COLORS.secondary : COLORS.primary
                    }}
                    onPress={() => {
                        setIsScanned(false)
                        productAnimationState.transitionTo('hide')
                        setSelectedOption(constants.scan_product_option.qr)
                    }}
                />

                <TextButton
                    label="Scan Camera"
                    contentContainerStyle={{
                        flex: 1,
                        height: 55,
                        marginLeft: SIZES.radius,
                        borderRadius: SIZES.radius,
                        backgroundColor: selectedOption == constants.scan_product_option.camera ? COLORS.primary : COLORS.lightGrey
                    }}
                    labelStyle={{
                        ...FONTS.h3,
                        color: selectedOption == constants.scan_product_option.camera ? COLORS.secondary : COLORS.primary
                    }}
                    onPress={() => {
                        setIsScanned(false)
                        productAnimationState.transitionTo('hide')
                        setSelectedOption(constants.scan_product_option.camera)
                    }}
                />
            </View>
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

            {/* Camera */}
            {renderCamera()}

            {/* Footer */}
            {renderFooter()}

            {/* Modal */}
            <ScanFailModal
                bottomSheetModalRef={bottomSheetModalRef}
                hideModal={hideModal}
                hideModalWithNavigation={hideModalWithNavigation}
            />
        </View>
    )
}

export default ScanProduct;