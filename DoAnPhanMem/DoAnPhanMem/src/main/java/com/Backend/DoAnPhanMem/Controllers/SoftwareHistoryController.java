package com.Backend.DoAnPhanMem.Controllers;

import com.Backend.DoAnPhanMem.Models.SoftwareHistory;
import com.Backend.DoAnPhanMem.Repository.SoftwareHistoryRepository;
import com.Backend.DoAnPhanMem.Services.ISoftwareHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/software")
@RequiredArgsConstructor
public class SoftwareHistoryController {

    private final ISoftwareHistoryService softwareHistoryService;

    private final SoftwareHistoryRepository softwareHistoryRepository;

    @GetMapping("")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<?> findAllSoftwareHistory() {
        return ResponseEntity.ok(softwareHistoryRepository.findAll());
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<?> findSoftwareHistoryById(@PathVariable Long id) {
        return ResponseEntity.ok(softwareHistoryRepository.findById(id));
    }

    @GetMapping("/getByComputer/{computerId}")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<?> findSoftwareHistoryByComputerId(@PathVariable Long computerId) {
        return ResponseEntity.ok(this.softwareHistoryService.findSoftwareHistoryByComputerId(computerId));
    }

    @PostMapping("/{computerId}")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<?> createSoftwareHistory(@PathVariable Long computerId, @RequestBody SoftwareHistory softwareHistory) throws Exception {
        return ResponseEntity.ok(softwareHistoryService.createSoftwareHistory(computerId, softwareHistory));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<?> updateSoftwareHistory(@PathVariable Long id, @RequestBody SoftwareHistory softwareHistory) throws Exception {
        return ResponseEntity.ok(softwareHistoryService.updateSoftwareHistory(id, softwareHistory));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<?> deleteSoftwareHistory(@PathVariable Long id) {
        this.softwareHistoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
