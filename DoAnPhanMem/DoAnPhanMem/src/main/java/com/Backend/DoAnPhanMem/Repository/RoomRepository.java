package com.Backend.DoAnPhanMem.Repository;

import com.Backend.DoAnPhanMem.Models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    @Query("Select DISTINCT r From Room r " +
            "Where (:keyword  IS NULL OR :keyword = '' OR r.roomName LIKE %:keyword%) ")
    List<Room> searchRoom(@Param("keyword") String keyword);
}
