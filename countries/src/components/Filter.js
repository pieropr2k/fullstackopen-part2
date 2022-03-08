const Filter = ({filterValue, onChange}) => {
    return (
        <div>
          find countries <input 
            value={filterValue}
            onChange={onChange}
          />
        </div>
    )
}

export default Filter;