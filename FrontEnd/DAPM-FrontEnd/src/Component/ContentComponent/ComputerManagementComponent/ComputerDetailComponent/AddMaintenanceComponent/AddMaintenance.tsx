import React, { useState } from 'react';
import './AddMaintenance.css';
import type { AddMaintenanceFormProps } from 'src/Types/interface';

const AddMaintenanceForm: React.FC<AddMaintenanceFormProps> = ({ onClose, onSubmit, initialData }) => {

    const formatDate = (dateStr: string | undefined): string => {
        if (!dateStr) return '';
        return dateStr.split('T')[0];
    };
    const [formData, setFormData] = useState({
        maintenanceDate: formatDate(initialData?.maintenanceDate) || '',
        maintainedBy: initialData?.maintainedBy || '',
        content: initialData?.content || '',
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
                <h3>{initialData ? "Cập nhật lịch sử bảo trì" : "Thêm lịch sử bảo trì"}</h3>
                <form onSubmit={handleSubmit} className="maintenance-form">
                    <label>
                        Ngày bảo trì:
                        <input
                            type="date"
                            name="maintenanceDate"
                            value={formData.maintenanceDate}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Người bảo trì:
                        <input
                            type="text"
                            name="maintainedBy"
                            value={formData.maintainedBy}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Nội dung:
                        <input
                            type="text"
                            name="content"
                            value={formData.content}
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

export default AddMaintenanceForm;
