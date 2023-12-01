import React from "react";
import {
    View,
    Text,
    Image,
    Platform,
    TouchableHighlight,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    BottomSheetModal,
    BottomSheetBackdrop
} from '@gorhom/bottom-sheet';
import {
    FormInput,
    IconButton,
    TextButton
} from "../../components";
import {
    COLORS,
    FONTS,
    SIZES,
    constants,
    icons
} from "../../constants";

const ProductOptionsModal = ({
    bottomSheetModalRef,
    hideModal,
    hideModalAddToCart,
    buttonLabel,
    productDetail
}) => {

    const initialState = {
        color: "",
        size: "",
        quantity: productDetail.stock > 0 ? 1 : 0,
    };

    const [selectedColor, setSelectedColor] = React.useState(initialState.color)
    const [selectedSize, setSelectedSize] = React.useState(initialState.size)
    const [selectedQuantity, setSelectedQuantity] = React.useState(initialState.quantity)
    
    // Bottom Sheet
    const snapPoints = React.useMemo(() => {
        if (Platform.OS === 'ios') {
            return (
                ['80%']
            )
        } else {
            return (
                ['90%']
            )
        }
    }, [])

    const renderBackdrop = React.useCallback(
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.8}
                pressBehavior="none"
            />
        ),
        []
    )

    function resetState() {
        setSelectedColor(initialState.color)
        setSelectedSize(initialState.size)
        setSelectedQuantity(initialState.quantity)
    }

    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            //index={1}
            snapPoints={snapPoints}
            backgroundStyle={{
                borderRadius: 0,
                backgroundColor: 'transparent'
            }}
            handleComponent={() => {
                return (
                    <View />
                );
            }}
            backdropComponent={renderBackdrop}
            enablePanDownToClose={false}
            //onChange={handleSheetChanges}
        >
            <View
                style={{
                    flex: 1,
                    marginTop: 50,
                    backgroundColor: COLORS.light,
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50,
                }}
            >
                {/* Close */}
                <View
                    style={{
                        alignItems: 'flex-end',
                        paddingRight: 50,
                    }}
                >
                    <IconButton
                        icon={icons.close}
                        withShadow
                        containerStyle={{
                            width: 50,
                            height: 50,
                            marginTop: -20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.light,
                        }}
                        onPress={() => {
                            // resetState()
                            hideModal()
                        }}
                    />
                </View>

                {/* Content */}
                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: SIZES.padding
                    }}
                >
                    {/* Product info */}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: SIZES.padding,
                            marginBottom: 16
                        }}
                    >
                        <Image
                            source={productDetail.images[0].image}
                            resizeMode='contain'
                            style={{
                                width: 104,
                                height: 104
                            }}
                        />

                        <View
                            style={{
                                flex: 1,
                                paddingHorizontal: 16
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.h2,
                                    color: COLORS.primary,
                                    marginBottom: SIZES.base
                                }}
                            >
                                {productDetail.price}
                            </Text>

                            <Text
                                style={{
                                    ...FONTS.body5,
                                    color: COLORS.title
                                }}
                            >
                                Available Stock {productDetail.stock}
                            </Text>
                        </View>

                        <Image
                            source={productDetail.qrcode}
                            resizeMode='contain'
                            style={{
                                width: 48,
                                height: 48
                            }}
                        />
                    </View>


                    <KeyboardAwareScrollView
                        enableOnAndroid={true}
                        keyboardDismissMode="on-drag"
                        keyboardShouldPersistTaps={"handled"}
                        extraScrollHeight={50}
                    >
                        {/* Color options */}
                        <View
                            style={{
                                marginBottom: 32
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.h3,
                                    color: COLORS.dark,
                                    marginBottom: SIZES.radius
                                }}
                            >
                                Color
                            </Text>

                            <View
                                style={{
                                    flexDirection: 'row'
                                }}
                            >
                                {productDetail.colors.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            key={`color-${index}`}
                                            style={{
                                                ...styles.shadow,
                                                backgroundColor: item.color,
                                                width: SIZES.padding,
                                                height: SIZES.padding,
                                                borderRadius: SIZES.radius,
                                                borderWidth: 2,
                                                borderColor: item.id == selectedColor ? COLORS.primary : 'transparent',
                                                marginRight: index < (productDetail.colors.length) ? 16 : 0,
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                            onPress={() => {
                                                setSelectedColor(item.id == selectedColor ? "" : item.id)
                                            }}
                                        >
                                            {item.id == selectedColor &&
                                                <Image
                                                    source={icons.checkmark_bold}
                                                    resizeMode='contain'
                                                    style={{
                                                        width: 12,
                                                        height: 12,
                                                        tintColor: item.color == COLORS.light ? COLORS.primary : COLORS.light
                                                    }}
                                                />
                                            }
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </View>


                        {/* Size options */}
                        <View
                            style={{
                                marginBottom: 32
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.h3,
                                    color: COLORS.dark,
                                    marginBottom: SIZES.radius
                                }}
                            >
                                Size
                            </Text>

                            <View
                                style={{
                                    flexDirection: 'row'
                                }}
                            >
                                {productDetail.sizes.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            key={`size-${index}`}
                                            style={{
                                                ...styles.shadow,
                                                backgroundColor: item.id == selectedSize ? COLORS.secondary : COLORS.light,
                                                borderRadius: SIZES.base,
                                                paddingHorizontal: 12,
                                                paddingVertical: 6,
                                                marginRight: index < (productDetail.sizes.length - 1) ? 16 : 0
                                            }}
                                            onPress={() => {
                                                setSelectedSize(item.id == selectedSize ? "" : item.id)
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    ...FONTS.body5,
                                                    color: item.id == selectedSize ? COLORS.dark : COLORS.title
                                                }}
                                            >
                                                {item.label} - {item.quantity} pieces
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </View>

                        {/* Quantity options */}
                        <View
                            style={{
                                marginBottom: 32
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.h3,
                                    color: COLORS.dark,
                                    marginBottom: SIZES.radius
                                }}
                            >
                                Quantity
                            </Text>

                            <View
                                style={{
                                    flexDirection: 'row'
                                }}
                            >
                                <TouchableHighlight
                                    style={{
                                        ...styles.shadow,
                                        backgroundColor: COLORS.light,
                                        borderRadius: SIZES.radius,
                                        marginRight: 16,
                                        width: 44,
                                        height: 44,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    underlayColor={COLORS.secondary}
                                    onPress={() => {
                                        setSelectedQuantity(selectedQuantity - 1)
                                    }}
                                    disabled={selectedQuantity == 0}
                                >
                                    <Image
                                        source={icons.minus}
                                        resizeMode='contain'
                                        style={{
                                            width: 20,
                                            height: 20,
                                            tintColor: selectedQuantity == 0 ? COLORS.grey60 : COLORS.dark
                                        }}
                                    />
                                </TouchableHighlight>

                                <FormInput
                                    containerStyle={{
                                        marginRight: 16
                                    }}
                                    inputContainerStyle={{
                                        ...styles.shadow,
                                        width: 125,
                                        height: 44
                                    }}
                                    inputStyle={{
                                        ...FONTS.h3,
                                        color: COLORS.primary,
                                        textAlign: 'center'
                                    }}
                                    value={selectedQuantity.toString()}
                                    keyboardType='numeric'
                                    onChange={(text) => {
                                        setSelectedQuantity(Number(text) > productDetail.stock ? productDetail.stock : Number(text))
                                    }}
                                />

                                <TouchableHighlight
                                    style={{
                                        ...styles.shadow,
                                        backgroundColor: COLORS.light,
                                        borderRadius: SIZES.radius,
                                        width: 44,
                                        height: 44,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    underlayColor={COLORS.secondary}
                                    onPress={() => {
                                        setSelectedQuantity(selectedQuantity + 1)
                                    }}
                                    disabled={selectedQuantity == productDetail.stock}
                                >
                                    <Image
                                        source={icons.plus}
                                        resizeMode='contain'
                                        style={{
                                            width: 20,
                                            height: 20,
                                            tintColor: selectedQuantity == productDetail.stock ? COLORS.grey60 : COLORS.dark
                                        }}
                                    />
                                </TouchableHighlight>
                            </View>
                        </View>

                        {/* Buttons */}
                        <TextButton
                            label={buttonLabel}
                            contentContainerStyle={{
                                height: 55,
                                marginVertical: SIZES.padding,
                                borderRadius: SIZES.radius
                            }}
                            onPress={() => {
                                // resetState()
                                buttonLabel == constants.action_type.cart ? hideModalAddToCart() : hideModal()
                            }}
                            disabled={!selectedColor || !selectedSize || !selectedQuantity}
                        />
                    </KeyboardAwareScrollView>
                </View>
            </View>
        </BottomSheetModal>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: COLORS.shadow,
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 4,
        elevation: 5,
    }
})

export default ProductOptionsModal;