import React from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
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

const CollectionTab = () => {

    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <FlatList
                style={{ marginHorizontal: SIZES.padding }}
                contentContainerStyle={{ flexDirection: 'column' }}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                data={dummyData.collectionCategory}
                keyExtractor={item => `collection-${item.id}`}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={{
                            marginBottom: 16,
                            marginRight: (index + 1) % 2 == 0 ? 0 : 16,
                            width: (SIZES.width - (SIZES.padding * 2) - 16) / 2,
                            alignItems: 'center'
                        }}
                        onPress={() => {
                            navigation.navigate("Favorite", { selectedCollection: item });
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: COLORS.light,
                                paddingVertical: SIZES.radius,
                                paddingHorizontal: 16,
                                marginBottom: 4,
                                borderRadius: 22,
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {item.images.map((item, index) => {
                                return (
                                    <View
                                        key={`image-${index}`}
                                        style={{
                                            marginRight: (index + 1) % 2 == 0 ? 0 : SIZES.base,
                                            marginVertical: 4,
                                            borderRadius: SIZES.base,
                                            width: 60,
                                            height: 60,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <Image
                                            source={item}
                                            resizeMode='contain'
                                            style={{
                                                width: 60,
                                                height: 60,
                                            }}
                                        />
                                    </View>
                                )
                            })}
                        </View>

                        <Text
                            style={{
                                ...FONTS.h5
                            }}
                        >
                            {item.name}
                        </Text>
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

export default CollectionTab;