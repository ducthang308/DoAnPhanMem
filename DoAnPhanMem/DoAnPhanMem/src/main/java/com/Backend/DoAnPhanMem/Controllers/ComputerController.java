package com.Backend.DoAnPhanMem.Controllers;

import com.Backend.DoAnPhanMem.DTO.ComputerDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.Backend.DoAnPhanMem.Models.Computer;
import com.Backend.DoAnPhanMem.Repository.ComputerRepository;
import com.Backend.DoAnPhanMem.Services.IComputerService;

import com.cloudinary.http44.api.Response;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("${api.prefix}/computer")
@AllArgsConstructor
public class ComputerController {
    
    private final IComputerService computerService;

    private final ComputerRepository computerRepository;

    @PostMapping("")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<?> createComputer(@RequestBody ComputerDTO computer) {
        return ResponseEntity.ok(this.computerService.createComputer(computer));
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<?> updateComputer(@PathVariable Long id, @RequestBody ComputerDTO computer) throws Exception {
        return ResponseEntity.ok(this.computerService.updateComputer(id, computer));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<?> deleteComputer(@PathVariable Long id) {
        this.computerRepository.deleteById(id);
        return ResponseEntity.ok("Deleted!");
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<?> getComputer(@PathVariable Long id) {
        Optional<Computer> computer = this.computerRepository.findById(id);
        if (computer.isPresent()) {
            return ResponseEntity.ok(computer.get());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<?> getComputers() {
        return ResponseEntity.ok(this.computerRepository.findAll());
    }

    @GetMapping("/getByRoom/{idRoom}")
    @PreAuthorize("hasAnyRole('ROLE_Admin_IT_Officer', 'ROLE_IT_Officer')")
    public ResponseEntity<?> getComputersByRoomId(@PathVariable Long idRoom) {
        List<Computer> computers = this.computerRepository.findByRoom_id(idRoom);
        return ResponseEntity.ok(computers);
    }
}
