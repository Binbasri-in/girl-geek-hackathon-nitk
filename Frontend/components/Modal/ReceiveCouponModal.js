import React from "react";
import {
    View,
    Text,
    Image,
    Platform,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {
    BottomSheetModal,
    BottomSheetBackdrop
} from '@gorhom/bottom-sheet';
import {
    IconButton,
    LineDivider,
    TextButton
} from "../../components";
import {
    COLORS,
    FONTS,
    SIZES,
    icons,
    dummyData
} from "../../constants";

const ReceiveCouponModal = ({
    bottomSheetModalRef,
    hideModal,
}) => {
    
    // Bottom Sheet
    const snapPoints = React.useMemo(() => {
        if (Platform.OS === 'ios') {
            return (
                ['85%']
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

    function renderCouponInfoSection() {
        return (
            <View>
                {/* Image */}
                <Image
                    source={dummyData.couponDetails.image}
                    resizeMode='contain'
                    style={{
                        alignSelf: 'center',
                        width: SIZES.width - (SIZES.padding * 2),
                        height: 80,
                        marginVertical: 16
                    }}
                />

                {/* Title */}
                <Text
                    style={{
                        ...FONTS.h2,
                        fontSize: 18,
                        color: COLORS.title,
                        marginBottom: SIZES.base
                    }}
                >
                    {dummyData.couponDetails.title}
                </Text>

                {/* Validity period */}
                <Text
                    style={{
                        ...FONTS.body4,
                        color: COLORS.dark
                    }}
                >
                    From {dummyData.couponDetails.start_date} to {dummyData.couponDetails.end_date}
                </Text>
            </View>
        )
    }

    function renderCouponCodeSection() {
        return (
            <View>
                {/* Instruction 1 */}
                <Text
                    style={{
                        ...FONTS.body4,
                        color: COLORS.grey
                    }}
                >
                    Display this offer to the staff and show them code 
                </Text>

                {/* Coupon code */}
                <View
                    style={{
                        marginVertical: 16
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: SIZES.base
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.h4,
                                color: COLORS.title
                            }}
                        >
                            YOUR COUPON CODE
                        </Text>

                        <TouchableOpacity>
                            <Text
                                style={{
                                    ...FONTS.h5,
                                    color: COLORS.support3
                                }}
                            >
                                Copy Code
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Text
                        style={{
                            ...FONTS.h1,
                            fontSize: 26,
                            lineHeight: 44,
                            color: COLORS.error
                        }}
                    >
                        {dummyData.couponDetails.code}
                    </Text>
                </View>

                {/* Instruction 2 */}
                <View
                    style={{
                        backgroundColor: COLORS.lightGrey,
                        padding: SIZES.margin,
                        borderRadius: 16
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.body4,
                            color: COLORS.grey
                        }}
                    >
                        Cannot be used in connjunction with other discounts or offers
                    </Text>
                </View>
            </View>
        )
    }

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
                    <View
                        style={{
                            marginTop: SIZES.padding,
                            marginBottom: 16
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.h3,
                                color: COLORS.dark
                            }}
                        >
                            Received a coupon
                        </Text>
                    </View>

                    {/* Coupon details */}
                    <ScrollView>
                        {renderCouponInfoSection()}

                        <LineDivider
                            linestyle={{
                                marginVertical: 16
                            }}
                        />

                        {renderCouponCodeSection()}
                    </ScrollView>

                    {/* Buttons */}
                    <TextButton
                        label="Save Coupon"
                        contentContainerStyle={{
                            height: 55,
                            marginVertical: 32,
                            borderRadius: SIZES.radius
                        }}
                        onPress={hideModal}
                    />
                </View>
            </View>
        </BottomSheetModal>
    )
}

export default ReceiveCouponModal;