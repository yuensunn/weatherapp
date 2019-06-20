# WeatherApp

My attempt at building a location based weather application with `react-native-cli`

## Setting Up

### Running the Release Version
Download `app-release.apk` in the repository root folder to test.
### Running in Debug Mode
openweather api key is stored in a `.env` file which is not included in the repository. Go to `./src/api/Weather.js` and replace `Config.OPENWEATHER_API_KEY` with your own openweather api key
```js
// ./src/api/Weather.js line 4
const contructParams = (params) => ({ ...params, appid: Config.OPENWEATHER_API_KEY })
```

## Features / Summary

### Get Current Weather
-	Load current user location
-	fetch `api.openweathermap.org/data/2.5/weather` to retrieve current weather information.

### Forecast Upcoming Weather
-	Use existing user location
-	fetch `api.openweathermap.org/data/2.5/forecast` to retrieve weather forecast for 5 upcoming days with data every 3 hours 

### App Theming
![](https://imgur.com/Jpv1aqmm.jpg) ![](https://imgur.com/WtcMrB6m.jpg) ![](https://imgur.com/vrEclHbm.jpg)

Allow user to change predefined **themes** and **custom fonts** on the fly.

### Forecast History
Sync forecast data into local storage via **SQLite**. Allow user to view history data

### Resolution Support

##### Portrait
| ![](https://imgur.com/hwzt5ei.jpg)  |	![](https://imgur.com/I7y9MHw.jpg)	|![](https://imgur.com/GVOsKCa.jpg)|
|:---:|:---:|:---:|
| 5.5 inch 16x9  | 6.1 inch 19x9 | 8.9inch 4x3 |

##### Landscape
| ![](https://imgur.com/TYH7OlN.jpg)  |	![](https://i.imgur.com/Squc2LH.jpg)	|![](https://imgur.com/3W7TtzR.jpg)|
|:---:|:---:|:---:|
| 5.5 inch 16x9  | 6.1 inch 19x9 | 8.9inch 4x3 |

`react-native-extended-stylesheet` package is used to ensure multiple resolution support. `rem` unit is used to size UI elements instead of `pixel` unit. `rem` unit is calculated with `aspect fit` calculation 
```js
// 340 width 640 height as baseline screen size
export const REM = (width / height > 340 / 640 ? height / 640 : width / 340);
```

## Notes
This app is tested only on android devices. It might not work properly on IOS devices

