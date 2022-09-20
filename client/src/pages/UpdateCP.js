import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchUserPersonalTasks, dispatchUserPersonalTasksData } from "../redux/actions/userActions";
import axios from 'axios';


const UpdateCP = () => {
    const [successText, setSuccessText] = useState({});
    const [data, setData] = useState({});
    const { taskCategory, id } = useParams();
    const {  userPersonalTasks } = useSelector(state => state.userReducer);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const {userPersonalTasksId, userActivitiesId} = userInfo;

    const dispatch = useDispatch();

    useEffect(() => {
        if (userPersonalTasks) {
            if (taskCategory === 'development') {
                const taskData = userPersonalTasks?.development.find((item) => item._id === id)
                setData(taskData)
            }
            else if (taskCategory === 'design') {
                const taskData = userPersonalTasks?.design.find((item) => item._id === id)
                setData(taskData)
            }
            else {
                const taskData = userPersonalTasks?.bugfix.find((item) => item._id === id)
                setData(taskData)
            };
        };
    }, [userPersonalTasks, taskCategory, id]);

    useEffect(() => {
        const checkBoxs = document.querySelectorAll('input[type=checkbox]');

        checkBoxs.forEach((checkBox) => {
            if (data?.taskCheckpointsCompleted?.includes(checkBox.value)) {
                checkBox.checked = true;
                checkBox.parentElement.classList.add('checkbox__active');
            };
        });
    }, [data]);

    const fetchData = () => {
        fetchUserPersonalTasks(userPersonalTasksId).then( resp => dispatch(dispatchUserPersonalTasksData(resp.data)));
    };

    const handleCheckBoxes = (e) => {
        if (e.target.className === 'tags__label__field__wpr' || e.target.className === 'tags' || e.target.classList[0] === 'tags__label') {

            const checkBoxes = document.querySelectorAll('.tags');

            checkBoxes.forEach((checkBox) => {
                if (checkBox.checked) {
                    checkBox.parentElement.classList.add('checkbox__active');
                }
                else {
                    checkBox.parentElement.classList.remove('checkbox__active');
                };
            });
        };
    };

    const handleSubmit = () => {

        const inputs = document.getElementsByTagName('input');

        const state = {
            taskCheckpointsCompleted: [],
            taskId: id,
            userActivitiesId:userActivitiesId,
            taskName:data?.taskName,
            taskCategory:data?.taskCategory
        };

        Array.from(inputs).forEach((input) => {
            if (input.checked) {
                state.taskCheckpointsCompleted = [...state.taskCheckpointsCompleted, input.value];
            };

            return state;
        });

        const error = {};

        if (state.taskCheckpointsCompleted.length === 0) {
            error.taskCheckpointsCompleted = "Select Atleast One Checkpoint to Update."
        }

        let totalCP = data?.taskCheckpoints.length;
        let completedCP = state?.taskCheckpointsCompleted.length;

        let tp = Math.floor((completedCP*100)/totalCP);

        state.taskProgress = tp;

        if (Object.keys(error).length === 0) {
            res(state);
        }

    };

    const res = async (state) => {
        try {
            const res = await axios.patch('/api/updatetask', state);
            setSuccessText(res.data);
            fetchData();
        }
        catch (err) {
            console.log(err);
        }
    }


    return (
        <section className='tf__section'>
            <h1 className='tf__title'>Update Task.</h1>
            {successText && <h4 className='success__text'>{successText?.message}</h4>}
            <span className='label__inputfield__wpr' style={{ display: "inherit" }}>
                <h3 className='field__title'>Select Checkpoints.</h3>
                <p className='tags__desc'>Select Checkpoints That You Have Completed.</p>
                <div onClick={(e) => handleCheckBoxes(e)} className='tags__label__field__ctr'>

                    {data && data?.taskCheckpoints?.map((item, id) =>
                        <span key={id} className='tags__label__field__wpr'>
                            <input type='checkbox' id={`tags__${id}`} className='tags' name="task__tags" value={item || ''} />
                            <label className='tags__label label' htmlFor={`tags__${id}`} >{item}</label>
                        </span>
                    )}

                </div>
                <button onClick={() => handleSubmit()} className='tsk__sbt__btn'>Update</button>
            </span>
        </section>
    );
};

export default UpdateCP