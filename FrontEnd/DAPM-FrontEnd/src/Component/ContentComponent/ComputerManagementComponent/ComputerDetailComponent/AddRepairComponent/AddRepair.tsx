import React, { useState } from 'react';
import './AddRepair.css';
import type { AddRepairFormProps } from 'src/Types/interface';

const AddRepairForm: React.FC<AddRepairFormProps> = ({ onClose, onSubmit, initialData }) => {

    const formatDate = (dateStr: string | undefined): string => {
        if (!dateStr) return '';
        return dateStr.split('T')[0];
    };

    const [formData, setFormData] = useState({
        updateDate: formatDate(initialData?.updateDate) || '',
        errorName: initialData?.errorName || '',
        occurredDate: formatDate(initialData?.occurredDate) || '',
        repairedBy: initialData?.repairedBy || '',
        status: initialData?.status || '',
        notes: initialData?.notes || ''
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
                <h3>{initialData ? "Cập nhật lịch sử sửa chữa" : "Thêm lịch sử sửa chữa"}</h3>
                <form onSubmit={handleSubmit} className="maintenance-form">
                    <label>
                        Ngày xảy ra:
                        <input
                            type="date"
                            name="occurredDate"
                            value={formData.occurredDate}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Tên lỗi:
                        <input
                            type="text"
                            name="errorName"
                            value={formData.errorName}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Ngày sửa:
                        <input
                            type="date"
                            name="updateDate"
                            value={formData.updateDate}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Người sửa:
                        <input
                            type="text"
                            name="repairedBy"
                            value={formData.repairedBy}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Trạng thái:
                        <input
                            type="text"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Ghi chú:
                        <input
                            type="text"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
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


export default AddRepairForm;