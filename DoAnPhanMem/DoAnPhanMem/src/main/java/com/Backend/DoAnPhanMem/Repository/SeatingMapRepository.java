package com.Backend.DoAnPhanMem.Repository;

import com.Backend.DoAnPhanMem.Models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeatingMapRepository extends JpaRepository<SeatingMap, Long> {}
