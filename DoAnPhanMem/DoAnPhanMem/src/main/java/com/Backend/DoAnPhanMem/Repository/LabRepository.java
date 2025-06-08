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
    @Query("SELECT l FROM Lab l WHERE "
            + "(:semesterId IS NULL OR l.semester.id = :semesterId) "
            + "AND (:dayOfWeek IS NULL OR l.date = :dayOfWeek) "
            + "AND (:fromPeriod IS NULL OR l.fromPeriod = :fromPeriod) "
            + "AND (:toPeriod IS NULL OR l.toPeriod = :toPeriod)")
    List<Lab> advancedSearch(@Param("semesterId") Long semesterId,
                             @Param("dayOfWeek") Integer dayOfWeek,
                             @Param("fromPeriod") Integer fromPeriod,
                             @Param("toPeriod") Integer toPeriod);
}
