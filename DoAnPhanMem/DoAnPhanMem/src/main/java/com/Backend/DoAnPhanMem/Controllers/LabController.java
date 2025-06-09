package com.Backend.DoAnPhanMem.Controllers;

import com.Backend.DoAnPhanMem.DTO.BulkRoomUpdateRequest;
import com.Backend.DoAnPhanMem.DTO.LabRoomUpdateDTO;
import com.Backend.DoAnPhanMem.DTO.RoomDTO;
import com.Backend.DoAnPhanMem.Models.Lab;
import com.Backend.DoAnPhanMem.Models.Room;
import com.Backend.DoAnPhanMem.Repository.RoomRepository;
import com.Backend.DoAnPhanMem.Services.LabService;
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

    @GetMapping("/labs")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer', 'ROLE_Training_Officer')")
    public ResponseEntity<List<Lab>> getAllLabs() {
        return ResponseEntity.ok(labService.getAllLabs());
    }

    @GetMapping("/filter")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer', 'ROLE_Training_Officer')")
    public ResponseEntity<List<Lab>> getSchedulesFiltered(
            @RequestParam(required = false) Long semesterId,
            @RequestParam(required = false) Integer dayOfWeek,
            @RequestParam(required = false) Integer fromPeriod,
            @RequestParam(required = false) Integer toPeriod) {

        return ResponseEntity.ok(labService.advancedSearch(
                semesterId,  dayOfWeek, fromPeriod, toPeriod
        ));
    }

//    @GetMapping("/rooms")
//    @PreAuthorize("hasRole('ROLE_Admin_IT_Officer')")
//    public ResponseEntity<List<RoomDTO>> getAllRooms() {
//        List<RoomDTO> roomDTOs = roomRepository.findAll().stream()
//                .map(room -> new RoomDTO(room.getId(), room.getRoomName()))
//                .toList();
//        return ResponseEntity.ok(roomDTOs);
//    }


    @PutMapping("/update-rooms-bulk")
    @PreAuthorize("hasRole('ROLE_Admin_IT_Officer')")
    public ResponseEntity<String> updateMultipleRooms(@RequestBody BulkRoomUpdateRequest request) {
        labService.updateMultipleRooms(request.getUpdates());
        return ResponseEntity.ok("Cập nhật phòng thành công cho nhiều lớp.");
    }
}
