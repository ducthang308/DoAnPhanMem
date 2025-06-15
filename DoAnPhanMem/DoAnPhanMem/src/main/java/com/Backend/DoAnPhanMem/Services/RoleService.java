package com.Backend.DoAnPhanMem.Services;

import com.Backend.DoAnPhanMem.Models.Roles;
import com.Backend.DoAnPhanMem.Repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleService implements IRoleService{
    
    private final RoleRepository roleRepository;

    @Override
    public List<Roles> getAllRoles() {
        return roleRepository.findAll();
    }
}
