package com.Backend.DoAnPhanMem.Controllers;

import com.Backend.DoAnPhanMem.Models.Semester;
import com.Backend.DoAnPhanMem.Services.SemesterService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("${api.prefix}/semesters")
@RequiredArgsConstructor
public class SemesterController {

    private final SemesterService semesterService;

    @GetMapping("")
    @PreAuthorize("hasAnyRole('ROLE_Training_Officer', 'ROLE_Admin_IT_Officer', 'ROLE_Addmin', 'ROLE_IT_Officer')")
    public ResponseEntity<List<Map<String, Object>>> getAllSemesters() {
        List<Semester> semesters = semesterService.getAllSemesters();

        List<Map<String, Object>> result = semesters.stream().map(s -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", s.getId());
            map.put("name", s.getStartYear() + " - " + s.getEndYear()); // năm học
            map.put("semesterName", s.getSemesterName()); // học kỳ
            return map;
        }).toList();

        return ResponseEntity.ok(result);
    }
}

