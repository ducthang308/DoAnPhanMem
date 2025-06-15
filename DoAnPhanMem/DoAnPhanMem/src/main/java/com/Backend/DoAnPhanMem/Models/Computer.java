package com.Backend.DoAnPhanMem.Models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "Computer")
@Entity
public class Computer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @Column(name = "computer_name")
    private String computerName;

    @Column(name = "operating_system")
    private String operatingSystem;

    @Column(name = "versions")
    private String versions;

    @Column(name = "mac")
    private String mac;

    @Column(name = "ipv4")
    private String ipv4;

    @Column(name = "ram")
    private String ram;

    @Column(name = "rom")
    private String rom;

    @Column(name = "cpu")
    private String cpu;

    @Column(name = "gpu")
    private String gpu;

    @Column(name = "usage_date")
    private Date usageDate;
}
