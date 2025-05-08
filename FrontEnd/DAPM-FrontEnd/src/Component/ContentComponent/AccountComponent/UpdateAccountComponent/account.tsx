import React, { useState } from 'react';
import './index.css';

const Account: React.FC = () => {
    const [status, setStatus] = useState<'active' | 'locked'>('active');

    return (
        <div className="content-main">
            <div className="form-container">
                <h2>Thông tin tài khoản người dùng</h2>
                <form className="form-account">
                    <div className="form-group">
                        <label htmlFor="fullname">Họ tên:</label>
                        <input type="text" id="fullname" placeholder="" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Mã người dùng:</label>
                        <input type="text" id="username" placeholder="" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="role">Vai trò:</label>
                        <input type="text" id="role" placeholder="" />
                    </div>

                    <div className="form-group status-group">
                        <label>Trạng thái:</label>
                        <label>
                            <input
                                type="radio"
                                name="status"
                                value="active"
                                checked={status === 'active'}
                                onChange={() => setStatus('active')}
                            />
                            Hoạt động
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="status"
                                value="locked"
                                checked={status === 'locked'}
                                onChange={() => setStatus('locked')}
                            />
                            Khóa
                        </label>
                    </div>

                    <div className="form-group center">
                        <button type="submit" className="button-submit">Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Account;
