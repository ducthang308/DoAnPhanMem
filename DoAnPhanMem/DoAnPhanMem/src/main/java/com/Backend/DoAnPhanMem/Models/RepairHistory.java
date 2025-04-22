package com.Backend.DoAnPhanMem.Models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "Repair_History")
@Entity
public class RepairHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "computer_id")
    private Computer computer;

    @Column(name = "update_date")
    private Date updateDate;

    @Column(name = "error_name")
    private String errorName;

    @Column(name = "occurred_date")
    private Date occurredDate;

    @Column(name = "repaired_by")
    private String repairedBy;

    @Column(name = "status")
    private String status;

    @Column(name = "notes")
    private String notes;
}
