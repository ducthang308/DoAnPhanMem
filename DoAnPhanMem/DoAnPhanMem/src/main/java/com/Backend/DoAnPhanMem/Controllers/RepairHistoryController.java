package com.Backend.DoAnPhanMem.Controllers;

import com.Backend.DoAnPhanMem.Models.RepairHistory;
import com.Backend.DoAnPhanMem.Repository.RepairHistoryRepository;
import com.Backend.DoAnPhanMem.Services.IRepairHistoryService;
import com.Backend.DoAnPhanMem.Services.RepairHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/repair")
@RequiredArgsConstructor
public class RepairHistoryController {

    private final IRepairHistoryService repairHistoryService;

    private final RepairHistoryRepository repairHistoryRepository;

    @GetMapping("")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<?> findAllRepairHistory() {
        return ResponseEntity.ok(this.repairHistoryRepository.findAll());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<?> findRepairHistoryById(@PathVariable Long id) {
        return ResponseEntity.ok(this.repairHistoryRepository.findById(id).orElse(null));
    }

    @GetMapping("/getByComputer/{computerId}")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<?> findRepairHistoryByComputerId(@PathVariable Long computerId) {
        return ResponseEntity.ok(this.repairHistoryService.findRepairHistoryByComputerId(computerId));
    }

    @PostMapping("/{computerId}")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<?> saveRepairHistory(@PathVariable Long computerId, @RequestBody RepairHistory repairHistory) throws Exception {
        return ResponseEntity.ok(this.repairHistoryService.createRepairHistory(computerId, repairHistory));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<?> updateRepairHistory(@PathVariable Long id, @RequestBody RepairHistory repairHistory) throws Exception {
        return ResponseEntity.ok(this.repairHistoryService.updateRepairHistory(id, repairHistory));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<?> deleteRepairHistory(@PathVariable Long id) throws Exception {
        this.repairHistoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
