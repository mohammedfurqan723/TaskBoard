import { Link } from 'react-router-dom';
import { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { fetchUserDetails, dispatchUserDetailsData } from '../redux/actions/userActions';
import '../css/ExperienceForm.css'
import axios from 'axios'

const ExperienceForm = () => {
    const dispatch = useDispatch();

    const {userDetails} = useSelector(state => state.userReducer);
    const [successMsg, setSuccessMsg] = useState({});

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const {userDetailsId} = userInfo;

    const [experience, setExperience] = useState({
        company: "",
        position: "",
        workType: "",
        startDate: "",
        endDate: "",
        userDetailsId:userDetails?._id
    });

    const [errors, setErrors] = useState({});

    const fetchData = () => {
        if(userDetailsId){
            fetchUserDetails(userDetailsId).then((resp) => dispatch(dispatchUserDetailsData(resp.data)));
        }
    }
    

    const handleForm = (e) => {
        setExperience({ ...experience, [e.target.name]: e.target.value });
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        let errors = {};
        for (const item in experience) {
            if (experience[item].length === 0) {
                errors[item] = 'Please Fill The Field.';
            };
        };

        setErrors(errors);

        if(Object.keys(errors).length === 0){
            updateExperience(experience)
        };
    };

    const updateExperience = async (data) => {
        try {
            const res = await axios.patch('/api/add/company', data)
            setSuccessMsg(res.data);
            fetchData();
        } catch (err) {
            console.log(err)
        };
    };


    return (
        <section id='expi__section'>
            <h1 className='form__title'>Experience</h1>
            {successMsg?.message && <span className='form__success__text'>{successMsg.message}</span>}
            <form className='expi__form'>
                <div className='input__label__wpr company__wpr'>
                    <input type='text' id='company__name' name='company' value={experience?.company} onChange={(e) => handleForm(e)} placeholder='Ex: Microsoft' className='company__input form__input' />
                    <label className='form__label' htmlFor='company__name'>Company</label>
                    {errors?.company && <span className='form__error__text' >{errors?.company}</span>}
                </div>
                <div className='input__label__wpr company__wpr'>
                    <input type='text' id='postion__name' name='position' value={experience.position} onChange={(e) => handleForm(e)} placeholder='Ex: Senior Developer' className='position__input form__input' />
                    <label className='form__label' htmlFor='position__name'>Position</label>
                    {errors?.position && <span className='form__error__text' >{errors?.position}</span>}
                </div>

                <div className='input__label__wpr wt__wpr'>
                    <select style={{ background: "transparent" }} id='work__type' name='workType' value={experience.workType} onChange={(e) => handleForm(e)} className='worktype__input form__input'>
                        <option value="">Select</option>
                        <option value='fulltime'>FullTime</option>
                        <option value='contract'>Contract</option>
                        <option value='internship'>Internship</option>
                        <option value='freelance'>Freelance</option>
                    </select>
                    <label className='form__label' htmlFor='work__type'>Work Type</label>
                    {errors?.workType && <span className='form__error__text' >{errors?.workType}</span>}
                </div>

                <div className='input__label__wpr se__wpr'>
                    <div className='input__label__wpr start__wpr'>
                        <input type='date' id='start' name='startDate' value={experience.startDate} onChange={(e) => handleForm(e)} className='start__input form__input' />
                        <label className='form__label' htmlFor='start'>Start Date</label>
                        {errors?.startDate && <span className='form__error__text' >{errors?.startDate}</span>}
                    </div>
                    <div className='input__label__wpr end__wpr'>
                        <input type='date' id='end' name='endDate' value={experience.endDate} onChange={(e) => handleForm(e)} className='end__input form__input' />
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