import { Link } from 'react-router-dom'
import down from '../asserts/logo/down.png'
import { useDispatch } from 'react-redux';
import { fetchUserPersonalTasks, dispatchUserPersonalTasksData } from "../redux/actions/userActions";
import '../css/TaskBox.css'
import axios from 'axios';

const TaskBox = ({ data, id }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const {userPersonalTasksId} = userInfo;

    const dispatch = useDispatch();

    const handleMenu = (e) => {
        if (e.target.classList[0] === 'tb__dots__wpr') {
            let element = e.target.lastElementChild;

            if (element.classList[1] === 'active__menu')
                element.classList.remove('active__menu')
            else
                element.classList.add('active__menu')
        }

        if (e.target.classList[0] === 'tb__opt__link') {
            e.target.parentElement.parentElement.classList.remove('active__menu')
        }
    }

    const calculateDHM = (endDate) => {

        endDate = new Date(endDate)
        
        let date = endDate.getDate();
        let month = endDate.getMonth();
        let year = endDate.getFullYear();

        let diffTime = Math.abs(new Date(year, month, date+1) - new Date());
        let days = diffTime / (24 * 60 * 60 * 1000);
        let hours = (days % 1) * 24;
        let minutes = (hours % 1) * 60;
        let secs = (minutes % 1) * 60;
        [days, hours, minutes, secs] = [Math.floor(days), Math.floor(hours), Math.floor(minutes), Math.floor(secs)]

        let dtHrMin = ''

        if(days !== 0){
            dtHrMin=dtHrMin.concat(`${days}d `)
        }
        
        if(hours !== 0){
            dtHrMin=dtHrMin.concat(`${hours}h `)
        }

        if(minutes !== 0){
            dtHrMin=dtHrMin.concat(`${minutes}m `)
        }

        return dtHrMin;
    };

    const fetchData = () => {
        fetchUserPersonalTasks(userPersonalTasksId).then( resp => dispatch(dispatchUserPersonalTasksData(resp.data)));
    };

    const moveToCompleted = async(taskCategory, taskId, userPersonalTasksId) => {
        try {
            await axios.patch('/api/update/completed',{taskCategory, taskId, userPersonalTasksId})
            fetchData();
        } catch (err) {
            
        };
    };

    return (
        <div className='tb__ctr'>
            <div className='tb__name__opts__wpr flex-row'>
                <h3 className='tb__name flex-row'><span className='title__dot'></span>{data?.taskName}</h3>
                <div className='dots__arrow__wpr flex-row'>
                    <div className='arrow__wpr icon__wpr'>
                        <img className='arrow__img' src={down} alt='' />
                    </div>
                    <div onClick={(e) => handleMenu(e)} className='tb__dots__wpr icon__wpr flex-row'>
                        <span className='tb__dot'></span>
                        <ul className='tb__opts'>
                            <li className='tb__opt'><Link className='tb__opt__link' to={`/taskboard/home/personal/workspace/viewtask/${data._id}`}>View Task</Link></li>
                            <li className='tb__opt'><Link className='tb__opt__link' to={`/taskboard/home/personal/workspace/edittask/${data._id}`}>Edit Task</Link></li>
                            <li className='tb__opt'><Link className='tb__opt__link' to={`/taskboard/home/personal/workspace/updatetask/${data.taskCategory}/${data._id}`}>Update Task</Link></li>
                            <li className='tb__opt'><Link className='tb__opt__link' to={`/taskboard/home/personal/workspace/deletetask/${data.taskCategory}/${data._id}`}>Delete Task</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='tb__cnt__ctr'>
                <span className='tsk__sht__desc'>{data?.taskDescription}</span>
                <div className='tsk__tags__wpr flex-row'>
                    {/* <span className='tsk__tag tag__one'>New Client</span>
                    <span className='tsk__tag tag__two'>New Project</span>
                    <span className='tsk__tag tag__three'>System Design</span> */}

                    {data?.taskTags.map((item, id) => <span key={id} className={`tsk__tag ${item.toLowerCase()}`} >{item}</span>)}
                </div>

                {/* <div className='tb__profile__ctr flex-row'>
                    <div className='profiles__wpr flex-row'>
                        <div className='profile__wpr profile__wpr__one'><img className='profile__img  profile__img__one' src={avatar} alt='' /></div>
                        <div className='profile__wpr profile__wpr__two'><img className='profile__img  profile__img__two' src={avatar} alt='' /></div>
                        <div className='profile__wpr profile__wpr__three'><img className='profile__img  profile__img__three' src={avatar} alt='' /></div>
                    </div>
                    <div className='cmts__wpr flex-row'>
                        2 Comments
                        <div className='cmt__icn__wpr'>
                            <img className='cmt__icn' src={chat} alt='comment-icn' />
                        </div>
                    </div>
                </div> */}

                <div className='progress__bar__est__ctr flex-row'>
                    <div className='progress__bar__percentage__wpr flex-row'>
                        <div className='progress__bar'><div style={{width:`${data?.taskProgress}%`}} className='progress__fill' /></div> {data?.taskProgress+"%"}
                    </div>
                    <div className='est__wpr'>
                        Est. {calculateDHM(data?.taskDeadline)}
                    </div>
                </div>
                {data?.taskProgress === 100 && <div className='atc__btn__wpr'><button onClick={() => moveToCompleted(data?.taskCategory, data?._id, userPersonalTasksId)} className='atc__btn'>Move To Completed</button></div>}
            </div>
        </div>

    )
}

export default TaskBox