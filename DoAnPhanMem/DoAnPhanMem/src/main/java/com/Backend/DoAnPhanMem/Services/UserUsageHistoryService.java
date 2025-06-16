package com.Backend.DoAnPhanMem.Services;

import com.Backend.DoAnPhanMem.DTO.UserUsageHistoryDTO;
import com.Backend.DoAnPhanMem.Models.Computer;
import com.Backend.DoAnPhanMem.Models.UserUsageHistory;
import com.Backend.DoAnPhanMem.Models.Users;
import com.Backend.DoAnPhanMem.Repository.ComputerRepository;
import com.Backend.DoAnPhanMem.Repository.UserUsageHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserUsageHistoryService implements IUserUsageHistoryService {

    private final ComputerRepository computerRepository;

    private final UserUsageHistoryRepository userUsageHistoryRepository;

    private final IUserService userService;


    @Override
    public UserUsageHistory findUserUsageHistoryById(Long id) {
        return this.userUsageHistoryRepository.findById(id).orElse(null);
    }

    @Override
    public List<UserUsageHistory> findAllUserUsageHistory() {
        return this.userUsageHistoryRepository.findAll();
    }

    @Override
    public UserUsageHistory startUsing(UserUsageHistoryDTO userUsageHistory, String token) {
        Computer computer = this.computerRepository.findById(userUsageHistory.getComputerId()).orElseThrow(() -> new RuntimeException("Computer not found with ID: " + userUsageHistory.getComputerId()));
        Users user = this.userService.findUserByToken(token);
        UserUsageHistory userUsageHistoryEntity = new UserUsageHistory();
        userUsageHistoryEntity.setComputer(computer);
        userUsageHistoryEntity.setUser(user);
        userUsageHistoryEntity.setStartAt(LocalDateTime.now());
        userUsageHistoryEntity.setEndAt(null);
        userUsageHistoryEntity.setNotes(userUsageHistory.getNotes());
        return this.userUsageHistoryRepository.save(userUsageHistoryEntity);
    }

    @Override
    public UserUsageHistory endUse(Long id) throws Exception{
        UserUsageHistory existing  = this.userUsageHistoryRepository.findById(id).orElse(null);
        if(existing == null){
            throw new Exception("UserUsageHistory Not Found with id: " + id);
        } else {
            existing.setEndAt(LocalDateTime.now());
        }
        return this.userUsageHistoryRepository.save(existing);
    }
}
