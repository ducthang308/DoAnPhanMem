package com.Backend.DoAnPhanMem.Services;

import com.Backend.DoAnPhanMem.DTO.StudentsPracticeSchedulesDTO;
import com.Backend.DoAnPhanMem.Models.PracticeSchedule;
import com.Backend.DoAnPhanMem.Models.StudentsPracticeSchedules;
import com.Backend.DoAnPhanMem.Models.Users;
import com.Backend.DoAnPhanMem.Repository.PracticeScheduleRepository;
import com.Backend.DoAnPhanMem.Repository.StudentsPracticeSchedulesRepository;
import com.Backend.DoAnPhanMem.Repository.UserRepository;
import com.Backend.DoAnPhanMem.Responses.StudentPracticeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentsPracticeSchedulesService implements IStudentsPracticeSchedulesService {

    private final StudentsPracticeSchedulesRepository studentsPracticeSchedulesRepository;
    private final UserRepository userRepository;
    private final IUserService userService;
    private final PracticeScheduleRepository practiceScheduleRepository;

    @Override
    public StudentsPracticeSchedules saveStudentsPracticeSchedules(StudentsPracticeSchedulesDTO request) {
        Users user = userRepository.findById(request.getUserId()).get();
        PracticeSchedule practiceSchedule = practiceScheduleRepository.findById(request.getPracticeScheduleId()).get();
        StudentsPracticeSchedules studentsPracticeSchedules = new StudentsPracticeSchedules();
        studentsPracticeSchedules.setUser(user);
        studentsPracticeSchedules.setPracticeSchedule(practiceSchedule);
        return studentsPracticeSchedulesRepository.save(studentsPracticeSchedules);
    }

    @Override
    public StudentsPracticeSchedules updateStudentsPracticeSchedules(Long id, StudentsPracticeSchedulesDTO request) {
        StudentsPracticeSchedules existingPracticeSchedule = studentsPracticeSchedulesRepository.findById(id).get();
        Users user = userRepository.findById(request.getUserId()).get();
        PracticeSchedule practiceSchedule = practiceScheduleRepository.findById(request.getPracticeScheduleId()).get();
        existingPracticeSchedule.setUser(user);
        existingPracticeSchedule.setPracticeSchedule(practiceSchedule);
        return studentsPracticeSchedulesRepository.save(existingPracticeSchedule);
    }

//    @Override
//    public StudentPracticeResponse getStudentsPracticeSchedulesByToken(String token) {
//        Users user = this.userService.findUserByToken(token);
//
//    }
}
