
import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import EStyleSeet from 'react-native-extended-stylesheet'
import Icon from 'react-native-vector-icons/Entypo';


export default ({
    date,
    minTemp,
    maxTemp,
    status,
    onPress = () => { },
    TouchableComponent = TouchableOpacity,
    touchableProps,
    containerStyle,
    dateStyle,
    tempStyle,
    statusStyle
}) => {
    return (
        <TouchableComponent onPress={onPress} activeOpacity={0.5} {...touchableProps}>
            <View style={StyleSheet.flatten([styles.container, containerStyle])}>
                <View style={styles.columnContainer}>
                    <Text style={StyleSheet.flatten([styles.date, dateStyle])}>{date}</Text>
                    <Text style={StyleSheet.flatten([styles.temperature, tempStyle])}>{minTemp}°C - {maxTemp}°C</Text>
                    <Text style={StyleSheet.flatten([styles.status, statusStyle])}>{status}</Text>
                </View>
                <Icon name="chevron-small-right" size={EStyleSeet.value("24rem")} color={EStyleSeet.value("$primaryColor")} style={styles.icon} />
            </View>
        </TouchableComponent>
    )
}

const styles = EStyleSeet.create({
    container: {
        flexDirection: 'row',
        height: "80rem",
        padding: "10rem",
        paddingHorizontal: "20rem",
    },
    columnContainer: {
        flex: 1
    },
    date: {
        fontFamily: '$fontFamily',
        color: "$primaryTextColor",
        fontWeight: 'bold',
        fontSize: "12rem",
    },
    temperature: {
        fontFamily: '$fontFamily',
        color: "$primaryTextColor",
        fontSize: "12rem",
    },
    status: {
        fontFamily: '$fontFamily',
        color: "$secondaryTextColor",
        fontSize: "12rem",
    },
    icon: {
        alignSelf: "center"
    }
})