package com.Backend.DoAnPhanMem.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ScheduleChangeDTO {

    private Integer newDate;

    private Integer newFromPeriod;

    private Integer newToPeriod;

    private String reason;

    private String status;

    private Long practiceScheduleId;

}
