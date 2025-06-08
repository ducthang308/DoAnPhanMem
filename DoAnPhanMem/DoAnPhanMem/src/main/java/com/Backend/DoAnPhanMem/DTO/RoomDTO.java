package com.Backend.DoAnPhanMem.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RoomDTO {
    @JsonProperty("roomName")
    private String roomName;

    @JsonProperty("floors")
    private Integer floors;
}
