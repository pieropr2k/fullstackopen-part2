import { Country } from "./Country.js"

const Countries = ({countries, filterValue, handleShowInfo}) => {
    const someCountries = countries.filter(country => country.name.common.toLowerCase().includes(filterValue.toLowerCase()))
    //console.log(someCountries)
    if (filterValue==='') {
        return (<p>Start searching to run the app</p>)
    }
    if (someCountries.length===0) {
        return (<p>No matches, specify another filter</p>)
    } else if (someCountries.length===1) {
        return (
            <div>
                {<Country 
                    key={someCountries[0].cca3} 
                    country={someCountries[0]}
                    isSingle={true}
                    handleShowInfo={handleShowInfo}
                    />}
            </div>
        )
    } else if (someCountries.length>0 && someCountries.length<=10) {
        return (
            <div>
                {someCountries
                //.filter(person => person.name.common.toLowerCase().includes(filterValue.toLowerCase()))
                .map(country => <Country 
                    key={country.cca3} 
                    country={country}
                    isSingle={false}
                    handleShowInfo={handleShowInfo}
                    />)}
            </div>
        )
    } else if (someCountries.length>10) {
        return <p>Too many matches, specify another filter</p>
    }

}

export default Countries;