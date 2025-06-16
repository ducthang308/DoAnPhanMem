package com.Backend.DoAnPhanMem.Services;

import com.Backend.DoAnPhanMem.DTO.UserUsageHistoryDTO;
import com.Backend.DoAnPhanMem.Models.UserUsageHistory;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface IUserUsageHistoryService {

    public UserUsageHistory findUserUsageHistoryById(Long id);

    public List<UserUsageHistory> findAllUserUsageHistory();

    public UserUsageHistory startUsing(UserUsageHistoryDTO userUsageHistory, String token);

    public UserUsageHistory endUse(Long id) throws Exception;
}
