import React, {
    useState,
    useEffect
} from 'react';
import {
    View,
    Text,
    Image,
    Platform,
    Keyboard
} from 'react-native';
import { GiftedChat, Bubble, InputToolbar, Actions, Composer, Send } from 'react-native-gifted-chat'
import ParsedText from 'react-native-parsed-text';
import moment from "moment";

import {
    Header2,
    IconButton
} from "../../components";
import {
    SIZES,
    COLORS,
    FONTS,
    icons,
    dummyData
} from "../../constants";

const MessageDetail = () => {

    const MY_ID = 1

    const [messages, setMessages] = useState([]);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        setMessages(dummyData.messages)

        const keyboardWillShowListener = Keyboard.addListener(
            'keyboardWillShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardWillHideListener = Keyboard.addListener(
            'keyboardWillHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardWillHideListener.remove();
            keyboardWillShowListener.remove();
        };
    }, [])

    function renderHeader() {
        return (
            <Header2
                title={'Reclays Store'}
                containerStyle={{
                    marginBottom: SIZES.padding
                }}
                rightComponent={
                    <View
                        style={{
                            flexDirection: 'row'
                        }}
                    >
                        <IconButton
                            containerStyle={{
                                marginRight: SIZES.radius
                            }}
                            icon={icons.video}
                            iconStyle={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.dark
                            }}
                        />

                        <IconButton
                            containerStyle={{
                                marginRight: SIZES.radius
                            }}
                            icon={icons.mic}
                            iconStyle={{
                                width: 25,
                                height: 25
                            }}
                        />

                        <IconButton
                            icon={icons.phone}
                            iconStyle={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.dark
                            }}
                        />
                    </View>
                }
            />
        )
    }

    // Chat

    renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        paddingVertical: SIZES.radius,
                        paddingHorizontal: SIZES.padding,
                        marginBottom: SIZES.base,
                        borderRadius: SIZES.radius,
                        borderTopLeftRadius: SIZES.radius,
                        borderBottomLeftRadius: 0,
                        backgroundColor: COLORS.primary,
                    },
                    right: {
                        paddingVertical: SIZES.radius,
                        paddingHorizontal: SIZES.padding,
                        marginBottom: SIZES.base,
                        borderRadius: SIZES.radius,
                        borderTopRightRadius: SIZES.radius,
                        borderBottomRightRadius: 0,
                        backgroundColor: COLORS.light
                    }
                }}
                renderTime={() => {
                    return (
                        <View />
                    )
                }}
            />
        )
    }

    renderMessage = (props) => {

        const {
            currentMessage,
        } = props

        let message;

        const isLastMessage = props.nextMessage && !props.nextMessage._id
        console.log(currentMessage?.user?._id)

        if (currentMessage?.user?._id !== MY_ID) {
            message = (
                <View
                    style={{
                        flexDirection: 'row',
                        marginBottom: !isLastMessage ? 0 : Platform.OS === 'ios' && isKeyboardVisible ? 0 : 70,
                    }}
                >
                    {/* Profile */}
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 25,
                            backgroundColor: COLORS.light
                        }}
                    >
                        <Image
                            source={currentMessage?.user?.avatar}
                            resizeMode="cover"
                            style={{
                                width: 30,
                                height: 30
                            }}
                        />
                    </View>

                    {/* Chat Bubble */}
                    <View
                        style={{
                            marginLeft: SIZES.radius,
                            marginBottom: SIZES.radius,
                        }}
                    >
                        {this.renderBubble(props)}
                        <Text
                            style={{
                                ...FONTS.body4,
                                color: COLORS.grey
                            }}
                        >
                            {moment(currentMessage?.createdAt).format("LT")}
                        </Text>
                    </View>
                </View>
            )
        } else {
            message = (
                <View
                    style={{
                        alignItems: 'flex-end',
                        marginBottom: !isLastMessage ? SIZES.radius : Platform.OS === 'ios' && isKeyboardVisible ? 0 : 70,
                    }}
                >
                    {/* Chat Bubble */}
                    {this.renderBubble(props)}

                    <Text
                        style={{
                            ...FONTS.body4,
                            color: COLORS.grey
                        }}
                    >
                        {moment(currentMessage?.createdAt).format("LT")}
                    </Text>
                </View>
            )
        }

        return (
            <View
                style={{
                    paddingHorizontal: SIZES.radius
                }}
            >
                {message}
            </View>
        )
    }

    renderMessageText = (props) => {
        var renderMessage;
        var textStyle = {};

        console.log("renderMessageText")
        //console.log(props)

        const {
            currentMessage,
            parsePatterns
        } = props

        if (currentMessage?.user?._id !== MY_ID) {
            textStyle = { color: COLORS.light }
        } else {
            textStyle = { color: COLORS.dark }
        }

        renderMessage = (
            <View>
                <ParsedText
                    style={{
                        ...FONTS.body2,
                        fontSize: 18,
                        //lineHeight: 0,
                        ...textStyle
                    }}
                    parse={parsePatterns()}
                    childrenProps={{ allowFontScaling: false }}
                >
                    {props.currentMessage.text}
                </ParsedText>
            </View>
        )

        return (
            renderMessage
        )
    }

    renderInputToolbar = (props) => {
        return (
            <InputToolbar
                {...props}
                containerStyle={{
                    marginHorizontal: SIZES.padding,
                    marginBottom: SIZES.padding * 2,
                    borderRadius: SIZES.radius,
                    borderTopColor: "transparent"
                }}
                primaryStyle={{
                    alignItems: 'center'
                }}
            />
        )
    }

    renderActions = (props) => {
        return (
            <Actions
                {...props}
                containerStyle={{
                    width: 42,
                    height: 42,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: SIZES.base
                }}
                icon={() => (
                    <Image
                        source={icons.plus_circle}
                        resizeMode="contain"
                        style={{
                            width: 32,
                            height: 32
                        }}
                    />
                )}
                options={{
                    'Choose From Library': () => {
                        console.log('Choose From Library');
                    },
                    Cancel: () => {
                        console.log('Cancel');
                    },
                }}
                optionTintColor="#222B45"
            />
        )
    }

    renderComposer = (props) => {
        return (
            <Composer
                {...props}
                composerHeight={50}
                textInputStyle={{
                    padding: 0,
                    ...FONTS.body3,
                    paddingTop: Platform.OS === 'ios' ? 12 : 0
                }}
                multiline={true}
            />
        )
    }

    renderSend = (props) => {
        return (
            <Send
                {...props}
                containerStyle={{
                    height: 42,
                    width: 42,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: SIZES.base
                }}
            >
                <Image
                    source={icons.send}
                    style={{
                        width: 32,
                        height: 32
                    }}
                />
            </Send>
        )
    }

    function renderChat() {
        return (
            <View
                style={{
                    flex: 1,
                }}
            >
                <GiftedChat
                    wrapInSafeArea={false}
                    messages={messages}
                    renderMessage={this.renderMessage}
                    renderMessageText={this.renderMessageText}
                    renderInputToolbar={this.renderInputToolbar}
                    renderActions={this.renderActions}
                    renderComposer={this.renderComposer}
                    renderSend={this.renderSend}
                    bottomOffset={Platform.OS === 'ios' ? -40 : 0}
                    alwaysShowSend
                    placeholder="Type a message"
                    //maxComposerHeight={130}
                    imageStyle={{
                        width: "100%",
                        marginBottom: SIZES.radius
                    }}
                    user={{
                        _id: 1,
                    }}
                    parsePatterns={() => [
                        {
                            type: "url",
                            style: { color: COLORS.support3 },
                            onPress: props => alert(`Pressed on ${props}`),
                        },
                        {
                            pattern: /#(\w+)/,
                            style: { color: COLORS.support3 },
                            onPress: props => alert(`Pressed on ${props}`),
                        }
                    ]}
                //onSend={messages => onSend(messages)}
                />
            </View>
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

            {/* Chat */}
            {renderChat()}
        </View>
    )
}

export default MessageDetail;