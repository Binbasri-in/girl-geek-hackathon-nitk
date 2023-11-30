import React from 'react';
import {
    View,
    Text,
    FlatList,
    ScrollView,
    StyleSheet
} from 'react-native';
import {
    VictoryAxis,
    VictoryBar,
    VictoryChart
} from 'victory-native';
import { FilterBar } from '../../../components';
import { 
    COLORS,
    FONTS,
    SIZES,
    dummyData
} from '../../../constants';

const ChartTab = () => {

    const [selectedItem, setSelectedItem] = React.useState("This Week")
    const [selectedDay, setSelectedDay] = React.useState("")
    const [totalSpending, setTotalSpending] = React.useState(0)

    React.useEffect(() => {
        if (selectedDay == "") {
            // Calculate total spending
            let total = dummyData.chartData.reduce((a, b) => a + b.y, 0)

            setTotalSpending(total)
        }
    }, [selectedDay])

    return (
        <ScrollView 
            style={styles.container} 
            contentContainerStyle={{
                paddingVertical: 16,
                paddingHorizontal: SIZES.margin
            }}
        >
            {/* Filter Bar */}
            <FilterBar
                selectedItem={selectedItem}
                rightComponentLabel='Report'
            />

            {/* Total Spending Bar Chart */}
            <View
                style={{
                    backgroundColor: COLORS.light,
                    borderRadius: 16,
                    padding: SIZES.margin,
                    marginBottom: 16
                }}
            >
                <Text
                    style={{
                        ...FONTS.h4,
                        color: COLORS.dark,
                        marginBottom: SIZES.base
                    }}
                >
                    Total time
                </Text>

                <Text
                    style={{
                        ...FONTS.h1,
                        color: COLORS.primary
                    }}
                >
                   51 hrs
                </Text>

                <VictoryChart
                    padding={SIZES.margin}
                    width={SIZES.width - (SIZES.margin * 4)}
                >
                    <VictoryAxis
                        style={{
                            axis: { stroke: "transparent" },
                            tickLabels: { 
                                fontSize: 10, 
                                color: COLORS.dark 
                            } 
                        }}
                    />

                    <VictoryBar
                        animate={{ duration: 500 }}
                        barRatio={0.8}
                        cornerRadius={{
                            top: SIZES.base,
                            bottom: SIZES.base
                        }}
                        style={{ 
                            data: { 
                                fill: ({ datum }) => datum.x === selectedDay ? COLORS.primary : COLORS.grey20
                            } 
                        }}
                        data={dummyData.chartData}
                        events={[{
                            target: "data",
                            eventHandlers: {
                                onPressIn: (event, data) => {
                                    setSelectedDay(selectedDay != data.datum.x ? data.datum.x : "")
                                    setTotalSpending(selectedDay != data.datum.x ? data.datum.y : 0)
                                }
                            }
                        }]}
                    />
                </VictoryChart>
            </View>

            {/* List of Orders */}
            <FlatList
                data={dummyData.orders}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => (
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: SIZES.margin,
                            marginBottom: 16,
                            borderRadius: 16,
                            backgroundColor: COLORS.light
                        }}
                    >
                        <View>
                            <Text
                                style={{
                                    ...FONTS.h4,
                                    color: COLORS.dark,
                                    marginBottom: 4
                                }}
                            >
                                {`Task No #${item.order_no}`}
                            </Text>

                            <Text
                                style={{
                                    ...FONTS.body5,
                                    color: COLORS.grey
                                }}
                            >
                                {item.date}
                            </Text>
                        </View>

                        <View>
                            <Text
                                style={{
                                    ...FONTS.h3,
                                    color: COLORS.primary
                                }}
                            >
                                {item.total} hrs
                            </Text>
                        </View>
                    </View>
                )}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGrey
    },
})

export default ChartTab;