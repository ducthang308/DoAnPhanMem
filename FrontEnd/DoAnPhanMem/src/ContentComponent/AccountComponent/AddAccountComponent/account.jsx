import React from 'react'
import "./index.css"

const account = () => {
  return (
    <div class="content-main">
        <div class="form-container">
            <h2>Thêm tài khoản người dùng</h2>
            <form class="form-account">
                <div class="form-group">
                    <label for="fullname">Họ tên:</label>
                    <input type="text" id="fullname" placeholder="Nhập họ và tên:"/>
                </div>

                <div class="form-group">
                    <label for="username">Mã người dùng:</label>
                    <input type="text" id="username" placeholder="Nhập mã người dùng:"/>
                </div>

                <div class="form-group">
                    <label for="role">Vai trò:</label>
                    <select id="role">
                        <option value="sinhvien">Sinh viên</option>
                        <option value="giaovien">Giáo viên</option>
                        <option value="admin">Quản trị viên</option>
                    </select>
                </div>

                <div class="form-group status-group">
                    <label>Trạng thái:</label>
                    <label><input type="radio" name="status" value="active" checked/> Hoạt động</label>
                    <label><input type="radio" name="status" value="locked"/> Khóa</label>
                </div>

                <div class="form-group center">
                    <button type="submit" class="button-submit">Lưu</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default account