import React from 'react'
import {
    View,
    Text,
    Image,
    Modal,
    FlatList,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native';
import { MotiView, useAnimationState } from 'moti'
import { Shadow } from 'react-native-shadow-2';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {
    TextButton,
    IconButton,
    FormInput,
    CheckBox,
    CountryDropDown
} from "../../components";
import { icons, images, COLORS, FONTS, SIZES } from '../../constants';

const Addtask = ({ navigation }) => {

    const [mode, setMode] = React.useState("signIn")
    const [countries, setCountries] = React.useState([])
    const [showCountryModal, setShowCountryModal] = React.useState(false)
    const [isVisible, setIsVisible] = React.useState(false)
    const [termsChecked, setTermsChecked] = React.useState(false)

    // Form State
    const [email, setEmail] = React.useState("")
    const [name, setName] = React.useState("")
    const [phone, setPhone] = React.useState("")
    const [selectedCountry, setSelectedCountry] = React.useState(null)
    const [password, setPassword] = React.useState("")

    const animationState = useAnimationState({
        signIn: {
            height: SIZES.height * 0.7,
        }
    })

    React.useEffect(() => {
        // Animation
        animationState.transitionTo('signIn')
    }, [])

    // Render

    function renderSignIn() {
        return (
            <MotiView
                state={animationState}
                style={{
                    marginTop: SIZES.padding,
                    height: SIZES.height,
                }}
            >
                <Shadow>
                    <View
                        style={{
                            flex: 1,
                            width: SIZES.width - (SIZES.padding * 2),
                            paddingHorizontal: SIZES.padding,
                            paddingVertical: SIZES.padding,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.light,
                            zIndex: 1
                        }}
                    >
                        <Text
                            style={{
                                width: "60%",
                                lineHeight: 45,
                                color: COLORS.dark,
                                ...FONTS.h1,
                            }}
                        >
                            AI Task Assigner
                        </Text>

                        <KeyboardAwareScrollView
                            enableOnAndroid={true}
                            keyboardDismissMode="on-drag"
                            keyboardShouldPersistTaps={"handled"}
                            extraScrollHeight={-300}
                            contentContainerStyle={{
                                flexGrow: 1,
                                justifyContent: 'center'
                            }}
                        >
                            {/* Email */}
                            <FormInput
                                containerStyle={{
                                    borderRadius: SIZES.radius,
                                    backgroundColor: COLORS.error,
                                }}
                                placeholder="Role"
                                value={email}
                                onChange={(text) => setEmail(text)}
                                prependComponent={
                                    <Image
                                        source={icons.cube_outline}
                                        style={{
                                            width: 25,
                                            height: 25,
                                            marginRight: SIZES.base
                                        }}
                                    />
                                }
                            />

                            {/* description */}

                            <FormInput
                                containerStyle={{
                                    borderRadius: SIZES.radius,
                                    marginTop: SIZES.radius,
                                    backgroundColor: COLORS.error,
                                }}
                                placeholder="Title"
                                value={email}
                                onChange={(text) => setEmail(text)}
                                prependComponent={
                                    <Image
                                        source={icons.email}
                                        style={{
                                            width: 25,
                                            height: 25,
                                            marginRight: SIZES.base
                                        }}
                                    />
                                }
                            />
                            <FormInput
                                containerStyle={{
                                    borderRadius: SIZES.radius,
                                    marginTop: SIZES.radius,
                                    backgroundColor: COLORS.error,
                                }}
                                placeholder="Description"
                                value={email}
                                onChange={(text) => setEmail(text)}
                                prependComponent={
                                    <Image
                                        source={icons.file_text_fill}
                                        style={{
                                            width: 25,
                                            height: 25,
                                            marginRight: SIZES.base
                                        }}
                                    />
                                }
                            />
                            <FormInput
                                containerStyle={{
                                    borderRadius: SIZES.radius,
                                    marginTop: SIZES.radius,
                                    backgroundColor: COLORS.error,
                                }}
                                placeholder="DEADLINE"
                                value={email}
                                onChange={(text) => setEmail(text)}
                                prependComponent={
                                    <Image
                                        source={icons.alert_circle}
                                        style={{
                                            width: 25,
                                            height: 25,
                                            marginRight: SIZES.base
                                        }}
                                    />
                                }
                            />

                            {/* Password */}
                            <FormInput
                                containerStyle={{
                                    marginTop: SIZES.radius,
                                    borderRadius: SIZES.radius,
                                    backgroundColor: COLORS.error,
                                }}
                                placeholder="Assign to"
                                value={password}
                                onChange={(text) => setPassword(text)}
                                prependComponent={
                                    <Image
                                        source={icons.person}
                                        style={{
                                            width: 25,
                                            height: 25,
                                            marginRight: SIZES.base
                                        }}
                                    />
                                }
                            />

                         
                        </KeyboardAwareScrollView>

                        <TextButton
                            label="ASSIGN"
                            contentContainerStyle={{
                                height: 55,
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.primary
                            }}
                            labelStyle={{
                                ...FONTS.h3
                            }}
                            onPress={() => {
                                navigation.navigate("Dashboard")
                            }}
                        />
                    </View>
                </Shadow>
            </MotiView>
        )
    }

  

    function renderAuthContainer() {
        if (mode == "signIn") {
            return renderSignIn()
        } 
    }

    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: SIZES.padding,
                backgroundColor: COLORS.lightGrey
            }}
        >
            {/* Logo */}
            <Image
                source={images.logo}
                style={{
                    alignSelf: 'center',
                    marginTop: SIZES.padding * 2,
                    width: 50,
                    height: 50
                }}
            />

            {/* Auth Container */}
            <View
                style={{
                    zIndex: 1
                }}
            >
                {renderAuthContainer()}
            </View>

        </View>
    )
}

export default Addtask;