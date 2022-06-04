const Country = ({name, setFilter}) => {

    const handleChange = () => {
        setFilter(name)
      }

    return (
    <>
    <li id={Math.random()*1000}>{name}</li><button onClick={handleChange}>show</button>
    
    </>
    )
}

export { Country };