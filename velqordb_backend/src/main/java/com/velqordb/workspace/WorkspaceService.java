package com.velqordb.workspace;

import com.velqordb.dto.workspace.WorkspaceRequest;
import com.velqordb.dto.workspace.WorkspaceResponse;
import com.velqordb.user.User;
import com.velqordb.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class WorkspaceService {
    private final UserRepository userRepository;
    private final WorkspaceRepository workspaceRepository;
    public WorkspaceResponse createWorkspace(WorkspaceRequest workspaceRequest,String username){
        User user = userRepository.findByUsername(username)
                .orElseThrow(()->new UsernameNotFoundException("Username not found"));
        Workspace workspace = new Workspace();
        workspace.setName(workspaceRequest.getName());
        workspace.setUser(user);
        workspaceRepository.save(workspace);
        workspace.setSchemaName("ws_"+workspace.getId());
        workspaceRepository.save(workspace);

        WorkspaceResponse workspaceResponse = new WorkspaceResponse();
        workspaceResponse.setId(workspace.getId());
        workspaceResponse.setSchemaName(workspace.getSchemaName());
        workspaceResponse.setName(workspace.getName());

        return workspaceResponse;
    }

    public List<WorkspaceResponse> getWorkspace(String username){
        User user = userRepository.findByUsername(username)
                .orElseThrow(()->new UsernameNotFoundException("Username not found"));
        List<Workspace> workspaces=workspaceRepository.findByUserId(user.getId());
        List<WorkspaceResponse> workSpace = new ArrayList<>();
        for(Workspace ws:workspaces){
            WorkspaceResponse response = new WorkspaceResponse();
            response.setId(ws.getId());
            response.setName(ws.getName());
            response.setSchemaName(ws.getSchemaName());
            response.setCreatedAt(ws.getCreatedAt());
            response.setUpdatedAt(ws.getUpdatedAt());
            workSpace.add(response);
        }
        return workSpace;
    }
    public WorkspaceResponse getWorkspaceById(String username,Long id){
        Workspace ws = workspaceRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("Workspace not found"));

        if(!ws.getUser().getUsername().equals(username)){
            throw new IllegalArgumentException("Username not match");
        }
        WorkspaceResponse response = new WorkspaceResponse();
        response.setId(ws.getId());
        response.setName(ws.getName());
        response.setSchemaName(ws.getSchemaName());
        response.setCreatedAt(ws.getCreatedAt());
        response.setUpdatedAt(ws.getUpdatedAt());
        return response;
    }
    public  void deleteWorkspaceById(String username,Long id){
        Workspace ws = workspaceRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("Workspace not found"));

        if(!ws.getUser().getUsername().equals(username)){
            throw new IllegalArgumentException("Username not match");
        }
        workspaceRepository.delete(ws);
    }
}
