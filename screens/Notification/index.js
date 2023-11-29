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

const Notification = () => {

    function renderHeader() {
        return (
            <Header2
                title="Notification"
            />
        )
    }

    function renderNotification() {
        return (
            <FlatList
                data={dummyData.notifications}
                keyExtractor={item => `notification-${item.id}`}
                style={{
                    marginTop: SIZES.padding
                }}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: SIZES.padding
                }}
                ListHeaderComponent={
                    <View>
                        <Text
                            style={{
                                ...FONTS.h3
                            }}
                        >
                            Your Activity
                        </Text>
                    </View>
                }
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            padding: SIZES.padding,
                            marginTop: SIZES.radius,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.light,
                        }}
                        onPress={() => {
                            //navigation.navigate("SubCategory", { selectedCategory: item });
                        }}
                    >
                        {/* Icon */}
                        <View
                            style={{
                                width: 45,
                                height: 45,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: SIZES.radius,
                                backgroundColor: item?.is_read ? COLORS.grey08 : COLORS.primary08
                                //{!item?.is_read
                            }}
                        >
                            <Image
                                source={item?.icon}
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: item?.is_read ? COLORS.grey : COLORS.primary
                                }}
                            />
                        </View>

                        {/* Content */}
                        <View
                            style={{
                                flex: 1,
                                marginLeft: SIZES.radius
                            }}
                        >
                            {/* Title */}
                            <View
                                style={{
                                    flexDirection: 'row'
                                }}
                            >
                                <Text
                                    style={{
                                        flex: 1,
                                        ...FONTS.h3,
                                        fontSize: 20,
                                        color: item?.is_read ? COLORS.grey : "black"
                                    }}
                                >
                                    {item.title}
                                </Text>

                                {/* Status */}
                                {!item?.is_read &&
                                    <View
                                        style={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: 5,
                                            backgroundColor: COLORS.primary
                                        }}
                                    />
                                }
                            </View>

                            {/* Description */}
                            <Text
                                style={{
                                    marginTop: SIZES.radius,
                                    ...FONTS.body3,
                                    color: item?.is_read ? COLORS.grey : "black"
                                }}
                            >
                                {item.description}
                            </Text>

                            {/* Date */}
                            <Text
                                style={{
                                    marginTop: SIZES.radius,
                                    color: COLORS.grey,
                                    ...FONTS.body4
                                }}
                            >
                                {item.display_date}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
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

            {/* Notification */}
            {renderNotification()}
        </View>
    )
}

export default Notification;