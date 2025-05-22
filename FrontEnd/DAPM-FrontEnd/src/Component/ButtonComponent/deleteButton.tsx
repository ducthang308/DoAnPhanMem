import React from 'react'
import "./index.css"
import type { DeleteButtonProps } from '../../Types/interface';

const deleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <button className="delete-button" onClick={onClick}>
      <i className="fas fa-user-plus"></i> Xóa
    </button>
  )
}

export default deleteButton