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
    @Query("SELECT d FROM DutySchedule d WHERE d.semester.semesterName = :semesterName AND d.week = :week")
    List<DutySchedule> findBySemesterNameAndWeek(@Param("semesterName") String semesterName, @Param("week") int week);
    Optional<DutySchedule> findBySemesterIdAndWeek(Long semesterId, Integer week); Optional<DutySchedule> findBySemesterIdAndWeekAndDayAndPartDay(
            Long semesterId,
            Integer week,
            Integer day,
            String partDay
    );
}
