package com.Backend.DoAnPhanMem.Controllers;

import com.Backend.DoAnPhanMem.DTO.ScheduleChangeDTO;
import com.Backend.DoAnPhanMem.DTO.StudentsPracticeSchedulesDTO;
import com.Backend.DoAnPhanMem.Models.PracticeSchedule;
import com.Backend.DoAnPhanMem.Models.StudentsPracticeSchedules;
import com.Backend.DoAnPhanMem.Models.Users;
import com.Backend.DoAnPhanMem.Repository.StudentsPracticeSchedulesRepository;
import com.Backend.DoAnPhanMem.Responses.StudentPracticeResponse;
import com.Backend.DoAnPhanMem.Services.IStudentsPracticeSchedulesService;
import com.Backend.DoAnPhanMem.Services.IUserService;
import com.Backend.DoAnPhanMem.Services.StudentsPracticeSchedulesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/class")
@RequiredArgsConstructor
public class StudentsPracticeSchedulesController {

    private final IStudentsPracticeSchedulesService studentsPracticeSchedulesService;

    private final StudentsPracticeSchedulesRepository studentsPracticeSchedulesRepository;

    private final IUserService userService;

    @GetMapping("")
    @PreAuthorize("hasAnyRole('ROLE_Lecturer', 'ROLE_Training_Officer', 'ROLE_Student')")
    public ResponseEntity<?> getAllStudentsPracticeSchedules() {
        return ResponseEntity.ok(studentsPracticeSchedulesRepository.findAll());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_Lecturer', 'ROLE_Training_Officer', 'ROLE_Student')")
    public ResponseEntity<?> getAllStudentsPracticeSchedulesByID(@PathVariable Long id) {
        return ResponseEntity.ok(studentsPracticeSchedulesRepository.findById(id).orElse(null));
    }

    @GetMapping("/getByStudent")
    @PreAuthorize("hasAnyRole('ROLE_Lecturer', 'ROLE_Training_Officer', 'ROLE_Student')")
    public ResponseEntity<?> getAllStudentsPracticeSchedulesByStudentID(@RequestHeader("Authorization") String token) {
        Users user = this.userService.findUserByToken(token);

        List<StudentsPracticeSchedules> schedules = studentsPracticeSchedulesRepository.findAllByUser_Id(user.getId());

        List<StudentPracticeResponse> response = schedules.stream().map(s -> {
            PracticeSchedule schedule = s.getPracticeSchedule();
            return StudentPracticeResponse.builder()
                    .id(s.getId())
                    .classCode(schedule.getClassCode())
                    .subject(schedule.getSubject())
                    .date(schedule.getDate())
                    .fromPeriod(schedule.getFromPeriod())
                    .toPeriod(schedule.getToPeriod())
                    .lecturerName(schedule.getUsers().getFullName())
                    .roomName(schedule.getRoom().getRoomName())
                    .effectiveDate(schedule.getEffectiveDate())
                    .notes(schedule.getNotes())
                    .build();
        }).collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @PostMapping("")
    @PreAuthorize("hasAnyRole('ROLE_Lecturer', 'ROLE_Training_Officer', 'ROLE_Student', 'ROLE_Addmin')")
    public ResponseEntity<?> createStudentsPracticeSchedules(@RequestBody StudentsPracticeSchedulesDTO request) {
        return ResponseEntity.ok(this.studentsPracticeSchedulesService.saveStudentsPracticeSchedules(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_Lecturer', 'ROLE_Training_Officer', 'ROLE_Student', 'ROLE_Addmin')")
    public ResponseEntity<?> updateStudentsPracticeSchedules(@PathVariable Long id, @RequestBody StudentsPracticeSchedulesDTO request) {
        return ResponseEntity.ok(this.studentsPracticeSchedulesService.updateStudentsPracticeSchedules(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_Lecturer', 'ROLE_Training_Officer', 'ROLE_Student', 'ROLE_Addmin')")
    public ResponseEntity<?> deleteStudentsPracticeSchedules(@PathVariable Long id) {
        this.studentsPracticeSchedulesRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }


}
