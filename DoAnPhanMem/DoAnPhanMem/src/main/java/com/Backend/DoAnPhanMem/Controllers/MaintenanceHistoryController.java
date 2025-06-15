package com.Backend.DoAnPhanMem.Controllers;

import com.Backend.DoAnPhanMem.Models.Computer;
import com.Backend.DoAnPhanMem.Models.MaintenanceHistory;
import com.Backend.DoAnPhanMem.Repository.ComputerRepository;
import com.Backend.DoAnPhanMem.Repository.MaintenanceHistoryRepository;
import com.Backend.DoAnPhanMem.Services.IMaintenanceHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/maintenance")
@RequiredArgsConstructor
public class MaintenanceHistoryController {

    private final IMaintenanceHistoryService maintenanceHistoryService;

    private final MaintenanceHistoryRepository maintenanceHistoryRepository;

    private final ComputerRepository computerRepository;

    @GetMapping("")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<List<MaintenanceHistory>> getAllMaintenanceHistory() {
        return ResponseEntity.ok(maintenanceHistoryService.findAllMaintenanceHistory());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<MaintenanceHistory> getMaintenanceHistory(@PathVariable Long id) {
        return ResponseEntity.ok(maintenanceHistoryService.findMaintenanceHistoryById(id));
    }

    @GetMapping("/getByComputer/{computerId}")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<List<MaintenanceHistory>> getMaintenancesByComputer(@PathVariable Long computerId) {
        return ResponseEntity.ok(maintenanceHistoryService.findMaintenanceHistoryByComputerId(computerId));
    }

    @PostMapping("/{computerId}")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<?> saveMaintenanceHistory(@PathVariable Long computerId, @RequestBody MaintenanceHistory maintenanceHistory) {
        return ResponseEntity.ok(this.maintenanceHistoryService.createMaintenanceHistory(computerId, maintenanceHistory));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<?> updateMaintenanceHistory(@PathVariable Long id, @RequestBody MaintenanceHistory maintenanceHistory) throws Exception{
        return ResponseEntity.ok(this.maintenanceHistoryService.updateMaintenanceHistory(id, maintenanceHistory));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<?> deleteMaintenanceHistory(@PathVariable Long id) {
        this.maintenanceHistoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
