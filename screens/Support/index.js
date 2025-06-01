import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    StyleSheet
} from 'react-native';
import { MotiView, useAnimationState } from 'moti'

import {
    Header2,
    TextButton
} from "../../components";
import {
    SIZES,
    COLORS,
    FONTS,
    dummyData,
    icons
} from "../../constants";

const ContactUsButton = ({ iconContainer, icon, title, description }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: SIZES.radius
            }}
        >
            {/* Icon */}
            <View
                style={{
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.success08,
                    ...iconContainer
                }}
            >
                <Image
                    source={icon}
                    style={{
                        width: 30,
                        height: 30
                    }}
                />
            </View>

            {/* Label */}
            <View
                style={{
                    marginLeft: SIZES.base
                }}
            >
                <Text
                    style={{
                        ...FONTS.h3
                    }}
                >
                    {title}
                </Text>
                <Text
                    style={{
                        ...FONTS.body3
                    }}
                >
                    {description}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const Support = () => {

    // State
    const [faqIsSeeMore, setFaqIsSeeMore] = React.useState(false)

    // Moti
    const faqAnimationState = useAnimationState({
        less: {
            height: (dummyData?.faq?.length / 2) * 45,
        },
        more: {
            height: dummyData?.faq?.length * 45
        },
    })

    React.useEffect(() => {
        faqAnimationState.transitionTo('less')
    }, [])

    // Handler

    function seeMoreButtonHandler() {
        setFaqIsSeeMore(!faqIsSeeMore)
        faqAnimationState.transitionTo(
            faqAnimationState.current === 'less' ? 'more' : 'less'
        )
    }

    // Render

    function renderHeader() {
        return (
            <Header2
                title="Support"
                containerStyle={{
                    marginBottom: SIZES.padding
                }}
            />
        )
    }

    function renderFAQ() {
        return (
            <View
                style={styles.container}
            >
                {/* Title */}
                <Text
                    style={{
                        ...FONTS.h3
                    }}
                >
                    FAQ
                </Text>

                <MotiView
                    state={faqAnimationState}
                    style={{
                        alignItems: 'flex-start',
                        overflow: 'hidden'
                    }}
                >
                    {dummyData?.faq.map((item, index) => {
                        return (
                            <TextButton
                                key={`faq-${index}`}
                                label={item?.question}
                                contentContainerStyle={{
                                    height: 45,
                                    backgroundColor: null
                                }}
                                labelStyle={{
                                    color: COLORS.dark,
                                    ...FONTS.body3
                                }}
                            />
                        )
                    })}
                </MotiView>

                <TextButton
                    label={faqIsSeeMore ? "See Less" : "See More"}
                    contentContainerStyle={{
                        marginTop: SIZES.base,
                        backgroundColor: null
                    }}
                    labelStyle={{
                        color: COLORS.support3,
                        ...FONTS.h3
                    }}
                    onPress={seeMoreButtonHandler}
                />
            </View >
        )
    }

    function renderContactUs() {
        return (
            <View
                style={styles.container}
            >
                {/* Title */}
                <Text
                    style={{
                        ...FONTS.h3
                    }}
                >
                    Contact Us
                </Text>

                {/* Chat */}
                <ContactUsButton
                    icon={icons.message_circle_fill}
                    iconContainer={{
                        backgroundColor: COLORS.success08
                    }}
                    title="Chat Now"
                    description="You can chat with us here"
                />

                {/* Email */}
                <ContactUsButton
                    icon={icons.email_fill}
                    iconContainer={{
                        backgroundColor: COLORS.error08
                    }}
                    title="Send Email"
                    description="Send us an email"
                />

                {/* Phone */}
                <ContactUsButton
                    icon={icons.phone_fill}
                    iconContainer={{
                        backgroundColor: COLORS.secondary08
                    }}
                    title="Customer Service"
                    description="Call us for support"
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

            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding
                }}
            >
                {/* FAQ */}
                {renderFAQ()}

                {/* Contact Us */}
                {renderContactUs()}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginBottom: SIZES.padding,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.light
    }
})

export default Support;