package com.Backend.DoAnPhanMem.Controllers;

import com.Backend.DoAnPhanMem.Models.Roles;
import com.Backend.DoAnPhanMem.Services.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/role")
@RequiredArgsConstructor
public class RoleController {
    
    private final RoleService roleService;

    @GetMapping("")
    @PreAuthorize("hasRole('ROLE_Admin')")
    public ResponseEntity<List<Roles>> getAllRoles(){
        List<Roles> roles = roleService.getAllRoles();
        return ResponseEntity.ok(roles);
    }
}
