import React from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { 
    COLORS,
    FONTS,
    dummyData,
    SIZES
} from '../../../constants';

const ServiceTab = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={dummyData.services}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => (
                    <View style={styles.cardContainer}>
                        <Shadow 
                            distance={SIZES.padding}
                            offset={[0, 16]}
                            startColor={COLORS.shadow08}
                        >
                            <View style={styles.card}>
                                <View style={styles.cardLeftContent}>
                                    <Text 
                                        style={{
                                            ...FONTS.h3,
                                            fontSize: 19,
                                            lineHeight: 32,
                                            color: COLORS.dark,
                                        }}
                                    >
                                        {item.title}
                                    </Text>

                                    <Text 
                                        style={{
                                            ...FONTS.body5,
                                            color: COLORS.grey,
                                            minHeight: FONTS.body5.lineHeight * 2,
                                            marginBottom: SIZES.base
                                        }}
                                    >
                                        {item.description}
                                    </Text>

                                    <Text 
                                        style={{
                                            ...FONTS.h4,
                                            color: COLORS.primary
                                        }}
                                    >
                                        {item.price}
                                    </Text>
                                </View>

                                <View style={styles.cardRightContent}>
                                    <Image
                                        source={item.image}
                                        style={{
                                            height: 70,
                                            width: 70,
                                        }}
                                    />
                                </View>
                            </View>
                        </Shadow>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGrey
    },
    cardContainer: {
        marginHorizontal: SIZES.margin, 
        marginVertical: SIZES.base
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexShrink: 1,
        width: SIZES.width - (SIZES.margin * 2),
        borderRadius: 16,
        padding: SIZES.margin,
        backgroundColor: COLORS.light
    },
    cardLeftContent: {
        flexShrink: 1, 
        marginRight: SIZES.margin
    },
    cardRightContent: {
        alignSelf: 'center'
    }
});

export default ServiceTab;