package com.velqordb.workspace;

import com.velqordb.dto.MessageResponse;
import com.velqordb.dto.workspace.WorkspaceRequest;
import com.velqordb.dto.workspace.WorkspaceResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(value = "/workspace")
@RequiredArgsConstructor
public class WorkspaceController {
    private final WorkspaceService workspaceService;

    @PostMapping(value = "/create")
    public ResponseEntity<WorkspaceResponse> createWorkspace(@Valid @RequestBody WorkspaceRequest workspaceRequest,
            Principal principal) {

        String username = principal.getName();
        WorkspaceResponse workspaceResponse = workspaceService.createWorkspace(workspaceRequest, username);
        return ResponseEntity.status(HttpStatus.CREATED).body(workspaceResponse);

    }

    @GetMapping(value = "/all")

    public ResponseEntity<List<WorkspaceResponse>> getAllWorkspace(Principal principal) {
        String username = principal.getName();
        List<WorkspaceResponse> allWorkspace = workspaceService.getWorkspace(username);
        return ResponseEntity.status(HttpStatus.OK).body(allWorkspace);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<WorkspaceResponse> getWorkspaceById(@PathVariable Long id, Principal principal) {
        String username = principal.getName();
        WorkspaceResponse workspaceResponse = workspaceService.getWorkspaceById(username, id);
        return ResponseEntity.status(HttpStatus.OK).body(workspaceResponse);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<WorkspaceResponse> updateWorkspaceById(@PathVariable Long id,
            @Valid @RequestBody WorkspaceRequest workspaceRequest,
            Principal principal) {
        String username = principal.getName();
        WorkspaceResponse workspaceResponse = workspaceService.updateWorkspaceById(username, id, workspaceRequest);
        return ResponseEntity.status(HttpStatus.OK).body(workspaceResponse);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<MessageResponse> deleteWorkspaceById(@PathVariable Long id, Principal principal) {
        String username = principal.getName();
        MessageResponse messageResponse = new MessageResponse();
        workspaceService.deleteWorkspaceById(username, id);
        messageResponse.setMessage("Workspace deleted successfully");
        return ResponseEntity.status(HttpStatus.OK).body(messageResponse);
    }
}
