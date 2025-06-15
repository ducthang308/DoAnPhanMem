package com.Backend.DoAnPhanMem.Services;

import com.Backend.DoAnPhanMem.Models.SoftwareHistory;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface ISoftwareHistoryService {

    public SoftwareHistory findSoftwareHistoryById(@PathVariable Long id);

    public List<SoftwareHistory> findSoftwareHistoryByComputerId(@PathVariable Long computerId);

    public SoftwareHistory createSoftwareHistory(Long computerId, SoftwareHistory softwareHistory) throws Exception;

    public SoftwareHistory updateSoftwareHistory(Long id, SoftwareHistory softwareHistory) throws Exception;
}
