import React from 'react';
import {
    View,
    Image,
    StyleSheet
} from 'react-native';

import {
    images
} from "../../constants";

const ReelImage = ({ symbol, width, height }) => {

    const getImage = () => {
        switch (symbol) {
            case "A":
                return images.bathtub_01;
            case "B":
                return images.bathtub_02;
            case "C":
                return images.bathtub_03;
            case "D":
                return images.bed_01;
            case "E":
                return images.bed_02;
            case "F":
                return images.bed_03;
            case "G":
                return images.camera_01;
            case "H":
                return images.camera_02;
            case "I":
                return images.chair_01;
            case "J":
                return images.chair_02;
            case "K":
                return images.chair_03;
            case "L":
                return images.dress_01;
            case "M":
                return images.dress_02;
            case "N":
                return images.dress_03;
            case "O":
                return images.dress_04;
            case "P":
                return images.fashion_01;
            case "Q":
                return images.food_01;
            case "R":
                return images.general_women_01;
            case "S":
                return images.headphone_02;
            case "T":
                return images.laptop_01;
            case "U":
                return images.luggage_01;
            case "V":
                return images.smartphone_01;
            case "W":
                return images.tablet_01;
            case "X":
                return images.tv_01;
            case "Y":
                return images.wardrobe_01;
            case "Z":
                return images.wardrobe_02;
        }
    }

    return (
        <View
            style={{
                width: width,
                height: height,
                ...styles.container
            }}
        >
            <Image
            source={getImage()}
                style={{
                    width: width - 20,
                    height: height - 20
                }}
                resizeMode="contain"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    }
})

export default ReelImage;