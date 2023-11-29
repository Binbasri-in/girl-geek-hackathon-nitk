import React from "react";
import {
    View,
    Text,
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
    RadioButton,
    TextButton
} from "../../components";
import {
    COLORS,
    FONTS,
    SIZES,
    icons
} from "../../constants";

const FilterResultModal = ({
    bottomSheetModalRef,
    hideModal,
    optionList,
    option
}) => {

    const [selectedOption, setSelectedOption] = React.useState(option)
    const [totalItems, setTotalItems] = React.useState(0)

    React.useEffect(() => {
        let total = 0

        optionList?.forEach(option => {
            total += option.no_of_items
        })

        setTotalItems(total)
    }, [])

    
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
                        onPress={() => {
                            setSelectedOption(option)
                            hideModal()
                        }}
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
                            marginBottom: 35
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 4
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.h2,
                                    fontSize: 18,
                                    color: COLORS.dark
                                }}
                            >
                                Filter
                            </Text>

                            <TouchableOpacity
                                onPress={() => setSelectedOption(null)}
                            >
                                <Text
                                    style={{
                                        ...FONTS.h5,
                                        color: COLORS.support3
                                    }}
                                >
                                    Clear
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <Text
                            style={{
                                ...FONTS.body4,
                                color: COLORS.grey
                            }}
                        >
                            {optionList?.length ? optionList.length : 0} 
                            {optionList?.length && optionList?.length > 1 ? ' Sub Categories' : ' Sub Category'}
                        </Text>
                    </View>

                    {/* Options */}
                    <ScrollView
                        style={{ 
                            flex: 1 
                        }}
                        showsVerticalScrollIndicator={false}
                    >
                        <View
                            style={{
                                marginBottom: 16
                            }}
                        >
                            <RadioButton
                                title='All Products'
                                subtitle={`${totalItems} ${totalItems > 1 ? 'Items' : 'Item'}`}
                                isSelected={selectedOption?.id == 0}
                                onPress={() => setSelectedOption({
                                    id: 0,
                                    name: "All Products",
                                    no_of_items: totalItems
                                })}
                            />
                        </View>

                        {optionList?.map((item, index) => {
                            return (
                                <View
                                    key={`option-${index}`}
                                    style={{
                                        marginBottom: 16
                                    }}
                                >
                                    <RadioButton
                                        title={item.name}
                                        subtitle={`${item.no_of_items} ${item.no_of_items > 1 ? 'Items' : 'Item'}`}
                                        isSelected={selectedOption?.id == item.id}
                                        onPress={() => setSelectedOption(item)}
                                    />
                                </View>
                            )
                        })}
                    </ScrollView>

                    {/* Buttons */}
                    <TextButton
                        label="Show Result"
                        contentContainerStyle={{
                            height: 55,
                            marginVertical: SIZES.padding,
                            borderRadius: SIZES.radius
                        }}
                        disabled={!selectedOption}
                        onPress={() => hideModal(selectedOption)}
                    />
                </View>
            </View>
        </BottomSheetModal>
    )
}

export default FilterResultModal;