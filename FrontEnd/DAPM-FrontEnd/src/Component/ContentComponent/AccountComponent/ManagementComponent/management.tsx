import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../../assets/images/logo.png';
import AddButton from '../../../ButtonComponent/add.tsx';
import Search from '../../../SearchComponent/search.tsx';
import { getUser } from '../../../../Services/AccountManagement.ts';
import UpdateAccount from '../UpdateAccountComponent/account';
import type { IUser } from '../../../../Types/interface.ts';
import './index.css';

const Management: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const data = await getUser(); // Giả định getUser() trả về Promise<IUser[]>
      console.log(data);
      setUsers(data);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateClick = () => {
    setShowUpdate(true);
    navigate('/add-account');
  };

  return (
    <div className="container-account">
      <Search />
      <AddButton onClick={() => navigate('/add-account')} />

      <div className="management">
        <div className="container-management">
          <h2 className="title">Danh sách tài khoản người dùng</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>Ảnh</th>
              <th>Mã người dùng</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index}>
                  <td>{user.fullName}</td>
                  <td><img src={Logo} alt="Ảnh người dùng" /></td>
                  <td>{user.email}</td>
                  <td>{user.roles.roleName}</td>
                  <td className={`active ${user.status ? 'active-green' : 'inactive-red'}`}>
                    {user.status ? 'Hoạt động' : 'Bị khóa'}
                  </td>
                  <td className="actions">
                    <i className="fas fa-pen edit" onClick={handleUpdateClick}></i>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={6}>Không có dữ liệu người dùng</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {showUpdate && <UpdateAccount />}
    </div>
  );
};

export default Management;
