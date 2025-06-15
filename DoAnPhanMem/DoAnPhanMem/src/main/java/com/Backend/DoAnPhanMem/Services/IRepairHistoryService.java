package com.Backend.DoAnPhanMem.Services;

import com.Backend.DoAnPhanMem.Models.RepairHistory;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface IRepairHistoryService {
    public RepairHistory findRepairHistoryById(@PathVariable Long id);

    public List<RepairHistory> findRepairHistoryByComputerId(@PathVariable Long computerId);

    public RepairHistory createRepairHistory(Long computerId, RepairHistory repairHistory) throws Exception;

    public RepairHistory updateRepairHistory(Long repairHistoryId, RepairHistory repairHistory) throws Exception;
}
