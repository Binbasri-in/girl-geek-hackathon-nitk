import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet
} from "react-native"
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop
} from '@gorhom/bottom-sheet';

import {
    Header2,
    TextButton,
    IconButton
} from "../../components";
import { COLORS, FONTS, SIZES, icons, images } from '../../constants';

const CELL_COUNT = 4;

const Otp = ({ navigation }) => {

    const [value, setValue] = React.useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const bottomSheetModalRef = React.useRef(null);

    // Bottom Sheet
    const snapPoints = React.useMemo(() => ['60%'], []);

    // callbacks
    const showModal = React.useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const hideModal = React.useCallback(() => {
        bottomSheetModalRef.current?.dismiss()
        navigation.navigate("AuthMain")
    }, []);

    const renderBackdrop = React.useCallback(
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.8}
            />
        ),
        []
    );

    return (
        <BottomSheetModalProvider>
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.light
                }}
            >
                {/* Header */}
                <Header2
                    title="Verification"
                />

                {/* Content */}
                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: SIZES.padding
                    }}
                >
                    {/* Title */}
                    <Text
                        style={{
                            marginTop: SIZES.padding * 2,
                            width: "70%",
                            ...FONTS.h1
                        }}
                    >
                        Enter OTP sent to your phone.
                    </Text>

                    {/* OTP */}
                    <View
                        style={{
                            alignItems: 'center'
                        }}
                    >
                        <CodeField
                            ref={ref}
                            {...props}
                            value={value}
                            onChangeText={setValue}
                            cellCount={CELL_COUNT}
                            rootStyle={styles.codeFieldRoot}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            renderCell={({ index, symbol, isFocused }) => (
                                <View
                                    // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                                    onLayout={getCellOnLayoutHandler(index)}
                                    key={index}
                                    style={[styles.cellRoot, isFocused && styles.focusCell]}>
                                    <Text style={styles.cellText}>
                                        {symbol || (isFocused ? <Cursor /> : null)}
                                    </Text>
                                </View>
                            )}
                        />

                        <TextButton
                            label="Resend Code"
                            contentContainerStyle={{
                                marginTop: SIZES.padding,
                                borderRadius: SIZES.radius,
                                backgroundColor: null
                            }}
                            labelStyle={{
                                color: COLORS.support3,
                                ...FONTS.h3
                            }}
                            onPress={() => {
                                console.log("Resend Code")
                            }}
                        />
                    </View>
                </View>

                <TextButton
                    label="Submit"
                    contentContainerStyle={{
                        height: 55,
                        marginBottom: SIZES.padding,
                        marginHorizontal: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.primary
                    }}
                    labelStyle={{
                        ...FONTS.h3
                    }}
                    onPress={showModal}
                />

                {/* Modal */}
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
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Image
                                    source={images.lock}
                                    style={{
                                        width: 200,
                                        height: 200
                                    }}
                                />
                            </View>

                            {/* Text & Buttons */}
                            <View
                                style={{
                                    //alignItems: 'center'
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        marginTop: SIZES.padding,
                                        ...FONTS.h2
                                    }}
                                >
                                    Reset Password Successfully
                                </Text>

                                <Text
                                    style={{
                                        textAlign: 'center',
                                        color: COLORS.grey,
                                        ...FONTS.body3
                                    }}
                                >
                                    Leading e-commerce market
                                </Text>

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
                                    onPress={hideModal}
                                />
                            </View>
                        </View>
                    </View>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    )
}

const styles = StyleSheet.create({
    codeFieldRoot: {
        width: 300,
        marginTop: SIZES.padding * 2,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    cellRoot: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.grey,
        borderRadius: SIZES.radius,
        borderWidth: 1,
    },
    cellText: {
        textAlign: 'center',
        ...FONTS.h1
    },
    focusCell: {
        borderColor: COLORS.support3
    },
})

export default Otp;