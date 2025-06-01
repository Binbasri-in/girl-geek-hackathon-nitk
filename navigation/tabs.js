import React from "react";
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { connect } from "react-redux";

import { toggleCameraModal } from "../stores/modal/modalActions";

import {
    Home, 
    Category,
    Promo,
    Profile,
    Message
} from "../screens"
import { COLORS, FONTS, SIZES, icons } from "../constants"
import Addtask from "../screens/Addtask/Addtask";

const Tab = createBottomTabNavigator()

const TabBarCustomButton = ({ children, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                width: 55,
                height: 55,
                marginHorizontal: SIZES.radius,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary
            }}
            onPress={onPress}
        >
            {children}
        </TouchableOpacity>
    )
}

const Tabs = ({ showCameraModal, toggleCameraModal }) => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 110,
                    paddingTop: 10,
                    borderTopColor: "transparent",
                    showLabel: false
                },
                tabBarShowLabel: false
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabContainer}>
                            <Image
                                source={focused ? icons.cube : icons.cube_outline}
                                resizeMode="contain"
                                style={styles.tabIcon(focused)}
                            />
                            <Text style={styles.tabLabel(focused)}>
                                Home
                            </Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Category"
                component={Category}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabContainer}>
                            <Image
                                source={focused ? icons.video : icons.video}
                                resizeMode="contain"
                                style={styles.tabIcon(focused)}
                            />
                            <Text style={styles.tabLabel(focused)}>
                                Connect
                            </Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Scan"
                component={Addtask}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                        source={focused ? icons.plus_circle : icons.plus_circle}
                            style={{
                                width: 50,
                                height: 50,
                                marginBottom: 2
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
                // listeners={({ navigation }) => ({
                //     tabPress: (e) => {
                //         e.preventDefault()
                //         console.log("Prevent")
                //         toggleCameraModal(!showCameraModal)
                //     },
                // })}
            />
            <Tab.Screen
                name="Chats"
                component={Message}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabContainer}>
                            <Image
                                source={focused ? icons.message_circle : icons.message_circle_fill}
                                resizeMode="contain"
                                style={styles.tabIcon(focused)}
                            />
                            <Text style={styles.tabLabel(focused)}>
                                Chats
                            </Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabContainer}>
                            <Image
                                source={focused ? icons.person : icons.person2}
                                resizeMode="contain"
                                style={styles.tabIcon(focused)}
                            />
                            <Text style={styles.tabLabel(focused)}>
                                Profile
                            </Text>
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabContainer: {
        alignItems: 'center'
    },
    tabIcon: focused => ({
        width: 35,
        height: 35,
        tintColor: focused ? COLORS.primary : COLORS.grey
    }),
    tabLabel: focused => ({
        ...(focused ? FONTS.h4 : FONTS.body4),
        color: focused ? COLORS.primary : COLORS.grey
    })
})

function mapStateToProps(state) {
    return {
        showCameraModal: state.modalReducer.showCameraModal
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleCameraModal: (toggleValue) => { return dispatch(toggleCameraModal(toggleValue)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);