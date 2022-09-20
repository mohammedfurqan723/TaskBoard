import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../css/Form.css'

const Create = () => {
    const [errors, setErrors] = useState({});
    const [successMsg, setSuccessMsg] = useState({});
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const { activationToken } = useParams();
    const {isLoggedIn} = useSelector( (state) => state.userReducer);

    useEffect( () => {
        if(isLoggedIn){
            setLoader(true);
            setTimeout( () => {
                setLoader(false);
                navigate('/taskboard/home');
            },1000)
        }
    },[isLoggedIn,navigate]);

    useEffect(() => {
        if (activationToken) {
            setLoader(true);
            const activationActivation = async () => {
                try {
                    const resp = await axios.post('/api/registration/activation-token', { activationToken: activationToken });
                    setSuccessMsg(resp.data);
                    setTimeout( () => {
                        setLoader(false);
                        navigate('/taskboard/login');
                    },2000);
                }
                catch (err) {
                    console.log(err);
                    setLoader(false);
                };
            };
            activationActivation();
        };
    }, [activationToken,navigate]);

    const handleRegistration = (e) => {
        setLoader(true);
        e.preventDefault();

        let inputValues = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            conformPassword: ''
        };

        const inputs = document.getElementsByTagName('input');
        Array.from(inputs).forEach((input) => {
            inputValues[`${input.name}`] = input.value;
        });

        registerUser(inputValues);

        setLoader(false);
        
    };

    const registerUser = async (payload) => {
        try {
            const resp = await axios.post('/api/registration', payload);
            setSuccessMsg(resp.data);
            setErrors({});
            
        } catch (err) {
            setErrors(err.response.data);
            setSuccessMsg({});

        };
    };

    return (
        <section className='form__section'>

            <div className='form__banner__ctr'></div>

            <div className='form__ctr'>

                <h1 className='form__title'>Create Account.</h1>
                <p className='form__desc'>Enter your email address and password to get access your account.</p>
                {successMsg?.message && <span className='form__success__text'>{successMsg.message}</span>}

                <form>
                    <div className='input__label__wpr first__name__wpr'>
                        <input type='text' name='firstName' id='first__name' className='firstname__input form__input' />
                        <label className='form__label' htmlFor='first__name'>First Name</label>
                        {errors?.firstName && <span className='form__error__text'>{errors.firstName}</span>}
                    </div>


                    <div className='input__label__wpr last__name__wpr'>
                        <input type='text' name='lastName' id='last__name' className='lastname__input form__input' />
                        <label className='form__label' htmlFor='last__name'>Last Name</label>
                        {errors?.lastName && <span className='form__error__text'>{errors.lastName}</span>}
                    </div>


                    <div className='input__label__wpr email__wpr'>
                        <input type='text' name='email' id='email' className='email__input form__input' />
                        <label className='form__label' htmlFor='email'>Email Address</label>
                        {errors?.email && <span className='form__error__text'>{errors.email}</span>}
                    </div>


                    <div className='input__label__wpr password__wpr'>
                        <input type='text' name='password' id='password' className='password__input form__input' />
                        <label className='form__label' htmlFor='password'>Password</label>
                        {errors?.password && <span className='form__error__text'>{errors.password}</span>}
                    </div>


                    <div className='input__label__wpr cpassword__wpr'>
                        <input type='text' name='conformPassword' id='cpassword' className='cpassword__input form__input' />
                        <label className='form__label' htmlFor='cpassword'>Conform Password</label>
                        {errors?.conformPassword && <span className='form__error__text'>{errors.conformPassword}</span>}
                    </div>


                    <div className='input__label__wpr phonenumber__wpr'>
                        <input type='text' name='phoneNumber' id='phonenumber' className='phonenumber__input form__input' />
                        <label className='form__label' htmlFor='phonenumber'>Phone Number</label>
                        {errors?.phoneNumber && <span className='form__error__text'>{errors.phoneNumber}</span>}
                    </div>


                    <div className='btn__create__wpr'>
                        <button onClick={(e) => handleRegistration(e)} className='form__form__btn'>Create</button>
                        <span className='create__text'>Already a TaskBoard member? <Link to='/taskboard/login'>Login</Link></span>
                    </div>

                </form>
                <div className='or__hr__wpr'>
                    <hr />
                    <span className='or__text'>OR</span>
                </div>

                <button className='google__btn'>Google</button>
                <div className={`loader__wrapper ${loader && 'showLoader'}`}>
                    <div className='loader' />
                </div>
            </div>
        </section>
    )
}

export default Create;