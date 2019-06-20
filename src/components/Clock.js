import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import moment from 'moment'
export default ({
    format,
    updateRate = 1000,
    style,
    ...rest
}) => {

    const dateFormat = format ? format : "ddd, DD MMM YYYY hh:mm A"
    const [date, setDate] = useState(moment())
    useEffect(() => {
        let timer = setInterval(() => {
            setDate(moment())
        }, updateRate)
        return () => {
            clearInterval(timer)
        }
    }, [])
    return (
        <Text
            style={StyleSheet.flatten([styles.text, style])}
            {...rest}
        >
            {date.format(dateFormat)}
        </Text>
    )
}
const styles = EStyleSheet.create({
    text: {
        fontFamily: '$fontFamily',
        textAlign: "center",
        fontSize: "18rem",
        fontWeight: 'bold',
        color: "$primaryTextColor"
    }
})
