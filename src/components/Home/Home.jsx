import React from 'react'
import './Home.scss'
import humidity from '../../images/humidity.png'
import wind from '../../images/wind.png'

import { useWeather } from '../../hooks/useWeather'
const Home = () => {
    const today = new Date();
    const now = today.toLocaleDateString('en-US');
    const {handleClick, data, error, setName} = useWeather()

  return (
    <div className="container">
     
        <div className="weather">
        <div className="date">
            <p>Сегодня:</p>
            <div className="date__now">
            {now}
            </div>
           
        </div>
            <div className="search">
                <input type="text" placeholder='Введите город' onChange={e => setName(e.target.value)}/>
                <button onClick={handleClick}>Поиск</button>
            </div>
            <div className="error">
                <p>{error}</p>
            </div>
            <div className="info">
                <img src={data.image} alt="cloudy" className='info__image'/>
                <h1>{Math.round(data.temperature)}°C</h1>
                <h2>{data.name}</h2>
                <div className="details">
                    <div className="wrap">
                        <img src={humidity} alt="humidity" />
                        <div className="wrap__info">
                            <p className='wrap__info-title'>{Math.round(data.humidity)}%</p>
                            <p>Влажность</p>
                        </div>
                    </div>
                    <div className="wrap">
                        <img src={wind} alt="wind" />
                        <div className="wrap__info">
                            <p className='wrap__info-title'>{Math.round(data.wind)} км/ч</p>
                            <p>Ветер</p>
                        </div>
                    </div>
            
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home