import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { useDynamicAnimation, MotiImage } from 'moti';

import { SIZES, images } from "../../constants";

const Walkthrough3 = ({ animate }) => {

    // Moti
    const motiImage1 = useDynamicAnimation(() => ({
        top: "30%",
        left: "23%",
    }));

    const motiImage2 = useDynamicAnimation(() => ({
        top: "35%",
        left: "38%",
    }));

    const motiImage3 = useDynamicAnimation(() => ({
        top: "45%",
        left: "18%",
    }));

    const motiImage4 = useDynamicAnimation(() => ({
        top: "50%",
        left: "43%",
    }));

    React.useEffect(() => {
        if (animate) {
            motiImage1.animateTo({
                top: "20%",
                left: "15%",
            });

            motiImage2.animateTo({
                top: "30%",
                left: "55%",
            });

            motiImage3.animateTo({
                top: "50%",
                left: "10%",
            });

            motiImage4.animateTo({
                top: "60%",
                left: "50%",
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
                source={images.walkthrough_01_01}
                style={{
                    ...styles.image,
                    zIndex: 1
                }}
            />

            <MotiImage
                state={motiImage2}
                source={images.walkthrough_03_01}
                style={styles.image}
            />

            <MotiImage
                state={motiImage3}
                source={images.walkthrough_03_02}
                style={styles.image}
            />

            <MotiImage
                state={motiImage4}
                source={images.walkthrough_01_02}
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

export default Walkthrough3;