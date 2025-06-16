package com.Backend.DoAnPhanMem.Repository;

import com.Backend.DoAnPhanMem.Models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserUsageHistoryRepository extends JpaRepository<UserUsageHistory, Long> {
    List<UserUsageHistory> findAllByComputer_Id(Long computerId);

    List<UserUsageHistory> findTop10ByComputer_IdOrderByIdDesc(Long computerId);

}
