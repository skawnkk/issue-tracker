package com.jane_eno.issue_tracker.service;
import com.jane_eno.issue_tracker.web.dto.response.LabelsResponseDTO;
import org.springframework.stereotype.Service;
import com.jane_eno.issue_tracker.web.dto.response.LabelDTO;

import java.util.ArrayList;
import java.util.Arrays;

@Service
public class LabelService {
    public LabelsResponseDTO read() {
        return LabelsResponseDTO.builder()
                .labelsCount(3)
                .milestonesCount(2)
                .labels(new ArrayList<>(Arrays.asList(
                        new LabelDTO(1L, "bug", "#CCFFCC", "bug fix", true),
                        new LabelDTO(2L, "enhancement", "#99FFFF", "enhancement", false)
                )))
                .build();
    }

    public void create(LabelDTO label) {
    }

    public void update(Long labelId, LabelDTO label) {
    }

    public void delete(Long labelId) {

    }
}
