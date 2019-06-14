import React, { Component } from 'react'
import { Text, View } from 'react-native'
import WeatherTile from '../components/WeatherTile'
import EStyleSheet from 'react-native-extended-stylesheet'
export class Home extends Component {

    static navigationOptions = {
        title: 'Home',
    };


    render() {
        return (
            <View style={styles.container}>
                <WeatherTile
                    date={"11 Jan 2017"}
                />
            </View>
        )
    }
}

export default Home

const styles = EStyleSheet.create({
    container: {
        flex: 1
    }
})
