import React, { useState } from 'react'

export default function SearchBar() {
    const [inputValue,setInputValue] = useState("");
    
       function changeHandler(event){
             setInputValue(event.target.value);
       }
  return (
    <div>
        <div className='seachIcon'>
              <span>
                  <i className="fas fa-search"></i>
              </span>
              <input type='text' placeholder='search ' onChange={changeHandler} value={inputValue} />
             </div>
    </div>
  )
}
