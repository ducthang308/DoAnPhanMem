package com.Backend.DoAnPhanMem.Repository;

import com.Backend.DoAnPhanMem.Models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PracticeScheduleRepository extends JpaRepository<PracticeSchedule, Long> {
    @Query("SELECT ps FROM PracticeSchedule ps " +
            "JOIN ps.semester s " +
            "WHERE s.semesterName = :semesterName " +
            "AND s.startYear = :startYear " +
            "AND s.endYear = :endYear")
    List<PracticeSchedule> findBySemesterAndYear(
            @Param("semesterName") String semesterName,
            @Param("startYear") Integer startYear,
            @Param("endYear") Integer endYear
    );

    Object findByUsers_id(Long usersId);

    List<PracticeSchedule> findAllByUsers_id(Long usersId);
}
