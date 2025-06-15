import React, { useState } from "react";
import "./ComputerEdit.css";
import type { AddComputerFormProps } from "src/Types/interface";
import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons";
import { generatePath } from "react-router";

const AddComputerForm: React.FC<AddComputerFormProps> = ({ onClose, onSubmit, initialData }) => {
    const formatDate = (dateStr: string | undefined): string => {
        if (!dateStr) return '';
        return dateStr.split('T')[0];
    };

    const [formData, setFormData] = useState({
        roomId: Number(initialData?.roomId || 1),
        computerName: initialData?.computerName || '',
        operatingSystem: initialData?.operatingSystem || '',
        versions: initialData?.versions || '',
        mac: initialData?.mac || '',
        ipv4: initialData?.ipv4 || '',
        ram: initialData?.ram || '',
        rom: initialData?.rom || '',
        cpu: initialData?.cpu || '',
        gpu: initialData?.gpu || '',
        usageDate: formatDate(initialData?.usageDate) || ''
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
                <form onSubmit={handleSubmit} className="maintenance-form">
                    <h2>{initialData ? "Thêm máy tính" : "Cập nhật máy tính"}</h2>

                    <div className="edit-grid">
                        <label>
                            Ngày hoạt động:
                            <input type="date" name="usageDate" value={formData.usageDate.split("T")[0]} onChange={handleChange} />
                        </label>
                        <label>
                            Tên máy:
                            <input type="text" name="computerName" value={formData.computerName} onChange={handleChange} />
                        </label>
                        <label>
                            Hệ điều hành:
                            <input type="text" name="operatingSystem" value={formData.operatingSystem} onChange={handleChange} />
                        </label>
                        <label>
                            Phiên bản:
                            <input type="text" name="versions" value={formData.versions} onChange={handleChange} />
                        </label>
                        <label>
                            Địa chỉ MAC:
                            <input type="text" name="mac" value={formData.mac} onChange={handleChange} />
                        </label>
                        <label>
                            Địa chỉ IP:
                            <input type="text" name="ipv4" value={formData.ipv4} onChange={handleChange} />
                        </label>
                        <label>
                            RAM:
                            <input type="text" name="ram" value={formData.ram} onChange={handleChange} />
                        </label>
                        <label>
                            CPU:
                            <input type="text" name="cpu" value={formData.cpu} onChange={handleChange} />
                        </label>
                        <label>
                            Ổ cứng:
                            <input type="text" name="rom" value={formData.rom} onChange={handleChange} />
                        </label>
                        <label>
                            GPU:
                            <input type="text" name="gpu" value={formData.gpu} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="save-button">Lưu</button>
                        <button type="button" className="close-button" onClick={onClose}>Hủy</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddComputerForm;
