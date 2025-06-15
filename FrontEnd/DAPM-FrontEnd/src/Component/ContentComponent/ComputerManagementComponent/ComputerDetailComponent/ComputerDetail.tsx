import React, { useState, useEffect, DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS } from "react";
import { useNavigate } from 'react-router-dom';
import "./ComputerDetail.css"
import { getComputerById, getMaintenanceByComputerID, updateMaintenanceHistory, deleteMaintenanceHistory, getRepairByComputerID, createRepairHistory, deleteRepairHistory, updateRepairHistory, getSoftwareByComputerID, createSoftwareHistory, updateSoftwareHistory, deleteSoftwareHistory, updateComputer, deleteComputer } from "../../../../Services/ComputerService";
import { IComputer, IComputerDTO, IMaintenanceDTO, IMaintenanceHistory, IRepairDTO, IRepairHistory, ISoftwareDTO, ISoftwareHistory } from "src/Types/interface";
import { createMaintenanceHistory } from "../../../../Services/ComputerService";
import AddMaintenanceForm from "./AddMaintenanceComponent/AddMaintenance";
import DeleteButton from '../../../ButtonComponent/deleteButton'
import UpdateButton from "../../../ButtonComponent/update";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddRepairForm from "./AddRepairComponent/AddRepair";
import AddSoftwareForm from "./AddSoftwareComponent/AddSoftware";
import AddComputerForm from "../ComputerEditComponent/ComputerEdit";

const ComputerDetail = () => {

    const [computer, setComputer] = useState<IComputer>();
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

    const getMaintenance = async (id) => {
        try {
            const maintenaces = await getMaintenanceByComputerID(id);
            setMaintenances(maintenaces);
        } catch (error: any) {
            console.error(error.message);
        }
    }


    const [repaires, setRepaires] = useState<IRepairHistory[]>([]);
    const getRepair = async (id) => {
        try {
            const repaires = await getRepairByComputerID(id);
            setRepaires(repaires);
        } catch (error: any) {
            console.error(error.message);
        }
    };

    const [softwares, setSoftwares] = useState<ISoftwareHistory[]>([]);
    const getSoftware = async (id) => {
        try {
            const softwares = await getSoftwareByComputerID(id);
            setSoftwares(softwares);
        } catch (error: any) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        fetchData(id);
        getMaintenance(id);
        getRepair(id);
        getSoftware(id);
    }, []);

    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate("/home/computers/edit");
    };

    const [showAddMaintenanceForm, setShowAddMaintenanceForm] = useState(false);
    const [selectedMaintenance, setSelectedMaintenance] = useState<IMaintenanceHistory | null>(null);

    const handleAddMaintenance = async (maintenaceData: IMaintenanceDTO) => {
        try {
            const response = await createMaintenanceHistory(id, maintenaceData)
            alert("Thêm bảo trì thành công!");
            setShowAddMaintenanceForm(false);
            getMaintenance(id);
        } catch (error) {
            console.error(error);
            alert("Lỗi khi thêm lịch sử bảo trì!");
        }
    }

    const openAddForm = () => {
        setSelectedMaintenance(null);
        setShowAddMaintenanceForm(true);
    };

    const openEditForm = (maintenanceData: IMaintenanceHistory) => {
        setSelectedMaintenance(maintenanceData);
        setShowAddMaintenanceForm(true);
    };

    const handleUpdateMaintenanceHistory = async (maintenaceId: number, maintenaceData: IMaintenanceDTO) => {
        try {
            const response = await updateMaintenanceHistory(maintenaceId, maintenaceData)
            alert("Cập nhật bảo trì thành công!");
            setShowAddMaintenanceForm(false);
            getMaintenance(id);
        } catch (error) {
            console.error(error);
            alert("Lỗi khi cập nhật lịch sử bảo trì!");
        }
    };

    const handleDeleteMaintenanceHistory = async (maintenaceId: number) => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xoá mục này không?");
        if (!confirmed) return;
        try {
            const response = await deleteMaintenanceHistory(maintenaceId);
            getMaintenance(id);
        } catch (error) {
            console.error(error);
            alert("Lỗi khi xoá lịch sử bảo trì!");
        }
    };

    const [showAddRepairForm, setShowAddRepairForm] = useState(false);
    const [selectedRepair, setSelectedRepair] = useState<IRepairHistory | null>(null);

    const openAddRepairForm = () => {
        setSelectedRepair(null)
        setShowAddRepairForm(true)
    }

    const openEditRepairForm = (repairData: IRepairHistory) => {
        setSelectedRepair(repairData);
        setShowAddRepairForm(true);
    };

    const handleAddRepair = async (repair: IRepairDTO) => {
        try {
            const response = await createRepairHistory(id, repair)
            alert("Thêm lịch sử sửa chữa thành công!");
            setShowAddRepairForm(false);
            getRepair(id);
        } catch (error) {
            console.error(error);
            alert("Lỗi khi thêm lịch sử sửa chữa!");
        }
    };

    const handleUpdateRepair = async (repairId: number, repair: IRepairDTO) => {
        try {
            const response = await updateRepairHistory(repairId, repair);
            alert("Cập nhật sửa chữa thành công!");
            setShowAddRepairForm(false);
            getRepair(id);
        } catch (error) {
            console.error(error);
            alert("Lỗi khi cập nhật lịch sử sửa chữa!");
        }
    };

    const handleDeletRepair = async (repairId: number) => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xoá mục này không?");
        if (!confirmed) return;
        try {
            const response = await deleteRepairHistory(repairId);
            getRepair(id);
        } catch (error) {
            console.error(error);
            alert("Lỗi khi xoá lịch sử sửa chữa!");
        }
    }

    const [showAddSoftwareForm, setShowAddSoftwareForm] = useState(false);
    const [selectedSoftware, setSelectedSoftware] = useState<ISoftwareHistory | null>(null);

    const openAddSoftwareForm = () => {
        setSelectedSoftware(null)
        setShowAddSoftwareForm(true)
    }

    const openEditSoftwareForm = (softwareData: ISoftwareHistory) => {
        setSelectedSoftware(softwareData);
        setShowAddSoftwareForm(true);
    };

    const handleAddSoftware = async (software: ISoftwareDTO) => {
        try {
            const response = await createSoftwareHistory(id, software)
            alert("Thêm lịch sử phần mềm thành công!");
            setShowAddSoftwareForm(false);
            getSoftware(id);
        } catch (error) {
            console.error(error);
            alert("Lỗi khi thêm lịch sử phần mềm!");
        }
    }

    const handleUpdateSoftware = async (softwareId: number, software: ISoftwareDTO) => {
        try {
            const response = await updateSoftwareHistory(softwareId, software);
            alert("Cập nhật lịch sử phần mềm thành công!");
            setShowAddSoftwareForm(false);
            getSoftware(id);
        } catch (error) {
            console.error(error);
            alert("Lỗi khi thêm lịch sử phần mềm!");
        }
    }

    const handleDeleteSoftware = async (softwareId: number) => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xoá mục này không?");
        if (!confirmed) return;
        try {
            const response = await deleteSoftwareHistory(softwareId);
            getSoftware(id);
        } catch (error) {
            console.error(error);
            alert("Lỗi khi xoá lịch sử phần mềm!");
        }
    }

    const [showAddComputerForm, setShowAddComputerForm] = useState(false);
    const handleUpdateComputer = async (computerId: number, computer: IComputerDTO) => {
        try {
            const response = await updateComputer(computerId, computer);
            alert("Cập nhật máy tính thành công!");
            setShowAddComputerForm(false);
            fetchData(id);
        } catch (error) {
            console.error(error);
            alert("Lỗi khi cập nhật máy tính!");
        }
    }

    const handleDeleteComputer = async (computerId: number) => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xoá mục này không?");
        if (!confirmed) return;
        try {
            const response = await deleteComputer(computerId);
            navigate('/it-officer/computers');
        } catch (error) {
            console.error(error);
            alert("Lỗi khi xoá máy tính!");
        }
    }

    return (
        <div className="computer-detail">
            <h2>Quản lý máy tính</h2>
            {/* <div className="info-header">
                <div>Phòng <span className="info-box">B201</span></div>
                <div>Máy <span className="info-box">05</span></div>
            </div> */}
            <div className="table-label">
                <h3>Thông tin chung</h3>
                <button type="button" onClick={() => setShowAddComputerForm(true)} className="create-button">Cập nhật</button>
                <button type="button" onClick={() => handleDeleteComputer(id)} className="close-button">Xoá</button>
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

            <div className="table-label">
                <h3>Lịch sử cài đặt phần mềm</h3>
                <button type="button" onClick={() => openAddSoftwareForm()} className="create-button">+</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Tên phần mềm</th>
                        <th>Ngày cài đặt</th>
                        <th>Phiên bản</th>
                        <th>Người cài đặt</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {softwares.map(software => (
                        <tr>
                            <td>{software.softwareName}</td>
                            <td>{software.installDate.split("T")[0]}</td>
                            <td>{software.installedVersion}</td>
                            <td>{software.installedBy}</td>
                            <td>
                                <button
                                    className="edit-btn"
                                    onClick={() => openEditSoftwareForm(software)}
                                >
                                    <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#FFD43B" }} />
                                </button>
                                <button className="delete-btn" onClick={() => handleDeleteSoftware(software.id)}>
                                    <FontAwesomeIcon icon={faTrash} style={{ color: "#FF5C5C" }} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            <div className="table-label">
                <h3>Lịch sử sửa chữa</h3>
                <button type="button" onClick={() => openAddRepairForm()} className="create-button">+</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Ngày xảy ra</th>
                        <th>Tên lỗi</th>
                        <th>Ngày sửa</th>
                        <th>Người sửa</th>
                        <th>Trạng thái</th>
                        <th>Ghi chú</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {repaires.map(repair => (
                        <tr>
                            <td>{repair.occurredDate.split("T")[0]}</td>
                            <td>{repair.errorName}</td>
                            <td>{repair.updateDate.split("T")[0]}</td>
                            <td>{repair.repairedBy}</td>
                            <td>{repair.status}</td>
                            <td>{repair.notes}</td>
                            <td>
                                <button
                                    className="edit-btn"
                                    onClick={() => openEditRepairForm(repair)}
                                >
                                    <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#FFD43B" }} />
                                </button>
                                <button className="delete-btn" onClick={() => handleDeletRepair(repair.id)}>
                                    <FontAwesomeIcon icon={faTrash} style={{ color: "#FF5C5C" }} />
                                </button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>

            <div className="table-label">
                <h3>Lịch sử bảo trì</h3>
                <button type="button" onClick={() => openAddForm()} className="create-button">+</button>

            </div>
            <table>
                <thead>
                    <tr>
                        <th>Ngày bảo trì</th>
                        <th>Người bảo trì</th>
                        <th>Nội dung</th>
                        <th>Ghi chú</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {maintenaces.map(maintenace => (
                        <tr>
                            <td>{maintenace.maintenanceDate.split("T")[0]}</td>
                            <td>{maintenace.maintainedBy}</td>
                            <td>{maintenace.content}</td>
                            <td>{maintenace.notes}</td>
                            <td>
                                <button
                                    className="edit-btn"
                                    onClick={() => openEditForm(maintenace)}
                                >
                                    <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#FFD43B" }} />
                                </button>
                                <button className="delete-btn" onClick={() => handleDeleteMaintenanceHistory(maintenace.id)}>
                                    <FontAwesomeIcon icon={faTrash} style={{ color: "#FF5C5C" }} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {/* <tr>
                        <td>21/02/2020</td>
                        <td>Văn Công Tưởng</td>
                        <td>Vệ sinh, tra keo</td>
                        <td></td>
                    </tr> */}
                </tbody>
            </table>


            {/* <div className="table-label">
                <h3>Lịch sử người dùng</h3>
                <button type="button" onClick={handleClick} className="create-button">+</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Giờ hoạt động</th>
                        <th>Ngày hoạt động</th>
                        <th>Người sử dụng</th>
                        <th>Ghi chú</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>08:09:21</td>
                        <td>25/02/2019</td>
                        <td>Nguyễn Văn Bảo</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>14:03:51</td>
                        <td>29/03/2020</td>
                        <td>Trần Văn Lợi</td>
                        <td>Xảy ra lỗi</td>
                    </tr>
                </tbody>
            </table> */}

            {/* <button type="button" onClick={handleClick} className="close-button">Cập nhật</button> */}

            {showAddMaintenanceForm && (
                <AddMaintenanceForm
                    initialData={selectedMaintenance ?? undefined}
                    onClose={() => setShowAddMaintenanceForm(false)}
                    onSubmit={(formData) => {
                        if (selectedMaintenance) {
                            handleUpdateMaintenanceHistory(selectedMaintenance.id, formData);
                        } else {
                            handleAddMaintenance(formData);
                        }
                    }}
                />
            )}
            {showAddRepairForm && (
                <AddRepairForm
                    initialData={selectedRepair ?? undefined}
                    onClose={() => setShowAddRepairForm(false)}
                    onSubmit={(formData) => {
                        if (selectedRepair) {
                            handleUpdateRepair(selectedRepair.id, formData);
                        } else {
                            handleAddRepair(formData);
                        }
                    }}
                />
            )}
            {showAddSoftwareForm && (
                <AddSoftwareForm
                    initialData={selectedSoftware ?? undefined}
                    onClose={() => setShowAddSoftwareForm(false)}
                    onSubmit={(formData) => {
                        if (selectedSoftware) {
                            handleUpdateSoftware(selectedSoftware.id, formData);
                        } else {
                            handleAddSoftware(formData);
                        }
                    }}
                />
            )}
            {showAddComputerForm && (
                <AddComputerForm
                    initialData={computer ?? undefined}
                    onClose={() => setShowAddComputerForm(false)}
                    onSubmit={(formData) => {
                        if (computer) {
                            handleUpdateComputer(computer.id, formData);
                        }
                    }}
                />
            )
                
            }
        </div>
    );
};

export default ComputerDetail;
