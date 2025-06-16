package com.Backend.DoAnPhanMem.Controllers;

import com.Backend.DoAnPhanMem.DTO.UserUsageHistoryDTO;
import com.Backend.DoAnPhanMem.Models.UserUsageHistory;
import com.Backend.DoAnPhanMem.Repository.ComputerRepository;
import com.Backend.DoAnPhanMem.Repository.UserUsageHistoryRepository;
import com.Backend.DoAnPhanMem.Services.IUserService;
import com.Backend.DoAnPhanMem.Services.IUserUsageHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/usage")
@RequiredArgsConstructor
public class UserUsageHistoryController {
    private final UserUsageHistoryRepository userUsageHistoryRepository;

    private final ComputerRepository computerRepository;

    private final IUserUsageHistoryService userUsageHistoryService;

    private final IUserService userService;

    @GetMapping("")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<List<UserUsageHistory>> getAllUserUsageHistory() {
        return ResponseEntity.ok(userUsageHistoryRepository.findAll());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<UserUsageHistory> getUserUsageHistory(@PathVariable Long id) {
        return ResponseEntity.ok(this.userUsageHistoryService.findUserUsageHistoryById(id));
    }

    @PostMapping("")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer', 'ROLE_Student')")
    public ResponseEntity<?> startUsingComputer(@RequestHeader("Authorization") String token, @RequestBody UserUsageHistoryDTO userUsageHistoryDTO) {
        return ResponseEntity.ok(this.userUsageHistoryService.startUsing(userUsageHistoryDTO, token));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer', 'ROLE_Student')")
    public ResponseEntity<?> endUseComputer(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(this.userUsageHistoryService.endUse(id));
    }

    @GetMapping("/getByComputer/{id}")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<List<UserUsageHistory>> getByComputer(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(this.userUsageHistoryRepository.findTop10ByComputer_IdOrderByIdDesc(id));
    }
}
