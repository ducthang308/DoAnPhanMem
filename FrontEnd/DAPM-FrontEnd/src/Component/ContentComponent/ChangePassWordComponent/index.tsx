import React, { useState } from 'react';
import './changepass.css'; 
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {

  return (
    <div className="profile-container">
      <h2>Đổi mật khẩu</h2>
      <form className="profile-form">
        <label htmlFor="old_password">Mật khẩu cũ:</label>
        <input
          type="password"
          id="old_password"
          name="old_password"
          placeholder="Nhập mật khẩu cũ"
        />

        <label htmlFor="new_password">Mật khẩu mới:</label>
        <input
          type="password"
          id="new_password"
          name="new_password"
          placeholder="Nhập mật khẩu mới"
        />

        <label htmlFor="confirm_password">Xác nhận mật khẩu mới:</label>
        <input
          type="password"
          id="confirm_password"
          name="confirm_password"
          placeholder="Xác nhận mật khẩu mới"
        />

        <div className="button-group">
          <button type="button" className="btn save-btn">Xác nhận</button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
