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

const ScanProductMessageModal = ({
    bottomSheetModalRef,
    hideModal,
    hideModalWithNavigation
}) => {

    // Bottom Sheet
    const snapPoints = React.useMemo(() => {
        if(Platform.OS === 'ios') {
            return (
                ['80%']
            )
        } else {
            return (
                ['90%']
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

    let conditionOfUseLink = (
        <Text
            style={{
                ...FONTS.h3,
                color: COLORS.support1
            }}
            onPress={() => {
                console.log("conditionOfUseLink on pressed")
            }}
        >
            Condition of Use
        </Text>
    )

    let privacyNoticeLink = (
        <Text
            style={{
                ...FONTS.h3,
                color: COLORS.support1
            }}
            onPress={() => {
                console.log("privacyNoticeLink on pressed")
            }}
        >
            Privacy Notice
        </Text>
    )

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
                            width: 120,
                            height: 120,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 60,
                            backgroundColor: COLORS.support2_08
                        }}
                    >
                        <Image
                            source={images.qr_code}
                            style={{
                                width: 70,
                                height: 70
                            }}
                        />
                    </View>

                    {/* Text & Buttons */}
                    <View
                        style={{
                            //alignItems: 'center'
                            flex: 1
                        }}
                    >
                        <Text
                            style={{
                                marginTop: SIZES.padding,
                                ...FONTS.h2
                            }}
                        >
                            Scan Product
                        </Text>

                        <Text
                            style={{
                                marginTop: SIZES.radius,
                                color: COLORS.dark,
                                ...FONTS.body3
                            }}
                        >
                            Point the camera at the barcode, QR code to see the content of that code
                        </Text>

                        <Text
                            style={{
                                marginTop: SIZES.radius,
                                color: COLORS.dark,
                                ...FONTS.body3
                            }}
                        >
                            By continuing to use the camera in the app or by submiting images, you agree to the {conditionOfUseLink} and to App processing
                        </Text>

                        <Text
                            style={{
                                marginTop: SIZES.radius,
                                color: COLORS.dark,
                                ...FONTS.body3
                            }}
                        >
                            Image related to your use of the camera in the App, your submitted images, and other related infomation to provide and improve its service. Please see our {privacyNoticeLink}
                        </Text>
                    </View>

                    <TextButton
                        label="Continue"
                        contentContainerStyle={{
                            height: 55,
                            marginVertical: SIZES.padding,
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

export default ScanProductMessageModal;