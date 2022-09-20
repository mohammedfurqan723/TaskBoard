import { Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import { useEffect, useState} from 'react';
import { fetchUserDetails, dispatchUserDetailsData } from '../redux/actions/userActions';
import '../css/ExperienceForm.css'
import axios from 'axios'

const UpdateUserDetails = () => {
    const dispatch = useDispatch();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const {userDetails} = useSelector(state => state.userReducer);

    const [errors, setErrors] = useState({});
    const [successMsg, setSuccessMsg] = useState({});

    const [personalInformation, setPersonalInformation] = useState({
        email:"",
        phoneNumber:"",
        dob:"",
        workType:"",
    });

    const fetchData = () => {
        if(userInfo?.userDetailsId){
            fetchUserDetails(userInfo?.userDetailsId).then((resp) => dispatch(dispatchUserDetailsData(resp.data)));
        }
    }

    useEffect( () => {
        if(userDetails){
            setPersonalInformation({
                email:userDetails?.email,
                phoneNumber:userDetails?.phoneNumber,
                dob:userDetails?.dob,
                workType:userDetails?.workType,
            })
        }
    },[userDetails])


    const handleInputFields = (e) => {
        setPersonalInformation({...personalInformation, [e.target.name]:e.target.value})
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let errors = {};

        for(const item in personalInformation){
            if(item !== 'userDetailsId'){
                if(!personalInformation[item]){
                    errors[item] = 'Please Fill This Field.'
                };
            };
        };

        setErrors(errors);

        if(Object.keys(errors).length === 0){
            handleUserDetailsSubmit(personalInformation, userDetails?._id);
        };
    };


    const handleUserDetailsSubmit = async(userData, userDetailsId) => {
        try{
            const resp = await axios.patch('/api/updatepersonaldetails', {...userData, userDetailsId});
            setSuccessMsg(resp.data);
            fetchData();
        }
        catch(err){
            console.log(err);
        };
    };

    return(
        <section id='userdetailsform__section'>
            <h1 className='form__title'>Personal Information</h1>
            {successMsg?.message && <span className='form__success__text'>{successMsg.message}</span>}
            <form className='userdetails__form'>

            <div className='input__label__wpr email__wpr'>
                    <input type='text' id='email' name='email' value={personalInformation?.email} onChange={(e) => handleInputFields(e)} className='email__input form__input' />
                    <label className='form__label' htmlFor='email'>Email</label>
                    {errors?.email && <span className='form__error__text' >{errors?.email}</span>}
                </div>
                
                
                
                <div className='input__label__wpr phonenumber__wpr'>
                <input type='text' id='phonenumber' name='phoneNumber' value={personalInformation?.phoneNumber} onChange={(e) => handleInputFields(e)} className='phonenumber__input form__input' />
                    <label className='form__label' htmlFor='phonenumber'>Phone Number</label>
                    {errors?.phoneNumber && <span className='form__error__text' >{errors?.phoneNumber}</span>}
                </div>
                 
                <div className='input__label__wpr dob__wpr'>
                    <div className='input__label__wpr dob__wpr'>
                        <input type='date' id='dob' name='dob' value={personalInformation?.dob} onChange={(e) => handleInputFields(e)} className='start__input form__input' />
                        <label className='form__label' htmlFor='dob'>Date of Birth</label>
                    </div>
                    {errors?.dob && <span className='form__error__text' >{errors?.dob}</span>}
                </div>
                
                <div className='input__label__wpr wt__wpr'>
                    <div className='input__label__wpr worktype__wpr'>
                        <select id='worktype' style={{background:"transparent"}} value={personalInformation?.workType} onChange={(e) => handleInputFields(e)} name='workType' className='worktype__input form__input' >
                            <option value='none'>None</option>
                            <option value='fulltime'>Fulltime</option>
                            <option value='contract'>Contract</option>
                            <option value='internship'>Internship</option>
                            <option value='freelance'>Freelance</option>
                        </select>
                        <label className='form__label' htmlFor='worktype'>Work Type</label>
                        {errors?.workType&& <span className='form__error__text' >{errors?.workType}</span>}
                    </div>
                </div>

                <button onClick={(e) => handleSubmit(e)} className='sbt__btn'>Submit</button>
                <Link className='cancel__btn' to='/taskboard/home/profile'>Cancel</Link>

            </form>
        </section>
    );
};

export default UpdateUserDetails;