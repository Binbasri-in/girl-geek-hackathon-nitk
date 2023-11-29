import React from "react";
import {
  View,
  Text,
  Image,
  Modal,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { MotiView, useAnimationState } from "moti";
import { Shadow } from "react-native-shadow-2";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  TextButton,
  IconButton,
  FormInput,
  CheckBox,
  CountryDropDown,
} from "../../components";
import { icons, images, COLORS, FONTS, SIZES } from "../../constants";
import { ScrollView } from "react-native";

const Eliteform = ({navigation}) => {
    const [termsChecked, setTermsChecked] = React.useState(false)
 // Form State

  const [name, setName] = React.useState("");
  const [orgname, setOrgname] = React.useState("");
  const [phone, setPhone] = React.useState("");
  

  const animationState = useAnimationState({
    signIn: {
      height: SIZES.height * 0.55,
    },
    signUp: {
      height: SIZES.height > 700 ? SIZES.height * 0.7 : SIZES.height * 0.65,
    },
  });
  function renderSignIn() {
    return (
      <MotiView
        state={animationState}
        style={{
            marginTop: SIZES.padding,
            height: SIZES.height * 0.75,
        }}
      >
        <Shadow>
          <View
            style={{
              flex: 1,
              width: SIZES.width - SIZES.padding * 2,
              paddingHorizontal: SIZES.padding,
              paddingVertical: SIZES.padding,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.light,
              zIndex: 1,
            }}
          >
            <Text
              style={{
                width: "90%",
                lineHeight: 45,
                color: COLORS.dark,
                ...FONTS.h1,
              }}
            >
              Elite Membership Form.
            </Text>

            <KeyboardAwareScrollView
              enableOnAndroid={true}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps={"handled"}
              extraScrollHeight={-300}
              contentContainerStyle={{
                flexGrow: 1,
              }}
            >
              <View
                style={{
                  alignItems: "flex-start",
                }}
              >
                <TextButton
                  label="Contact Us"
                  contentContainerStyle={{
                    marginTop: SIZES.radius,
                    backgroundColor: null,
                  }}
                  labelStyle={{
                    color: COLORS.support3,
                    ...FONTS.h4,
                  }}
                  onPress={() => {
                    navigation.navigate("");
                  }}
                />
              </View>

              {/* NAME */}
              <FormInput
                containerStyle={{
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.error,
                  marginTop: SIZES.radius,
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
                      marginRight: SIZES.base,
                    }}
                  />
                }
              />

              {/* org name:*/}
              <FormInput
                containerStyle={{
                  marginTop: SIZES.radius,
                  borderRadius: SIZES.radius,
                }}
                placeholder=" Orgnisation Name"
                value={orgname}
                onChange={(text) => setOrgname(text)}
                prependComponent={
                  <Image
                    source={icons.people}
                    style={{
                      width: 25,
                      height: 25,
                      marginRight: SIZES.base,
                    }}
                  />
                }
              />

              {/* org mail:*/}
              <FormInput
                containerStyle={{
                  marginTop: SIZES.radius,
                  borderRadius: SIZES.radius,
                }}
                placeholder=" Orgnisation Mail"
                value={orgname}
                onChange={(text) => setOrgname(text)}
                prependComponent={
                  <Image
                    source={icons.email}
                    style={{
                      width: 25,
                      height: 25,
                      marginRight: SIZES.base,
                    }}
                  />
                }
              />

              {/* org Phone:*/}
              <FormInput
                containerStyle={{
                  marginTop: SIZES.radius,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.error,
                }}
                placeholder=" Org Phone Number"
                value={phone}
                onChange={(text) => setPhone(text)}
                prependComponent={
                  <Image
                    source={icons.phone}
                    style={{
                      width: 25,
                      height: 25,
                      marginRight: SIZES.base,
                    }}
                  />
                }
              />

              <Text style={{...FONTS.h3,marginTop:SIZES.radius*2}}>ADD ADHAR CARD & CERTIFICATE </Text>
              <View style={{flexDirection:"row"}}>
                  <TouchableOpacity
                    style={{
                      marginTop: SIZES.radius,
                      marginRight: SIZES.radius*2,
                      borderRadius: SIZES.radius,
                      backgroundColor: COLORS.lightGrey,
                      width: "20%",
                    }}
                  >
                    <Image
                      source={icons.plus}
                      style={{
                        width: 45,
                        height: 45,
                        marginRight: SIZES.base,
                        alignSelf:"center"
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      marginTop: SIZES.radius,
                      borderRadius: SIZES.radius,
                      backgroundColor: COLORS.lightGrey,
                      width: "20%",
                    }}
                  >
                    <Image
                      source={icons.plus}
                      style={{
                        width: 45,
                        height: 45,
                        marginRight: SIZES.base,
                        alignSelf:"center"
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
              </View>
            </KeyboardAwareScrollView>

            <TextButton
              label="Pay  ₹4500"
              contentContainerStyle={{
                height: 55,
                marginTop:SIZES.radius*3,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary,
              }}
              labelStyle={{
                ...FONTS.h3,
              }}
              onPress={() => {
                navigation.navigate("");
              }}
            />
          </View>
        </Shadow>
      </MotiView>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: SIZES.padding,
        backgroundColor: COLORS.lightGrey,
      }}
    >
      {/* Logo */}
      <Image
        source={images.logo}
        style={{
          alignSelf: "center",
          marginTop: SIZES.padding * 2,
          width: 90,
          height: 90,
        }}
      />

      {/* Auth Container */}
      <View
        style={{
          zIndex: 1,
        }}
      >
        {renderSignIn()}
      </View>
    </View>
  );
};

export default Eliteform;

const styles = StyleSheet.create({});
