package com.Backend.DoAnPhanMem.Models;

import jakarta.persistence.*;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "Students_Practice_Schedules")
@Entity
public class StudentsPracticeSchedules {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "users_id")
    private Users user;

    @ManyToOne
    @JoinColumn(name = "practice_id")
    private PracticeSchedule practiceSchedule;
}
