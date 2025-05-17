package com.Backend.DoAnPhanMem.Services;

import com.Backend.DoAnPhanMem.Models.Semester;
import com.Backend.DoAnPhanMem.Repository.SemesterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SemesterService {

    @Autowired
    private final SemesterRepository semesterRepository;

    public List<Semester> getAllSemesters() {
        return semesterRepository.findAll();
    }

}
