package com.Backend.DoAnPhanMem.Services;

import com.Backend.DoAnPhanMem.DTO.ScheduleChangeDTO;
import com.Backend.DoAnPhanMem.Models.ScheduleChangeHistory;
import com.Backend.DoAnPhanMem.Models.Users;

import java.util.List;

public interface IScheduleChangeHistoryService {

    public List<ScheduleChangeHistory> findAllScheduleChangeHistory();

    public ScheduleChangeHistory findScheduleChangeHistoryById(Long id);

    public ScheduleChangeHistory createScheduleChangeHistory(Users reqUser, ScheduleChangeDTO scheduleChange) throws Exception;

    public ScheduleChangeHistory updateScheduleChangeHistory(Long id, ScheduleChangeDTO scheduleChange);

    public ScheduleChangeHistory approveScheduleChange(Long id) throws Exception;

    public ScheduleChangeHistory rejectScheduleChange(Long id) throws Exception;

    public List<ScheduleChangeHistory> findByStatus(String status);
}
