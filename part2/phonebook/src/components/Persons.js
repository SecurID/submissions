import { Number } from './Number'

const Persons = ({personsToShow, handleDelete}) => {
    return (
        <ul>
        {
            personsToShow.map( (element) =>
                <Number 
                id={element.id} 
                name={element.name} 
                number={element.number} 
                handleDelete={handleDelete} 
                />
            )
        }
        </ul>
    )
}

export { Persons };