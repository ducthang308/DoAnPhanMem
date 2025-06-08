import React, { useEffect, useState } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../../Component/HeaderComponent';
import Footer from '../../../Component/FooterComponent';
import type { IUser } from '../../../Types/interface';
import type { UpdateProfile } from '../../../Types/interface';

import { getUserById, updateProfile } from '../../../Services/AccountManagement';

const UserProfile = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [formData, setFormData] = useState<Partial<IUser>>({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        console.error('Không tìm thấy user trong localStorage');
        setLoading(false);
        return;
      }

      try {
        const userObj = JSON.parse(userStr);
        const userId = userObj.id; // Lấy id từ object user
        if (!userId) {
          console.error('user_id không tồn tại trong dữ liệu user');
          setLoading(false);
          return;
        }

        const userData = await getUserById(userId);
        setUser(userData);
        setFormData({
          fullName: userData.fullName,
          phoneNumber: userData.phoneNumber,
          email: userData.email,
          address: userData.address,
        });
      } catch (error) {
        console.error('Lỗi khi load thông tin người dùng:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!user || !formData) return;

    try {
      const payload: UpdateProfile = {
        fullName: formData.fullName ?? '',
        phoneNumber: formData.phoneNumber ?? '',
        email: formData.email ?? '',
        address: formData.address ?? ''
      };

      await updateProfile(user.id, payload);
      setUser({ ...user, ...payload });
      setFormData({ ...formData, ...payload });
      setIsEditing(false);
      alert("Cập nhật thành công!");
    } catch (error) {
      alert("Lỗi cập nhật thông tin");
      console.error(error);
    }
  };


  const handleChangePassClick = () => {
    navigate('/schedule/changepass');
  };

  if (loading) return <p>Đang tải...</p>;
  if (!user) return <p>Không tìm thấy người dùng</p>;

  return (
    <>
      <Header />
      <div className="profile-container">
        <h2>Thông tin cá nhân</h2>
        <form className="profile-form">
          <label htmlFor="full_name">Họ và tên:</label>
          <input
            type="text"
            id="full_name"
            name="fullName"
            value={formData.fullName || ''}
            disabled={!isEditing}
            onChange={handleChange}
          />

          <label htmlFor="phone_number">Số điện thoại:</label>
          <input
            type="text"
            id="phone_number"
            name="phoneNumber"
            value={formData.phoneNumber || ''}
            disabled={!isEditing}
            onChange={handleChange}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ''}
            disabled={!isEditing}
            onChange={handleChange}
          />

          <label htmlFor="address">Địa chỉ:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address || ''}
            disabled={!isEditing}
            onChange={handleChange}
          />

          <div className="button-group">
            <button type="button" className="btn change-password-btn" onClick={handleChangePassClick}>
              Đổi mật khẩu
            </button>
            {!isEditing ? (
              <button type="button" className="btn save-btn" onClick={() => setIsEditing(true)}>
                Chỉnh sửa
              </button>
            ) : (
              <>
                <button type="button" className="btn save-btn" onClick={handleSave}>
                  Lưu
                </button>
                <button type="button" className="btn cancel-btn" onClick={() => {
                  setIsEditing(false);
                  setFormData(user); // khôi phục lại dữ liệu gốc
                }}>
                  Hủy
                </button>
              </>
            )}
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
