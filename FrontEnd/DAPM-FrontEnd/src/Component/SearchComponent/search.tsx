import React from 'react'
import "./index.css"

const search = () => {
  return (
    <div className="search-add">
      <div className="search-box">
        <input type="text" placeholder="Tìm kiếm" />
        <button className="button-search"><i className="fas fa-search"></i></button>
      </div>
    </div>
  )
}

export default search