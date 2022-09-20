import "../css/DeleteTask.css";
import {useParams, useNavigate} from 'react-router-dom'
import { useDispatch} from 'react-redux';
import { useEffect, useState } from "react";
import { fetchUserPersonalTasks, dispatchUserPersonalTasksData } from "../redux/actions/userActions";
import axios from 'axios';

const DeleteTask = () => {
    const [successText, setSuccessText] = useState({});
    const [taskName, setTaskName] = useState('');

    const {taskCategory, id} = useParams();


    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const {userPersonalTasksId, userActivitiesId} = userInfo;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(id){
            const getTask = async() =>{
                try {
                    const res = await axios.get(`/api/task/${id}`);
                    setTaskName(res.data.taskName);
                } catch (err) {
                    console.log(err)
                };
            };
            getTask();
        };
    },[id]);


    const fetchData = () => {
        fetchUserPersonalTasks(userPersonalTasksId).then( resp => dispatch(dispatchUserPersonalTasksData(resp.data)));
    }

    const handleDeleteTask = async () => {
        try {
            const res = await axios.delete(`/api/deletetask/${userActivitiesId}/${userPersonalTasksId}/${taskCategory}/${id}/${taskName}`);
            setSuccessText(res.data);
            fetchData();
            navigate('/taskboard/home/personal/workspace/tasks');
        } catch (err) {
            console.log(err)
        }
    }

    const handleCancelDeleteTask = () => {
        navigate('/taskboard/home/personal/workspace/tasks');
    }

    return (
        <section className="dt__section">
            <h1 className='dt__title'>Delete Task.</h1>
            {successText && <h4 className='success__text'>{successText?.message}</h4>}
            <div className='dt__dialogu__box'>
            <p className='dt__desc'>Are You Sure You want to Delete <span className="dt__taskName">{taskName}</span> Task?</p>
            <div className='dt__btns'>
                <button onClick={() => handleDeleteTask()} className='delete__btn'>Delete</button>
                <button onClick={() => handleCancelDeleteTask()} className='cancel__btn'>Cancel</button>
            </div>
            </div>
        </section>
    );
};

export default DeleteTask;
