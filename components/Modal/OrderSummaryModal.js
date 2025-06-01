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
    TextButton,
    PriceLabelWithIcon
} from "../../components"
import {
    COLORS,
    SIZES,
    icons,
    FONTS,
    images,
} from "../../constants"

const OrderSummaryModal = ({
    bottomSheetModalRef,
    hideModal,
    hideModalWithNavigation
}) => {

    // Bottom Sheet
    const snapPoints = React.useMemo(() => {
        if (Platform.OS === 'ios') {
            return (
                ['50%']
            )
        } else {
            return (
                ['60%']
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
                    {/* Text & Buttons */}

                    <Text
                        style={{
                            marginTop: SIZES.radius,
                            ...FONTS.h2
                        }}
                    >
                        Order Summary!
                    </Text>

                    <View
                        style={{
                            flex: 1,
                            justifyContent: "flex-end",
                            marginBottom: SIZES.padding,
                        }}
                    >
                        <PriceLabelWithIcon
                            containerStyle={{
                                flex: 0
                            }}
                            icon={icons.credit_card}
                            label="Sub Total"
                            value={67}
                        />

                        <PriceLabelWithIcon
                            icon={icons.car}
                            label="Delivery"
                            value={30}
                            containerStyle={{
                                flex: 0,
                                marginTop: SIZES.base
                            }}
                        />

                        <PriceLabelWithIcon
                            icon={icons.price_tag_fill}
                            label="Tax (5%)"
                            value={300}
                            containerStyle={{
                                flex: 0,
                                marginTop: SIZES.base
                            }}
                        />

                        <PriceLabelWithIcon
                            icon={icons.clipboard}
                            label="Total"
                            value={415}
                            containerStyle={{
                                flex: 0,
                                marginTop: SIZES.base
                            }}
                        />
                    </View>

                    <TextButton
                        label="Detail"
                        contentContainerStyle={{
                            height: 55,
                            marginBottom: SIZES.padding,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.primary
                        }}
                        labelStyle={{
                            ...FONTS.h3
                        }}
                        onPress={hideModalWithNavigation}
                    />
                </View>
            </View>
        </BottomSheetModal>
    )
}

export default OrderSummaryModal;