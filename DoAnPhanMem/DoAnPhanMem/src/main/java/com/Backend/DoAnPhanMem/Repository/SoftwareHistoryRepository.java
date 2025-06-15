package com.Backend.DoAnPhanMem.Repository;

import com.Backend.DoAnPhanMem.Models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SoftwareHistoryRepository extends JpaRepository<SoftwareHistory, Long> {
    List<SoftwareHistory> findByComputer_Id(Long computerId);
}
