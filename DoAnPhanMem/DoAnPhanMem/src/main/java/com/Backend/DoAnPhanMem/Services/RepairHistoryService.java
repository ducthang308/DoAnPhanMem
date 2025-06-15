package com.Backend.DoAnPhanMem.Services;

import com.Backend.DoAnPhanMem.Models.Computer;
import com.Backend.DoAnPhanMem.Models.RepairHistory;
import com.Backend.DoAnPhanMem.Repository.ComputerRepository;
import com.Backend.DoAnPhanMem.Repository.RepairHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RepairHistoryService implements IRepairHistoryService {
    private final RepairHistoryRepository  repairHistoryRepository;

    private final ComputerRepository computerRepository;

    @Override
    public RepairHistory findRepairHistoryById(Long id) {
        return this.repairHistoryRepository.findById(id).orElse(null);
    }

    @Override
    public List<RepairHistory> findRepairHistoryByComputerId(Long computerId) {
        return this.repairHistoryRepository.findByComputer_id(computerId);
    }

    @Override
    public RepairHistory createRepairHistory(Long computerId, RepairHistory repairHistory) throws Exception {
        Optional<Computer> opt = this.computerRepository.findById(computerId);

        if (opt.isPresent()) {
            RepairHistory newRepairHistory = new RepairHistory();
            newRepairHistory.setComputer(opt.get());
            newRepairHistory.setRepairedBy(repairHistory.getRepairedBy());
            newRepairHistory.setNotes(repairHistory.getNotes());
            newRepairHistory.setStatus(repairHistory.getStatus());
            newRepairHistory.setErrorName(repairHistory.getErrorName());
            newRepairHistory.setOccurredDate(repairHistory.getOccurredDate());
            newRepairHistory.setUpdateDate(repairHistory.getUpdateDate());

            return this.repairHistoryRepository.save(newRepairHistory);
        } else {
            throw new Exception("computer not found with id " + computerId);
        }
    }

    @Override
    public RepairHistory updateRepairHistory(Long repairHistoryId, RepairHistory repairHistory) throws Exception {
        Optional<RepairHistory> opt = this.repairHistoryRepository.findById(repairHistoryId);

        if (opt.isPresent()) {
            RepairHistory existing = opt.get();

            existing.setRepairedBy(repairHistory.getRepairedBy());
            existing.setNotes(repairHistory.getNotes());
            existing.setOccurredDate(repairHistory.getOccurredDate());
            existing.setUpdateDate(repairHistory.getUpdateDate());
            existing.setStatus(repairHistory.getStatus());
            existing.setErrorName(repairHistory.getErrorName());

            return this.repairHistoryRepository.save(existing);
        } else {
            throw new Exception("repairHistory not found with id " + repairHistoryId);
        }
    }
}
