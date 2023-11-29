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

const ScanFailModal = ({
    bottomSheetModalRef,
    hideModal,
    hideModalWithNavigation
}) => {

    // Bottom Sheet
    const snapPoints = React.useMemo(() => {
        if (Platform.OS === 'ios') {
            return (
                ['60%']
            )
        } else {
            return (
                ['70%']
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
                        alignItems: 'center',
                        paddingHorizontal: SIZES.padding
                    }}
                >
                    {/* Image */}
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center'
                        }}
                    >
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
                                source={images.warning}
                                style={{
                                    width: 50,
                                    height: 50
                                }}
                            />
                        </View>
                    </View>

                    {/* Text & Buttons */}
                    <View>
                        <Text
                            style={{
                                textAlign: 'center',
                                marginTop: SIZES.padding,
                                ...FONTS.h2
                            }}
                        >
                            Failed
                        </Text>

                        <Text
                            style={{
                                textAlign: 'center',
                                marginTop: SIZES.radius,
                                color: COLORS.grey,
                                ...FONTS.body3
                            }}
                        >
                            Hmm.. We were not able to find a match
                        </Text>

                        <TextButton
                            label="Try Again"
                            contentContainerStyle={{
                                height: 55,
                                marginTop: SIZES.padding,
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.primary
                            }}
                            labelStyle={{
                                ...FONTS.h3
                            }}
                            onPress={hideModal}
                        />

                        <TextButton
                            label="Type in your search"
                            contentContainerStyle={{
                                height: 55,
                                marginBottom: 50,
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

export default ScanFailModal;