
import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import EStyleSeet from 'react-native-extended-stylesheet'
import Icon from 'react-native-vector-icons/Entypo';

export default ({
    containerStyle,
    textStyle,

}) => {
    return (

        <View style={StyleSheet.flatten([styles.container, containerStyle])}>
            <Text style={StyleSheet.flatten([styles.text, textStyle])}>Empty Content{"\n"}Pull down to refresh</Text>
            <Icon name="chevron-small-down" size={EStyleSeet.value("24rem")} color={EStyleSeet.value("$primaryColor")} style={styles.icon} />
        </View>
    )
}

const styles = EStyleSeet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        fontFamily: '$fontFamily',
        color: "$secondaryTextColor",
        fontSize: "12rem",
        alignSelf: "center",
        textAlign:"center",
        lineHeight:"16rem"
    },
    icon: {
        alignSelf: "center"
    }
})