package com.Backend.DoAnPhanMem.Services;

import com.Backend.DoAnPhanMem.DTO.RoomDTO;
import com.Backend.DoAnPhanMem.Exceptions.DataNotFoundException;
import com.Backend.DoAnPhanMem.Models.Room;
import com.Backend.DoAnPhanMem.Repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class RoomService implements IRoomService {

    private final RoomRepository roomRepository;

    @Override
    public Room createRoom(RoomDTO roomDTO){
        Room room = Room.builder()
                .roomName(roomDTO.getRoomName())
                .floors(roomDTO.getFloors())
                .build();
        return roomRepository.save(room);
    }

    @Override
    public List<Room> getAllRoom(String keyword) {
        return roomRepository.searchRoom(keyword);
    }

    @Override
    public Room updateRoom(long id, RoomDTO roomDTO){
        Room existingRoom = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));
        existingRoom.setRoomName(roomDTO.getRoomName());
        existingRoom.setFloors(roomDTO.getFloors());
        roomRepository.save(existingRoom);
        return existingRoom;
    }

    @Override
    public void deleteRoom(long id) {
        roomRepository.deleteById(id);
    }
}
