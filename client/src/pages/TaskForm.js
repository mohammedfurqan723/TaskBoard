import '../css/TaskForm.css'

const TaskForm = () => {


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


        if(e.target.className === 'add__more__btn'){
            if (e.target.previousElementSibling.lastChild.className !== 'input__alert') {
                if (e.target.previousElementSibling.lastChild.firstChild.value.length === 0) {
                    const span = document.createElement('span');
                    span.setAttribute('class', 'input__alert');
                    span.textContent = 'Please Enter Checkpoint.'
                    e.target.previousElementSibling.appendChild(span);
                }
                else {
                    e.target.previousElementSibling.lastChild.firstChild.setAttribute('disabled','true')
                    const element = createCheckpointInputField();
    
                    e.target.previousElementSibling.appendChild(element);
                }
            }
            else {
                if (e.target.previousElementSibling.lastChild.previousElementSibling.firstChild.value.length > 0) {
                    e.target.previousElementSibling.removeChild(e.target.previousElementSibling.lastChild);
                    e.target.previousElementSibling.lastChild.firstChild.setAttribute('disabled','true')
                    const element = createCheckpointInputField();
    
                    e.target.previousElementSibling.appendChild(element);
                }
            }
        }

        if(e.target.className === 'delete__btn__wpr'){
            console.log(e.target)
            let parent = e.target.parentElement.parentElement;
            let children = e.target.parentElement.parentElement.children.length;
            console.log(children)

            if(parent.lastChild.className !== 'input__alert'){
                if(children > 1){
                    e.target.parentElement.parentElement.removeChild(e.target.parentElement);
                }else{
                    e.target.previousElementSibling.removeAttribute('disabled');
                    e.target.previousElementSibling.value = "";
                }
            }else{
                
                if(e.target.parentElement.nextElementSibling.className === 'input__alert'){
                    parent.removeChild(e.target.parentElement.nextElementSibling);
                }

                if(children > 2){
                    e.target.parentElement.parentElement.removeChild(e.target.parentElement);
                }
                
                if(children === 2){
                    e.target.previousElementSibling.removeAttribute('disabled');
                    e.target.previousElementSibling.value = "";
                }

            }

        }

        
    }

    const createCheckpointInputField = () => {
        const span = document.createElement('span');
        span.setAttribute('class', 'cp__field__btn__wpr');

        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('class', 'cp__field input__field');

        const div = document.createElement('div');
        div.setAttribute('class', 'delete__btn__wpr');
        div.textContent = 'X';

        span.appendChild(input);
        span.appendChild(div);

        return span;
    }

    const handleCheckBoxes = (e) => {
        if(e.target.className === 'tags__label__field__wpr' || e.target.className === 'tags' || e.target.classList[0] === 'tags__label' ){

            const checkBoxes = document.querySelectorAll('.tags');

            checkBoxes.forEach( (checkBox) => {
                if(checkBox.checked){
                    checkBox.parentElement.classList.add('checkbox__active');
                }
                else{
                    checkBox.parentElement.classList.remove('checkbox__active');
                }
            })
        }
    }


    return (
        <section className='tf__section'>
            <div className='tf__form__wpr'>
                <h1 className='tf__title'>Task Details</h1>
                <form>

                    <span className='label__inputfield__wpr'>
                        <input type='text' required className='taskname__field input__field' />
                        <label htmlFor='taskname__field' className='taskname__label label'>Task Name</label>
                    </span>

                    <span className='label__inputfield__wpr'>
                        <textarea rows='4' style={{resize:'none'}} required className='taskdesc__field input__field' />
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
                                <label className='category__label label' htmlFor='category__two'  >Development</label>
                            </span>

                            <span className='category__label__field__wpr'>
                                <input type='radio' id='category__three' className='category' name="task__category" value='buxfix' />
                                <label className='category__label label' htmlFor='category__three' >Development</label>
                            </span>

                        </div>
                    </span>

                    <span onClick={(e) => handleCheckpointInputs(e)} className='cp__title__desc__fields__ctr'>
                        <h3 className='field__title' >Add Checkpoints.</h3>
                        <p className='cp__desc'>Add Checkpoints To Calculate The Progress Of Task.</p>
                        <div className='cp__fields__wpr'>
                            <span className='cp__field__btn__wpr'>
                                <input type='text' className='cp__field input__field' />
                                <div className='delete__btn__wpr'>
                                    X
                                </div>
                            </span>
                        </div>
                        <span className='add__more__btn'>+ Add More</span>
                    </span>

                    <span  className='label__inputfield__wpr' style={{ display: "inherit" }}>
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

                    <span className='label__inputfield__wpr' style={{ display: "inherit" }}>
                        <h3 className='field__title'>Deadline</h3>
                        <p className='dl__desc'>Choose A Date For Completion Of The Task.</p>
                        <input className='date__field' type='date'/>
                    </span>

                </form>
            </div>
        </section>
    )
}

export default TaskForm