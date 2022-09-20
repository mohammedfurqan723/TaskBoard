import { Routes, Route, useNavigate, useLocation } from 'react-router'
import WorkSpaceDetails from './WorkSpaceDetails'
import WorkSpaceNLs from './WorkSpaceNLs'
import TaskPanel from './TaskPanel'
import CompletedPanel from './CompletedPanel'
import TaskForm from './TaskForm'
import EditTask from './EditTask'
import ViewTask from './ViewTask'
import UpdateCP from './UpdateCP'
import '../css/PersonalWorkSpace.css'
import DeleteTask from './DeleteTask'
import { useEffect } from 'react'

const PersonalWorkSpace = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if(location.pathname === '/taskboard/home/personal/workspace'){
            navigate('/taskboard/home/personal/workspace/tasks')
        }
    },[navigate,location])

    const wsDetails = {
        title: "Personal Work Space.",
        desc: "Keep track of your daily tasks, organize multiple lists, and track important deadlines",
    }

    const nls = ["tasks", "completed"]

    return (
        <div className="psnl__ws__ctr">
            <WorkSpaceDetails data={wsDetails} />
            <WorkSpaceNLs panel={'personal'} data={nls} />
            <Routes>
                <Route path='/tasks' element={<TaskPanel/>} />
                <Route path='/completed' element={<CompletedPanel/>} />
                <Route path='/addTask' element={<TaskForm/>} />
                <Route path='/edittask/:id' element={<EditTask/>}/>
                <Route path='/viewtask/:id' element={<ViewTask/>}/>
                <Route path='/updatetask/:taskCategory/:id' element={<UpdateCP/>}/> 
                <Route path='/deletetask/:taskCategory/:id' element={<DeleteTask/>}/>
            </Routes>
        </div>
    )
}

export default PersonalWorkSpace