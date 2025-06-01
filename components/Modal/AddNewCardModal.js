import React from 'react';
import {
    View,
    Text,
    Image,
    Platform
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    BottomSheetModal,
    BottomSheetBackdrop
} from '@gorhom/bottom-sheet';

import {
    IconButton,
    FormInput,
    TextButton
} from ".."
import {
    COLORS,
    SIZES,
    icons,
    FONTS,
    images,
} from "../../constants"

const AddNewCardModal = ({
    bottomSheetModalRef,
    hideModal,
    hideModalWithNavigation
}) => {

    // States
    const [cardHolderName, setCardHolderName] = React.useState("")
    const [phoneNo, setPhoneNo] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [cardNumber, setCardNumber] = React.useState("")

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
                {/* Title */}
                <Text
                    style={{
                        marginHorizontal: SIZES.padding,
                        ...FONTS.h2
                    }}
                >
                    Add New Card
                </Text>

                <KeyboardAwareScrollView
                    contentContainerStyle={{
                        flex: 1,
                        paddingHorizontal: SIZES.padding,
                        marginTop: SIZES.padding
                    }}
                    enableOnAndroid={true}
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps={"handled"}
                    extraScrollHeight={-80}
                >
                    {/* Name */}
                    <FormInput
                        containerStyle={{
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.error,
                        }}
                        placeholder="Name"
                        value={cardHolderName}
                        onChange={(text) => setCardHolderName(text)}
                        prependComponent={
                            <Image
                                source={icons.person}
                                style={{
                                    width: 25,
                                    height: 25,
                                    marginRight: SIZES.base
                                }}
                            />
                        }
                    />

                    {/* Phone */}
                    <FormInput
                        containerStyle={{
                            marginTop: SIZES.radius,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.error,
                        }}
                        placeholder="Phone"
                        value={phoneNo}
                        onChange={(text) => setPhoneNo(text)}
                        prependComponent={
                            <Image
                                source={icons.phone}
                                style={{
                                    width: 25,
                                    height: 25,
                                    marginRight: SIZES.base
                                }}
                            />
                        }
                    />

                    {/* Email */}
                    <FormInput
                        containerStyle={{
                            marginTop: SIZES.radius,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.error,
                        }}
                        placeholder="Email"
                        value={email}
                        onChange={(text) => setEmail(text)}
                        prependComponent={
                            <Image
                                source={icons.email}
                                style={{
                                    width: 25,
                                    height: 25,
                                    marginRight: SIZES.base
                                }}
                            />
                        }
                    />

                    {/* Card Number */}
                    <FormInput
                        containerStyle={{
                            marginTop: SIZES.radius,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.error,
                        }}
                        placeholder="Card Number"
                        value={cardNumber}
                        onChange={(text) => setCardNumber(text)}
                        prependComponent={
                            <Image
                                source={icons.credit_card}
                                style={{
                                    width: 30,
                                    height: 30,
                                    marginRight: SIZES.base,
                                    tintColor: COLORS.grey
                                }}
                            />
                        }
                    />
                </KeyboardAwareScrollView>

                {/* Footer */}
                <TextButton
                    label="Add New Card"
                    contentContainerStyle={{
                        height: 55,
                        margin: SIZES.padding,
                        borderRadius: SIZES.radius
                    }}
                    onPress={hideModal}
                />
            </View>
        </BottomSheetModal>
    )
}

export default AddNewCardModal;