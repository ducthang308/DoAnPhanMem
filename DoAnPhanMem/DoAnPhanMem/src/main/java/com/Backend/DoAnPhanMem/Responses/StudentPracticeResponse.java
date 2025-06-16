package com.Backend.DoAnPhanMem.Responses;

import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Data //toString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentPracticeResponse {
    private Long id;
    private String classCode;
    private String subject;
    private int date;
    private int fromPeriod;
    private int toPeriod;
    private String lecturerName;
    private String roomName;
    private Date effectiveDate;
    private String notes;
}
