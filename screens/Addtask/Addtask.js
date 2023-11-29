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
                            AI task assigner
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

export default Addtask;