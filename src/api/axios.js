
import axios from 'axios'

const globalAxios = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    params: {
        appid: "c46ee4c6ba8010dae936dc7f4ed056fe"
    },
    timeout: 5000
});


export default globalAxios


