import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    Platform
} from 'react-native';
import {
    BottomSheetModal,
    BottomSheetBackdrop
} from '@gorhom/bottom-sheet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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

const PostReviewModal = ({
    bottomSheetModalRef,
    hideModal,
    hideModalWithNavigation
}) => {

    const [selectedRating, setSelectedRating] = React.useState(0);
    const [maxRating, setMaxRating] = React.useState([1, 2, 3, 4, 5]);


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

    function renderInvoice() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    paddingVertical: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    alignItems: 'center',
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.light
                }}
            >
                <Image
                    source={images.invoice}
                    resizeMode='contain'
                    style={{
                        width: 60,
                        height: 60
                    }}
                />

                <View
                    style={{
                        flex: 1,
                        marginLeft: SIZES.radius
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.h3
                        }}
                    >
                        Invoice #949698
                    </Text>

                    <Text
                        style={{
                            ...FONTS.body4
                        }}
                    >
                        23rd June 2023
                    </Text>
                </View>

                <Image
                    source={images.qr_code1}
                    resizeMode='contain'
                    style={{
                        width: 60,
                        height: 60
                    }}
                />
            </View>
        )
    }

    function renderReview() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding
                }}
            >
                <Text
                    style={{
                        ...FONTS.h3
                    }}
                >
                    Your Review
                </Text>

                <View
                    style={{
                        height: 100,
                        marginTop: SIZES.radius,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.light
                    }}
                >
                    <TextInput
                        style={{
                            flex: 1,
                            padding: SIZES.radius
                        }}
                        multiline={true}
                    />
                </View>
            </View>
        )
    }

    function renderRatings() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding
                }}
            >
                <Text
                    style={{
                        ...FONTS.h3
                    }}
                >
                    Ratings
                </Text>

                {renderRatingsComponent()}
            </View>
        )
    }

    function renderRatingsComponent() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: SIZES.base
                }}
            >
                {maxRating.map((item, index) => {
                    return (
                        <IconButton
                            key={`full-${index}`}
                            icon={icons.star}
                            iconStyle={{
                                width: 40,
                                height: 40,
                                tintColor: index < selectedRating ? COLORS.success : COLORS.grey
                            }}
                            containerStyle={{
                                marginLeft: SIZES.radius
                            }}
                            onPress={() => setSelectedRating(index + 1)}
                        />
                    )
                })}
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
        //onChange={handleSheetChanges}
        >
            <View
                style={{
                    flex: 1,
                    marginTop: 50,
                    backgroundColor: COLORS.lightGrey,
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

                <Text
                    style={{
                        marginTop: SIZES.radius,
                        marginHorizontal: SIZES.padding,
                        ...FONTS.h2
                    }}
                >
                    Post Review
                </Text>

                {/* Content */}
                <KeyboardAwareScrollView
                    contentContainerStyle={{
                        flex: 1,
                        paddingHorizontal: SIZES.padding
                    }}
                    enableOnAndroid={true}
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps={"handled"}
                    extraScrollHeight={250}
                >
                    <View
                        style={{
                            flex: 1,
                            marginTop: SIZES.padding,
                            marginBottom: SIZES.padding,
                        }}
                    >
                        {/* Invoice */}
                        {renderInvoice()}

                        {/* Review */}
                        {renderReview()}

                        {/* Ratings */}
                        {renderRatings()}
                    </View>
                </KeyboardAwareScrollView>

                {/* Footer Button */}
                <TextButton
                    label="Submit Review"
                    contentContainerStyle={{
                        height: 55,
                        marginHorizontal: SIZES.padding,
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
        </BottomSheetModal>
    )
}

export default PostReviewModal;