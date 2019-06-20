
import React, { useState, useMemo, useCallback, useEffect, useContext } from 'react'
import { AsyncStorage } from 'react-native'
import { Theme, Font, ThemeContext, DB } from '../constants'
import EStyleSheet from 'react-native-extended-stylesheet'

const query = "INSERT OR REPLACE INTO history (Date, Location, Status,Temperature) VALUES(?,?,?,?) "

/**
 * load forecast history from sql database
 */
export const useLoadWeatherHistory = () => {
    const [histories, setHistories] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        load()
    }, [])

    const load = () => {
        setLoading(true)
        DB.transaction(tx => {
            tx.executeSql("SELECT * FROM history", [], (tx, res) => {
                let loadedHistories = []
                for (let index = 0; index < res.rows.length; index++) {
                    loadedHistories.push(res.rows.item(index))
                }
                setHistories(loadedHistories)
                setLoading(false)
            })
        })
    }
    return [histories, load, loading]
}

/**
 * save into / remove all from forecast history in sql database
 */
export const useEditWeatherHistory = () => {
    const save = useCallback((items) => {
        if (items.length > 0) {
            for (let index = 0; index < items.length; index++) {
                DB.transaction(makeTx(items[index]), e => console.log(e))
            }
        }
        function makeTx(val) {
            return function (tx) {
                tx.executeSql(query, val, (tx, res) => {
                    console.log(tx, res)
                }, (e) => {
                    console.log(e)
                })
            };
        }
    }, [])
    const remove = useCallback(() => {
        DB.transaction(tx => {
            tx.executeSql("DELETE FROM history", [], (tx, res) => {
                console.log(tx, res)
            }, (e) => {
                console.log(e)
            })
        }, e => console.log(e))
    }, [])
    return [save, remove]
}

/**
 * A not-so-graceful way to unmount and remount App component to refresh extended stylesheet variable
 * @param {Function} customSetState to override setter from ThemeContext
 */
export const useThemeSetter = (customSetState) => {

    const { savedTheme } = useCustomTheme()
    const { savedFont } = useCustomFont()
    const themeContext = useContext(ThemeContext)

    useEffect(() => {
        if (savedTheme && savedFont && customSetState) {
            EStyleSheet.build({
                $theme: `${savedTheme.title}-${savedFont}`,
                $fontFamily: savedFont,
                ...savedTheme.theme
            })
            customSetState()
        }
    }, [savedTheme, savedFont])
    return (theme, font) => {
        EStyleSheet.build({
            $theme: `${theme.title}-${font}`,
            $fontFamily: font,
            ...(theme.theme)
        })
        themeContext.setState({})
    }
}

/**
 * 
 * @param {string} key the key to save data as 
 * @param {boolean} parseFromJson automatically parse getItem value to JSON object
 */
export const useAsyncStorage = (key, parseFromJson) => {
    const [error, setError] = useState(null)
    const [value, setValue] = useState(null)
    useEffect(() => {
        AsyncStorage.getItem(key)
            .then(res => setValue(parseFromJson ? JSON.parse(res) : res))
            .then(() => setError(false))
            .catch(e => setError(e))
    }, [key])
    const save = useCallback(val => {
        AsyncStorage.setItem(key, val)
            .then(res => setError(false))
            .catch(e => setError(e))
    })
    return [value, save, error]
}


/**
 * load theme from / replace theme in  / save theme to async storage.
 */
export const useCustomTheme = () => {
    // load current saved selected theme
    const [saved, setSaved] = useAsyncStorage("@setting.theme", true)
    const [currentTheme, setCurrentTheme] = useState(saved)

    // convert themet to desired structure
    const themeOptions = useMemo(() => {
        return Object.keys(Theme).map(x => ({ title: x, colors: Object.values(Theme[x]), theme: Theme[x] }))
    }, [])

    // set initial theme loaded from async storate to current theme
    useEffect(() => {
        if (!currentTheme && saved)
            setCurrentTheme(saved)
    }, [saved])

    // save function
    const saveTheme = useCallback(() => {
        setSaved(JSON.stringify(currentTheme))
    }, [currentTheme])

    return {
        savedTheme: saved,
        currentTheme,
        setCurrentTheme,
        themeOptions,
        saveTheme
    }
}

/**
 * load font from / replace font in  / save font to async storage.
 */
export const useCustomFont = () => {

    // load current saved selected theme
    const [saved, setSaved] = useAsyncStorage("@setting.font", true)
    const [currentFont, setCurrentFont] = useState(saved)
    const fontOptions = useMemo(() => {
        return Object.keys(Font)
    }, [])

    // set initial font
    useEffect(() => {
        if (!currentFont && saved)
            setCurrentFont(saved)
    }, [saved])

    // save function
    const saveFont = useCallback(() => {
        setSaved(JSON.stringify(currentFont))
    }, [currentFont])

    return {
        savedFont: saved,
        currentFont,
        setCurrentFont,
        fontOptions,
        saveFont
    }
}