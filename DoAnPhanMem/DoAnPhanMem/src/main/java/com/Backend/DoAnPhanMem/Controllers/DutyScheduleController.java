package com.Backend.DoAnPhanMem.Controllers;

import com.Backend.DoAnPhanMem.DTO.DutyScheduleDTO;
import com.Backend.DoAnPhanMem.DTO.DutyScheduleRequestDTO;
import com.Backend.DoAnPhanMem.DTO.IT_OfficerDTO;
import com.Backend.DoAnPhanMem.DTO.UserDTO;
import com.Backend.DoAnPhanMem.Models.DutySchedule;
import com.Backend.DoAnPhanMem.Models.Semester;
import com.Backend.DoAnPhanMem.Models.Users;
import com.Backend.DoAnPhanMem.Services.DutyScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("${api.prefix}/duty_schedule")
@RequiredArgsConstructor
public class DutyScheduleController {

    private final DutyScheduleService dutyScheduleService;

    @GetMapping("/filter")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<List<DutyScheduleDTO>> getDutySchedulesBySemesterNameAndWeek(
            @RequestParam("semesterName") String semesterName,
            @RequestParam("week") int week) {

        List<DutySchedule> schedules = dutyScheduleService.getDutySchedulesBySemesterNameAndWeek(semesterName, week);

        List<DutyScheduleDTO> result = schedules.stream()
                .map(s -> DutyScheduleDTO.builder()
                        .id(s.getId())
                        .day(s.getDay())
                        .week(s.getWeek())
                        .partDay(s.getPartDay())
                        .semesterId(s.getSemester().getId())
                        .semesterName(s.getSemester().getSemesterName())
                        .userId(s.getUsers().getId())
                        .username(s.getUsers().getFullName())
                        .build())
                .toList();

        return ResponseEntity.ok(result);
    }
    @GetMapping("/semesters")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<List<Semester>> getAllSemesters() {
        List<Semester> semesters = dutyScheduleService.getAllSemesters();
        return ResponseEntity.ok(semesters);
    }
    @GetMapping("/it_officers")
    @PreAuthorize("hasRole('ROLE_Admin_IT_Officer')")
    public ResponseEntity<List<IT_OfficerDTO>> getItOfficers() {
        List<IT_OfficerDTO> officers = dutyScheduleService.getITOfficers();
        return ResponseEntity.ok(officers);
    }
    @PutMapping("/update")
    @PreAuthorize("hasRole('ROLE_Admin_IT_Officer')")
    public ResponseEntity<List<DutyScheduleDTO>> updateOrCreateDutySchedules(
            @RequestBody List<DutyScheduleRequestDTO> requests) {

        List<DutyScheduleDTO> result = dutyScheduleService.updateOrCreateDutySchedules(requests);
        return ResponseEntity.ok(result);
    }
}