package com.Backend.DoAnPhanMem.Services;

import com.Backend.DoAnPhanMem.DTO.ScheduleChangeDTO;
import com.Backend.DoAnPhanMem.Models.PracticeSchedule;
import com.Backend.DoAnPhanMem.Models.Room;
import com.Backend.DoAnPhanMem.Models.ScheduleChangeHistory;
import com.Backend.DoAnPhanMem.Models.Users;
import com.Backend.DoAnPhanMem.Repository.PracticeScheduleRepository;
import com.Backend.DoAnPhanMem.Repository.RoomRepository;
import com.Backend.DoAnPhanMem.Repository.ScheduleChangeHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ScheduleChangeHistoryService implements IScheduleChangeHistoryService {

    private final ScheduleChangeHistoryRepository scheduleChangeHistoryRepository;

    private final RoomRepository roomRepository;

    private final PracticeScheduleRepository practiceScheduleRepository;

    @Override
    public List<ScheduleChangeHistory> findAllScheduleChangeHistory() {
        return this.scheduleChangeHistoryRepository.findAll();
    }

    @Override
    public ScheduleChangeHistory findScheduleChangeHistoryById(Long id) {
        return this.scheduleChangeHistoryRepository.findById(id).orElse(null);
    }

    @Override
    public ScheduleChangeHistory createScheduleChangeHistory(Users reqUser, ScheduleChangeDTO scheduleChange) throws Exception {
//        Room room;
        PracticeSchedule practiceSchedule;

//        Optional<Room> optRoom = this.roomRepository.findById(scheduleChange.getRoomId());
//        if (optRoom.isPresent()) {
//            room = optRoom.get();
//        } else {
//            throw new Exception("Room Not Found with id: " + scheduleChange.getRoomId());
//        }

        Optional<PracticeSchedule> optionalPracticeSchedule = this.practiceScheduleRepository.findById(scheduleChange.getPracticeScheduleId());
        if (optionalPracticeSchedule.isPresent()) {
            practiceSchedule = optionalPracticeSchedule.get();
        } else {
            throw new Exception("PracticeSchedule Not Found with id: " + scheduleChange.getPracticeScheduleId());
        }

        ScheduleChangeHistory scheduleChangeHistory = new ScheduleChangeHistory();
//        scheduleChangeHistory.setRoom(room);
        scheduleChangeHistory.setPracticeSchedule(practiceSchedule);
        scheduleChangeHistory.setUsers(reqUser);
        scheduleChangeHistory.setStatus("pending");
        scheduleChangeHistory.setNewDate(scheduleChange.getNewDate());
        scheduleChangeHistory.setNewFromPeriod(scheduleChange.getNewFromPeriod());
        scheduleChangeHistory.setNewToPeriod(scheduleChange.getNewToPeriod());
        scheduleChangeHistory.setReason(scheduleChange.getReason());

        return this.scheduleChangeHistoryRepository.save(scheduleChangeHistory);
    }

    @Override
    public ScheduleChangeHistory updateScheduleChangeHistory(Long id, ScheduleChangeDTO scheduleChange) {
        return null;
    }

    @Override
    public ScheduleChangeHistory approveScheduleChange(Long id) throws Exception{
        ScheduleChangeHistory existing = this.scheduleChangeHistoryRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setStatus("approved");

            PracticeSchedule practiceSchedule = existing.getPracticeSchedule();
            practiceSchedule.setFromPeriod(existing.getNewFromPeriod());
            practiceSchedule.setToPeriod(existing.getNewToPeriod());
            practiceSchedule.setDate(existing.getNewDate());

            this.scheduleChangeHistoryRepository.save(existing);
            this.practiceScheduleRepository.save(practiceSchedule);

            return existing;
        } else {
            throw new Exception("Schedule Change History Not Found with id: " + id);
        }
    }

    @Override
    public ScheduleChangeHistory rejectScheduleChange(Long id) throws Exception{
        ScheduleChangeHistory existing = this.scheduleChangeHistoryRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setStatus("rejected");
            return this.scheduleChangeHistoryRepository.save(existing);
        } else {
            throw new Exception("Schedule Change History Not Found with id: " + id);
        }
    }

    @Override
    public List<ScheduleChangeHistory> findByStatus(String status) {
        return this.scheduleChangeHistoryRepository.findScheduleChangeHistoriesByStatus(status);
    }
}
