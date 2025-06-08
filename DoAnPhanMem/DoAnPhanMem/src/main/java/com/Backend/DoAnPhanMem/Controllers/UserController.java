package com.Backend.DoAnPhanMem.Controllers;

import com.Backend.DoAnPhanMem.DTO.UpdateProfileDTO;
import com.Backend.DoAnPhanMem.DTO.UserDTO;
import com.Backend.DoAnPhanMem.Models.Users;
import com.Backend.DoAnPhanMem.Responses.LoginResponse;
import com.Backend.DoAnPhanMem.Services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("${api.prefix}/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserDTO userDTO,
                                      BindingResult result){
        try {
            if (result.hasErrors()) {
                List<String> errorMessage = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errorMessage);
            }
            if(!userDTO.getPassword().equals(userDTO.getRetypePass())){
                return ResponseEntity.badRequest().body("Password and retypepass not same");
            }
            Users user = userService.createUser(userDTO);

            return ResponseEntity.ok(user);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserDTO usersDTO) {
        try {
            LoginResponse responseDTO = userService.login(usersDTO.getEmail(), usersDTO.getPassword());
            return ResponseEntity.ok(responseDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Login failed: " + e.getMessage());
        }
    }

    @GetMapping("")
    @PreAuthorize("hasRole('ROLE_Admin')")
    public ResponseEntity<?> getAllUsers(){
        List<Users> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/active/{id}")
    @PreAuthorize("hasRole('ROLE_Admin')")
    public ResponseEntity<?> updateActive(@PathVariable("id") Long id, @Valid @RequestBody LoginResponse loginResponse) {
        try {
            Users users = userService.updateActive(loginResponse, id);
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/teachers")
    @PreAuthorize("hasRole('ROLE_Training_Officer')")
    public ResponseEntity<List<Map<String, Object>>> getTeachers() {
        List<Users> teachers = userService.getUsersByRoleName("Teacher");

        List<Map<String, Object>> result = teachers.stream()
                .map(u -> Map.<String, Object>of(
                        "id", u.getId(),
                        "fullName", u.getFullName()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }

    @PatchMapping("/profile/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updateProfile(@PathVariable Long id, @Valid @RequestBody UpdateProfileDTO profileDTO) {
        userService.updateProfile(id, profileDTO);
        return ResponseEntity.ok("Update successfully");
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Users> getUserById(@PathVariable Long id) {
        Users user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }
}
