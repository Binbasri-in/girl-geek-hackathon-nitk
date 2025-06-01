import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import {
    BottomSheetModalProvider
} from '@gorhom/bottom-sheet';
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { useFonts } from 'expo-font';

import modalReducer from "./stores/modal/modalReducer";
import cartReducer from "./stores/cart/cartReducer";

import {
    Welcome,
    Walkthrough,
    AuthMain,
    ForgotPassword,
    Otp,

    Cart,
    InvoiceInformation,
    ShippingInformation,

    FlashDeal,

    ScanProduct,
    SearchProduct,

    Settings,

    StoreProfileMain,

    Support,

    TermsOfUse,

    SubCategory,
    ProductList,
    Favorite,

    ProductDetail,
    Review,

    ElectronicInvoice,
    InvoiceConfirmation,
    ManageCard,
    PaymentMethod,

    Message,
    MessageDetail,

    Notification,

    PersonalInfo,
    MyQrCode,

    MyCoin,
    BonusSpins,
    HistoryCoin,

    CouponDetail
} from "./screens";

import Tabs from "./navigation/tabs";

const Stack = createStackNavigator();

const store = createStore(
    combineReducers({
        modalReducer,
        cartReducer
    }),
    applyMiddleware(thunk)
)

const App = () => {

    const [loaded] = useFonts({
        "Poppins-Black": require('./assets/fonts/Poppins-Black.ttf'),
        "Poppins-Bold": require('./assets/fonts/Poppins-Bold.ttf'),
        "Poppins-SemiBold": require('./assets/fonts/Poppins-SemiBold.ttf'),
        "Poppins-Regular": require('./assets/fonts/Poppins-Regular.ttf'),
    })

    if (!loaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <BottomSheetModalProvider>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false
                        }}
                        initialRouteName={'Welcome'}
                    >
                        <Stack.Screen name="Welcome" component={Welcome} />
                        <Stack.Screen name="Walkthrough" component={Walkthrough} />

                        <Stack.Screen name="AuthMain" component={AuthMain} />
                        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                        <Stack.Screen name="Otp" component={Otp} />

                        <Stack.Screen name="Dashboard" component={Tabs} />

                        <Stack.Screen name="Cart" component={Cart} />
                        <Stack.Screen name="InvoiceInformation" component={InvoiceInformation} />
                        <Stack.Screen name="ShippingInformation" component={ShippingInformation} />

                        <Stack.Screen name="FlashDeal" component={FlashDeal} />

                        <Stack.Screen name="ScanProduct" component={ScanProduct} />
                        <Stack.Screen name="SearchProduct" component={SearchProduct} />

                        <Stack.Screen name="Settings" component={Settings} />

                        <Stack.Screen name="StoreProfileMain" component={StoreProfileMain} />

                        <Stack.Screen name="Support" component={Support} />

                        <Stack.Screen name="TermsOfUse" component={TermsOfUse} />

                        <Stack.Screen name="SubCategory" component={SubCategory} />
                        <Stack.Screen name="ProductList" component={ProductList} />
                        <Stack.Screen name="Favorite" component={Favorite} />

                        <Stack.Screen name="ElectronicInvoice" component={ElectronicInvoice} />
                        <Stack.Screen name="InvoiceConfirmation" component={InvoiceConfirmation} />
                        <Stack.Screen name="ManageCard" component={ManageCard} />
                        <Stack.Screen name="PaymentMethod" component={PaymentMethod} />

                        <Stack.Screen name="ProductDetail" component={ProductDetail} />
                        <Stack.Screen name="Review" component={Review} />

                        <Stack.Screen name="Message" component={Message} />
                        <Stack.Screen name="MessageDetail" component={MessageDetail} />

                        <Stack.Screen name="Notification" component={Notification} />

                        <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
                        <Stack.Screen name="MyQrCode" component={MyQrCode} />

                        <Stack.Screen name="MyCoin" component={MyCoin} />
                        <Stack.Screen name="BonusSpins" component={BonusSpins} />
                        <Stack.Screen name="HistoryCoin" component={HistoryCoin} />

                        <Stack.Screen name="CouponDetail" component={CouponDetail} />
                    </Stack.Navigator>
                </NavigationContainer>
            </BottomSheetModalProvider>
        </Provider>
    )
}

export default App;