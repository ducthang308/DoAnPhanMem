package com.Backend.DoAnPhanMem.Controllers;

import com.Backend.DoAnPhanMem.DTO.PracticeScheduleDTO;
import com.Backend.DoAnPhanMem.Models.PracticeSchedule;
import com.Backend.DoAnPhanMem.Models.Semester;
import com.Backend.DoAnPhanMem.Repository.PracticeScheduleRepository;
import com.Backend.DoAnPhanMem.Repository.RoomRepository;
import com.Backend.DoAnPhanMem.Repository.SemesterRepository;
import com.Backend.DoAnPhanMem.Repository.UserRepository;
import com.Backend.DoAnPhanMem.Services.PracticeScheduleService;
import com.Backend.DoAnPhanMem.Services.SemesterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/schedule")
@RequiredArgsConstructor
public class PracticeScheduleController {
    private final PracticeScheduleService scheduleService;
    private final SemesterService semesterService;
    private final PracticeScheduleRepository scheduleRepo;

    @GetMapping("")
    @PreAuthorize("hasRole('ROLE_Training_Officer')")
    public ResponseEntity<List<PracticeSchedule>> getAllSchedules() {
        List<PracticeSchedule> schedules = scheduleService.getAllSchedules();
        return ResponseEntity.ok(schedules);
    }
    // Endpoint lấy danh sách lịch có filter
    @GetMapping("/filter")
    @PreAuthorize("hasRole('ROLE_Training_Officer')")
    public ResponseEntity<List<PracticeSchedule>> getSchedulesFiltered(
            @RequestParam(required = false) String semesterName,
            @RequestParam(required = false) Integer startYear,
            @RequestParam(required = false) Integer endYear) {

        List<PracticeSchedule> schedules = scheduleService.getSchedulesFiltered(semesterName, startYear, endYear);
        return ResponseEntity.ok(schedules);
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_Training_Officer')")
    public ResponseEntity<PracticeSchedule> createSchedule(@RequestBody PracticeScheduleDTO dto) {
        PracticeSchedule saved = scheduleService.createSchedule(dto);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_Training_Officer')")
    public ResponseEntity<PracticeScheduleDTO> getScheduleById(@PathVariable Long id) {
        PracticeScheduleDTO dto = scheduleService.getScheduleById(id);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_Training_Officer')")
    public ResponseEntity<PracticeSchedule> updateSchedule(
            @PathVariable Long id,
            @RequestBody PracticeScheduleDTO dto) {

        PracticeSchedule updated = scheduleService.updateSchedule(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_Training_Officer')")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long id) {
        scheduleService.deleteSchedule(id);
        return ResponseEntity.noContent().build();
    }

}
