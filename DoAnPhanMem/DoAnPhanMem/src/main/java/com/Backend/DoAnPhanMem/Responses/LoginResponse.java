package com.Backend.DoAnPhanMem.Responses;

import lombok.*;

@Data //toString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginResponse {
    private String token;
    private Long rolesId;
    private Long usersId;
    private String fullName;
    private String address;
    private Boolean status;
}
