package com.jane_eno.issue_tracker.web.dto.response;

import com.jane_eno.issue_tracker.domain.label.Color;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class LabelDTO {

    private final Long id;
    private final String name;
    private final Color color;
    private final String description;
    private final boolean isChecked;
}
