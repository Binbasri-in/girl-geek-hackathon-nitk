import React from "react";
import {
    View,
    Text,
    Image
} from 'react-native';
import {
    COLORS,
    FONTS,
    SIZES,
    icons
} from '../constants';

const Timer = ({ containerStyle, dateTime, withSeconds = false }) => {

    const countDownDateTime = new Date(dateTime).getTime()

    const [milliseconds, setmilliseconds] = React.useState(countDownDateTime - new Date().getTime())
    const [days, setDays] = React.useState(Math.max(0, Math.floor(milliseconds / (1000 * 60 * 60 * 24))))
    const [hours, setHours] = React.useState(Math.max(0, Math.floor(milliseconds % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))))
    const [minutes, setMinutes] = React.useState(Math.max(0, Math.floor(milliseconds % (1000 * 60 * 60) / (1000 * 60))))
    const [seconds, setSeconds] = React.useState(Math.max(0, Math.floor(milliseconds % (1000 * 60) / 1000)))

    React.useEffect(() => {

        const interval = setInterval(() => {
            setmilliseconds(countDownDateTime - new Date().getTime());
        }, 1000)
    
        return () => {
            clearInterval(interval)
        }

    }, [countDownDateTime])

    React.useEffect(() => {

        setDays(Math.max(0, Math.floor(milliseconds / (1000 * 60 * 60 * 24))))
        setHours(Math.max(0, Math.floor(milliseconds % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))))
        setMinutes(Math.max(0, Math.floor(milliseconds % (1000 * 60 * 60) / (1000 * 60))))
        setSeconds(Math.max(0, Math.floor(milliseconds % (1000 * 60) / 1000)))

    }, [milliseconds])

    return (
        <View
            style={{
                backgroundColor: COLORS.error,
                borderRadius: SIZES.radius,
                paddingHorizontal: 32,
                paddingVertical: 16,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                ...containerStyle
            }}
        >
            <Image
                source={icons.timer_fill}
                resizeMode='contain'
                style={{
                    height: 24,
                    width: 24,
                    marginRight: SIZES.base
                }}
            />
            
            <Text
                style={{
                    ...FONTS.h3,
                    color: COLORS.light
                }}
            >
                {withSeconds ? 
                    `${days} Days : ${hours} Hrs : ${minutes} Mins : ${seconds} Secs` :
                    `${days} Days : ${hours} Hours : ${minutes} Minutes`
                }
            </Text>
        </View>
    )
}

export default Timer;