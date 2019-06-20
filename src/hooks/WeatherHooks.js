
import React, { useState, useEffect } from 'react'
import { WeatherAPI } from '../api'
import Permissions from 'react-native-permissions'

const defaultOptions = {
    positionOptions: {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 3000
    },
    units: "Metric"
}

/**
 * custom hook to 
 * - check location permission
 * - get location
 */
export const useLocation = () => {
    const [location, setLocation] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [hasPermission, setHasPermission] = useState(false)
    useEffect(() => {
        load()
    }, [hasPermission])

    function load() {
        setError(null)
        setLoading(true)
        if (!hasPermission) {
            Permissions.check(["location"])
                .then(status => setHasPermission(status === "authorized") || status)
                .then(status => {
                    if (status !== "authorized")
                        return Permissions.request("location")
                })
                .then(status => {
                    if (status !== "authorized")
                        setError(new Error("Check location permission"))
                    else setHasPermission(true)
                })
        } else {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setLocation(position)
                    setError(null)
                    setLoading(false)
                },
                error => {
                    setLocation({})
                    setError(error)
                    setLoading(false)
                },
                defaultOptions.positionOptions
            )
        }
    }
    return [location, loading, error, load]
}

/**
 * get current weather status with openapi from given location
 * @param {float} latitude 
 * @param {float} longitude 
 */
export const useCurrentWeather = (latitude, longitude) => {
    const [loading, setLoading] = useState(false)
    const [info, setInfo] = useState({})
    const [error, setError] = useState(null)

    useEffect(() => {
        load()
    }, [latitude, longitude])

    function load() {
        if (latitude && longitude) {
            setLoading(true)
            WeatherAPI.currentWeather({
                lon: longitude,
                lat: latitude,
                units: defaultOptions.units
            })
                .then(({ data }) => setInfo(data))
                .catch(e => setError(e))
                .then(() => setLoading(false))
        }
    }

    return [info, loading, error, load]
}

/**
 * get 5 day 3 hour weather forecast with openapi from given location
 * @param {float} latitude 
 * @param {float} longitude 
 */
export const useFiveDaysForecast = (latitude, longitude) => {
    const [loading, setLoading] = useState(false)
    const [info, setInfo] = useState({})
    const [error, setError] = useState(null)

    // load five days forecast when latitude / longitude changes
    useEffect(() => {
        load()
    }, [latitude, longitude])

    function load() {
        if (latitude && longitude)
            WeatherAPI.fiveDayThreeHourForecast({
                lon: longitude,
                lat: latitude,
                units: defaultOptions.units
            })
                .then(({ data }) => setInfo(data))
                .catch(e => setError(e))
                .then(() => setLoading(false))

    }
    return [info, loading, error, load]
}