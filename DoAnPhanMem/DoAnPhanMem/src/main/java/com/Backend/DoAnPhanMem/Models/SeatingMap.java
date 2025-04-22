package com.Backend.DoAnPhanMem.Models;

import jakarta.persistence.*;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "Seating_Map")
@Entity
public class SeatingMap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "seat_name", nullable = false)
    private String seatName;

    @ManyToOne
    @JoinColumn(name = "computer_id")
    private Computer computer;

    @ManyToOne
    @JoinColumn(name = "practice_schedule_id")
    private PracticeSchedule practiceSchedule;

    @ManyToOne
    @JoinColumn(name = "users_id")
    private Users users;
}
