package com.Backend.DoAnPhanMem.Services;

import com.Backend.DoAnPhanMem.DTO.UpdateProfileDTO;
import com.Backend.DoAnPhanMem.DTO.UserDTO;
import com.Backend.DoAnPhanMem.Models.Users;
import com.Backend.DoAnPhanMem.Responses.LoginResponse;

import java.util.List;

public interface IUserService {
    Users createUser(UserDTO userDTO) throws Exception;
    LoginResponse login(String email, String password) throws Exception;
//    User updatePass(UpdatePassDTO updatePassDTO, Long id) throws Exception;
//    List<UserDTO> getAllUser();
    Users updateActive(LoginResponse loginResponse, Long id) throws Exception;
    List<Users> getAllUsers();
    Users getUserById(Long id);
    Users updateProfile(Long id, UpdateProfileDTO profileDTO);

}
