import React, { Component } from 'react';
import {
    View,
    Animated,
    Easing,
    StyleSheet
} from 'react-native';

import {
    ReelImage
} from "../../components";
import {
    constants
} from "../../constants";

export default class Reel extends Component {

    constructor(props) {
        super(props);

        this.imageSeq = constants.reels.image_seq[this.props.index]
        this.reelSymbols = this.imageSeq.repeat(constants.reels.image_repeat).split("");
        this.symbolHeight = this.props.height / constants.reels.row
        
        this.position = 0;
        this.currentScrollPos = 0;

        this.state = {
            scrollPos: new Animated.Value(0),
        }
    }

    scrollByOffset = (offset, callback) => {
        this.currentScrollPos = this.currentScrollPos + (-1 * this.symbolHeight * offset)
        this.position = this.position + offset

        Animated.timing(
            this.state.scrollPos,
            {
                toValue: this.currentScrollPos,
                duration: 750 + (this.props.index * 250),
                useNativeDriver: true,
                easing: Easing.inOut(Easing.exp)
            }
        ).start(() => {
            this.position = ((constants.reels.image_repeat - 2) * this.imageSeq.length) + (this.position % this.imageSeq.length)
            this.currentScrollPos = this.position * this.symbolHeight * -1
            this.state.scrollPos.setValue(this.currentScrollPos)

            let results = []

            for(let i = 0; i < constants.reels.row; i++) {
                results.push(this.reelSymbols[this.position + i])
            }

            callback(this.props.index, results)
        })
    }

    render() {
        return (
            <View
                style={{
                    width: this.props.width,
                    height: this.props.height,
                    ...styles.container
                }}
            >
                <Animated.View
                    style={{
                        width: this.props.width,
                        height: this.reelSymbols.length * this.symbolHeight,
                        transform: [{
                            translateY: this.state.scrollPos
                        }]
                    }}
                >
                    {this.reelSymbols.map((item, index) => {
                        return (
                            <ReelImage
                                key={index}
                                width={this.props.width}
                                height={this.symbolHeight}
                                symbol={item}
                            />
                        )
                    })}
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden'
    }
})