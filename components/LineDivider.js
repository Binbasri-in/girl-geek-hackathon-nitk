import React from "react";
import {
    View
} from 'react-native';
import {
    COLORS
} from "../constants";

const LineDivider = ({
    linestyle,
    vertical = false
}) => {
    return (
        <View
            style={{
                backgroundColor: COLORS.dark08,
                height: vertical ? '100%' : 1,
                width: vertical ? 1 : '100%',
                ...linestyle
            }}
        />
    )
}

export default LineDivider;