package com.Backend.DoAnPhanMem.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data //toString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DutyScheduleDTO {
    private Long id;
    private Integer day;
    private Integer week;
    private String partDay;
    private Long semesterId;
    private String semesterName;
    private String year;
    private Long userId;
    private String username;

}
