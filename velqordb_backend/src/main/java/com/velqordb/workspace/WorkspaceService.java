package com.velqordb.workspace;

import com.velqordb.dto.workspace.WorkspaceRequest;
import com.velqordb.dto.workspace.WorkspaceResponse;
import com.velqordb.user.User;
import com.velqordb.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class WorkspaceService {
    private final UserRepository userRepository;
    private final WorkspaceRepository workspaceRepository;

    @Transactional
    public WorkspaceResponse createWorkspace(WorkspaceRequest workspaceRequest, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found"));
        Workspace workspace = new Workspace();
        workspace.setName(workspaceRequest.getName());
        workspace.setUser(user);
        workspaceRepository.save(workspace);
        workspace.setSchemaName("ws_" + workspace.getId());
        workspaceRepository.save(workspace);

        return toResponse(workspace);
    }

    @Transactional(readOnly = true)
    public List<WorkspaceResponse> getWorkspace(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found"));
        List<Workspace> workspaces = workspaceRepository.findByUserId(user.getId());
        return workspaces.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public WorkspaceResponse getWorkspaceById(String username, Long id) {
        Workspace ws = workspaceRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Workspace not found"));

        if (!ws.getUser().getUsername().equals(username)) {
            throw new AccessDeniedException("You do not have permission to access this workspace");
        }
        return toResponse(ws);
    }

    @Transactional
    public WorkspaceResponse updateWorkspaceById(String username, Long id, WorkspaceRequest workspaceRequest) {
        Workspace ws = workspaceRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Workspace not found"));

        if (!ws.getUser().getUsername().equals(username)) {
            throw new AccessDeniedException("You do not have permission to update this workspace");
        }

        ws.setName(workspaceRequest.getName());
        Workspace updatedWorkspace = workspaceRepository.save(ws);
        return toResponse(updatedWorkspace);
    }

    @Transactional
    public void deleteWorkspaceById(String username, Long id) {
        Workspace ws = workspaceRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Workspace not found"));

        if (!ws.getUser().getUsername().equals(username)) {
            throw new AccessDeniedException("You do not have permission to delete this workspace");
        }
        workspaceRepository.delete(ws);
    }

    private WorkspaceResponse toResponse(Workspace ws) {
        WorkspaceResponse response = new WorkspaceResponse();
        response.setId(ws.getId());
        response.setName(ws.getName());
        response.setSchemaName(ws.getSchemaName());
        response.setCreatedAt(ws.getCreatedAt());
        response.setUpdatedAt(ws.getUpdatedAt());
        return response;
    }
}
