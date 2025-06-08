import React from 'react'
import "./index.css"
import type { SearchProps } from '../../Types/interface';

const search: React.FC<SearchProps> = ({ value, onChange }) => {
  return (
    <div className="search-add">
      <div className="search-box">
        <input type="text" value={value} placeholder="Tìm kiếm" onChange={e => onChange(e.target.value)} />
        <button className="button-search"><i className="fas fa-search"></i></button>
      </div>
    </div>
  )
}

export default search