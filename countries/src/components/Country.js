import WeatherInfo from "./WeatherInfo.js"

const Image = ({id, imgSrc}) => {
    return (
        <img alt={id} src={imgSrc}/>
    )
}

const Part = ({name, value}) => {
    return (
      <p>{`${name} ${value}`}</p>
    )
}
const Languages = ({langs}) => {
    //console.log(Object.keys(langs))
    return (
        <>
            <h4>languages:</h4>
            <ul>
                {
                    langs
                    ? Object.keys(langs).map(attr => 
                        <li key={attr}>{langs[attr]}</li>
                    )
                    : <p>Here doesn't speak nothing</p>
                }
            </ul>
        </>
        
    )
}

const CountryInfo = ({country}) => {
    const {capital, languages, area, cca3, flags} = country
    return (
        <>
            {
                capital 
                ? <Part name='capital' value={capital[0]}/> 
                : <p>There's no capital on this country</p>
            }
            <Part name='area' value={area}/>
            <Languages langs={languages}/>
            <Image id={cca3} imgSrc={flags.png}/>
        </>
    )
}

const Country = ({country, isSingle, handleShowInfo}) => {
    return (isSingle)
    ? (
        <>
            <h3>{country.name.common}</h3>
            <CountryInfo country={country}/>
            {
                country.capital
                ? <WeatherInfo capital={country.capital[0]}/>
                : <p>There's no capital</p>
            }
        </>
    )
    : (
        <>
            <div>
                {country.name.common}
                <button onClick={()=>handleShowInfo(country.name.common)}>show</button>
            </div>
        </>
    )
}

export {Country, Part, Image}