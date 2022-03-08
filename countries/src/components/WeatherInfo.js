import axios from "axios"
import { useEffect, useState } from "react"
import { Image, Part } from "./Country.js"

const WeatherInfo = ({capital}) => {
    const [capitalData, setCapitalData] = useState({})

    const searchableCapital = capital => capital.split(' ').join('%20')

    const api_key = process.env.REACT_APP_API_KEY
    // variable api_key has now the value set in startup
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchableCapital(capital)}&appid=${api_key}`
    //console.log(apiUrl)
    const searchHook = () => {
        axios
            .get(apiUrl)
            .then(response => {
                //console.log(response.data)
                setCapitalData(response.data)
            })
            .catch(err => console.log(err))
    }
    useEffect(searchHook, [apiUrl])

    return (
        <div>
            <h4>{`Weather in ${capital}`}</h4>
            {
                 (Object.keys(capitalData).length>0)
                 ? <>
                     <Part name='temperature' value={`${(capitalData.main.temp-273.15).toFixed(2)} Celsius`}/>
                     <Image imgSrc={`https://openweathermap.org/img/wn/${capitalData.weather[0].icon}@2x.png`} id={capitalData.temp}/>
                     <Part name='wind' value={capitalData.wind.speed+' m/s'}/>
                 </>
                 : <h4>Loading Weather Info...</h4>
            }
        </div>
    )
}

export default WeatherInfo;