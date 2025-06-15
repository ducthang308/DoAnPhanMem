package com.Backend.DoAnPhanMem.Services;

import com.Backend.DoAnPhanMem.Models.Computer;
import com.Backend.DoAnPhanMem.Models.MaintenanceHistory;

import java.util.List;

public interface IMaintenanceHistoryService {

    public MaintenanceHistory findMaintenanceHistoryById(Long id);

    public List<MaintenanceHistory> findMaintenanceHistoryByComputerId(Long computerId);

    public List<MaintenanceHistory> findAllMaintenanceHistory();

    public MaintenanceHistory createMaintenanceHistory(Long computerId, MaintenanceHistory maintenanceHistory);

    public MaintenanceHistory updateMaintenanceHistory(Long maintenanceHistoryId, MaintenanceHistory maintenanceHistory) throws Exception;

}
