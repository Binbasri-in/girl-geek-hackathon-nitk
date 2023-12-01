import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { Shadow } from "react-native-shadow-2";
import { Header2, IconBadgeButton, IconButton } from "../../components";
import { MotiView, useAnimationState } from "moti";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  COLORS,
  FONTS,
  SIZES,
  dummyData,
  icons,
  images,
} from "../../constants";
import {
  TextButton,
  FormInput,
  CheckBox,
  CountryDropDown,
} from "../../components";

const ProductListingForm = () => {
  const navigation = useNavigation();
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
            {/* <Text
              style={{
                width: "90%",
                lineHeight: 45,
                color: COLORS.dark,
                ...FONTS.h1,
              }}
            >
              Product Listing Form.
            </Text> */}

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
                  //  marginTop: SIZES.radius,
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
                placeholder="Product Name"
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
                placeholder=" Product Description"
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
                placeholder=" Product Quantity"
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
                placeholder="Product Pricing"
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

              {/* <Text style={{ ...FONTS.h3, marginTop: SIZES.radius * 2 }}>
                ADD ADHAR CARD & CERTIFICATE{" "}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{
                    marginTop: SIZES.radius,
                    marginRight: SIZES.radius * 2,
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
                      alignSelf: "center",
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
                      alignSelf: "center",
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View> */}
            </KeyboardAwareScrollView>

            <TextButton
              label="Click To Verify"
              contentContainerStyle={{
                height: 55,
                marginTop: SIZES.radius * 3,
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

  function add() {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{
            marginTop: SIZES.radius,
            marginRight: SIZES.radius * 2,
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
              alignSelf: "center",
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {/* <TouchableOpacity
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
              alignSelf: "center",
            }}
            resizeMode="contain"
          />
        </TouchableOpacity> */}
      </View>
    );
  }

  function renderHeader() {
    return (
      <Header2
        title="Product Listing"
        rightComponent={
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <IconButton
              containerStyle={{
                marginRight: 16,
              }}
              icon={icons.bookmark_fill}
              iconStyle={{
                width: 25,
                height: 25,
                tintColor: COLORS.dark,
              }}
              onPress={() => {
                console.log("bookmark pressed");
              }}
            />

            <IconButton
              containerStyle={{
                marginRight: 16,
              }}
              icon={icons.message_circle_fill}
              iconStyle={{
                width: 25,
                height: 25,
                tintColor: COLORS.dark,
              }}
              onPress={() => {
                navigation.navigate("Message");
              }}
            />

            {/* <IconBadgeButton
                            icon={icons.shoppingCart}
                            iconStyle={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.dark
                            }}
                            showBadge={cartQuantity > 0}
                            badgeContent={cartQuantity}
                            onPress={() => {
                                console.log('cart pressed')
                            }}
                        /> */}
          </View>
        }
      />
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}

      <View
        style={{
          zIndex: 1,
          flex: 1,
          paddingHorizontal: SIZES.padding,
          backgroundColor: COLORS.lightGrey,
        }}
      >
        {add()}
        {renderSignIn()}
      </View>
    </View>
  );
};

export default ProductListingForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGrey,
  },
});
