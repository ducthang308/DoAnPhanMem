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
@Table(name = "Practice_Schedule")
@Entity
public class Lab {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "class_code")
    private String classCode;

    @Column(name = "subject")
    private String subject;

    @Column(name = "date")
    private String date;

    @Column(name = "from_period")
    private Integer fromPeriod;

    @Column(name = "to_period")
    private Integer toPeriod;

    @Column(name = "effective_date")
    private Date effectiveDate;

    @Column(name = "notes")
    private String notes;

    @ManyToOne
    @JoinColumn(name = "semester_id")
    private Semester semester;

    @ManyToOne
    @JoinColumn(name = "users_id")
    private Users users;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;
}