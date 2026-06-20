package com.velqordb.workspace;

import com.velqordb.dto.workspace.WorkspaceRequest;
import com.velqordb.dto.workspace.WorkspaceResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping(value = "/workspace")
@RequiredArgsConstructor
public class WorkspaceController {
    private final WorkspaceService workspaceService;

    @PostMapping(value = "/create")
    public ResponseEntity<WorkspaceResponse>createWorkspace(@RequestBody WorkspaceRequest workspaceRequest, Principal principal){

        String username = principal.getName();
        WorkspaceResponse workspaceResponse = workspaceService.createWorkspace(workspaceRequest,username);
        return ResponseEntity.status(HttpStatus.CREATED).body(workspaceResponse);
        
    }
}
