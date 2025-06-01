import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';

import {
    Header2
} from "../../components";
import {
    SIZES,
    COLORS,
    FONTS,
    dummyData
} from "../../constants";

const Message = ({ navigation }) => {

    // Render

    function renderHeader() {
        return (
            <Header2
                title={'Messages'}
                containerStyle={{ marginBottom: SIZES.padding }}
            />
        )
    }

    function renderMessageList() {
        return (
            <FlatList
                //style={{ marginBottom: SIZES.margin }}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding
                }}
                data={dummyData.messageHeaders}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            marginTop: SIZES.radius,
                            alignItems: 'center',
                            paddingHorizontal: SIZES.radius,
                            height: 100,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.light
                        }}
                        onPress={() => {
                            //setSelectedSale(item.id)
                            navigation.navigate("MessageDetail")
                        }}
                    >
                        {/* Profile */}
                        <View
                            style={{
                                width: 60,
                                height: 60,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 20,
                                backgroundColor: COLORS.grey20
                            }}
                        >
                            <Image
                                source={item.profile_pic}
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20
                                }}
                            />
                        </View>

                        {/* Name and last message */}
                        <View
                            style={{
                                flex: 1,
                                marginLeft: SIZES.radius
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.h3,
                                    color: COLORS.primary
                                }}
                            >
                                {item?.name}
                            </Text>

                            <Text
                                style={{
                                    ...FONTS.body4,
                                    color: COLORS.grey
                                }}
                            >
                                {item?.last_message}
                            </Text>
                        </View>

                        {/* Last message and unread message */}
                        <View
                            style={{
                                alignItems: 'flex-end'
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.body4,
                                    color: COLORS.grey
                                }}
                            >
                                {item?.last_sent}
                            </Text>

                            <View
                                style={{
                                    marginTop: SIZES.base,
                                    width: 25,
                                    height: 25,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 15,
                                    backgroundColor: COLORS.primary
                                }}
                            >
                                <Text
                                    style={{
                                        ...FONTS.body4,
                                        color: COLORS.light
                                    }}
                                >
                                    {item?.unread_message}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.lightGrey
            }}
        >
            {/* Header */}
            {renderHeader()}

            {/* Message */}
            {renderMessageList()}
        </View>
    )
}

export default Message;