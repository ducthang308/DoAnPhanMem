import React from 'react'
import "./index.css"

const account = () => {
  return (
    <div className="content-main">
        <div className="form-container">
            <h2>Thêm tài khoản người dùng</h2>
            <form className="form-account">
                <div className="form-group">
                    <label for="fullname">Họ tên:</label>
                    <input type="text" id="fullname" placeholder="Nhập họ và tên:"/>
                </div>

                <div className="form-group">
                    <label for="username">Mã người dùng:</label>
                    <input type="text" id="username" placeholder="Nhập mã người dùng:"/>
                </div>

                <div className="form-group">
                    <label for="role">Vai trò:</label>
                    <select id="role">
                        <option value="sinhvien">Sinh viên</option>
                        <option value="giaovien">Giáo viên</option>
                        <option value="admin">Quản trị viên</option>
                    </select>
                </div>

                <div className="form-group status-group">
                    <label>Trạng thái:</label>
                    <label><input type="radio" name="status" value="active" checked/> Hoạt động</label>
                    <label><input type="radio" name="status" value="locked"/> Khóa</label>
                </div>

                <div className="form-group center">
                    <button type="submit">Lưu</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default account