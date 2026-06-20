package com.velqordb.dto.workspace;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class WorkspaceResponse {
    private Long id;
    private String name;
    private String schemaName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
