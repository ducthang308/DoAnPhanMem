import React from 'react';
import "./index.css";
import type { UpdateButtonProps } from '../../Types/interface';

const UpdateButton: React.FC<UpdateButtonProps> = ({ onClick }) => {
  return (
    <button className="update-button" onClick={onClick}>
      <i className="fas fa-user-plus"></i> Cập nhật
    </button>

  )
}

export default UpdateButton