import React from "react";
import {
    View,
    Text,
    Image,
    Keyboard
} from "react-native"

import {
    Header2,
    FormInput,
    TextButton
} from "../../components";
import { COLORS, FONTS, SIZES, icons } from '../../constants';

const ForgotPassword = ({ navigation }) => {

    // State
    const [phone, setPhone] = React.useState("")
    const [buttonPosition, setButtonPosition] = React.useState(SIZES.padding)

    React.useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardWillShow", (e) => {
            console.log("Keyboard Shown");
            setButtonPosition(e.endCoordinates.height + SIZES.padding)
        });
        const hideSubscription = Keyboard.addListener("keyboardWillHide", () => {
            console.log("Keyboard Hidden");
            setButtonPosition(SIZES.padding)
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.lightGrey
            }}
        >
            {/* Header */}
            <Header2
                title="Forgot Password"
            />

            {/* Content */}
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: SIZES.padding
                }}
            >
                {/* Title */}
                <Text
                    style={{
                        marginTop: SIZES.padding * 2,
                        width: "70%",
                        ...FONTS.h1
                    }}
                >
                    Continue using phone number.
                    </Text>

                {/* Phone Number */}
                <FormInput
                    containerStyle={{
                        marginTop: SIZES.padding * 2,
                        borderRadius: SIZES.radius
                    }}
                    inputContainerStyle={{
                        backgroundColor: COLORS.light
                    }}
                    placeholder="Phone"
                    value={phone}
                    keyboardType="phone-pad"
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
                    onChange={(text) => setPhone(text)}
                />
            </View>

            <TextButton
                label="Send Verification Code"
                contentContainerStyle={{
                    position: 'absolute',
                    bottom: buttonPosition,
                    left: SIZES.padding,
                    right: SIZES.padding,
                    height: 55,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.primary
                }}
                labelStyle={{
                    ...FONTS.h3
                }}
                onPress={() => {
                    navigation.navigate('Otp')
                }}
            />
        </View>
    )
}

export default ForgotPassword