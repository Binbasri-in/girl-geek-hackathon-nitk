import React from 'react';
import {
   View,
   Text,
   Image,
   ImageBackground
} from 'react-native';
import {
   COLORS,
   FONTS,
   SIZES,
} from "../constants";

const PaymentCard = ({
   bg_img,
   card_no,
   name,
   icon
}) => {
   return (
      <ImageBackground
         source={bg_img}
         resizeMode='cover'
         style={{
            height: 210,
            padding: SIZES.radius,
            justifyContent: 'flex-end',
            borderRadius: 16,
            overflow: 'hidden'
         }}
      >
         {/* Card Number */}
         <Text
            style={{
               ...FONTS.h2,
               color: COLORS.light
            }}
         >
            {card_no}
         </Text>

         {/* Name and Type */}
         <View
            style={{
               flexDirection: 'row',
               alignItems: 'center'
            }}
         >
            <Text
               style={{
                  flex: 1,
                  ...FONTS.h2,
                  color: COLORS.light
               }}
            >
               {name}
            </Text>

            <Image
               source={icon}
               resizeMode='contain'
               style={{
                  width: 50,
                  height: 50,
               }}
            />
         </View>
      </ImageBackground>
   )
}

export default PaymentCard;