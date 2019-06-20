import React from 'react'
import { Dimensions } from 'react-native'
let width = Dimensions.get("window").width
let height = Dimensions.get("window").height

export const REM = (width / height > 340 / 640 ? height / 640 : width / 340);

export const Theme = {
    "Default Palette": {
        $primaryColor: '#ED4334',
        $backgroundColor: '#fff',
        $primaryTextColor: '#000',
        $secondaryTextColor: '#B8B8B8',
        $rem: REM
    },
    "Palette Two": {
        $primaryColor: '#E63946',
        $backgroundColor: '#F1FAEE',
        $primaryTextColor: '#1D3557',
        $secondaryTextColor: '#457B9D',
        $rem: REM
    },
    "Dark": {
        $primaryColor: '#FCA311',
        $backgroundColor: '#14213D',
        $primaryTextColor: '#FFFFFF',
        $secondaryTextColor: '#E5E5E5',
        $rem: REM
    }
}

export const Font = {
    Default: "Default",
    Inconsolata: "Inconsolata",
    Raleway: "Raleway",
    Roboto: "Roboto"
}
export const ThemeContext = React.createContext(Theme["Default Palette"])
