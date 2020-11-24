import React, { useState, useEffect} from 'react';
import './Sidebar.css';
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SidebarProject from './SidebarProject';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import  CallIcon from '@material-ui/icons/Call';
import  MicIcon from '@material-ui/icons/Mic';
import  HeadsetIcon from '@material-ui/icons/Headset';
import  SettingsIcon from '@material-ui/icons/Settings';
import { Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db, { auth } from './firebase';


function Sidebar() {
    const user = useSelector(selectUser);
    const [projects, setProjects] = useState([]);


useEffect(() => {
   db.collection('projects').onSnapshot(snapshot => (
       setProjects(snapshot.docs.map(doc => ({
           id: doc.id,
           project: doc.data(),
       })))
   ))
}, [])

const handleAddProject = () => {
    const projectName = prompt('Enter a new project name');
    if (projectName) {
        db.collection('projects').add({
            projectName: projectName,
        })
    }
}

    return (
        <div className='sidebar'>
            <div className="sidebar__top">
                <h3>Ambivertcode</h3>
                
            </div>

            <div className="sidebar__Projects">
                <div className="sidebar__ProjectsHeader">
                    <div className="sidebar__header">
                    <AddIcon onClick={handleAddProject} className='sidebar__addProject' /> 
                        <h4>Text Projects</h4>
                    </div>
                    
                </div>
            
                    <div className="sidebar__ProjectsList">
                    {projects.map(({id, project}) => (
                        <SidebarProject key={id} id={id} projectName={project.projectName} />
                    ))}
                       
                        
                    </div>
             </div>
             <div className="sidebar__voice">
                 <SignalCellularAltIcon
                     className='sidebar__voiceIcon'
                     fontSize='large'
                 />
                 <div className="sidebar__voiceInfo">
                     <h3>Voice Connected</h3>
                     <p>Stream</p>
                 </div>
                 <div className="sidebar__voiceIcons">
                     <InfoOutlinedIcon/>
                     <CallIcon/>
                 </div>

             </div>
             <div className="sidebar__profile">
                 <Avatar onClick={() => auth.signOut()} src={user.photo}
                      />
                 <div className="sidebar__profileInfo">
                     <h3>{user.displayName}</h3>
                     <p>#{user.uid.substring(0, 5)}</p>
                 </div>
                 <div className="sidebar__profileIcons">
                    <MicIcon/>
                    <HeadsetIcon/>
                    <SettingsIcon/>
                 </div>
             </div>
        </div>
    )
}

export default Sidebar
