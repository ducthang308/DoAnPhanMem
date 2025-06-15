package com.Backend.DoAnPhanMem.Services;

import com.Backend.DoAnPhanMem.DTO.PracticeScheduleDTO;
import com.Backend.DoAnPhanMem.Models.PracticeSchedule;
import com.Backend.DoAnPhanMem.Models.Room;
import com.Backend.DoAnPhanMem.Models.Semester;
import com.Backend.DoAnPhanMem.Models.Users;
import com.Backend.DoAnPhanMem.Repository.PracticeScheduleRepository;
import com.Backend.DoAnPhanMem.Repository.RoomRepository;
import com.Backend.DoAnPhanMem.Repository.SemesterRepository;
import com.Backend.DoAnPhanMem.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PracticeScheduleService {
    private final PracticeScheduleRepository scheduleRepository;
    private final SemesterRepository semesterRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;

    public List<PracticeSchedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    public List<PracticeSchedule> getSchedulesFiltered(String semesterName, Integer startYear, Integer endYear) {
        if (semesterName == null || startYear == null || endYear == null) {
            return getAllSchedules();
        }
        return scheduleRepository.findBySemesterAndYear(semesterName, startYear, endYear);
    }
    public PracticeSchedule createSchedule(PracticeScheduleDTO dto) {
        PracticeSchedule schedule = new PracticeSchedule();
        schedule.setClassCode(dto.getClassCode());
        schedule.setSubject(dto.getSubject());
        schedule.setDate(dto.getDate());
        schedule.setFromPeriod(dto.getFromPeriod());
        schedule.setToPeriod(dto.getToPeriod());
        schedule.setEffectiveDate(dto.getEffectiveDate());
        schedule.setNotes(dto.getNotes());

        Semester semester = semesterRepository.findById(dto.getSemesterId())
                .orElseThrow(() -> new RuntimeException("Semester not found"));
        Users user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        schedule.setSemester(semester);
        schedule.setUsers(user);
        schedule.setRoom(room);

        return scheduleRepository.save(schedule);
    }
    public PracticeScheduleDTO getScheduleById(Long id) {
        PracticeSchedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found"));

        PracticeScheduleDTO dto = new PracticeScheduleDTO();
        dto.setClassCode(schedule.getClassCode());
        dto.setSubject(schedule.getSubject());
        dto.setDate(schedule.getDate());
        dto.setFromPeriod(schedule.getFromPeriod());
        dto.setToPeriod(schedule.getToPeriod());
        dto.setEffectiveDate(schedule.getEffectiveDate());
        dto.setNotes(schedule.getNotes());
        dto.setSemesterId(schedule.getSemester().getId());
        dto.setUserId(schedule.getUsers().getId());
        dto.setRoomId(schedule.getRoom().getId());

        return dto;
    }

    public PracticeSchedule updateSchedule(Long id, PracticeScheduleDTO dto) {
        PracticeSchedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found"));

        schedule.setClassCode(dto.getClassCode());
        schedule.setSubject(dto.getSubject());
        schedule.setDate(dto.getDate());
        schedule.setFromPeriod(dto.getFromPeriod());
        schedule.setToPeriod(dto.getToPeriod());
        schedule.setEffectiveDate(dto.getEffectiveDate());
        schedule.setNotes(dto.getNotes());

        Semester semester = semesterRepository.findById(dto.getSemesterId())
                .orElseThrow(() -> new RuntimeException("Semester not found"));
        Users user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        schedule.setSemester(semester);
        schedule.setUsers(user);
        schedule.setRoom(room);

        return scheduleRepository.save(schedule);
    }
    public void deleteSchedule(Long id) {
        PracticeSchedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Schedule not found with id: " + id));
        scheduleRepository.delete(schedule);
    }

    public List<PracticeSchedule> findByUserID(Long userID) {
        return this.scheduleRepository.findAllByUsers_id(userID);
    }
}
