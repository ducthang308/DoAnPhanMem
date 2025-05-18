package com.Backend.DoAnPhanMem.Controllers;

import com.Backend.DoAnPhanMem.DTO.BulkRoomUpdateRequest;
import com.Backend.DoAnPhanMem.DTO.LabRoomUpdateDTO;
import com.Backend.DoAnPhanMem.DTO.RoomDTO;
import com.Backend.DoAnPhanMem.Models.Lab;
import com.Backend.DoAnPhanMem.Models.PracticeSchedule;
import com.Backend.DoAnPhanMem.Models.Room;
import com.Backend.DoAnPhanMem.Models.Semester;
import com.Backend.DoAnPhanMem.Repository.LabRepository;
import com.Backend.DoAnPhanMem.Repository.PracticeScheduleRepository;
import com.Backend.DoAnPhanMem.Repository.RoomRepository;
import com.Backend.DoAnPhanMem.Services.LabService;
import com.Backend.DoAnPhanMem.Services.SemesterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/lab")
@RequiredArgsConstructor
public class LabController {
    private final LabService labService;
    private final RoomRepository roomRepository;
    private final LabRepository labRepository;
    @GetMapping("/labs")
    @PreAuthorize("hasRole('ROLE_Admin_IT_Officer')")
    public ResponseEntity<List<Lab>> getAllLabs() {
        List<Lab> schedules = labService.getAllLabs();
        return ResponseEntity.ok(schedules);
    }

    @GetMapping("/filter")
    @PreAuthorize("hasRole('ROLE_Admin_IT_Officer')")
    public ResponseEntity<List<Lab>> getSchedulesFiltered(
            @RequestParam(required = false) String semesterName,
            @RequestParam(required = false) Integer startYear,
            @RequestParam(required = false) Integer endYear,
            @RequestParam(required = false) Integer dayOfWeek,
            @RequestParam(required = false) Integer fromPeriod,
            @RequestParam(required = false) Integer toPeriod) {

        List<Lab> schedules = labService.advancedSearch(
                semesterName, startYear, endYear, dayOfWeek, fromPeriod, toPeriod
        );
        return ResponseEntity.ok(schedules);
    }
    @GetMapping("/rooms")
    @PreAuthorize("hasRole('ROLE_Admin_IT_Officer')")
    public ResponseEntity<List<RoomDTO>> getAllRooms() {
        List<RoomDTO> roomDTOs = roomRepository.findAll().stream()
                .map(room -> new RoomDTO(room.getId(), room.getRoomName()))
                .toList();
        return ResponseEntity.ok(roomDTOs);
    }
    @PutMapping("/update-rooms-bulk")
    public ResponseEntity<String> updateMultipleRooms(@RequestBody BulkRoomUpdateRequest request) {
        for (LabRoomUpdateDTO dto : request.getUpdates()) {
            Lab lab = labRepository.findById(dto.getLabId())
                    .orElseThrow(() -> new RuntimeException("Lab ID not found: " + dto.getLabId()));

            Room room = roomRepository.findById(dto.getRoomId())
                    .orElseThrow(() -> new RuntimeException("Room ID not found: " + dto.getRoomId()));

            lab.setRoom(room);
            labRepository.save(lab);
        }
        return ResponseEntity.ok("Cập nhật phòng thành công cho nhiều lớp.");
    }
}
