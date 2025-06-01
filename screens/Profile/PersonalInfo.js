import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet
} from 'react-native';
import { useDynamicAnimation, MotiView } from 'moti';

import {
    Header2,
    IconButton,
    TextButton
} from "../../components";
import {
    SIZES,
    COLORS,
    FONTS,
    icons
} from "../../constants";

const PersonalInfoLabelValue = ({ label, value }) => {
    return (
        <View
            style={{
                marginTop: SIZES.radius
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
                    marginTop: SIZES.base,
                    ...FONTS.body3
                }}
            >
                {value}
            </Text>
        </View>
    )
}

const SocialButtons = () => {
    return (
        <View
            style={{
                marginTop: SIZES.radius
            }}
        >
            <Text
                style={{
                    ...FONTS.body3,
                    color: COLORS.grey
                }}
            >
                Social network
            </Text>

            <View
                style={{
                    flexDirection: "row",
                    marginTop: SIZES.base
                }}
            >
                <IconButton
                    icon={icons.google_fill}
                />

                <IconButton
                    icon={icons.twitter_fill}
                    containerStyle={{
                        marginLeft: SIZES.padding
                    }}
                />

                <IconButton
                    icon={icons.facebook_fill}
                    containerStyle={{
                        marginLeft: SIZES.padding
                    }}
                />
            </View>
        </View>
    )
}

const PersonalInfo = () => {

    // Moti
    const motiContainer = useDynamicAnimation(() => ({
        opacity: 0,
        marginTop: SIZES.padding * 2
    }));

    React.useEffect(() => {
        motiContainer.animateTo({
            opacity: 1,
            marginTop: SIZES.padding
        });
    }, [])

    // Render

    function renderHeader() {
        return (
            <Header2
                title="Personal Info"
                containerStyle={{
                    marginBottom: SIZES.radius
                }}
                rightComponent={
                    <IconButton
                        icon={icons.edit}
                        iconStyle={{
                            width: 25,
                            height: 25
                        }}
                    />
                }
            />
        )
    }

    function renderPersonalInfo() {
        return (
            <MotiView
                delay={200}
                state={motiContainer}
                style={styles.container}
            >
                {/* Image and full name */}
                <View
                    style={{
                        alignItems: 'center',
                    }}
                >
                    <Image
                        source={icons.logo}
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: 40
                        }}
                    />

                    <Text
                        style={{
                            marginTop: SIZES.base,
                            ...FONTS.h2
                        }}
                    >
                        RAGHAV KUMAR JHA
                    </Text>
                </View>

                {/* Personal Info */}
                <View
                    style={{
                        marginVertical: SIZES.padding
                    }}
                >
                    <PersonalInfoLabelValue
                        label="Nick Name"
                        value="RAGHAV"
                    />

                    <SocialButtons />

                    <PersonalInfoLabelValue
                        label="Phone number"
                        value="7667472706"
                    />

                    <PersonalInfoLabelValue
                        label="Email"
                        value="e55@bmsit.in"
                    />

                    <PersonalInfoLabelValue
                        label="Date of Birth"
                        value="29/12/2002"
                    />

                    <PersonalInfoLabelValue
                        label="Sex"
                        value="Male"
                    />
                </View>
            </MotiView>
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

            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: SIZES.padding,
                }}
            >
                {/* Personal Info */}
                {renderPersonalInfo()}
            </ScrollView>

            {/* Footer */}
            <TextButton
                label="Apply"
                contentContainerStyle={{
                    height: 55,
                    margin: SIZES.padding,
                    borderRadius: SIZES.radius
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 25,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.light
    }
})

export default PersonalInfo;