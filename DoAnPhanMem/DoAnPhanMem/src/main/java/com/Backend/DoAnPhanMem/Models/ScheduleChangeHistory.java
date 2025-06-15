package com.Backend.DoAnPhanMem.Models;

import jakarta.persistence.*;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "Schedule_Change_History")
@Entity
public class ScheduleChangeHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "new_date")
    private Integer newDate;

    @Column(name = "new_from_period", nullable = false)
    private Integer newFromPeriod;

    @Column(name = "new_to_period", nullable = false)
    private Integer newToPeriod;

    @Column(name = "reason", nullable = false)
    private String reason;

    @Column(name = "status", nullable = false)
    private String status;

    @ManyToOne
    @JoinColumn(name = "practice_schedule_id")
    private PracticeSchedule practiceSchedule;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne
    @JoinColumn(name = "users_id")
    private Users users;
}