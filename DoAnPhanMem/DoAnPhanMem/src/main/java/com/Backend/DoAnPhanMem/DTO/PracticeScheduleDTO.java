package com.Backend.DoAnPhanMem.DTO;

import lombok.Data;

import java.util.Date;

@Data
public class PracticeScheduleDTO {
    private String classCode;
    private String subject;
    private Integer date;
    private Integer fromPeriod;
    private Integer toPeriod;
    private Date effectiveDate;
    private String notes;
    private Long semesterId;
    private Long userId;
    private Long roomId;
}
