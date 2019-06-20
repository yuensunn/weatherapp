
import React, { useRef, useEffect } from 'react'
import { Text, View, StyleSheet, Animated } from 'react-native'
import EStyleSeet from 'react-native-extended-stylesheet'

export default ({
    message,
    messageStyle,
    containerStyle
}) => {

    const animated = useRef(new Animated.Value(0))
    useEffect(() => {
        if (message) {
            Animated.timing(animated.current, {
                toValue: 1,
                duration: 1000

            }).start(() => {
                Animated.timing(animated.current, {
                    toValue: 0,
                    delay: 1000,
                    duration: 1000
                }).start()
            })
        }
    }, [message])

    return (
        <Animated.View
            pointerEvents="none"
            style={[styles.container, containerStyle, {
                opacity: animated.current,
            }]}
        >
            <Text style={StyleSheet.flatten([styles.message, messageStyle])}>{message}</Text>
        </Animated.View>
    )
}

const styles = EStyleSeet.create({
    container: {
        position: "absolute",
        bottom: "20%",
        marginHorizontal: 'auto',
        backgroundColor: "#0008",
        alignSelf: 'center',
        padding: "10rem",
        borderRadius: "20rem",
        minWidth: "50%",
    },
    message: {
        fontSize: "12rem",
        color: "#fff",
        alignSelf: "center",
        fontFamily: '$fontFamily',
    }
})