import React, { useState, useMemo, useContext, useCallback, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Icon } from '../components'
import DropDown from '../components/DropDown'
import { useCustomTheme, useCustomFont, useThemeSetter } from '../hooks'

const ThemeSelection = ({ title, colors = [], onPress, textStyle }) =>
    (
        <TouchableOpacity onPress={onPress} style={styles.themeContainer}>
            <Text style={StyleSheet.flatten([styles.themeTitle, textStyle])}>{title}</Text>
            {colors.map((x, i) => <View key={i} style={StyleSheet.flatten([styles.themeColorbox, { backgroundColor: x }])} />)}
        </TouchableOpacity>
    )

export const Appearance = ({ navigation }) => {


    const set = useThemeSetter();
    const { savedTheme, currentTheme, setCurrentTheme, themeOptions, saveTheme } = useCustomTheme()
    const { savedFont, currentFont, setCurrentFont, fontOptions, saveFont } = useCustomFont()

    useEffect(() => {
        navigation.setParams({
            onSave: () => {

                if (currentTheme.title !== savedTheme ?.title || currentFont !== savedFont) {
                    saveFont()
                    saveTheme();
                    //reload app
                    set(currentTheme, currentFont)
                }
            }
        })
    }, [currentTheme, currentFont])

    return (
        <View style={styles.container}>
            <DropDown
                title="Theme"
                placeholder={currentTheme ?.title}
                selections={themeOptions}
                renderItem={(item, index, close) => (
                    <ThemeSelection
                        key={index}
                        onPress={() => {
                            setCurrentTheme(item)
                            close()
                        }}
                        {...item}
                    />
                )}
            />
            <DropDown
                title="Font"
                placeholder={currentFont}
                selections={fontOptions}
                renderItem={(item, index, close) => (
                    <ThemeSelection
                        key={index}
                        onPress={() => {
                            setCurrentFont(item)
                            close()
                        }}
                        textStyle={{ fontFamily: item }}
                        title={item}
                    />
                )} />
        </View>
    )
}

export default Appearance
Appearance.navigationOptions = ({ navigation }) => ({
    title: "Appearance",
    headerLeft: (
        <Icon
            name="menu"
            onPress={() => { navigation.openDrawer() }}
            color={EStyleSheet.value("$backgroundColor")}
            style={styles.icon}
        />
    ),
    headerRight: (
        <Icon
            name="save"
            onPress={navigation.getParam("onSave")}
            color={EStyleSheet.value("$backgroundColor")}
            style={styles.icon}
        />
    ),
    headerTitleStyle: EStyleSheet.value("$fontFamily"),
    headerStyle: {
        backgroundColor: EStyleSheet.value("$primaryColor"),
    },
    headerTitleStyle: EStyleSheet.value("$fontFamily"),
    headerTintColor: EStyleSheet.value("$backgroundColor"),
})

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "$backgroundColor",
    },
    seperator: {
        fontFamily: '$fontFamily',
        height: "0.5rem",
        backgroundColor: "$secondaryTextColor"
    },
    icon: {
        marginHorizontal: '10rem',
    },
    themeContainer: {
        flexDirection: 'row',
        height: "60rem",
        alignItems: 'center',
        paddingHorizontal: "20rem",
    },
    themeTitle: {
        fontFamily: '$fontFamily',
        flex: 1,
        color: "$primaryTextColor"
    },
    themeColorbox: {
        height: "20rem",
        width: "20rem",
        marginHorizontal: "5rem",
        borderColor: "$primaryColor",
        borderWidth: "1rem",
    }
})



