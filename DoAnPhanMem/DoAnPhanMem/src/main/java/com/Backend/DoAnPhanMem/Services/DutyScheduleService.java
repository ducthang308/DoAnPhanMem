package com.Backend.DoAnPhanMem.Services;

import com.Backend.DoAnPhanMem.DTO.DutyScheduleDTO;
import com.Backend.DoAnPhanMem.DTO.DutyScheduleRequestDTO;
import com.Backend.DoAnPhanMem.DTO.IT_OfficerDTO;
import com.Backend.DoAnPhanMem.Models.DutySchedule;
import com.Backend.DoAnPhanMem.Models.Semester;
import com.Backend.DoAnPhanMem.Models.Users;
import com.Backend.DoAnPhanMem.Repository.DutyScheduleRepository;
import com.Backend.DoAnPhanMem.Repository.SemesterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DutyScheduleService {

    private final DutyScheduleRepository dutyScheduleRepository;
    private final SemesterRepository semesterRepository;
    private final JdbcTemplate jdbcTemplate;

    public List<DutySchedule> getDutySchedulesBySemesterNameAndWeek(String semesterName, int week) {
        return dutyScheduleRepository.findBySemesterNameAndWeek(semesterName, week);
    }

    public List<IT_OfficerDTO> getITOfficers() {
        String sql = "SELECT u.id, u.full_name " +
                "FROM [dbo].[Users] u " +
                "JOIN [dbo].[Roles] r ON r.id = u.role_id " +
                "WHERE r.role_name = 'IT_Officer'";
        return jdbcTemplate.query(sql, (rs, rowNum) ->
                new IT_OfficerDTO(rs.getLong("id"), rs.getString("full_name")));
    }
    public List<Semester> getAllSemesters() {
        return semesterRepository.findAll();
    }
    public List<DutyScheduleDTO> updateOrCreateDutySchedules(List<DutyScheduleRequestDTO> requests) {
        List<DutyScheduleDTO> results = new ArrayList<>();

        for (DutyScheduleRequestDTO request : requests) {
            Semester semester = semesterRepository.findById(request.getSemesterId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy học kỳ với ID: " + request.getSemesterId()));

            Optional<DutySchedule> existingSchedule = dutyScheduleRepository.findBySemesterIdAndWeekAndDayAndPartDay(
                    semester.getId(), request.getWeek(), request.getDay(), request.getPartDay()
            );

            DutySchedule dutySchedule;
            if (existingSchedule.isPresent()) {
                dutySchedule = existingSchedule.get();
                Users user = new Users();
                user.setId(request.getUserId());
                dutySchedule.setUsers(user);
            } else {
                dutySchedule = new DutySchedule();
                dutySchedule.setSemester(semester);
                dutySchedule.setWeek(request.getWeek());
                dutySchedule.setDay(request.getDay());
                dutySchedule.setPartDay(request.getPartDay());

                Users user = new Users();
                user.setId(request.getUserId());
                dutySchedule.setUsers(user);
            }

            DutySchedule saved = dutyScheduleRepository.save(dutySchedule);

            DutyScheduleDTO dto = new DutyScheduleDTO();
            dto.setId(saved.getId());
            dto.setDay(saved.getDay());
            dto.setWeek(saved.getWeek());
            dto.setPartDay(saved.getPartDay());
            dto.setSemesterId(saved.getSemester().getId());
            dto.setSemesterName(saved.getSemester().getSemesterName());
            dto.setUserId(saved.getUsers().getId());
            dto.setUsername(saved.getUsers().getFullName());

            results.add(dto);
        }

        return results;
    }
//    public DutySchedule updateOrCreateDutySchedule(DutyScheduleRequestDTO request) {
//        Semester semester = semesterRepository.findByStartYearAndEndYear(request.getStartYear(), request.getEndYear());
//        if (semester == null) {
//            throw new RuntimeException("Không tìm thấy học kỳ với năm học " + request.getStartYear() + "-" + request.getEndYear());
//        }
//
//        Optional<DutySchedule> existingSchedule = dutyScheduleRepository.findBySemesterIdAndWeek(semester.getId(), request.getWeek());
//
//        DutySchedule dutySchedule;
//        if (existingSchedule.isPresent()) {
//            dutySchedule = existingSchedule.get();
//            dutySchedule.setDay(request.getDay());
//            dutySchedule.setPartDay(request.getPartDay());
//            Users user = new Users();
//            user.setId(request.getUserId());
//            dutySchedule.setUsers(user);
//        } else {
//            dutySchedule = new DutySchedule();
//            dutySchedule.setWeek(request.getWeek());
//            dutySchedule.setDay(request.getDay());
//            dutySchedule.setPartDay(request.getPartDay());
//            dutySchedule.setSemester(semester);
//            Users user = new Users();
//            user.setId(request.getUserId());
//            dutySchedule.setUsers(user);
//        }
//
//        // Lưu vào cơ sở dữ liệu
//        return dutyScheduleRepository.save(dutySchedule);
//    }
}