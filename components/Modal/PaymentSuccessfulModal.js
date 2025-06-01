import React from 'react';
import {
    View,
    Text,
    Image,
    Platform
} from 'react-native';

import {
    BottomSheetModal,
    BottomSheetBackdrop
} from '@gorhom/bottom-sheet';

import {
    IconButton,
    TextButton
} from "../../components"
import {
    COLORS,
    SIZES,
    icons,
    FONTS,
    images,
} from "../../constants"

const PaymentSuccessfulModal = ({
    orderNumber,

    bottomSheetModalRef,
    hideModal,
    hideModalWithNavigation
}) => {

    // Bottom Sheet
    const snapPoints = React.useMemo(() => {
        if (Platform.OS === 'ios') {
            return (
                ['65%']
            )
        } else {
            return (
                ['75%']
            )
        }
    }, []);

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
    );

    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
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
                        onPress={hideModal}
                    />
                </View>

                {/* Content */}
                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: SIZES.padding
                    }}
                >
                    {/* Image */}
                    <View
                        style={{
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                width: 120,
                                height: 120,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 60,
                                backgroundColor: COLORS.support3_08
                            }}
                        >
                            <Image
                                source={icons.payment_successful}
                                style={{
                                    width: 50,
                                    height: 50
                                }}
                            />
                        </View>
                    </View>

                    {/* Order number and thank you notes */}
                    <View
                        style={{
                            flex: 1
                        }}
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                                marginTop: SIZES.padding,
                                ...FONTS.h2
                            }}
                        >
                            Payment Successful
                        </Text>

                        {/* Order Number */}
                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: SIZES.radius,
                                justifyContent: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.body3
                                }}
                            >
                                Your order code:
                            </Text>

                            <Text
                                style={{
                                    ...FONTS.h3,
                                    marginLeft: SIZES.radius
                                }}
                            >
                                #{orderNumber}
                            </Text>
                        </View>


                        <Text
                            style={{
                                ...FONTS.body3,
                                textAlign: 'center'
                            }}
                        >
                            Thank you for choosing our products! Your order will be delivered in 10 days. Happy shopping with us!
                        </Text>
                    </View>

                    {/* Buttons */}
                    <View
                        style={{
                            marginBottom: SIZES.padding
                        }}
                    >
                        <TextButton
                            label="Continue Shopping"
                            contentContainerStyle={{
                                height: 55,
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.primary
                            }}
                            labelStyle={{
                                ...FONTS.h3
                            }}
                            onPress={hideModal}
                        />

                        <TextButton
                            label="Track order"
                            contentContainerStyle={{
                                height: 55,
                                //marginBottom: 50,
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.light
                            }}
                            labelStyle={{
                                ...FONTS.h3,
                                color: COLORS.primary
                            }}
                            onPress={hideModalWithNavigation}
                        />
                    </View>
                </View>
            </View>
        </BottomSheetModal>
    )
}

export default PaymentSuccessfulModal;