import { Link } from 'react-router-dom';
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserDetails, dispatchUserDetailsData } from '../redux/actions/userActions';
import axios from 'axios'
import '../css/ExperienceForm.css'

const ExperienceForm = () => {
    const dispatch = useDispatch();

    const {userDetails } = useSelector(state => state.userReducer);
    const [successMsg, setSuccessMsg] = useState({});

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const {userDetailsId} = userInfo;

    const [education, setEducation] = useState({
        college: "",
        degree: "",
        location: "",
        startDate: "",
        endDate: "",
        userDetailsId: userDetails?._id
    });

    const [errors, setErrors] = useState({});

    const fetchData = () => {
        if(userDetailsId){
            fetchUserDetails(userDetailsId).then((resp) => dispatch(dispatchUserDetailsData(resp.data)));
        }
    }

    const handleForm = (e) => {
        setEducation({ ...education, [e.target.name]: e.target.value });
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        let errors = {};
        for (const item in education) {
            if (education[item].length === 0) {
                errors[item] = 'Please Fill The Field.';
            };
        };

        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            updateEducation(education)
        };
    };

    const updateEducation = async (data) => {
        try {
            const res = await axios.patch('/api/add/college', data)
            setSuccessMsg(res.data);
            fetchData();
        } catch (err) {
            console.log(err)
        };
    }


    return (
        <section id='edu__section'>
            <h1 className='form__title'>Education</h1>
            {successMsg?.message && <span className='form__success__text'>{successMsg.message}</span>}
            <form className='edu__form'>
                <div className='input__label__wpr college__wpr'>
                    <input type='text' id='college__name' name='college' value={education?.college} onChange={(e) => handleForm(e)} placeholder='Ex: Bhavans Degree College' className='college__input form__input' />
                    <label className='form__label' htmlFor='college__name'>College Name</label>
                    {errors?.college && <span className='form__error__text' >{errors?.college}</span>}
                </div>
                <div className='input__label__wpr degree__wpr'>
                    <input type='text' id='degree__name' name='degree' value={education?.degree} onChange={(e) => handleForm(e)} placeholder='Ex: Bachelors in Computer Application' className='degree__input form__input' />
                    <label className='form__label' htmlFor='degree__name'>Degree</label>
                    {errors?.degree && <span className='form__error__text' >{errors?.degree}</span>}
                </div>

                <div className='input__label__wpr location__wpr'>
                    <input type='text' id='loc__name' name='location' value={education?.location} onChange={(e) => handleForm(e)} placeholder='Ex: India' className='loc__input form__input' />
                    <label className='form__label' htmlFor='loc__name'>Location</label>
                    {errors?.location && <span className='form__error__text' >{errors?.location}</span>}
                </div>

                <div className='input__label__wpr se__wpr'>
                    <div className='input__label__wpr start__wpr'>
                        <input type='date' id='start' name='startDate' value={education?.startDate} onChange={(e) => handleForm(e)} className='start__input form__input' />
                        <label className='form__label' htmlFor='start'>Start Date</label>
                        {errors?.startDate && <span className='form__error__text' >{errors?.startDate}</span>}
                    </div>
                    <div className='input__label__wpr end__wpr'>
                        <input type='date' id='end' name='endDate' value={education?.endDate} onChange={(e) => handleForm(e)} className='end__input form__input' />
                        <label className='form__label' htmlFor='end'>End Date</label>
                        {errors?.endDate && <span className='form__error__text' >{errors?.endDate}</span>}
                    </div>
                </div>

                <button onClick={(e) => handleSubmitForm(e)} className='sbt__btn'>Submit</button>
                <Link className='cancel__btn' to='/taskboard/home/profile'>Cancel</Link>

            </form>
        </section>
    );
};

export default ExperienceForm