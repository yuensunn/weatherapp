import React, { useEffect, useMemo } from 'react'
import { View, FlatList } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { WeatherTile, MainWeatherTile, Icon, EmptyList, ErrorMessage } from '../components'
import { useCurrentWeather, useLocation, useFiveDaysForecast, useEditWeatherHistory } from '../hooks'
import moment from 'moment';
import { Theme, REM } from '../constants/Theme'

EStyleSheet.build({
    ...Theme["Default Palette"],
    $fontFamily: "Raleway",
    $rem: REM
});

export const Home = ({ navigation }) => {

    // get current location
    const [{ coords }, locationLoading, locationError, loadLocation] = useLocation()

    // load current weather based on location
    const [weather, weatherLoading, weatherError, loadCurrentWeather] = useCurrentWeather(coords ?.latitude, coords ?.longitude)

    // load forecast weather based on location
    const [forecast, forecastLoading, forecastError, loadForecast] = useFiveDaysForecast(coords ?.latitude, coords ?.longitude)

    // convert 5 days 3 hour forecast data to desired format
    const sectionedForecast = useMemo(() => {

        // https://openweathermap.org/forecast5
        // group giant list of data into days
        let groups = forecast ?.list ?.reduce((prev, cur) => {
            let day = cur ?.dt_txt ?.split(" ")[0]
            if (prev[day]) prev[day].push(cur)
            else prev[day] = []
            return prev
        }, {})

        // extract min temp, max temp, weather type for each group 
        return groups && Object.keys(groups).map(day => {
            let minTemp = groups[day].reduce((prev, cur) => prev < cur.main.temp ? prev : cur.main.temp, 1000)
            let maxTemp = groups[day].reduce((prev, cur) => prev > cur.main.temp ? prev : cur.main.temp, -1000)
            let weathers = Object.keys(groups[day].reduce((prev, cur) => {
                prev[cur.weather[0].main] = true
                return prev
            }, {}))
            return {
                day: moment(day, "YYYY-MM-DD").format("DD MMM YYYY, ddd"),
                minTemp: Math.round(minTemp),
                maxTemp: Math.round(maxTemp),
                weathers: weathers.join(" , "),
                list: groups[day]
            }
        }).filter(x => x.list.length > 0)
    }, [forecast])

    // Save weather when its loaded
    const [save] = useEditWeatherHistory()
    useEffect(() => {
        let city = weather ?.name
        let list = forecast ?.list
        if (city && list)
            save(forecast.list.map(x => [x.dt, city, x.weather[0].main, x.main.temp]))
    }, [forecast.list])

    // set navigation header
    useEffect(() => {
        let city = weather ?.name
        let country = weather ?.sys ?.country
        navigation.setParams({ title: `${city || ""} ${(country && city) ? "," : ""}${country || ""}` })
    }, [weather])

    return (
        <View style={styles.container}>
            <FlatList
                onRefresh={() => {
                    loadLocation()
                    loadCurrentWeather()
                    loadForecast()
                }}
                refreshing={forecastLoading}
                ListHeaderComponent={() => (<MainWeatherTile
                    loading={locationLoading || weatherLoading}
                    weather={weather ?.weather}
                    temperature={(weather ?.main ?.temp) ? `${Math.round(weather ?.main ?.temp)}°C` : ""}
                />
                )}
                keyExtractor={(item, index) => index.toString()}
                data={sectionedForecast ? sectionedForecast : []}
                ListEmptyComponent={() => <EmptyList />}
                renderItem={({ item }) => (
                    <WeatherTile
                        date={item.day}
                        minTemp={item.minTemp}
                        maxTemp={item.maxTemp}
                        status={item.weathers}
                        onPress={() => {
                            navigation.push("DayForecast", { dayForecasts: item })
                        }}
                    />
                )}
                ItemSeparatorComponent={() => <View style={styles.seperator} />}
            />
            <ErrorMessage message={locationError ?.message || weatherError ?.message || forecastError ?.message } />
        </View>
    )
}

Home.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("title", "Home"),
    headerLeft: (
        <Icon
            name="menu"
            onPress={() => { navigation.openDrawer() }}
            color={EStyleSheet.value("$backgroundColor")}
            style={styles.icon}
        />
    ),
    headerTitleStyle: EStyleSheet.value("$fontFamily"),
    headerStyle: {
        backgroundColor: EStyleSheet.value("$primaryColor"),
    },
    headerTitleStyle: EStyleSheet.value("$fontFamily"),
    headerTintColor: EStyleSheet.value("$backgroundColor"),
})


export default Home


const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "$backgroundColor"
    },
    seperator: {
        height: "0.5rem",
        backgroundColor: "$secondaryTextColor"
    },
    icon: {
        marginHorizontal: "10rem",
    }
})



