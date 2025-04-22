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
@Table(name = "Maintenance_History")
@Entity
public class MaintenanceHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "computer_id")
    private Computer computer;

    @Column(name = "maintained_by")
    private String maintainedBy;

    @Column(name = "maintenance_date")
    private Date maintenanceDate;

    @Column(name = "content")
    private String content;

    @Column(name = "notes")
    private String notes;
}