import NoTaskCompleted from './NoTaskCompleted'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import '../css/CompletedPanel.css'
import { useState,useEffect } from 'react'

const CompletedPanel = () => {
    const [data, setData] = useState([]);
    const {userPersonalTasks} = useSelector(state => state.userReducer);

    useEffect(() => {
        if(userPersonalTasks){
            setData(userPersonalTasks.completed);
        }
    },[userPersonalTasks]);

    return(
        <section className="tcp__ctr">
            {!data? 
                <NoTaskCompleted/>
            :
            data.map( (item, id) => 
            <div key={id} className='ct__ctr'>
                <span className='timestamp'><span className='ct__date'>{item.completedDate}</span><span className='ct__time'>{item.completedTime}</span></span>
                <br/>
                <div className='tn__btn__wpr' > <h4 className='task__name'>{item.taskName}</h4>
                <Link className='task__view__btn' to={`/taskboard/home/personal/workspace/viewtask/${item._id}`}>View Task</Link></div>
            </div>
            )
            }
        </section>
    )
}

export default CompletedPanel