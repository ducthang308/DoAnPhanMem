import React from 'react'
import "./index.css"
import Logo from "/src/assets/img/logo.png"
import AddButton from "../../ButtonComponent/add.jsx"
import Search from "../../SearchComponent/search.jsx"
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
        <Search></Search>
        
        <div className="management">
          <div className="container-management">
            <h2 class="title">Danh sách tài khoản người dùng</h2>
            <AddButton></AddButton>
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