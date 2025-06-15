package com.Backend.DoAnPhanMem.Services;

import com.Backend.DoAnPhanMem.Models.Computer;
import com.Backend.DoAnPhanMem.Models.SoftwareHistory;
import com.Backend.DoAnPhanMem.Repository.ComputerRepository;
import com.Backend.DoAnPhanMem.Repository.SoftwareHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SoftwareHistoryService implements ISoftwareHistoryService {

    private final SoftwareHistoryRepository softwareHistoryRepository;

    private final ComputerRepository computerRepository;

    @Override
    public SoftwareHistory findSoftwareHistoryById(Long id) {
        return this.softwareHistoryRepository.findById(id).orElse(null);
    }

    @Override
    public List<SoftwareHistory> findSoftwareHistoryByComputerId(Long computerId) {
        return this.softwareHistoryRepository.findByComputer_Id(computerId);
    }

    @Override
    public SoftwareHistory createSoftwareHistory(Long computerId, SoftwareHistory softwareHistory) throws Exception {
        Optional<Computer> optional = computerRepository.findById(computerId);

        if (optional.isPresent()) {
            Computer computer = optional.get();

            SoftwareHistory newSoftwareHistory = new SoftwareHistory();
            newSoftwareHistory.setComputer(computer);
            newSoftwareHistory.setSoftwareName(softwareHistory.getSoftwareName());
            newSoftwareHistory.setInstallDate(softwareHistory.getInstallDate());
            newSoftwareHistory.setInstalledVersion(softwareHistory.getInstalledVersion());
            newSoftwareHistory.setInstalledBy(softwareHistory.getInstalledBy());

            return this.softwareHistoryRepository.save(newSoftwareHistory);
        } else {
            throw new Exception("computer not found with id " + computerId);
        }
    }

    @Override
    public SoftwareHistory updateSoftwareHistory(Long id, SoftwareHistory softwareHistory) throws Exception {
        Optional<SoftwareHistory> optional = this.softwareHistoryRepository.findById(id);

        if (optional.isPresent()) {
            SoftwareHistory updatedSoftwareHistory = optional.get();

            updatedSoftwareHistory.setSoftwareName(softwareHistory.getSoftwareName());
            updatedSoftwareHistory.setInstallDate(softwareHistory.getInstallDate());
            updatedSoftwareHistory.setInstalledVersion(softwareHistory.getInstalledVersion());
            updatedSoftwareHistory.setInstalledBy(softwareHistory.getInstalledBy());

            return this.softwareHistoryRepository.save(updatedSoftwareHistory);
        } else {
            throw new Exception("softwareHistory not found with id " + id);
        }
    }
}
