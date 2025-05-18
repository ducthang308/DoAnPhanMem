package com.Backend.DoAnPhanMem.Repository;

import com.Backend.DoAnPhanMem.Models.DutySchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DutyScheduleRepository extends JpaRepository<DutySchedule, Long> {
    @Query("SELECT d FROM DutySchedule d " +
            "WHERE d.semester.startYear = :startYear AND d.semester.endYear = :endYear AND d.week = :week")
    List<DutySchedule> findByYearAndWeek(@Param("startYear") int startYear, @Param("endYear") int endYear, @Param("week") int week);
//    List<DutySchedule> findByYearAndWeek(int startYear, int endYear, int week);
    Optional<DutySchedule> findBySemesterIdAndWeek(Long semesterId, Integer week);
}
