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

const VerifyAccountModal = ({
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
                        marginTop: SIZES.radius,
                        paddingHorizontal: SIZES.padding
                    }}
                >
                    {/* Image */}
                    <View>
                        <View
                            style={{
                                width: 120,
                                height: 120,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 60,
                                backgroundColor: COLORS.primary08
                            }}
                        >
                            <Image
                                source={images.bell}
                                style={{
                                    width: 50,
                                    height: 50
                                }}
                            />
                        </View>
                    </View>

                    {/* Text & Buttons */}
                    <View
                        style={{
                            flex: 1,
                            marginTop: SIZES.padding,
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.h2
                            }}
                        >
                            Hello, ByProgrammers
                        </Text>

                        <Text
                            style={{
                                marginTop: SIZES.radius,
                                ...FONTS.h3
                            }}
                        >
                            To use all features of the app, you need to verify your account
                        </Text>

                        <Text
                            style={{
                                marginTop: SIZES.radius,
                                color: COLORS.grey,
                                ...FONTS.body3
                            }}
                        >
                            You can verify your account by uploading a valid ID card
                        </Text>
                    </View>

                    <TextButton
                        label="Verify Now"
                        contentContainerStyle={{
                            height: 55,
                            marginBottom: SIZES.padding,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.primary
                        }}
                        labelStyle={{
                            ...FONTS.h3
                        }}
                        onPress={hideModal}
                    />
                </View>
            </View>
        </BottomSheetModal>
    )
}

export default VerifyAccountModal;