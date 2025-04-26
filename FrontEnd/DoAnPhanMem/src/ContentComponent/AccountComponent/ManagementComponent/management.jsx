import React from 'react'
import "./index.css"
import Logo from "/src/assets/img/logo.png"
const users = [
    {
      name: "Nguyễn Huyền Thương",
      avatar: Logo,
      userId: "22115053122347",
      role: "Sinh viên",
      status: "Hoạt động",
    },
    {
      name: "Nguyễn Huyền Thương",
      avatar: Logo,
      userId: "22115053122347",
      role: "Sinh viên",
      status: "Hoạt động",
    },
    {
      name: "Nguyễn Huyền Thương",
      avatar: Logo,
      userId: "22115053122347",
      role: "Sinh viên",
      status: "Hoạt động",
    },
    // Thêm các người dùng khác vào đây
  ];
  

const management = () => {
  return (
    <div class="container-account">
        <div class="search-add">
            <div class="search-box">
            <input type="text" placeholder="Tìm kiếm"/>
            <button><i class="fas fa-search"></i></button>
            </div>
            <button class="add-button"><i class="fas fa-user-plus"></i> Thêm</button>
        </div>
        
        <div className="management">
            <h2>Danh sách tài khoản người dùng</h2>
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
                {users.map((user, index) => (
                    <tr key={index}>
                    <td>{user.name}</td>
                    <td><img src={user.avatar} alt="Ảnh người dùng" /></td>
                    <td>{user.userId}</td>
                    <td>{user.role}</td>
                    <td className="active">{user.status}</td>
                    <td className="actions">
                        <i className="fas fa-pen edit"></i>
                        <i className="fas fa-trash delete"></i>
                        <i className="fas fa-lock lock"></i>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default management