package com.Backend.DoAnPhanMem.DTO;

import lombok.Data;

import java.util.List;

@Data
public class BulkRoomUpdateRequest {
    private List<LabRoomUpdateDTO> updates;
}
