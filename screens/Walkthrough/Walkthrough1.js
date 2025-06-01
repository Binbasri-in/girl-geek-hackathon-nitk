import React from 'react';
import {
    View,
    Image
} from 'react-native';
import { FlatList } from "react-native-gesture-handler";

import { SIZES, constants } from "../../constants";

const ITEM_WIDTH = 120;

const Walkthrough1 = () => {

    // Row 1
    const [row1Images, setRow1Images] = React.useState([
        ...constants.walkthrough_01_01_images,
        ...constants.walkthrough_01_01_images
    ])
    const [currentPosition, setCurrentPosition] = React.useState(0)
    // Row 2
    const [row2Images, setRow2Images] = React.useState([
        ...constants.walkthrough_01_02_images,
        ...constants.walkthrough_01_02_images
    ])
    const [row2CurrentPosition, setRow2CurrentPosition] = React.useState(0)

    // Ref
    const row1FlatListRef = React.useRef()
    const row2FlatListRef = React.useRef()

    React.useEffect(() => {
        // Slider Row 1
        //JSON.parse(JSON.stringify(adultTeeth));
        //let newRow1Images = getWrappedData(constants?.walkthrough_01_01_images)
        //console.log(newRow1Images)

        /*let interval = setInterval(() => {
            // Walkthrough 1 Row 1 Interval
            // Increment position with each new interval
            setCurrentPosition(prevPosition => {

                const position = Number(prevPosition) + 1;
                row1FlatListRef?.current?.scrollToOffset({ offset: position, animated: false });

                const maxOffset = constants.walkthrough_01_01_images.length * ITEM_WIDTH;

                // Set animation to repeat at end of scroll
                if (prevPosition > maxOffset) {
                    const offset = prevPosition - maxOffset;

                    row1FlatListRef?.current?.scrollToOffset({
                        offset,
                        animated: true,
                    });

                    return offset
                } else {
                    return position
                }
            })

            // Walkthrough 1 Row 2 Interval
            // Increment position with each new interval
            setRow2CurrentPosition(prevPosition => {

                const position = Number(prevPosition) + 1;
                row2FlatListRef?.current?.scrollToOffset({ offset: position, animated: false });

                const maxOffset = constants.walkthrough_01_02_images.length * ITEM_WIDTH;

                // Set animation to repeat at end of scroll
                if (prevPosition > maxOffset) {
                    const offset = prevPosition - maxOffset;

                    row2FlatListRef?.current?.scrollToOffset({
                        offset,
                        animated: true,
                    });

                    return offset
                } else {
                    return position
                }
            })
        }, 1000)*/

        // return a function for react to clean up
        //cleanup the interval
        //return () => clearInterval(interval)

        let positionTimer;

        const timer = () => {
            positionTimer = setTimeout(() => {
                // Walkthrough 1 Row 1 Interval
                // Increment position with each new interval
                setCurrentPosition(prevPosition => {

                    const position = Number(prevPosition) + 1;
                    row1FlatListRef?.current?.scrollToOffset({ offset: position, animated: false });

                    const maxOffset = constants.walkthrough_01_01_images.length * ITEM_WIDTH;

                    // Set animation to repeat at end of scroll
                    if (prevPosition > maxOffset) {
                        const offset = prevPosition - maxOffset;

                        row1FlatListRef?.current?.scrollToOffset({
                            offset,
                            animated: false,
                        });

                        return offset
                    } else {
                        return position
                    }
                })

                // Walkthrough 1 Row 2 Interval
                // Increment position with each new interval
                setRow2CurrentPosition(prevPosition => {

                    const position = Number(prevPosition) + 1;
                    row2FlatListRef?.current?.scrollToOffset({ offset: position, animated: false });

                    const maxOffset = constants.walkthrough_01_02_images.length * ITEM_WIDTH;

                    // Set animation to repeat at end of scroll
                    if (prevPosition > maxOffset) {
                        const offset = prevPosition - maxOffset;

                        row2FlatListRef?.current?.scrollToOffset({
                            offset,
                            animated: false,
                        });

                        return offset
                    } else {
                        return position
                    }
                })

                timer();
            }, 32);
        };

        timer();

        return () => {
            clearTimeout(positionTimer);
        };
    }, [])

    // Render

    return (
        <View>
            {/* Slider Image Row 1 */}
            <FlatList
                ref={row1FlatListRef}
                decelerationRate="fast"
                horizontal
                showsHorizontalScrollIndicator={false}
                listKey="Thumbnails_row1"
                keyExtractor={(_, index) => `Thumbnails_row1_${index}`}
                data={row1Images}
                scrollEnabled={false}
                renderItem={({ item, index }) => {
                    return (
                        <View
                            style={{
                                width: ITEM_WIDTH,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Image
                                source={item}
                                style={{
                                    width: 110,
                                    height: 110,
                                }}
                            />
                        </View>
                    )
                }}
            />

            {/* Slider Image Row 2 */}
            <FlatList
                ref={row2FlatListRef}
                decelerationRate="fast"
                style={{
                    marginTop: SIZES.padding,
                    transform: [{ rotate: "180deg" }]
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                listKey="Thumbnails_row2"
                keyExtractor={(_, index) => `Thumbnails_row2_${index}`}
                data={row2Images}
                renderItem={({ item, index }) => {
                    return (
                        <View
                            style={{
                                width: ITEM_WIDTH,
                                alignItems: 'center',
                                justifyContent: 'center',
                                transform: [{ rotate: "180deg" }]
                            }}
                        >
                            <Image
                                source={item}
                                style={{
                                    width: 110,
                                    height: 110,
                                }}
                            />
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default Walkthrough1;
