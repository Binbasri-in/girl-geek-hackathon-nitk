import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import {
    Header2,
    IconButton,
    TextButton,
    PaymentCard,
    AddNewCardModal
} from "../../components";
import {
    SIZES,
    COLORS,
    FONTS,
    icons,
    dummyData
} from "../../constants";

const ManageCard = () => {

    // Swipeable
    let row = [];
    let prevOpenedRow;

    // Modal
    const bottomSheetModalRef = React.useRef(null)

    const showModal = React.useCallback(() => {
        bottomSheetModalRef.current?.present()
    }, [])

    const hideModal = React.useCallback((selectedOption) => {
        bottomSheetModalRef.current?.dismiss()
    }, [])

    const hideModalWithNavigation = React.useCallback(() => {
        bottomSheetModalRef.current?.dismiss()
        //navigation.navigate("InvoiceInformation")
    }, []);

    // Render

    function renderHeader() {
        return (
            <Header2
                title="Manage Cards"
                rightComponent={
                    <View
                        style={{
                            flexDirection: 'row'
                        }}
                    >
                        <IconButton
                            icon={icons.plus_circle}
                            iconStyle={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.dark
                            }}
                            onPress={() => {
                                showModal()
                            }}
                        />
                    </View>
                }
            />
        )
    }

    const renderCardItem = ({ item, index }, onClick) => {
        //
        const closeRow = (index) => {
            console.log('closerow');
            if (prevOpenedRow && prevOpenedRow !== row[index]) {
                prevOpenedRow.close();
            }
            prevOpenedRow = row[index];
        };

        const renderRightActions = (progress, dragX, onClick) => {
            return (
                <View
                    style={{
                        alignContent: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <TextButton
                        label="Delete"
                        contentContainerStyle={{
                            backgroundColor: COLORS.error,
                            width: 100,
                            height: 50,
                            marginRight: SIZES.padding,
                            borderRadius: SIZES.radius,
                        }}
                        labelStyle={{
                            color: COLORS.light,
                            ...FONTS.h3
                        }}
                        onPress={onClick}
                    />
                </View>
            );
        };

        return (
            <Swipeable
                renderRightActions={(progress, dragX) =>
                    renderRightActions(progress, dragX, onClick)
                }
                onSwipeableOpen={() => closeRow(index)}
                ref={(ref) => (row[index] = ref)}
                rightOpenValue={-250}
            >
                <TouchableOpacity
                    style={{
                        marginTop: SIZES.padding,
                        marginHorizontal: SIZES.padding
                    }}
                >
                    <PaymentCard
                        bg_img={item?.bg_img}
                        card_no={item?.card_no}
                        name={item?.name}
                        icon={item?.icon}
                    />
                </TouchableOpacity>
            </Swipeable >
        );
    };

    function renderCardLists() {
        return (
            <View
                style={{
                    flex: 1,
                    marginTop: SIZES.radius
                }}
            >
                {/* Header Label */}
                <Text
                    style={{
                        ...FONTS.body3,
                        marginHorizontal: SIZES.padding,
                        color: COLORS.grey
                    }}
                >
                    Tap on the card to set as default payment method
                </Text>

                <Text
                    style={{
                        ...FONTS.body3,
                        marginHorizontal: SIZES.padding,
                        color: COLORS.grey
                    }}
                >
                    Swipe left to remove card
                </Text>

                {/* Cards */}
                <FlatList
                    data={dummyData.list_of_cards}
                    keyExtractor={item => item.id}
                    renderItem={(v) =>
                        renderCardItem(v, () => {
                            console.log('Pressed', v);
                        })
                    }
                />
            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1
            }}
        >
            {/* Header */}
            {renderHeader()}

            {/* Card Lists */}
            {renderCardLists()}

            {/* Modal */}
            <AddNewCardModal
                bottomSheetModalRef={bottomSheetModalRef}
                hideModal={hideModal}
                hideModalWithNavigation={hideModalWithNavigation}
            />
        </View>
    )
}

export default ManageCard;