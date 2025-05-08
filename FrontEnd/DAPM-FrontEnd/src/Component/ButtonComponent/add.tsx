import React from 'react';
import './index.css';
import type { AddButtonProps } from '../../Types/interface';

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <button className="add-button" onClick={onClick}>
      <i className="fas fa-user-plus"></i> Thêm
    </button>
  );
};

export default AddButton;
