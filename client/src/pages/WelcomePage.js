import {Link} from 'react-router-dom'
import welcome from '../asserts/banners/welcome.jpg'
import "../css/WelcomePage.css"

const WelcomePage = () => {

    return(
        <section className="wp__section">
            <div className="wp__banner__ctr">
                <img className='wp__banner' src={welcome} alt='welcome banner'/>
            </div>
            <div className="wp__content__ctr">
                <h3 className='welcome__title'>Welcome to TaskBoard.</h3>
                <p className='welcome__desc'>A workspace to keep a track of important tasks and deadline. </p>
                <Link className='login__btn' to='/taskboard/login'>Login</Link>
                <Link className='create__btn' to='/taskboard/registration'>Create Account</Link>

            </div>
        </section>
    )
};

export default WelcomePage;