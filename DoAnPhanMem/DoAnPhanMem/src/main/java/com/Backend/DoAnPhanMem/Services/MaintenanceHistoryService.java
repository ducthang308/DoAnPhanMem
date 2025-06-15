package com.Backend.DoAnPhanMem.Services;

import com.Backend.DoAnPhanMem.Models.Computer;
import com.Backend.DoAnPhanMem.Models.MaintenanceHistory;
import com.Backend.DoAnPhanMem.Repository.ComputerRepository;
import com.Backend.DoAnPhanMem.Repository.MaintenanceHistoryRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MaintenanceHistoryService implements IMaintenanceHistoryService {

    private final ComputerRepository computerRepository;

    private final MaintenanceHistoryRepository maintenanceHistoryRepository;


    @Override
    public MaintenanceHistory findMaintenanceHistoryById(Long id) {
        return maintenanceHistoryRepository.findById(id).orElse(null);
    }

    @Override
    public List<MaintenanceHistory> findMaintenanceHistoryByComputerId(Long computerId) {
        return maintenanceHistoryRepository.findByComputer_id(computerId);
    }

    @Override
    public List<MaintenanceHistory> findAllMaintenanceHistory() {
        return maintenanceHistoryRepository.findAll();
    }

    @Override
    public MaintenanceHistory createMaintenanceHistory(Long computerId, MaintenanceHistory maintenanceHistory) {
        Computer computer = computerRepository.findById(computerId).orElse(null);
        MaintenanceHistory newMaintenance = new MaintenanceHistory();

        newMaintenance.setComputer(computer);
        newMaintenance.setMaintenanceDate(maintenanceHistory.getMaintenanceDate());
        newMaintenance.setNotes(maintenanceHistory.getNotes());
        newMaintenance.setMaintainedBy(maintenanceHistory.getMaintainedBy());
        newMaintenance.setContent(maintenanceHistory.getContent());

        return maintenanceHistoryRepository.save(newMaintenance);
    }

    @Override
    public MaintenanceHistory updateMaintenanceHistory(Long maintenanceHistoryId, MaintenanceHistory maintenanceHistory) throws  Exception {
        Optional<MaintenanceHistory> optional = maintenanceHistoryRepository.findById(maintenanceHistoryId);

        if (optional.isPresent()) {
            MaintenanceHistory existing = optional.get();
            existing.setMaintenanceDate(maintenanceHistory.getMaintenanceDate());
            existing.setNotes(maintenanceHistory.getNotes());
            existing.setMaintainedBy(maintenanceHistory.getMaintainedBy());
            existing.setContent(maintenanceHistory.getContent());

            return this.maintenanceHistoryRepository.save(existing);
        } else {
            throw new Exception("Maintenance History Not Found with id: " + maintenanceHistoryId);
        }
    }
}
