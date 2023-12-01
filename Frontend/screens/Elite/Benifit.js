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

const Benifit = () => {


  const animationState = useAnimationState({
    
  });

  function renderSignIn() {
    return (
      <MotiView
        state={animationState}
        style={{
          marginTop: SIZES.height * 0.08,
          height: SIZES.height * 0.55,
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
                width: "60%",
                lineHeight: 45,
                color: COLORS.dark,
                ...FONTS.h1,
              }}
            >
              Benefits Of Elite Members.
            </Text>

            <KeyboardAwareScrollView
              enableOnAndroid={true}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps={"handled"}
              extraScrollHeight={-300}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={icons.arrow_right}
                    style={{
                      width: 25,
                      height: 25,
                      marginRight: SIZES.base,
                    }}
                  />
                  <Text
                    style={{
                      width: "100%",
                      lineHeight: 45,
                      color: COLORS.dark,
                      ...FONTS.h3,
                    }}
                  >
                    Priority Support.
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={icons.arrow_right}
                    style={{
                      width: 25,
                      height: 25,
                      marginRight: SIZES.base,
                    }}
                  />
                  <Text
                    style={{
                      width: "100%",
                      lineHeight: 45,
                      color: COLORS.dark,
                      ...FONTS.h3,
                    }}
                  >
                    Networking Opportunities.
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={icons.arrow_right}
                    style={{
                      width: 25,
                      height: 25,
                      marginRight: SIZES.base,
                    }}
                  />
                  <Text
                    style={{
                      width: "100%",
                      lineHeight: 45,
                      color: COLORS.dark,
                      ...FONTS.h3,
                    }}
                  >
                    Feedback and Input.
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={icons.arrow_right}
                    style={{
                      width: 25,
                      height: 25,
                      marginRight: SIZES.base,
                    }}
                  />
                  <Text
                    style={{
                      width: "100%",
                      lineHeight: 45,
                      color: COLORS.dark,
                      ...FONTS.h3,
                    }}
                  >
                    Exclusive Promotions.
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={icons.arrow_right}
                    style={{
                      width: 25,
                      height: 25,
                      marginRight: SIZES.base,
                    }}
                  />
                  <Text
                    style={{
                      width: "100%",
                      lineHeight: 45,
                      color: COLORS.dark,
                      ...FONTS.h3,
                    }}
                  >
                   Priority Listings.
                  </Text>
                </View>
              </View>
            </KeyboardAwareScrollView>

            <TextButton
              label="UPGRADE TO ELITE"
              contentContainerStyle={{
                height: 55,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary,
              }}
              labelStyle={{
                ...FONTS.h3,
              }}
              onPress={() => {
                navigation.navigate("Dashboard");
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
          width: 120,
          height: 120,
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

export default Benifit;

const styles = StyleSheet.create({});
