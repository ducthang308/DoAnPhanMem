package com.Backend.DoAnPhanMem.Services;

import com.Backend.DoAnPhanMem.DTO.StudentsPracticeSchedulesDTO;
import com.Backend.DoAnPhanMem.Models.StudentsPracticeSchedules;
import com.Backend.DoAnPhanMem.Responses.StudentPracticeResponse;

public interface IStudentsPracticeSchedulesService {

    public StudentsPracticeSchedules saveStudentsPracticeSchedules(StudentsPracticeSchedulesDTO request);

    public StudentsPracticeSchedules updateStudentsPracticeSchedules(Long id, StudentsPracticeSchedulesDTO request);

//    public StudentPracticeResponse getStudentsPracticeSchedulesByToken(String token);
}
