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

const AuthMain = ({ navigation }) => {

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
            height: SIZES.height * 0.55,
        },
        signUp: {
            height: SIZES.height > 700 ? SIZES.height * 0.70 : SIZES.height * 0.65,
        },
    })

    React.useEffect(() => {
        // Animation
        animationState.transitionTo('signIn')

        // Fetch countires
        fetch("https://restcountries.com/v2/all")
            .then(response => response.json())
            .then(data => {
                let countryData = data.map(item => {
                    return {
                        code: item.alpha2Code,
                        name: item.name,
                        callingCode: `+${item.callingCodes[0]}`,
                        flag: `https://countryflagsapi.com/png/${item.alpha2Code}`
                    }
                })

                setCountries(countryData)
            })
    }, [])

    // Render

    function renderSignIn() {
        return (
            <MotiView
                state={animationState}
                style={{
                    marginTop: SIZES.padding,
                    height: SIZES.height * 0.55,
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
                            Sign in to continue.
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
                                placeholder="Email"
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

                            {/* Password */}
                            <FormInput
                                containerStyle={{
                                    marginTop: SIZES.radius,
                                    borderRadius: SIZES.radius,
                                    backgroundColor: COLORS.error,
                                }}
                                placeholder="Password"
                                value={password}
                                secureTextEntry={!isVisible}
                                onChange={(text) => setPassword(text)}
                                prependComponent={
                                    <Image
                                        source={icons.lock}
                                        style={{
                                            width: 25,
                                            height: 25,
                                            marginRight: SIZES.base
                                        }}
                                    />
                                }
                                appendComponent={
                                    <IconButton
                                        icon={isVisible ? icons.eye_off : icons.eye}
                                        iconStyle={{
                                            tintColor: COLORS.grey
                                        }}
                                        onPress={() => setIsVisible(!isVisible)}
                                    />
                                }
                            />

                            <View
                                style={{
                                    alignItems: 'flex-end'
                                }}
                            >
                                <TextButton
                                    label="Forgot Password?"
                                    contentContainerStyle={{
                                        marginTop: SIZES.radius,
                                        backgroundColor: null
                                    }}
                                    labelStyle={{
                                        color: COLORS.support3,
                                        ...FONTS.h4
                                    }}
                                    onPress={() => {
                                        navigation.navigate("ForgotPassword")
                                    }}
                                />
                            </View>
                        </KeyboardAwareScrollView>

                        <TextButton
                            label="Log In"
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

    function renderSignUp() {
        return (
            <MotiView
                state={animationState}
                style={{
                    marginTop: SIZES.padding,
                    backgroundColor: COLORS.light
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
                                ...FONTS.h1,
                                lineHeight: 45
                            }}
                        >
                            Create new account
                        </Text>

                        <KeyboardAwareScrollView
                            enableOnAndroid={true}
                            keyboardDismissMode="on-drag"
                            keyboardShouldPersistTaps={"handled"}
                            extraScrollHeight={-100}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                flexGrow: 1,
                                marginTop: SIZES.padding,
                                paddingBottom: SIZES.padding * 2
                            }}
                        >
                            {/* Name */}
                            <FormInput
                                containerStyle={{
                                    borderRadius: SIZES.radius,
                                    backgroundColor: COLORS.error,
                                }}
                                placeholder="Name"
                                value={name}
                                onChange={(text) => setName(text)}
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

                            {/* Email */}
                            <FormInput
                                containerStyle={{
                                    marginTop: SIZES.radius,
                                    borderRadius: SIZES.radius,
                                    backgroundColor: COLORS.error,
                                }}
                                placeholder="Email"
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

                            {/* Phone */}
                            <FormInput
                                containerStyle={{
                                    marginTop: SIZES.radius,
                                    borderRadius: SIZES.radius,
                                    backgroundColor: COLORS.error,
                                }}
                                placeholder="Phone"
                                value={phone}
                                onChange={(text) => setPhone(text)}
                                prependComponent={
                                    <Image
                                        source={icons.phone}
                                        style={{
                                            width: 25,
                                            height: 25,
                                            marginRight: SIZES.base
                                        }}
                                    />
                                }
                            />

                            {/* Country */}
                            <CountryDropDown
                                containerStyle={{
                                    marginTop: SIZES.radius
                                }}
                                selectedCountry={selectedCountry}
                                onPress={() => setShowCountryModal(!showCountryModal)}
                            />

                            {/* Password */}
                            <FormInput
                                containerStyle={{
                                    marginTop: SIZES.radius,
                                    borderRadius: SIZES.radius,
                                    backgroundColor: COLORS.error,
                                }}
                                placeholder="Password"
                                value={password}
                                secureTextEntry={!isVisible}
                                onChange={(text) => setPassword(text)}
                                prependComponent={
                                    <Image
                                        source={icons.lock}
                                        style={{
                                            width: 25,
                                            height: 25,
                                            marginRight: SIZES.base
                                        }}
                                    />
                                }
                                appendComponent={
                                    <IconButton
                                        icon={isVisible ? icons.eye_off : icons.eye}
                                        iconStyle={{
                                            tintColor: COLORS.grey
                                        }}
                                        onPress={() => setIsVisible(!isVisible)}
                                    />
                                }
                            />

                            {/* Terms and Conditions */}
                            <CheckBox
                                containerStyle={{
                                    marginTop: SIZES.radius
                                }}
                                label="By registering, you agree to our Terms and that you have read our Data Use Policy."
                                isSelected={termsChecked}
                                onPress={() => setTermsChecked(!termsChecked)}
                            />
                        </KeyboardAwareScrollView>

                        <TextButton
                            label="Create Account"
                            contentContainerStyle={{
                                height: 55,
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.primary
                            }}
                            labelStyle={{
                                ...FONTS.h3
                            }}
                            onPress={() => {

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
        } else {
            return renderSignUp()
        }
    }

    function renderAuthContainerFooter() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 80,
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    marginTop: -30,
                    marginHorizontal: SIZES.radius,
                    paddingBottom: SIZES.radius,
                    borderBottomLeftRadius: SIZES.radius,
                    borderBottomRightRadius: SIZES.radius,
                    backgroundColor: COLORS.light60,
                    zIndex: 0
                }}
            >
                <Text
                    style={{
                        color: COLORS.grey,
                        ...FONTS.body5
                    }}
                >
                    {mode == "signIn" ? "Don't have an account?" : "I already have an account."}
                </Text>

                <TextButton
                    label={mode == "signIn" ? "Create New Account" : "Sign In"}
                    contentContainerStyle={{
                        marginLeft: SIZES.base,
                        backgroundColor: null
                    }}
                    labelStyle={{
                        color: COLORS.support3,
                        ...FONTS.h5
                    }}
                    onPress={() => {
                        if (animationState.current === 'signIn') {
                            animationState.transitionTo('signUp')
                            setMode("signUp")
                        } else {
                            animationState.transitionTo('signIn')
                            setMode("signIn")
                        }
                    }}
                />
            </View>
        )
    }

    function renderSocialLogins() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: -30,
                    zIndex: -1
                }}
            >
                <Text style={{ color: COLORS.dark, ...FONTS.body3 }}>OR login with</Text>

                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.radius
                    }}
                >
                    <IconButton
                        icon={icons.twitter}
                        iconStyle={{
                            tintColor: COLORS.dark
                        }}
                        containerStyle={styles.socialButtonContainer}
                    //onPress={() => navigation.goBack()}
                    />

                    <IconButton
                        icon={icons.google}
                        iconStyle={{
                            tintColor: COLORS.dark
                        }}
                        containerStyle={{
                            ...styles.socialButtonContainer,
                            marginLeft: SIZES.radius
                        }}
                    //onPress={() => navigation.goBack()}
                    />

                    <IconButton
                        icon={icons.linkedin}
                        iconStyle={{
                            tintColor: COLORS.dark
                        }}
                        containerStyle={{
                            ...styles.socialButtonContainer,
                            marginLeft: SIZES.radius
                        }}
                    //onPress={() => navigation.goBack()}
                    />
                </View>
            </View>
        )
    }

    function renderCountryModal() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showCountryModal}
            >
                <TouchableWithoutFeedback
                    onPress={() => setShowCountryModal(false)}
                >
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.dark80
                        }}
                    >
                        <View
                            style={{
                                height: 400,
                                width: SIZES.width * 0.8,
                                backgroundColor: COLORS.light,
                                borderRadius: SIZES.radius
                            }}
                        >
                            <FlatList
                                data={countries}
                                keyExtractor={(item) => item.code}
                                contentContainerStyle={{
                                    paddingHorizontal: SIZES.padding,
                                    paddingBottom: SIZES.padding,
                                }}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginTop: SIZES.radius
                                            }}
                                            onPress={() => {
                                                console.log(item)
                                                setSelectedCountry(item)
                                                setShowCountryModal(false)
                                            }}
                                        >
                                            <Image
                                                source={{ uri: item.flag }}
                                                resizeMode="contain"
                                                style={{
                                                    width: 40,
                                                    height: 30
                                                }}
                                            />
                                            <Text style={{ flex: 1, marginLeft: SIZES.radius, ...FONTS.body3 }}>{item.name}</Text>
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
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

            {renderAuthContainerFooter()}

            {/* Social Logins */}
            {mode == "signIn" && renderSocialLogins()}

            {/* Country Modal */}
            {renderCountryModal()}
        </View>
    )
}

const styles = StyleSheet.create({
    socialButtonContainer: {
        width: 55,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.grey20
    }
})

export default AuthMain;