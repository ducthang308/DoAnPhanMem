package com.Backend.DoAnPhanMem.Services;

import com.Backend.DoAnPhanMem.DTO.ComputerDTO;
import com.Backend.DoAnPhanMem.Models.Computer;

import java.util.List;

public interface IComputerService {
    
    public Computer createComputer(ComputerDTO computer);

    public Computer updateComputer(Long computerId, ComputerDTO computer) throws Exception;

}
