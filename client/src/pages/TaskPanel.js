import NoTask from './NoTask'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import TaskCategory from './TaskCategory'
import '../css/TaskPanel.css'

const TaskPanel = () => {
    const [loader, setLoader] = useState(true)
    const [hasTasks, setHasTasks] = useState(true);

    const { userPersonalTasks } = useSelector(state => state.userReducer);

    useEffect(() => {
        if (userPersonalTasks) {
            if (userPersonalTasks?.development?.length >= 1 || userPersonalTasks?.design?.length >= 1 || userPersonalTasks?.bugfix?.length >= 1) {
                setLoader(false)
                setHasTasks(true);
            }
            else {
                setLoader(false);
                setHasTasks(false);
            }
        }

    }, [userPersonalTasks])

    return (
        <section className="tp__ctr">
            {hasTasks ?
                [
                    userPersonalTasks?.development?.length >= 1 && <TaskCategory key={1} sectionData={userPersonalTasks?.development} sectionName={'Development'} />,
                    userPersonalTasks?.design?.length >= 1 && <TaskCategory key={2} sectionData={userPersonalTasks?.design} sectionName={'Design'} />,
                    userPersonalTasks?.bugfix?.length >= 1 && <TaskCategory key={3} sectionData={userPersonalTasks?.bugfix} sectionName={'Bugfix'} />
                ]
                :
                <NoTask />
            }

            <div className={`loader__wrapper ${loader && 'showLoader'}`}>
                <div className='loader' />
            </div>

        </section>
    )
}

export default TaskPanel