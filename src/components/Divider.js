
import React from 'react'
import { View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
export default ({ height = 20, width = 0 }) => (
    <View
        style={{
            height: EStyleSheet.value(`${height}rem`),
            width: EStyleSheet.value(`${width}rem`)
        }}
    />
)