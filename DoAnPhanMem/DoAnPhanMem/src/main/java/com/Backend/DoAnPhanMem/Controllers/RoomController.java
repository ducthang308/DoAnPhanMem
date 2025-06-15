package com.Backend.DoAnPhanMem.Controllers;

import com.Backend.DoAnPhanMem.DTO.RoomDTO;
import com.Backend.DoAnPhanMem.Models.Room;
import com.Backend.DoAnPhanMem.Services.RoomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/room")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping("")
    @PreAuthorize("hasAnyRole('ROLE_Admin', 'ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<?> createRoom(@Valid @RequestBody RoomDTO roomDTO, BindingResult result){
        if(result.hasErrors()){
            List<String> errorMessage = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            return ResponseEntity.badRequest().body(errorMessage);
        }
        roomService.createRoom(roomDTO);
        return ResponseEntity.ok("Create Successfully!");
    }

    @GetMapping("")
    @PreAuthorize("hasAnyRole('ROLE_Admin', 'ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<List<Room>> getAllRoom(@RequestParam(defaultValue = "") String keyword){
        List<Room> rooms = roomService.getAllRoom(keyword);
        return ResponseEntity.ok(rooms);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_Admin', 'ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<?> updateRoom(@PathVariable Long id,
                                              @Valid @RequestBody RoomDTO roomDTO)
    {
        roomService.updateRoom(id, roomDTO);
        return ResponseEntity.ok("Update successfully");
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_Admin', 'ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<String> deleteRoom(@PathVariable Long id){
        roomService.deleteRoom(id);
        return ResponseEntity.ok("Delete successfully");
    }
}
