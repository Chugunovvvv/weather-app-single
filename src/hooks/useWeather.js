import { useState } from 'react'
import cloudy from '../images/mainly_cloudy.svg'
import rain from '../images/rain.svg'
import smallRain from '../images/small_rain.svg'
import smallRainSun from '../images/small_rain_sun.svg'
import sun from '../images/sun.svg'
import axios from 'axios'


export const useWeather = () => {
    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const [data, setData] = useState({
        temperature: 10,
        name: 'Moscow',
        humidity: 10,
        wind: 2,
        image: cloudy
    })

    const handleClick = () => {
        if(name !== '') {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=18114b0092fddb8ac514d9f1cd645e6c&units=metric`
            axios.get(apiUrl)
            .then(res => {
                console.log(res.data)
                let imagePath = ''
                const infoWeather = res.data.weather[0].main
                if (infoWeather === 'Rain') {
                    imagePath = rain
                } else if (infoWeather === 'Clear') {
                    imagePath = sun
                } else if (infoWeather === 'Clouds') {
                    imagePath = cloudy
                } else if (infoWeather === 'Drizzle') {
                    imagePath = smallRain
                } else if (infoWeather === 'Mist') {
                    imagePath = smallRainSun
                } else {
                    imagePath = cloudy
                }
                console.log(imagePath)


                setData({...data, temperature: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, wind: res.data.wind.speed, image: imagePath}) 
                setError('')
            })
            .catch(err => {
                if(err.response.status === 404) {
                    setError('Введите корректное название города')
                } else {
                    setError('')
                }
                
                console.log(err)})
        }
    }

    return {handleClick, name, data, error, setError, setData, setName }
}