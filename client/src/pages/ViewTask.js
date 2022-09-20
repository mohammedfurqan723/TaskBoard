import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios'

const ViewTask = () => {
    const [data, setData] = useState({});
    
    const { taskCategory, id } = useParams();

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
        const radioBtns = document.querySelectorAll('input[type=radio]');
        const checkBoxs = document.querySelectorAll('input[type=checkbox]');

        radioBtns.forEach((input) => {
            if (input.value === taskCategory) {
                input.checked = true;
                input.parentElement.classList.add('radio__active');
            }
        })

        checkBoxs.forEach((checkBox) => {
            if (data?.taskTags?.includes(checkBox.value)) {
                checkBox.checked = true;
                checkBox.parentElement.classList.add('checkbox__active');
            }
        })
    }, [data, taskCategory])



    return (
        <section className='tf__section'>
            <div className='tf__form__wpr'>
                <h1 className='tf__title'>View Task.</h1>
                <form >

                    <span className='label__inputfield__wpr'>
                        <input type='text' name='taskName' defaultValue={data?.taskName} required disabled className='taskname__field input__field' />
                    </span>

                    <span className='label__inputfield__wpr'>
                        <textarea rows='4' name='taskDescription' style={{ resize: 'none' }}  defaultValue={data?.taskDescription} disabled required className='taskdesc__field input__field' />
                    </span>

                    <span className='label__inputfield__wpr' style={{ display: "inherit" }}>
                        <h3 className='field__title'>Task Category.</h3>
                        <div className='category__label__field__ctr'>
                            <span className='category__label__field__wpr'>
                                <input type='radio' id='category__one' className='category' disabled name="task__category" value='development' />
                                <label className='category__label label' htmlFor='category__one' >Development</label>
                            </span>

                            <span className='category__label__field__wpr'>
                                <input type='radio' id='category__two' className='category'  disabled name="task__category" value='design' />
                                <label className='category__label label' htmlFor='category__two'  >Design</label>
                            </span>

                            <span className='category__label__field__wpr'>
                                <input type='radio' id='category__three' className='category' disabled name="task__category" value='bugfix' />
                                <label className='category__label label' htmlFor='category__three' >BugFix</label>
                            </span>

                        </div>
                    </span>


                    <span className='cp__title__desc__fields__ctr'>
                        <h3 className='field__title' >Task Checkpoints.</h3>
                        <p className='cp__desc'>Checkpoints To Calculate The Progress Of Task.</p>
                        <div className='cp__fields__wpr'>
                            {data?.taskCheckpoints?.map((item, id) => 
                                <span key={id} className='cp__field__btn__wpr'>
                                    <input type='text' name='task__checkpoint' defaultValue={item} disabled className='cp__field input__field' />
                                </span>
                            )}
                        </div>
                    </span>

                    <span className='label__inputfield__wpr' style={{ display: "inherit" }}>
                        <h3 className='field__title'>Task Tags.</h3>
                        <p className='tags__desc'>Tags That Matches Your Task</p>
                        <div  className='tags__label__field__ctr'>

                            <span className='tags__label__field__wpr'>
                                <input type='checkbox' id='tags__one' className='tags' name="task__tags" disabled value='Optimalization' />
                                <label className='tags__label label' htmlFor='tags__one' >Optimalization</label>
                            </span>

                            <span className='tags__label__field__wpr'>
                                <input type='checkbox' id='tags__two' className='tags' name="task__tags" disabled value='New Client' />
                                <label className='tags__label label' htmlFor='tags__two'  >New Client</label>
                            </span>

                            <span className='tags__label__field__wpr'>
                                <input type='checkbox' id='tags__three' className='tags' name="task__tags" disabled value='New Project' />
                                <label className='tags__label label' htmlFor='tags__three' >New Project</label>
                            </span>

                            <span className='tags__label__field__wpr'>
                                <input type='checkbox' id='tags__four' className='tags' name="task__tags" disabled value='Design System' />
                                <label className='tags__label label' htmlFor='tags__four' >Design System</label>
                            </span>

                            <span className='tags__label__field__wpr'>
                                <input type='checkbox' id='tags__five' className='tags' name="task__tags" disabled value='Integration' />
                                <label className='tags__label label' htmlFor='tags__five' >Integration</label>
                            </span>

                        </div>
                    </span>

                    <span className='label__inputfield__wpr' style={{ display: "inherit" }}>
                        <h3 className='field__title'>Task Deadline</h3>
                        <p className='dl__desc'>A Date For Completion Of The Task.</p>
                        <input name='taskDate' defaultValue={data?.taskDeadline} disabled className='date__field' type='date' />
                    </span>
                </form>
            </div>
        </section>
    )
};

export default ViewTask