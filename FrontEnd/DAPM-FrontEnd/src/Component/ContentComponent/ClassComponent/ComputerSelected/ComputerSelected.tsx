import React, { useState, useEffect, DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS } from "react";
import { useNavigate } from 'react-router-dom';
import "./ComputerSelected.css"
import { getComputerById, getMaintenanceByComputerID, updateMaintenanceHistory, deleteMaintenanceHistory, getRepairByComputerID, createRepairHistory, deleteRepairHistory, updateRepairHistory, getSoftwareByComputerID, createSoftwareHistory, updateSoftwareHistory, deleteSoftwareHistory, updateComputer, deleteComputer, startComputer, stopComputer } from "../../../../Services/ComputerService";
import { IComputer, IComputerDTO, IMaintenanceDTO, IMaintenanceHistory, IRepairDTO, IRepairHistory, ISoftwareDTO, ISoftwareHistory, IUsageComputer } from "src/Types/interface";
import { createMaintenanceHistory } from "../../../../Services/ComputerService";

const ComputerSelected = () => {

    const [computer, setComputer] = useState<IComputer>();
    const [usageComputer, setUsageComputer] = useState<IUsageComputer>();
    const [maintenaces, setMaintenances] = useState<IMaintenanceHistory[]>([]);
    const urlParams = new URLSearchParams(window.location.search);
    const id = Number(urlParams.get('id'));

    const fetchData = async (id) => {
        try {
            const computer = await getComputerById(id);
            setComputer(computer);
        } catch (error: any) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        fetchData(id);
    }, []);

    const navigate = useNavigate();

    const [isStarted, setIsStarted] = useState(false);

    const handleStartComputer = async (id: number) => {
        const usageComputer = await startComputer(id);
        setUsageComputer(usageComputer);
        console.log("Start computer", id);
        setIsStarted(true);
    };

    const handleStopComputer = async (id: number) => {
        const usageComputer = await stopComputer(id);
        setUsageComputer(usageComputer);
        console.log("Stop computer", id);
        setIsStarted(false);
    };


    return (
        <div className="computer-detail">
            <h2>Máy đã chọn</h2>
            {/* <div className="info-header">
                <div>Phòng <span className="info-box">B201</span></div>
                <div>Máy <span className="info-box">05</span></div>
            </div> */}
            <div className="table-label">
                <h3>Thông tin chung</h3>
                {/* <button type="button" onClick={() => handleDeleteComputer(id)} className="start-button">Bắt đầu</button> */}
                <button
                    type="button"
                    onClick={() => isStarted ? handleStopComputer(Number(usageComputer?.id)) : handleStartComputer(id)}
                    className={isStarted ? "stop-button" : "start-button"}
                >
                    {isStarted ? "Dừng" : "Bắt đầu"}
                </button>
            </div>
            <div className="general-info">
                <div><strong>Ngày hoạt động:</strong>&emsp;{computer?.usageDate?.split("T")[0]}</div>
                <div><strong>Tên máy:</strong>&emsp;{computer?.computerName}</div>
                <div><strong>Hệ điều hành:</strong>&emsp;{computer?.operatingSystem}</div>
                <div><strong>Phiên bản:</strong>&emsp;{computer?.versions}</div>
                <div><strong>Địa chỉ MAC:</strong>&emsp;{computer?.mac}</div>
                <div><strong>Địa chỉ IP:</strong>&emsp;{computer?.ipv4}</div>
                <div><strong>RAM:</strong>&emsp;{computer?.ram}</div>
                <div><strong>CPU:</strong>&emsp;{computer?.cpu}</div>
                <div><strong>Ổ cứng:</strong>&emsp;{computer?.rom}</div>
                <div><strong>GPU:</strong>&emsp;{computer?.gpu}</div>
            </div>

            <table className="table-usage">
                <thead>
                    <tr>
                        <th>Ngày sử dụng</th>
                        <th>Người sử dụng</th>
                        <th>Giờ bắt đầu</th>
                        <th>Giờ kết thúc</th>
                        <th>Trạng thái</th>
                        <th>Ghi chú</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{usageComputer?.startAt.split("T")[0] || ''}</td>
                        <td>{usageComputer?.user.fullName || ''}</td>
                        <td>{usageComputer?.startAt.split("T")[1] || ''}</td>
                        <td>{usageComputer?.endAt ? usageComputer.endAt.split("T")[1] : ''}</td>
                        <td>{isStarted ? "Đang bật" : "Đang tắt"}</td>
                        <td>{usageComputer?.notes || ''}</td>
                    </tr>

                </tbody>
            </table>

        </div>
    );
};

export default ComputerSelected;
