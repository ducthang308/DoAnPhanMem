package com.Backend.DoAnPhanMem.DTO;

import com.Backend.DoAnPhanMem.Models.Computer;
import com.Backend.DoAnPhanMem.Models.Users;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.util.Date;

@Data //toString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserUsageHistoryDTO {

    private Long computerId;

    private Date startAt;

    private String notes;
}
