package com.Backend.DoAnPhanMem.DTO;

import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ComputerDTO {
    private Long roomId;
    private String computerName;
    private String operatingSystem;
    private String versions;
    private String mac;
    private String ipv4;
    private String ram;
    private String rom;
    private String cpu;
    private String gpu;
    private Date usageDate;
}
