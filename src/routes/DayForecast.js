import React, { useEffect, useMemo } from 'react'
import DayWeatherTile from '../components/DayWeatherTile'
import { View, FlatList, } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import moment from 'moment'


export const DayForecast = ({ navigation }) => {

    const { list, day } = navigation.getParam("dayForecasts")
    const formatedList = useMemo(() => {
        return list.map(x => ({
            time: moment.unix(x.dt).format("h:mm A"),
            temperature: Math.round(x.main.temp),
            status: x.weather[0].description
        }))
    }, [list])

    useEffect(() => {

        navigation.setParams({ title: day })
    }, [day])
    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={() => null}
                keyExtractor={(item, index) => index.toString()}
                data={formatedList}
                renderItem={({ item }) => (
                    <DayWeatherTile
                        date={item.time}
                        temperature={item.temperature}
                        status={item.status}
                    />
                )}
                ItemSeparatorComponent={() => <View style={styles.seperator} />}
            />

        </View>
    )
}

DayForecast.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("title", ""),
    headerTitleStyle: EStyleSheet.value("$fontFamily"),
    headerStyle: {
        backgroundColor: EStyleSheet.value("$primaryColor"),
    },
    headerTitleStyle: EStyleSheet.value("$fontFamily"),
    headerTintColor: EStyleSheet.value("$backgroundColor"),
})


export default DayForecast


const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"$backgroundColor"
    },
    seperator: {
        height: "0.5rem",
        backgroundColor: "$secondaryTextColor"
    }
})



