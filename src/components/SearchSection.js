import React, { useState } from 'react'

const SearchSection = (props) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = () => {
        props.submitHandler(keyword)
    }

  return (
    <div className="search-section">
    <h2 style={{ color:'white' }}>Search Arcticles using Keywords.</h2>
      <div className="searchBox">
        <input type="text" placeholder="Enter keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)}></input>
        <button onClick={submitHandler}>Submit</button>
        </div>
        
    </div>
  )
}

export default SearchSection