import { Link, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux'
import { useState} from 'react';
import '../css/ExperienceForm.css'
import axios from 'axios'

const UserDetailsForm = () => {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const {userAuth} = useSelector(state => state.userReducer);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const {userDetailsId} = userInfo;
   
    const handleUserDetails = (e) => {
        e.preventDefault();
        const inputs = document.querySelectorAll('input');
        const selectinput = document.querySelector('select');

        let userState = {
            userDetailsId:userDetailsId,
            phoneNumber:userAuth?.phoneNumber,
            email:userAuth?.email
        };

        let errors = {};

        inputs.forEach( (input) => {
            if(input.value){
                userState[input.name] = input.value
            }
            else{
                errors[input.name] = 'Please Fill The Field.'
            };
        })


        if(selectinput.value){
            userState[selectinput.name] = selectinput.value;
        };

        setErrors(errors);

        if(Object.keys(errors).length === 0){
            console.log(userState)
            handleUserDetailsSubmit(userState);
        };
    };

    const handleUserDetailsSubmit = async(userData) => {
        try{
            await axios.post('/api/userdetails', userData);
            userInfo.requiredData = true;
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            navigate('/taskboard/home/profile');
        }
        catch(err){
            console.log(err)
        }
    };

    return(
        <section id='userdetailsform__section'>
            <h1 className='form__title'>User Details</h1>
            <form className='userdetails__form'>

            <div className='input__label__wpr displayname__wpr'>
                    <input type='text' id='display__name' name='displayName' className='college__input form__input' />
                    <label className='form__label' htmlFor='display__name'>Display Name</label>
                    {errors?.displayName && <span className='form__error__text' >{errors?.displayName}</span>}
                </div>
                
                
                
                <div className='input__label__wpr uc__wpr'>
                <input type='text' id='uc__name' name='unicompi' placeholder='Ex: LP University or Microsoft' className='loc__input form__input' />
                    <label className='form__label' htmlFor='uc__name'>University (or) Company</label>
                    {errors?.unicompi && <span className='form__error__text' >{errors?.unicompi}</span>}
                </div>
                
                
                
                <div className='input__label__wpr cp__wpr'>
                    <input type='text' id='cp__name' name='currentPosition' placeholder='Ex: Student or Web Developer' className='degree__input form__input' />
                    <label className='form__label' htmlFor='cp__name'>Current Position</label>
                    {errors?.currentPosition && <span className='form__error__text' >{errors?.currentPosition}</span>}
                </div>
                
                
                <div className='input__label__wpr location__wpr'>
                <input type='text' id='loc__name' name='location' placeholder='Ex: India' className='loc__input form__input' />
                    <label className='form__label' htmlFor='loc__name'>Location</label>
                    {errors?.location && <span className='form__error__text' >{errors?.location}</span>}
                </div>
                

                
                <div className='input__label__wpr dob__wpr'>
                    <div className='input__label__wpr dob__wpr'>
                        <input type='date' id='dob' name='dob' className='start__input form__input' />
                        <label className='form__label' htmlFor='dob'>Date of Birth</label>
                    </div>
                    {errors?.dob && <span className='form__error__text' >{errors?.dob}</span>}
                </div>
                

                <div className='input__label__wpr wt__wpr'>
                    <div className='input__label__wpr worktype__wpr'>
                        <select id='worktype' style={{background:"transparent"}} name='workType' className='worktype__input form__input' >
                            <option value='none'>None</option>
                            <option value='fulltime'>Fulltime</option>
                            <option value='contract'>Contract</option>
                            <option value='internship'>Internship</option>
                            <option value='freelance'>Freelance</option>
                        </select>
                        <label className='form__label' htmlFor='worktype'>Work Type</label>
                    </div>
                </div>

                <button onClick={(e) => handleUserDetails(e)} className='sbt__btn'>Submit</button>
                <Link className='cancel__btn' to='/taskboard/home'>Cancel</Link>

            </form>
        </section>
    );
};

export default UserDetailsForm;