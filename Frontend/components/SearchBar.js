import React from 'react';
import {
    View,
    Text,
    TextInput
} from 'react-native';

import { FONTS, SIZES, COLORS } from "../constants"

const SearchBar = ({
    placeholderTextColor
}) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search"
                placeholderTextColor={placeholderTextColor}
            />
        </View>
    )
}

export default SearchBar;