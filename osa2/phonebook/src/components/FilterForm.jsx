import React from 'react'

const Filter = ({searchName, handleNameSearch}) => {
    return(
        <p>filter shown with: <input 
            value={searchName} 
            onChange={handleNameSearch}/></p>
    )
}

export default Filter