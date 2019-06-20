
import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import EStyleSeet from 'react-native-extended-stylesheet'
import Icon from 'react-native-vector-icons/Entypo';

export default ({
    date,
    temperature,
    status,
    containerStyle,
    dateStyle,
    children
}) => {
    return (
        <View style={StyleSheet.flatten([styles.container, containerStyle])}>
            <Text style={StyleSheet.flatten([styles.date, dateStyle])}>{date}</Text>
            <Text style={StyleSheet.flatten([styles.temperature, dateStyle])}>{temperature}°C</Text>
            <Text style={StyleSheet.flatten([styles.temperature, dateStyle])}>{status}</Text>
            {children}
        </View>
    )
}

const styles = EStyleSeet.create({
    container: {
        height: "80rem",
        padding: "10rem",
        justifyContent: 'center',
        paddingHorizontal: "20rem",
    },
    columnContainer: {
        flex: 1
    },
    date: {
        fontFamily: '$fontFamily',
        color: "$primaryTextColor",
        fontWeight: 'bold',
        fontSize: "14rem",
    },
    temperature: {
        fontFamily: '$fontFamily',
        color: "$primaryTextColor",
        fontSize: "12rem",
    },
    status: {
        fontFamily: '$fontFamily',
        fontSize: "14rem",
        color: "$secondaryTextColor"
    },
    icon: {
        alignSelf: "center"
    }
})