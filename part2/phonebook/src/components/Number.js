const Number = ({id, name, number, handleDelete}) => {
    return (
        <>
        <li key={id}>
            {name} - {number} 
            <button onClick={() => handleDelete(id)}>
                Delete
            </button>
        </li>
        </>
        
    )
}

export { Number };