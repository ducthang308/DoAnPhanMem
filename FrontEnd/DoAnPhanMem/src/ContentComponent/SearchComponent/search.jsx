import React from 'react'
import "./index.css"

const search = () => {
  return (
    <div class="search-add">
        <div class="search-box">
            <input type="text" placeholder="Tìm kiếm"/>
            <button class="button-search"><i class="fas fa-search"></i></button>
        </div>
    </div>
  )
}

export default search