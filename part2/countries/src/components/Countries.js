import { Country } from './Country'
import { CountryDetail } from './CountryDetail'

const Countries = ({countriesToShow, setFilter}) => {
    if (countriesToShow.length > 10) {
        return (
            <p>Please type more characters</p>
        )
    }
    else if (countriesToShow.length < 10 && countriesToShow.length > 1) {
        return (
            <ul>
            {
                countriesToShow.map( (element) => 
                    <Country name={element.name.common} setFilter={setFilter} />
                )
            }
        </ul>
        )
    } else {
        return (<>
            {
                countriesToShow.map( (element) => 
                    <CountryDetail 
                    country={element}
                    />
                )
            }</>
        )
    }
}

export { Countries };