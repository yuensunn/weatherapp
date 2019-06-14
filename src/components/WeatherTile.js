
import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import EStyleSeet from 'react-native-extended-stylesheet'
import { COLOR } from '../constants'

export default ({
    date,
    degree,
    status,
    onPress = () => { },
    TouchableComponent = TouchableOpacity,
    touchableProps,
    containerStyle,
    dateStyle
}) => {
    return (
        <TouchableComponent onPress={onPress} activeOpacity={0.7} {...touchableProps}>
            <View style={StyleSheet.flatten([styles.container, containerStyle])}>
                <Text style={StyleSheet.flatten([styles.date, dateStyle])}>{date}</Text>
            </View>
        </TouchableComponent>
    )
}

const styles = EStyleSeet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUND_LIGHT
    },
    date: {
        color: COLOR.BLACK
    }
})