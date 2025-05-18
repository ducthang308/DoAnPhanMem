package com.Backend.DoAnPhanMem.DTO;

import lombok.*;

@Data //toString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class DutyScheduleRequestDTO {
    private Integer startYear;
    private Integer endYear;
    private Integer week;
    private Integer day;
    private String partDay;
    private Long userId;
}
