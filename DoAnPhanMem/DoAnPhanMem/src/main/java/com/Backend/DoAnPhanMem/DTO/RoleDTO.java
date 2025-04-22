package com.Backend.DoAnPhanMem.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data //toString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RoleDTO {
    @JsonProperty("roleName")
    private String roleName;
}
