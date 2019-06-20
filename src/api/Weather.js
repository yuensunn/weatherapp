import axios from './axios'
import Config from 'react-native-config'
 
const contructParams = (params) => ({ ...params, appid: Config.OPENWEATHER_API_KEY })

const fiveDayThreeHourForecast = (params = { q, lat, lon }) => {
    return axios.get('/forecast', { params: contructParams(params) })
}
const currentWeather = (params = { q, lat, lon }) => {
    return axios.get('/weather', { params: contructParams(params) })
}
export {
    fiveDayThreeHourForecast,
    currentWeather
}