import React from 'react';
import { useDispatch } from 'react-redux';
import { setProjectInfo } from './features/appSlice';
import './SidebarProject.css'

function SidebarProject({id, projectName}) {
     const dispatch = useDispatch();

    return (
        <div className="sidebarProject" onClick={() => dispatch(setProjectInfo({
            projectId : id,
            projectName: projectName,
            
        }))}>
           
            <h4><span className="sidebarProject__hash">#</span>{projectName}</h4>
        </div>
    )
}

export default SidebarProject
