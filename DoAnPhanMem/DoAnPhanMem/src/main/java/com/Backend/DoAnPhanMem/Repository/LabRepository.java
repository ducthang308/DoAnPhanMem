package com.Backend.DoAnPhanMem.Repository;

import com.Backend.DoAnPhanMem.Models.Lab;
import com.Backend.DoAnPhanMem.Models.PracticeSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LabRepository extends JpaRepository<Lab, Long> {
    @Query("SELECT ps FROM PracticeSchedule ps " +
            "WHERE (:semesterName IS NULL OR ps.semester.semesterName = :semesterName) " +
            "AND (:startYear IS NULL OR ps.semester.startYear = :startYear) " +
            "AND (:endYear IS NULL OR ps.semester.endYear = :endYear) " +
            "AND (:dayOfWeek IS NULL OR FUNCTION('DAYOFWEEK', ps.date) = :dayOfWeek) " +
            "AND (:fromPeriod IS NULL OR ps.fromPeriod >= :fromPeriod) " +
            "AND (:toPeriod IS NULL OR ps.toPeriod <= :toPeriod)")
    List<Lab> advancedSearch(@Param("semesterName") String semesterName,
                                          @Param("startYear") Integer startYear,
                                          @Param("endYear") Integer endYear,
                                          @Param("dayOfWeek") Integer dayOfWeek,
                                          @Param("fromPeriod") Integer fromPeriod,
                                          @Param("toPeriod") Integer toPeriod);
}
