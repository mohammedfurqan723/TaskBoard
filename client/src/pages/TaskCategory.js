import { useEffect } from 'react'
import plus from '../asserts/logo/plus.png'
import down from '../asserts/logo/down.png'
import Taskbox from './TaskBox'
import accordion from '../scripts/accordins'
import '../css/TaskCategory.css'


const TaskCategory = ({ section }) => {

    useEffect( () => {
        const taskCategorys = document.querySelectorAll('.task__category__ctr');
        const taskBoxes = document.querySelectorAll('.tb__ctr')
        
        taskCategorys.forEach( (taskCategory) => {
            let taskCategoryHeight = taskCategory.clientHeight;
            taskCategory.style.maxHeight = taskCategoryHeight+'px';
        });

        taskBoxes.forEach((taskBox) => {
            let taskBoxHeight = taskBox.clientHeight;
            taskBox.style.maxHeight = taskBoxHeight+'px';
        });

    },[]);

    function handleEvent(e){
        accordion(e);
    };


    return (
        <div onClick={(e) => handleEvent(e)} className='task__category__ctr'>
            <div className='category__title__addbtn__arrow__wpr flex-row'>
                <span className='category__title'>{section?.taskSection}</span>
                <div className='addbtn__arrow__wpr flex-row'>
                    <div className='arrow__wpr icon__wpr'>
                        <img className='arrow__img' src={down} alt='' />
                    </div>
                    <div className='addbtn__wpr icon__wpr'>
                        <img className='add__img' src={plus} alt='' />
                    </div>
                </div>
            </div>
            {section?.taskList.map((item, id) => <Taskbox key={id} data={item} />)}
        </div>
    )
}

export default TaskCategory