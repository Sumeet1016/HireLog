package com.HireLog.HireLog.Dto.job;

import com.HireLog.HireLog.Entity.ApplicationStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class jobStatusUpdateRequetDto{

    @NotNull(message = "Job status is required")
    private ApplicationStatus status;
}
