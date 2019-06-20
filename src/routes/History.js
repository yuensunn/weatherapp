import React, { useEffect, useMemo } from 'react'
import { View, FlatList, Text } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Icon, DayWeatherTile, EmptyList } from '../components'
import moment from 'moment'
import { useLoadWeatherHistory, useEditWeatherHistory } from '../hooks'


export const History = ({ navigation }) => {

    const [histories, reload, loading] = useLoadWeatherHistory()
    const [, remove] = useEditWeatherHistory()

    useEffect(() => {
        navigation.setParams({
            onDelete: () => {
                remove()
                reload()
            }
        })
    }, [])

    return (
        <View style={styles.container} >
            <FlatList
                refreshing={loading}
                onRefresh={reload}
                keyExtractor={(item, index) => index.toString()}
                data={histories}
                contentContainerStyle={{ flex: histories.length > 0 ? 0 : 1 }}
                renderItem={({ item }) => (
                    <DayWeatherTile
                        date={moment.unix(item.Date).format("DD MMM YYYY, ddd - h:mm A")}
                        temperature={item.Temperature}
                        status={item.Status}
                    >
                        <Text style={styles.location}>{item.Location}</Text>
                    </DayWeatherTile>
                )}
                ListEmptyComponent={() => <EmptyList />}
                ItemSeparatorComponent={() => <View style={styles.seperator} />}
            />
        </View>
    )
}

History.navigationOptions = ({ navigation }) => ({
    title: "History",
    headerLeft: (
        <Icon
            name="menu"
            onPress={() => { navigation.openDrawer() }}
            color={EStyleSheet.value("$backgroundColor")}
            style={styles.icon}
        />
    ),
    headerRight: (
        <Icon
            name="trash"
            onPress={navigation.getParam("onDelete")}
            color={EStyleSheet.value("$backgroundColor")}
            style={styles.icon}
            size={20}
        />
    ),
    headerTitleStyle: EStyleSheet.value("$fontFamily"),
    headerStyle: {
        backgroundColor: EStyleSheet.value("$primaryColor"),
    },
    headerTitleStyle: EStyleSheet.value("$fontFamily"),
    headerTintColor: EStyleSheet.value("$backgroundColor"),
})


export default History


const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "$backgroundColor"
    },
    seperator: {
        height: "0.5rem",
        backgroundColor: "$secondaryTextColor"
    },
    location: {
        fontFamily: '$fontFamily',
        fontSize: "14rem",
        color: "$secondaryTextColor"
    },
    icon: {
        marginHorizontal: "10rem",
    }
})



