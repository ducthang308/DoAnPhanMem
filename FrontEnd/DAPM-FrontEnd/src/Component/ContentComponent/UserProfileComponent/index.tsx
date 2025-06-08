import React, { useState } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const enableEdit = () => {
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };
  const handleChangePassClick = () => {
    navigate('/schedule/changepass');
  };

  return (
    <div className="profile-container">
      <h2>Thông tin cá nhân</h2>
      <form className="profile-form">
        <label htmlFor="full_name">Họ và tên:</label>
        <input
          type="text"
          id="full_name"
          name="full_name"
          defaultValue="Nguyễn Văn A"
        />

        <label htmlFor="phone_number">Số điện thoại:</label>
        <input
          type="text"
          id="phone_number"
          name="phone_number"
          defaultValue="0123456789"
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue="email@example.com"
        />

        <label htmlFor="address">Địa chỉ:</label>
        <input
          type="text"
          id="address"
          name="address"
          defaultValue="123 Đường ABC, Quận XYZ"
        />

        <div className="button-group">
          <button type="button" className="btn change-password-btn" onClick={handleChangePassClick}>Đổi mật khẩu</button>
          <button type="button" className="btn save-btn">Lưu</button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
