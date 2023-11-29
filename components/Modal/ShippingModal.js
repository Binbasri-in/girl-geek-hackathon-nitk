import React from 'react';
import {
    View,
    Text,
    Platform
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    BottomSheetModal,
    BottomSheetBackdrop
} from '@gorhom/bottom-sheet';

import {
    IconButton,
    TextButton,
    AddressRadioButton
} from "../../components"
import {
    COLORS,
    SIZES,
    icons,
    FONTS,
    images,
} from "../../constants"

const ShippingModal = ({
    bottomSheetModalRef,
    hideModal,
    hideModalWithNavigation
}) => {

    // State

    const [selectedOption, setSelectedOption] = React.useState(0)

    // Bottom Sheet
    const snapPoints = React.useMemo(() => {
        if (Platform.OS === 'ios') {
            return (
                ['70%']
            )
        } else {
            return (
                ['80%']
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
                    {/* Header */}
                    <Text
                        style={{
                            marginTop: SIZES.radius,
                            ...FONTS.h2
                        }}
                    >
                        Shipping Information
                    </Text>

                    {/* Address Selection */}
                    <KeyboardAwareScrollView
                        contentContainerStyle={{
                            flex: 1,
                            marginTop: SIZES.radius
                        }}
                        enableOnAndroid={true}
                        keyboardDismissMode="on-drag"
                        keyboardShouldPersistTaps={"handled"}
                        extraScrollHeight={250}
                    >
                        <AddressRadioButton
                            is_selected={selectedOption == 0}
                            containerStyle={{
                                marginTop: SIZES.radius
                            }}
                            label="Default Address"
                            value="123/12, XYZ Street, ABC City"
                            onPress={() => setSelectedOption(0)}
                        />

                        <AddressRadioButton
                            is_custom_addr
                            is_selected={selectedOption == 1}
                            containerStyle={{
                                marginTop: SIZES.padding
                            }}
                            label="Default Address"
                            value="123/12, XYZ Street, ABC City"
                            onPress={() => setSelectedOption(1)}
                        />
                    </KeyboardAwareScrollView>

                    <TextButton
                        label="Submit"
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
        </BottomSheetModal >
    )
}

export default ShippingModal;