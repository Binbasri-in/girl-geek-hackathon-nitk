import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { useDynamicAnimation, MotiImage } from 'moti';

import { SIZES, images } from "../../constants";

const Walkthrough4 = ({ animate }) => {

    // Moti
    const motiImage1 = useDynamicAnimation(() => ({
        top: "20%",
        left: "20%",
    }));

    const motiImage2 = useDynamicAnimation(() => ({
        top: "30%",
        left: "15%",
    }));

    const motiImage3 = useDynamicAnimation(() => ({
        top: "35%",
        left: "50%",
    }));

    const motiImage4 = useDynamicAnimation(() => ({
        top: "50%",
        left: "35%",
    }));

    React.useEffect(() => {
        if (animate) {
            motiImage2.animateTo({
                top: "10%",
                left: -20,
            });

            motiImage3.animateTo({
                top: "20%",
                left: "90%",
            });

            motiImage4.animateTo({
                top: "80%",
                left: "85%",
            });
        }
    }, [animate])

    // Render

    return (
        <View
            style={{
                flex: 1,
                overflow: 'hidden'
            }}
        >
            <MotiImage
                state={motiImage1}
                source={images.walkthrough_04_01}
                style={{
                    ...styles.image,
                    width: 228,
                    height: 338,
                    //zIndex: 1
                }}
            />

            <MotiImage
                state={motiImage2}
                source={images.walkthrough_04_02}
                style={styles.image}
            />

            <MotiImage
                state={motiImage3}
                source={images.walkthrough_04_03}
                style={styles.image}
            />

            <MotiImage
                state={motiImage4}
                source={images.walkthrough_04_04}
                style={styles.image}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        position: 'absolute',
        width: 140,
        height: 140,
        zIndex: 0,
        borderRadius: SIZES.radius
    }
})

export default Walkthrough4;