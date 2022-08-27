import { Routes, Route } from 'react-router'
import WorkSpaceDetails from './WorkSpaceDetails'
import WorkSpaceNLs from './WorkSpaceNLs'
import TaskPanel from './TaskPanel'
import CompletedPanel from './CompletedPanel'
import TaskForm from './TaskForm'
import '../css/PersonalWorkSpace.css'

const PersonalWorkSpace = () => {

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
            </Routes>
        </div>
    )
}

export default PersonalWorkSpace