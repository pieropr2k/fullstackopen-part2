const Filter = ({filterValue, onChange}) => {
    return (
        <div>
          filter shown with 
          <input 
            value={filterValue}
            onChange={onChange}
          />
        </div>
    )
}

export default Filter;