
import React, { useCallback, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import EStyleSeet from 'react-native-extended-stylesheet'
import Icon from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal'

export default ({
    title,
    placeholder,
    selections = [],
    renderItem = (item, index) => null,
    TouchableComponent = TouchableOpacity,
    containerStyle,
    titleStyle,
    selectionTextStyle
}) => {
    const [visible, setVisible] = useState(false)
    const close = useCallback(() => { setVisible(false) })
    return (
        <View style={StyleSheet.flatten([styles.container, containerStyle])}>
            <Text style={StyleSheet.flatten([styles.titleStyle, titleStyle])}>{title}</Text>
            <TouchableComponent onPress={() => {
                setVisible(true)
            }} activeOpacity={0.5} >
                <View style={styles.selectionContainer}>
                    <Text style={StyleSheet.flatten([styles.selectionText, selectionTextStyle])}>{placeholder}</Text>
                    <Icon name="chevron-small-down" size={EStyleSeet.value("24rem")} color={EStyleSeet.value("$primaryColor")} style={styles.icon} />
                </View>
            </TouchableComponent>

            <Modal
                animationIn="slideInUp"
                animationOut="slideOutDown"
                style={styles.modal}
                isVisible={visible} onBackdropPress={() => { setVisible(false) }}>
                <ScrollView style={styles.scrollviewContainer}>
                    {selections && selections.map((item, index) => renderItem(item, index, close))}
                </ScrollView>
            </Modal>
        </View >
    )
}

const styles = EStyleSeet.create({
    container: {
        padding: "20rem",
    },
    titleStyle: {
        fontFamily: '$fontFamily',
        color: "$primaryTextColor",
        fontWeight: 'bold',
        fontSize: "13rem",
        height: "25rem",
        paddingHorizontal: "5rem"
    },
    selectionContainer: {
        backgroundColor: `${EStyleSeet.value("$secondaryTextColor")}50`,
        borderRadius: "20rem",
        flexDirection: 'row',
        height: "40rem",
        alignItems: 'center',
        paddingHorizontal: "20rem",
    },
    selectionText: {
        fontFamily: '$fontFamily',
        color: "$primaryTextColor",
        fontSize: "12rem",
        flex: 1
    },
    icon: {
        alignSelf: "center"
    },
    modal: {
        justifyContent: "flex-end",
        margin: 0
    },
    scrollviewContainer: {
        backgroundColor: "$backgroundColor",
        maxHeight: "40%",
        flexGrow: 0
    }
})