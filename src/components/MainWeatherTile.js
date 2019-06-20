
import React from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import Clock from './Clock'
import Divider from './Divider'
import EStyleSheet from 'react-native-extended-stylesheet'
export default ({ weather = [], temperature, loading }) => {
    return (
        <View style={styles.container}>
            <Clock />
            {loading &&
                <ActivityIndicator
                    style={styles.loadingIndicator}
                    color={EStyleSheet.value("$primaryColor")}
                    size={"large"} />}
            {!loading &&
                <View>
                    <Divider height={10} />
                    <Text style={styles.temperatureText}>{temperature}</Text>
                    <Divider height={10} />
                    <View style={styles.weatherContainer}>
                        {weather.map((item, index) => (
                            <Text style={styles.weatherText} key={index}>{item ?.main}</Text>
                        ))}
                    </View>
                </View>}
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        paddingVertical: "20rem"
    },
    temperatureText: {
        fontFamily: '$fontFamily',
        color: "$primaryTextColor",
        fontSize: "40rem",
        textAlign: "center",
    },
    weatherContainer: {
        flexDirection: 'row',
    },
    weatherText: {
        fontFamily: '$fontFamily',
        color: "$secondaryTextColor",
        flex: 1,
        fontSize: "18rem",
        textAlign: "center",
    },
    loadingIndicator: {
        height: "90rem",
        alignSelf: 'center',
    }
})