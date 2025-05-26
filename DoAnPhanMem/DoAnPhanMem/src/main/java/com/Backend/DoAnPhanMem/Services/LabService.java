package com.Backend.DoAnPhanMem.Services;

import com.Backend.DoAnPhanMem.DTO.LabDTO;
import com.Backend.DoAnPhanMem.DTO.LabRoomUpdateDTO;
import com.Backend.DoAnPhanMem.Models.*;
import com.Backend.DoAnPhanMem.Repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LabService {

    private final LabRepository labRepository;
    private final SemesterRepository semesterRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;

    public List<Lab> getAllLabs() {
        return labRepository.findAll();
    }

    public List<Lab> advancedSearch(Long semesterId, Integer dayOfWeek, Integer fromPeriod, Integer toPeriod) {
        if (semesterId == null && dayOfWeek == null && fromPeriod == null && toPeriod == null) {
            return getAllLabs();
        }
        return labRepository.advancedSearch(semesterId, dayOfWeek, fromPeriod, toPeriod);
    }

    public LabDTO getLabById(Long id) {
        Lab lab = labRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lab not found"));

        LabDTO dto = new LabDTO();
        dto.setClassCode(lab.getClassCode());
        dto.setSubject(lab.getSubject());
        dto.setDate(lab.getDate());
        dto.setFromPeriod(lab.getFromPeriod());
        dto.setToPeriod(lab.getToPeriod());
        dto.setEffectiveDate(lab.getEffectiveDate());
        dto.setNotes(lab.getNotes());
        dto.setSemesterId(lab.getSemester().getId());
        dto.setUserId(lab.getUsers().getId());
        dto.setRoomId(lab.getRoom().getId());

        return dto;
    }

    public Lab updateLab(Long id, LabDTO dto) {
        Lab lab = labRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lab not found"));
        lab.setClassCode(dto.getClassCode());
        lab.setSubject(dto.getSubject());
        lab.setDate(dto.getDate());
        lab.setFromPeriod(dto.getFromPeriod());
        lab.setToPeriod(dto.getToPeriod());
        lab.setEffectiveDate(dto.getEffectiveDate());
        lab.setNotes(dto.getNotes());
        Semester semester = semesterRepository.findById(dto.getSemesterId())
                .orElseThrow(() -> new RuntimeException("Semester not found"));
        Users user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));
        lab.setSemester(semester);
        lab.setUsers(user);
        lab.setRoom(room);
        return labRepository.save(lab);
    }

    public Lab updateRoomOnly(Long labId, Long roomId) {
        Lab lab = labRepository.findById(labId)
                .orElseThrow(() -> new RuntimeException("Lab not found: " + labId));
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found: " + roomId));

        lab.setRoom(room);
        return labRepository.save(lab);
    }

    public void updateMultipleRooms(List<LabRoomUpdateDTO> updates) {
        for (LabRoomUpdateDTO dto : updates) {
            updateRoomOnly(dto.getLabId(), dto.getRoomId());
        }
    }
}
