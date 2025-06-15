package com.Backend.DoAnPhanMem.Services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.Backend.DoAnPhanMem.DTO.ComputerDTO;
import com.Backend.DoAnPhanMem.Models.Room;
import com.Backend.DoAnPhanMem.Repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Backend.DoAnPhanMem.Models.Computer;
import com.Backend.DoAnPhanMem.Repository.ComputerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ComputerService implements IComputerService {

    private final ComputerRepository computerRepository;

    private final RoomRepository roomRepository;

    @Override
    public Computer createComputer(ComputerDTO computer) {
        Room room;
        Optional<Room> roomOptional = roomRepository.findById(computer.getRoomId());

        if (roomOptional.isPresent()) {
            room = roomOptional.get();
        } else {
            throw new RuntimeException("Room Not Found With Id: " + computer.getRoomId());
        }

        Computer newComputer = new Computer();
        newComputer.setRoom(room);
        newComputer.setComputerName(computer.getComputerName());
        newComputer.setCpu(computer.getCpu());
        newComputer.setGpu(computer.getGpu());
        newComputer.setIpv4(computer.getIpv4());
        newComputer.setMac(computer.getMac());
        newComputer.setOperatingSystem(computer.getOperatingSystem());
        newComputer.setRam(computer.getRam());
        newComputer.setRom(computer.getRom());
        newComputer.setUsageDate(computer.getUsageDate());
        newComputer.setVersions(computer.getVersions());

        return this.computerRepository.save(newComputer);
    }

    @Override
    public Computer updateComputer(Long computerId, ComputerDTO computer) throws Exception {

        Optional<Computer> isExist = this.computerRepository.findById(computerId);

        Room room;
        Optional<Room> roomOptional = roomRepository.findById(computer.getRoomId());

        if (roomOptional.isPresent()) {
            room = roomOptional.get();
        } else {
            throw new Exception("Room Not Found With Id: " + computer.getRoomId());
        }

        if (isExist.isPresent()) {
            Computer existing = isExist.get();

            existing.setRoom(room);
            existing.setComputerName(computer.getComputerName());
            existing.setCpu(computer.getCpu());
            existing.setGpu(computer.getGpu());
            existing.setIpv4(computer.getIpv4());
            existing.setMac(computer.getMac());
            existing.setOperatingSystem(computer.getOperatingSystem());
            existing.setRam(computer.getRam());
            existing.setRom(computer.getRom());
            existing.setUsageDate(computer.getUsageDate());
            existing.setVersions(computer.getVersions());

            return this.computerRepository.save(existing);
        } else {
            throw new Exception("Computer not found with id = " + computerId);
        }
    }
}
