const PersonForm = (props) => {
    const {addUser, inputValues, eventHandlers} = props
    return (
        <form onSubmit={addUser}>
            <div>
            name: <input 
                value={inputValues.newName}
                onChange={eventHandlers.handleNameChange}
            />
            </div>
            <div>
            number: <input 
                value={inputValues.newNumber}
                onChange={eventHandlers.handleNumberChange}
            />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm;