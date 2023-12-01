import React from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    COLORS,
    FONTS,
    SIZES,
    dummyData
} from '../../../constants';

const GeneralTab = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <FlatList
                data={dummyData.generalCategory}
                keyExtractor={item => `general-${item.id}`}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={{
                            backgroundColor: item.bg_color,
                            marginHorizontal: SIZES.padding,
                            marginBottom: 16,
                            borderRadius: 16,
                            overflow: 'hidden'
                        }}
                        onPress={() => {
                            navigation.navigate("SubCategory", { selectedCategory: item });
                        }}
                    >
                        <View
                            style={{
                                margin: SIZES.margin
                            }}
                        >
                            {/* Title */}
                            <Text
                                style={{
                                    ...FONTS.h1,
                                    fontSize: 24,
                                    lineHeight: 44,
                                    color: item.title_color
                                }}
                            >
                                {item.name}
                            </Text>

                            {/* Quantity */}
                            <Text
                                style={{
                                    ...FONTS.body4,
                                    color: COLORS.dark,
                                    marginBottom: 16
                                }}
                            >
                                {`${item.qty} products`}
                            </Text>

                            {/* Sub-category images */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                }}
                            >
                                {item.sub_images.map((item, index) => {
                                    return (
                                        <View
                                            key={`subImages-${index}`}
                                            style={{
                                                backgroundColor: COLORS.lightGrey,
                                                borderRadius: SIZES.radius,
                                                marginRight: 16,
                                                width: 48,
                                                height: 48,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            <Image
                                                source={item}
                                                resizeMode='contain'
                                                style={{
                                                    width: 44,
                                                    height: 44,
                                                }}
                                            />
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                            
                        {/* Category image */}
                        <View
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: SIZES.margin,
                                width: 110,
                                height: '80%',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                source={item.image}
                                style={{
                                    resizeMode: 'contain',
                                    height: '100%',
                                    aspectRatio: 1
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGrey
    }
})

export default GeneralTab;