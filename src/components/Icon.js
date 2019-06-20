
import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import EStyleSeet from 'react-native-extended-stylesheet'
import Icon from 'react-native-vector-icons/Entypo';

export default ({
    name,
    color,
    size = 24,
    style,
    onPress,
}) => {
    let s = EStyleSeet.value(`${size}rem`)
    return (
        <TouchableOpacity onPress={onPress} style={StyleSheet.flatten([styles.container, { height: s, width: s, ...style }])}>
            <Icon
                name={name}
                color={color}
                size={s}
                style={styles.icon}
            />
        </TouchableOpacity>
    )
}

const styles = EStyleSeet.create({
    container: {
        alignContent: "center",
        justifyContent: "center"
    }
})