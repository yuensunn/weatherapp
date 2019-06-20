/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react';
import AppNavigator from './src/routes'
import { Theme, ThemeContext, REM } from './src/constants'
import { useThemeSetter } from './src/hooks'



export default () => {

  const [state, setState] = useState({
    theme: "Default Palette",
    reload: true
  })

  useThemeSetter(() => { setState(state) })


  useEffect(() => {
    if (state.reload) setState({ ...state, reload: false })
  }, [state.reload])


  return (
    <ThemeContext.Provider value={{
      state: state, setState: () => {
        setState({ reload: true })
      }
    }}>
      {!state.reload ? < AppNavigator /> : null}
    </ThemeContext.Provider>
  )

}


