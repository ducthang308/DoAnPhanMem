package com.Backend.DoAnPhanMem.Services;

import com.Backend.DoAnPhanMem.DTO.RoomDTO;
import com.Backend.DoAnPhanMem.Exceptions.DataNotFoundException;
import com.Backend.DoAnPhanMem.Models.Room;

import java.util.List;

public interface IRoomService {
    Room createRoom(RoomDTO roomDTO);
    List<Room> getAllRoom(String keyword);
    Room updateRoom(long id, RoomDTO roomDTO);
    void deleteRoom(long id);

}
