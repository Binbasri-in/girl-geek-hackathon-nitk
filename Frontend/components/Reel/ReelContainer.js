import React from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native';
import { MotiView, useAnimationState } from 'moti';

import {
    Reel
} from "..";
import {
    SIZES,
    COLORS,
    FONTS,
    constants
} from "../../constants";

const ReelContainer = () => {

    const [width, setWidth] = React.useState(null);
    const [height, setHeight] = React.useState(null);
    const [isSpinning, setIsSpinning] = React.useState(false);

    const reel_refs = React.useRef(new Array());

    let reelsInMotion = null
    let spinResults = []

    React.useEffect(() => {
        spinButtonAnimationState.transitionTo('notSpinning')
    }, [])

    // Animation

    const spinButtonAnimationState = useAnimationState({
        isSpinning: {
            backgroundColor: COLORS.light08
        },
        notSpinning: {
            backgroundColor: COLORS.primary80
        },
    })

    // Helper

    function getRandomNumberBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // Handler

    function evaluateResults() {
        console.log(spinResults)
        console.log(spinResults.length)

        let idx = Math.floor(constants.reels.row / 2)
        let resultArr = []

        for (let i = 0; i < spinResults.length; i++) {
            resultArr.push(spinResults[i][idx])
        }

        if (resultArr.every((val, i, arr) => val === arr[0])) {
            alert("Congralutions! You've won!")
        }
    }

    function spin() {
        spinButtonAnimationState.transitionTo('isSpinning')

        reelsInMotion = constants.reels.column

        for (let i = 0; i < constants.reels.column; i++) {
            reel_refs.current[i].scrollByOffset(getRandomNumberBetween(10, 20), (reelIndex, results) => {
                reelsInMotion = reelsInMotion - 1
                spinResults[reelIndex] = results

                if (reelsInMotion === 0) {
                    spinButtonAnimationState.transitionTo('notSpinning')
                    evaluateResults()
                }
            })
        }
    }

    // Render

    function renderReels() {

        let reelWidth = width / constants.reels.column;
        let reelList = Array(constants.reels.column).fill(0).map((item, index) => {
            return <Reel key={index} index={index} width={reelWidth} height={height} ref={(ref) => reel_refs.current[index] = ref} />
        })

        return (
            <>
                {reelList}
            </>
        )
    }

    function renderSpinButton() {
        return (
            <TouchableWithoutFeedback
                disabled={isSpinning}
                onPress={() => spin()}
            >
                <MotiView
                    state={spinButtonAnimationState}
                    style={{
                        position: 'absolute',
                        top: "40%",
                        left: 10,
                        right: 10,
                        height: 130,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: SIZES.radius,
                        borderWidth: 4,
                        borderColor: COLORS.primary80,
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.h1,
                            color: COLORS.light
                        }}
                    >
                        SPIN
                    </Text>
                </MotiView>
            </TouchableWithoutFeedback>
        )
    }

    return (
        <View
            style={styles.container}
            onLayout={(event) => {
                let { width, height } = event.nativeEvent.layout;
                setWidth(width);
                setHeight(height);
            }}
        >
            {/* Reels */}
            {width && height && renderReels()}

            {/* Spin Button */}
            {renderSpinButton()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    }
})

export default ReelContainer;