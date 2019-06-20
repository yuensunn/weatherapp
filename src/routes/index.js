
import React, { Component } from 'react'
import Home from './Home'
import DayForecast from './DayForecast'
import Appearance from './Appearance'
import History from './History'
import { createStackNavigator, createAppContainer, createDrawerNavigator } from "react-navigation";
import EStyleSheet from 'react-native-extended-stylesheet'
import { Icon } from '../components'

const defaultOptions = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: EStyleSheet.value("$primaryColor"),
            textAlign: "center"
        },
        headerTitleStyle: EStyleSheet.value("$fontFamily"),
        headerTintColor: EStyleSheet.value("$backgroundColor"),
    }

}

const HistoryStackNavigator = createStackNavigator({
    History: {
        screen: History
    },
}, {
        headerLayoutPreset: 'center',
        initialRouteName: "History",
        defaultNavigationOptions: defaultOptions.defaultNavigationOptions,
    });

const HomeStackNavigator = createStackNavigator({
    Home: {
        screen: Home
    },
    DayForecast: {
        screen: DayForecast
    }
}, {
        headerLayoutPreset: 'center',
        initialRouteName: "Home",
        defaultNavigationOptions: defaultOptions.defaultNavigationOptions,
    });

const AppearanceStackNavigator = createStackNavigator({
    Appearance: {
        screen: Appearance
    }
}, {
        headerTitleStyle: EStyleSheet.value("$fontFamily"),
        headerLayoutPreset: 'center',
        initialRouteName: "Appearance",
        defaultNavigationOptions: defaultOptions.defaultNavigationOptions,
    });


const DrawerNavigator = createDrawerNavigator({
    HomeStack: {
        screen: HomeStackNavigator,
        navigationOptions: {
            drawerLabel: 'Home',
            drawerIcon: () => (
                <Icon
                    name="home"
                    color={EStyleSheet.value("$secondaryTextColor")}
                />
            )
        },
    },
    AppearanceStack: {
        screen: AppearanceStackNavigator,
        navigationOptions: {
            drawerLabel: 'Appearance',
            drawerIcon: () => (
                <Icon
                    name="brush"
                    color={EStyleSheet.value("$secondaryTextColor")}
                />
            )
        },
    }
    ,
    HistoryStack: {
        screen: HistoryStackNavigator,
        navigationOptions: {
            drawerLabel: 'History',
            drawerIcon: () => (
                <Icon
                    name="open-book"
                    color={EStyleSheet.value("$secondaryTextColor")}
                />
            )
        },
    }
}, {
        drawerType: "slide",
        initialRouteName: "HomeStack",
        contentOptions: {
            labelStyle: {
                color: EStyleSheet.value("$primaryColor"),
                fontFamily: EStyleSheet.value("$fontFamily")
            }
        },
        drawerBackgroundColor: EStyleSheet.value("$backgroundColor")
    })

export default createAppContainer(DrawerNavigator);