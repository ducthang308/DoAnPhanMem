import React, { useState } from 'react';
import './AddSoftware.css';
import type { AddRepairFormProps, AddSoftwareFormProps } from 'src/Types/interface';

const AddSoftwareForm: React.FC<AddSoftwareFormProps> = ({ onClose, onSubmit, initialData}) => {

    const formatDate = (dateStr: string | undefined): string => {
        if (!dateStr) return '';
        return dateStr.split('T')[0];
    };

    const [formData, setFormData] = useState({
        softwareName: initialData?.softwareName || '',
        installedVersion: initialData?.installedVersion || '',
        installDate: initialData?.installDate || '',
        installedBy: initialData?.installedBy || ''
    });

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="maintenance-form-container" onClick={stopPropagation}>
                <h3>{initialData ? "Cập nhật danh sách phần mềm" : "Thêm phần mềm"}</h3>
                <form onSubmit={handleSubmit} className="maintenance-form">
                    <label>
                        Tên phần mềm:
                        <input
                            type="text"
                            name="softwareName"
                            value={formData.softwareName}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Phiên bản:
                        <input
                            type="text"
                            name="installedVersion"
                            value={formData.installedVersion}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Ngày cài đặt:
                        <input
                            type="date"
                            name="installDate"
                            value={formData.installDate}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Người cài đặt:
                        <input
                            type="text"
                            name="installedBy"
                            value={formData.installedBy}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <div className="form-buttons">
                        <button type="submit" className="save-button">Lưu</button>
                        <button type="button" className="close-button" onClick={onClose}>Hủy</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default AddSoftwareForm;