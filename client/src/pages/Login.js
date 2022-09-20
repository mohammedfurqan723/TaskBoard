import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { dispatchLogin } from '../redux/actions/userActions';
import '../css/Form.css'

const Login = () => {
    const [errors, setErrors] = useState({});
    const [successMsg, setSuccessMsg] = useState({});
    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    const handleLogin = (e) => {
        setLoader(true);
        e.preventDefault();

        let inputValues = {
            email: '',
            password: '',
        };

        const inputs = document.getElementsByTagName('input');
        Array.from(inputs).forEach((input) => {
            inputValues[`${input.name}`] = input.value;
        });

        loginUser(inputValues);

    };

    const loginUser = async (payload) => {
        try {
            const resp = await axios.post('/api/login', payload);

            setSuccessMsg(resp.data);
            setErrors({});

            let userInfo = {
                isLoggedIn:true,
            }
            
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            dispatch(dispatchLogin());
            
            setTimeout(() =>{
                setLoader(false);
                navigate('/taskboard/home')
            },2000);

        } catch (err) {

            setErrors(err.response.data);
            setSuccessMsg({});

            setLoader(false);
        };
    };

    return (
        <section className='form__section'>

            <div className='form__banner__ctr'></div>

            <div className='form__ctr'>

                <h1 className='form__title'>Login.</h1>
                <p className='form__desc'>Enter your email address and password to get access your account.</p>
                {successMsg?.message && <span className='form__success__text'>{successMsg.message}</span>}

                <form>
                    <div className='input__label__wpr email__wpr'>
                        <input type='text' id='email' name='email'  className='email__input form__input'/>
                        <label className='form__label' htmlFor='email'>Email Address</label>
                        {errors?.email && <span className='form__error__text'>{errors.email}</span>}
                    </div>

                    <div className='input__label__wpr password__wpr' style={{marginBottom:'8px'}}>
                        <input type='text' id='password' name='password'  className='password__input form__input'/>
                        <label className='form__label' htmlFor='password'>Password</label>
                        {errors?.password && <span className='form__error__text'>{errors.password}</span>}
                    </div>
                    <Link className='forgot__text' to='/taskboard/forgotpassword'>Forgot Password?</Link>

                    <div className='btn__create__wpr'>
                        <button onClick={(e) => handleLogin(e)} className='form__form__btn'>Login</button>
                        <span className='create__text'>Are you new to TaskBoard ? <Link to='/taskboard/create'>Create</Link></span>
                    </div>

                </form>
                <div className='or__hr__wpr'>
                    <hr/>
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

export default Login;