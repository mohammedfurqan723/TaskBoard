import { useParams } from 'react-router';
import { useDispatch } from 'react-redux'
import { useState, useEffect, useMemo } from 'react';
import { fetchUserPersonalTasks, dispatchUserPersonalTasksData } from "../redux/actions/userActions";
import axios from 'axios';

const EditTask = () => {
    const [formErrors, setFormErrors] = useState({});
    const [successText, setSuccessText] = useState({});
    const [data, setData] = useState({});

    const { id } = useParams();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const { userPersonalTasksId, userActivitiesId } = userInfo;

    const dispatch = useDispatch();

    const fetchData = () => {
        fetchUserPersonalTasks(userPersonalTasksId).then(resp => dispatch(dispatchUserPersonalTasksData(resp.data)));
    };

    useEffect(() => {
        if(id){
            const getTask = async() =>{
                try {
                    const res = await axios.get(`/api/task/${id}`);
                    setData(res.data)
                } catch (err) {
                    console.log(err)
                };
            };
            getTask();
        };
    },[id]);


    useEffect(() => {
        const checkBoxs = document.querySelectorAll('input[type=checkbox]');
        const radioBtns = document.querySelectorAll('input[type=radio]');

        radioBtns.forEach((input) => {
            if (input.value === data?.taskCategory) {
                input.checked = true;
                input.parentElement.classList.add('radio__active');
            }
        });
        checkBoxs.forEach((checkBox) => {
            if (data?.taskTags?.includes(checkBox.value)) {
                checkBox.checked = true;
                checkBox.parentElement.classList.add('checkbox__active');
            }
        })
    }, [data])


    const handleRadioInput = (e) => {
        if (e.target.className === 'category' || e.target.className === 'category__label') {
            const radioFields = document.querySelectorAll('.category');

            radioFields.forEach((radioField) => {
                if (radioField.checked) {
                    radioField.parentElement.classList.add('radio__active');
                }
                else {
                    radioField.parentElement.classList.remove('radio__active');
                };
            });
        };
    };

    const handleCheckpointInputs = (e) => {


        if (e.target.className === 'add__more__btn') {
            if (e.target.previousElementSibling.lastChild.className !== 'input__alert') {
                if (e.target.previousElementSibling.lastChild.firstChild.value.length === 0) {
                    const span = document.createElement('span');
                    span.setAttribute('class', 'input__alert');
                    span.textContent = 'Please Enter Checkpoint.'
                    e.target.previousElementSibling.appendChild(span);
                }
                else {
                    e.target.previousElementSibling.lastChild.firstChild.setAttribute('disabled', 'true')
                    const element = createCheckpointInputField();

                    e.target.previousElementSibling.appendChild(element);
                }
            }
            else {
                if (e.target.previousElementSibling.lastChild.previousElementSibling.firstChild.value.length > 0) {
                    e.target.previousElementSibling.removeChild(e.target.previousElementSibling.lastChild);
                    e.target.previousElementSibling.lastChild.firstChild.setAttribute('disabled', 'true')
                    const element = createCheckpointInputField();

                    e.target.previousElementSibling.appendChild(element);
                }
            }
        }

        if (e.target.className === 'delete__btn__wpr') {
            let parent = e.target.parentElement.parentElement;
            let children = e.target.parentElement.parentElement.children.length;

            if (parent.lastChild.className !== 'input__alert') {
                if (children > 1) {
                    e.target.parentElement.parentElement.removeChild(e.target.parentElement);
                } else {
                    e.target.previousElementSibling.removeAttribute('disabled');
                    e.target.previousElementSibling.value = "";
                }
            } else {

                if (e.target.parentElement.nextElementSibling.className === 'input__alert') {
                    parent.removeChild(e.target.parentElement.nextElementSibling);
                }

                if (children > 2) {
                    e.target.parentElement.parentElement.removeChild(e.target.parentElement);
                }

                if (children === 2) {
                    e.target.previousElementSibling.removeAttribute('disabled');
                    e.target.previousElementSibling.value = "";
                }

            }

        }


    };

    const createCheckpointInputField = () => {
        const span = document.createElement('span');
        span.setAttribute('class', 'cp__field__btn__wpr');

        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('name', 'task__checkpoint')
        input.setAttribute('class', 'cp__field input__field');

        const div = document.createElement('div');
        div.setAttribute('class', 'delete__btn__wpr');
        div.textContent = 'X';

        span.appendChild(input);
        span.appendChild(div);

        return span;
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
                }
            })
        }
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const inputs = document.getElementsByTagName('input');
        const textArea = document.getElementsByTagName('textarea');

        const state = {
            taskName: '',
            taskDescription: '',
            taskCategory: '',
            taskCheckpoints: [],
            taskTags: [],
            taskDeadline: '',
            personalTaskId: userPersonalTasksId,
            prevCategory: data?.taskCategory,
            taskId: id,
            taskProgress:'',
            userActivitiesId:userActivitiesId
        };

        Array.from(inputs).forEach((input) => {
            if (input.name === 'task__checkpoint') {
                state.taskCheckpoints = [...state.taskCheckpoints, input.value];
            };

            if (input.name === 'task__tags' && input.checked) {
                state.taskTags = [...state.taskTags, input.value];
            };

            if (input.name === 'task__category' && input.checked) {
                state.taskCategory = input.value;
            };

            if (input.name === 'taskName') {
                state.taskName = input.value;
            };

            if (input.name === 'taskDate') {
                state.taskDeadline = input.value;
            };

            return state;
        });

        Array.from(textArea).forEach((input) => {

            state.taskDescription = input.value;

            return state;
        });

        const error = {};

        if (state.taskCategory.length === 0) error.taskCategory = "Please Select Task Category."
        if (state.taskCheckpoints[0]?.length === 0) error.taskCheckpoints = "Please Enter Task Check Point."
        if (state.taskTags.length === 0) error.taskTags = "Please Select Task Tags."
        if (state.taskDeadline.length === 0) error.taskDeadline = "Please Select Task Deadline."

        setFormErrors(error);

        let ctp = 0;

        state.taskCheckpoints.map(item => 
            data?.taskCheckpointsCompleted?.includes(item) && (ctp = ctp+1)
        );

        let tp = (ctp*100)/state.taskCheckpoints.length;
        
        state.taskProgress = Math.floor(tp);

        if (Object.keys(error).length === 0) {
            res(state);

            Array.from(inputs).forEach((input) => {
                if (input.name === 'task__checkpoint') {
                    input.value = ''
                };

                if (input.name === 'task__tags' && input.checked) {
                    input.checked = false;
                    input.parentElement.classList.remove('checkbox__active')
                };

                if (input.name === 'task__category' && input.checked) {
                    input.checked = false;
                    input.parentElement.classList.remove('radio__active')
                };

                if (input.name === 'taskName') {
                    input.value = ''
                };

                if (input.name === 'taskDate') {
                    input.value = ''
                };
            });

            Array.from(textArea).forEach((input) => {
                input.value = ''
            });
        }

    };
    
    const res = async (state) => {
        try {
            const resp = await axios.patch('/api/edittask', state);
            setSuccessText(resp.data);

            const parentElement = document.querySelector('.cp__fields__wpr');
            const cpFields = document.querySelectorAll('.cp__field__btn__wpr');

            cpFields.forEach( field => parentElement.removeChild(field));
            fetchData();
        }
        catch (err) {
            console.log(err);
        };
    };

    const createAndPushCP = useMemo(() => {
        const paretElement = document.querySelector('.cp__fields__wpr');
        data?.taskCheckpoints?.forEach( item => {
        const span = document.createElement('span');
        span.setAttribute('class', 'cp__field__btn__wpr');

        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('name', 'task__checkpoint')
        input.setAttribute('class', 'cp__field input__field');
        input.value = item;

        const div = document.createElement('div');
        div.setAttribute('class', 'delete__btn__wpr');
        div.textContent = 'X';

        span.appendChild(input);
        span.appendChild(div);

        paretElement.appendChild(span);
    })
    },[data])


    return (
        <section className='tf__section'>
            <div className='tf__form__wpr'>
                <h1 className='tf__title'>Edit Task</h1>
                {successText && <h4 className='success__text'>{successText?.message}</h4>}
                <form onSubmit={(e) => handleSubmit(e)}>

                    <span className='label__inputfield__wpr'>
                        <input type='text' name='taskName' defaultValue={data?.taskName} required className='taskname__field input__field' />
                        <label htmlFor='taskname__field' className='taskname__label label'>Task Name</label>
                    </span>

                    <span className='label__inputfield__wpr'>
                        <textarea rows='4' name='taskDescription' style={{ resize: 'none' }} defaultValue={data?.taskDescription} required className='taskdesc__field input__field' />
                        <label htmlFor='taskdesc__field' className='taskdesc__label label'>Task Description</label>
                    </span>

                    <span className='label__inputfield__wpr' style={{ display: "inherit" }}>
                        <h3 className='field__title'>Select Task Category.</h3>
                        <div className='category__label__field__ctr' onClick={(e) => handleRadioInput(e)}>
                            <span className='category__label__field__wpr'>
                                <input type='radio' id='category__one' className='category' name="task__category" value='development' />
                                <label className='category__label label' htmlFor='category__one' >Development</label>
                            </span>

                            <span className='category__label__field__wpr'>
                                <input type='radio' id='category__two' className='category' name="task__category" value='design' />
                                <label className='category__label label' htmlFor='category__two'  >Design</label>
                            </span>

                            <span className='category__label__field__wpr'>
                                <input type='radio' id='category__three' className='category' name="task__category" value='bugfix' />
                                <label className='category__label label' htmlFor='category__three' >BugFix</label>
                            </span>

                        </div>
                    </span>
                    {formErrors.taskCategory && <span className='error__text'>{formErrors.taskCategory}</span>}

                    <span onClick={(e) => handleCheckpointInputs(e)} className='cp__title__desc__fields__ctr'>
                        <h3 className='field__title' >Add Checkpoints.</h3>
                        <p className='cp__desc'>Add Checkpoints To Calculate The Progress Of Task.</p>
                        <div className='cp__fields__wpr'>
                            {createAndPushCP}
                        </div>
                        <span className='add__more__btn'>+ Add More</span>
                    </span>
                    {formErrors.taskCheckpoints && <span className='error__text'>{formErrors.taskCheckpoints}</span>}

                    <span className='label__inputfield__wpr' style={{ display: "inherit" }}>
                        <h3 className='field__title'>Select Tags.</h3>
                        <p className='tags__desc'>Choose Tags That Matches Your Task</p>
                        <div onClick={(e) => handleCheckBoxes(e)} className='tags__label__field__ctr'>

                            <span className='tags__label__field__wpr'>
                                <input type='checkbox' id='tags__one' className='tags' name="task__tags" value='Optimalization' />
                                <label className='tags__label label' htmlFor='tags__one' >Optimalization</label>
                            </span>

                            <span className='tags__label__field__wpr'>
                                <input type='checkbox' id='tags__two' className='tags' name="task__tags" value='New Client' />
                                <label className='tags__label label' htmlFor='tags__two'  >New Client</label>
                            </span>

                            <span className='tags__label__field__wpr'>
                                <input type='checkbox' id='tags__three' className='tags' name="task__tags" value='New Project' />
                                <label className='tags__label label' htmlFor='tags__three' >New Project</label>
                            </span>

                            <span className='tags__label__field__wpr'>
                                <input type='checkbox' id='tags__four' className='tags' name="task__tags" value='Design System' />
                                <label className='tags__label label' htmlFor='tags__four' >Design System</label>
                            </span>

                            <span className='tags__label__field__wpr'>
                                <input type='checkbox' id='tags__five' className='tags' name="task__tags" value='Integration' />
                                <label className='tags__label label' htmlFor='tags__five' >Integration</label>
                            </span>

                        </div>
                    </span>
                    {formErrors.taskTags && <span className='error__text'>{formErrors.taskTags}</span>}

                    <span className='label__inputfield__wpr' style={{ display: "inherit" }}>
                        <h3 className='field__title'>Deadline</h3>
                        <p className='dl__desc'>Choose A Date For Completion Of The Task.</p>
                        <input name='taskDate' defaultValue={data?.taskDeadline} className='date__field' type='date' />
                    </span>
                    {formErrors.taskDeadline && <span className='error__text'>{formErrors.taskDeadline}</span>}

                    <button className='tsk__sbt__btn'>Submit</button>

                </form>
            </div>
        </section>
    )
}

export default EditTask;