package com.Backend.DoAnPhanMem.Controllers;

import com.Backend.DoAnPhanMem.DTO.DutyScheduleDTO;
import com.Backend.DoAnPhanMem.DTO.DutyScheduleRequestDTO;
import com.Backend.DoAnPhanMem.DTO.IT_OfficerDTO;
import com.Backend.DoAnPhanMem.DTO.UserDTO;
import com.Backend.DoAnPhanMem.Models.DutySchedule;
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
@RequestMapping("${api.prefix}/duty_schedules")
@RequiredArgsConstructor
public class DutyScheduleController {

    private final DutyScheduleService dutyScheduleService;

    @GetMapping("/filter")
    @PreAuthorize("hasRole('IT_Officer')")
    public ResponseEntity<List<DutyScheduleDTO>> getDutySchedulesByYearAndWeek(
            @RequestParam("startYear") int startYear,
            @RequestParam("endYear") int endYear,
            @RequestParam("week") int week) {
        List<DutySchedule> schedules = dutyScheduleService.getDutySchedulesByYearAndWeek(startYear, endYear, week);
        List<DutyScheduleDTO> result = schedules.stream()
                .map(s -> DutyScheduleDTO.builder()
                        .id(s.getId())
                        .day(s.getDay())
                        .week(s.getWeek())
                        .partDay(s.getPartDay())
                        .semesterId(s.getSemester().getId())
                        .semesterName(s.getSemester().getSemesterName())
                        .year(s.getSemester().getStartYear() + " - " + s.getSemester().getEndYear())
                        .userId(s.getUsers().getId())
                        .username(s.getUsers().getUsername())
                        .build())
                .toList();
        return ResponseEntity.ok(result);
    }
    @GetMapping("/it_officers")
    @PreAuthorize("hasRole('ROLE_Admin_IT_Officer')")
    public ResponseEntity<List<IT_OfficerDTO>> getItOfficers() {
        List<IT_OfficerDTO> officers = dutyScheduleService.getITOfficers();
        return ResponseEntity.ok(officers);
    }
    @PutMapping("/update")
    @PreAuthorize("hasRole('ROLE_Admin_IT_Officer')")
    public ResponseEntity<DutyScheduleDTO> updateOrCreateDutySchedule(@RequestBody DutyScheduleRequestDTO request) {
        DutySchedule schedule = dutyScheduleService.updateOrCreateDutySchedule(request);
        DutyScheduleDTO dto = new DutyScheduleDTO();
        dto.setId(schedule.getId());
        dto.setDay(schedule.getDay());
        dto.setWeek(schedule.getWeek());
        dto.setPartDay(schedule.getPartDay());
        dto.setSemesterId(schedule.getSemester().getId());
        dto.setSemesterName(schedule.getSemester().getSemesterName());
        dto.setYear(schedule.getSemester().getStartYear() + " - " + schedule.getSemester().getEndYear());
        dto.setUserId(schedule.getUsers().getId());
        dto.setUsername(schedule.getUsers().getUsername());
        return ResponseEntity.ok(dto);
    }
}