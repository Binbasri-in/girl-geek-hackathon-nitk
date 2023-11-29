import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import {
    LineDivider,
    IconButton
} from '../../../components'
import {
    COLORS,
    FONTS,
    SIZES,
    dummyData,
    constants,
    icons
} from '../../../constants';

const Rate = ({
    value,
    label
}) => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text
                style={{
                    ...FONTS.h1,
                    color: COLORS.primary
                }}
            >
                {value}%
            </Text>

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: SIZES.radius
                }}
            >
                <Text
                    style={{
                        ...FONTS.body4,
                        color: COLORS.grey
                    }}
                >
                    {label}
                </Text>

                <IconButton
                    icon={icons.alert_circle}
                    iconStyle={{
                        width: 20,
                        height: 20
                    }}
                    containerStyle={{
                        marginLeft: SIZES.base
                    }}
                />
            </View>
        </View>
    )
}

const StoreInfoLabelWithDesc = ({
    icon,
    label,
    desc
}) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                marginTop: SIZES.radius
            }}
        >
            <Image
                source={icon}
                resizeMode='contain'
                style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.grey,
                }}
            />

            <View
                style={{
                    marginLeft: SIZES.padding
                }}
            >
                <Text
                    style={{
                        ...FONTS.body3,
                        color: COLORS.grey
                    }}
                >
                    {label}
                </Text>

                <Text
                    style={{
                        ...FONTS.body3,
                        marginTop: 3
                    }}
                >
                    {desc}
                </Text>
            </View>
        </View>
    )
}

const StoreRecordsTab = () => {

    function renderRateSection() {
        return (
            <Shadow>
                <View
                    style={{
                        flexDirection: 'row',
                        width: SIZES.width - (SIZES.padding * 2),
                        height: 120,
                        alignItems: 'center',
                        //marginHorizontal: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.light
                    }}
                >
                    {/* Cancellation Rate */}
                    <Rate
                        value="0"
                        label="Cancellation rate"
                    />

                    <LineDivider
                        linestyle={{
                            height: "80%"
                        }}
                        vertical
                    />

                    {/* Return Rate */}
                    <Rate
                        value="0"
                        label="Return rate"
                    />
                </View>
            </Shadow>
        )
    }

    function renderInformation() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    padding: SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.light
                }}
            >
                {/* Header Label */}
                <Text
                    style={{
                        ...FONTS.h3,
                    }}
                >
                    Information
                </Text>

                {/* Information */}
                {/* Membership */}
                <StoreInfoLabelWithDesc
                    icon={icons.browser}
                    label="Membership"
                    desc={dummyData?.store_info?.store_records?.membership_from}
                />

                {/* Product */}
                <StoreInfoLabelWithDesc
                    icon={icons.cube}
                    label="Product"
                    desc={dummyData?.store_info?.store_records?.number_of_products}
                />

                {/* Description */}
                <StoreInfoLabelWithDesc
                    icon={icons.edit}
                    label="Description of the Store"
                    desc={dummyData?.store_info?.store_records?.description}
                />

                {/* Followers */}
                <StoreInfoLabelWithDesc
                    icon={icons.people}
                    label="Followers"
                    desc={dummyData?.store_info?.store_records?.followers}
                />
            </View>
        )
    }

    return (
        <ScrollView
            contentContainerStyle={{
                flex: 1,
                //alignItems: 'center',
                paddingTop: SIZES.radius
            }}
        >
            {/* Rate Section */}
            <View
                style={{
                    alignItems: 'center',
                }}
            >
                {renderRateSection()}
            </View>

            {/* Information */}
            {renderInformation()}
        </ScrollView>
    )
}

export default StoreRecordsTab;