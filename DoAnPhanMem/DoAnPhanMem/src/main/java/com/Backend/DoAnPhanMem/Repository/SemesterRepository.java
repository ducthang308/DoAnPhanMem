package com.Backend.DoAnPhanMem.Repository;

import com.Backend.DoAnPhanMem.Models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SemesterRepository extends JpaRepository<Semester, Long> {
    Semester findByStartYearAndEndYear(Integer startYear, Integer endYear);
}
