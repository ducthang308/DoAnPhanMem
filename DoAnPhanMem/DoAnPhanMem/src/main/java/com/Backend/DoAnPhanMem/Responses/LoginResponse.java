package com.Backend.DoAnPhanMem.Responses;

import com.Backend.DoAnPhanMem.Models.Users;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data //toString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginResponse {
    private Long id;

    private String token;

    @JsonProperty("roles_id")
    private Long rolesId;



    @JsonProperty("email")
    private String email;

    @JsonProperty("full_name")
    private String fullName;

    @JsonProperty("address")
    private String address;

    @JsonProperty("status")
    private Boolean status;

    public static LoginResponse fromUser(Users users){
        LoginResponse loginResponse = LoginResponse.builder()
                .email(users.getEmail())
                .fullName(users.getFullName())
                .address(users.getAddress())
                .status(users.getStatus())
                .rolesId(users.getRoles().getId())
                .build();
        return loginResponse;
    }
}
