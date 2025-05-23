package com.Backend.DoAnPhanMem.Services;

import com.Backend.DoAnPhanMem.DTO.UserDTO;
import com.Backend.DoAnPhanMem.Exceptions.DataNotFoundException;
import com.Backend.DoAnPhanMem.Exceptions.PermissonDenyException;
import com.Backend.DoAnPhanMem.JWT.JwtToken;
import com.Backend.DoAnPhanMem.Models.Roles;
import com.Backend.DoAnPhanMem.Models.Users;
import com.Backend.DoAnPhanMem.Repository.RoleRepository;
import com.Backend.DoAnPhanMem.Repository.UserRepository;
import com.Backend.DoAnPhanMem.Responses.LoginResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService  implements IUserService{
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtToken jwtToken;
    private final AuthenticationManager authenticationManager;

    @Override
    public Users createUser(UserDTO usersDTO) throws Exception {
        Long roleId = usersDTO.getRolesId();
        if (roleId == null) {
            roleId = 2L;
            usersDTO.setRolesId(roleId);
        }

        String email = usersDTO.getEmail();
        if(userRepository.existsByEmail(email)){
            throw new DataIntegrityViolationException("Phone number already exists");
        }
        Roles role = roleRepository.findById(roleId)
                .orElseThrow(()->new DataNotFoundException("Role not found"));
        if(role.getRoleName().toUpperCase().equals(Roles.Admin)){
            throw new PermissonDenyException("You cannot register an ADMIN account");
        }
        Users newUser = Users.builder()
                .fullName(usersDTO.getFullName())
                .phoneNumber(usersDTO.getPhoneNumber())
                .address(usersDTO.getAddress())
                .email(usersDTO.getEmail())
                .password(usersDTO.getPassword())
                .status(usersDTO.getStatus())
                .build();
        newUser.setRoles(role);
        String password = usersDTO.getPassword();
        String encodedPassword = passwordEncoder.encode(password);
        newUser.setPassword(encodedPassword);
        return userRepository.save(newUser);
    }

    @Override
    public LoginResponse login(String email, String password) throws Exception {
        Optional<Users> users = userRepository.findByEmail(email);
        if (users.isEmpty()) {
            throw new DataNotFoundException("Invalid phone number or password");
        }

        Users existingUser = users.get();

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                email, password, existingUser.getAuthorities()
        );
        // Authenticate with Spring Security
        authenticationManager.authenticate(authenticationToken);

        // Generate token and create response DTO with roleId
        Long id = existingUser.getId();
        String token = jwtToken.generationToken(existingUser);
        Long roleId = existingUser.getRoles().getId();
        email = existingUser.getEmail();
        String name = existingUser.getFullName();
        String address = existingUser.getAddress();
        Boolean status = existingUser.getStatus();

        if (!status){
            throw new BadCredentialsException("Account is banned!");
        }
        else {
            return new LoginResponse(id, token, roleId, email, name, address, status);
        }
    }

    @Override
    public Users updateActive(LoginResponse loginResponse, Long id) throws Exception {
        if (loginResponse.getStatus() == null) {
            throw new IllegalArgumentException("Active status is required");
        }

        Users existingUser = userRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Not found userId: " + id));

        existingUser.setStatus(loginResponse.getStatus());

        return userRepository.save(existingUser);
    }

    @Override
    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    public List<Users> getUsersByRoleName(String roleName) {
        return userRepository.findAll().stream()
                .filter(u -> u.getRoles() != null && roleName.equals(u.getRoles().getRoleName()))
                .collect(Collectors.toList());
    }

}
