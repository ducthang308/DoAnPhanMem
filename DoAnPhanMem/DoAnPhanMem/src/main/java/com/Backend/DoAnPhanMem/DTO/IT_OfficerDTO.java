package com.Backend.DoAnPhanMem.DTO;

public class IT_OfficerDTO {
    private Long id;
    private String fullname;

    public IT_OfficerDTO(Long id, String fullname) {
        this.id = id;
        this.fullname = fullname;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFullname() { return fullname; }
    public void setFullname(String fullname) { this.fullname = fullname; }
}