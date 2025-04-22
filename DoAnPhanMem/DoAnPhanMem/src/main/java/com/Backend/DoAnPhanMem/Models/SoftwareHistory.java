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
@Table(name = "Software_History")
@Entity
public class SoftwareHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "computer_id")
    private Computer computer;

    @Column(name = "software_name", nullable = false)
    private String softwareName;

    @Column(name = "installed_version", nullable = false)
    private String installedVersion;

    @Column(name = "install_date", nullable = false)
    private Date installDate;

    @Column(name = "installed_by", nullable = false)
    private String installedBy;
}
