package com.Backend.DoAnPhanMem.Controllers;

import com.Backend.DoAnPhanMem.DTO.ScheduleChangeDTO;
import com.Backend.DoAnPhanMem.Models.ScheduleChangeHistory;
import com.Backend.DoAnPhanMem.Models.Users;
import com.Backend.DoAnPhanMem.Repository.ScheduleChangeHistoryRepository;
import com.Backend.DoAnPhanMem.Services.IScheduleChangeHistoryService;
import com.Backend.DoAnPhanMem.Services.IUserService;
import com.Backend.DoAnPhanMem.Services.ScheduleChangeHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/scheduleChange")
@RequiredArgsConstructor
public class ScheduleChangeHistoryController {

    private final IScheduleChangeHistoryService scheduleChangeHistoryService;

    private final IUserService userService;

    private final ScheduleChangeHistoryRepository scheduleChangeHistoryRepository;

    @GetMapping("")
    @PreAuthorize("hasRole('ROLE_Training_Officer')")
    public ResponseEntity<List<ScheduleChangeHistory>> getAllScheduleChangeHistory() {
        return ResponseEntity.ok(this.scheduleChangeHistoryService.findAllScheduleChangeHistory());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_Training_Officer')")
    public ResponseEntity<ScheduleChangeHistory> getScheduleChangeHistory(@PathVariable Long id) {
        return ResponseEntity.ok(this.scheduleChangeHistoryService.findScheduleChangeHistoryById(id));
    }

    @PostMapping("")
    @PreAuthorize("hasAnyRole('ROLE_Lecturer', 'ROLE_Training_Officer')")
    public ResponseEntity<?> createScheduleChangeHistory(@RequestHeader("Authorization") String token, @RequestBody ScheduleChangeDTO scheduleChangeDTO) throws Exception {
        Users reqUser = this.userService.findUserByToken(token);
        return ResponseEntity.ok(this.scheduleChangeHistoryService.createScheduleChangeHistory(reqUser, scheduleChangeDTO));
    }

    @PutMapping("/approve/{id}")
    @PreAuthorize("hasRole('ROLE_Training_Officer')")
    public ResponseEntity<?> approveScheduleChange(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(this.scheduleChangeHistoryService.approveScheduleChange(id));
    }

    @PutMapping("/reject/{id}")
    @PreAuthorize("hasRole('ROLE_Training_Officer')")
    public ResponseEntity<?> rejectScheduleChange(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(this.scheduleChangeHistoryService.rejectScheduleChange(id));
    }

    @GetMapping("/status")
    @PreAuthorize("hasRole('ROLE_Training_Officer')")
    public ResponseEntity<List<ScheduleChangeHistory>> getByStatus(@RequestParam String status) {
        List<ScheduleChangeHistory> result = scheduleChangeHistoryService.findByStatus(status);
        return ResponseEntity.ok(result);
    }
}
