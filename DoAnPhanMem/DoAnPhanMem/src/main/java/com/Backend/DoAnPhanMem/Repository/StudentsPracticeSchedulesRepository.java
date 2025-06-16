package com.Backend.DoAnPhanMem.Repository;

import com.Backend.DoAnPhanMem.Models.StudentsPracticeSchedules;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface StudentsPracticeSchedulesRepository extends CrudRepository<StudentsPracticeSchedules, Long> {
    List<StudentsPracticeSchedules> findAllByUser_Id(Long userId);
}
