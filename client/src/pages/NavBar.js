import { Link } from 'react-router-dom'
import { useState } from 'react'
import TB from '../asserts/logo/TB.jpg'
import person from '../asserts/logo/person.svg'
import arrowdown from '../asserts/logo/down-arrow.svg'
import clock from '../asserts/logo/clock.svg'
import folder from '../asserts/logo/folder.svg'
import avatar from '../asserts/logo/avatar9.png'
import '../css/NavBar.css'

const NavBar = () => {
    const [animate, setAnimate] = useState(false);

    const handleMenuSlide = (e) => {
        let classname = e.target.classList[0];

        if(classname === 'nl__wpr' || classname === 'li__icn__ctr' || classname === 'li__icn' || classname === 'li__txt'){
            setAnimate(!animate);
        }
    }

    return (
        <header>

            <div className='logo__ctr'>
                <img className='logo' src={TB} alt='TaskBoard Logo' />
                <span style={{ display: 'none' }} className='tb__title'>Task Board.</span>
            </div>

            <nav className={`ov__ws__ctr flex-col ${animate && 'slide'}`}>

                <div className='ov__nls__ctr'>

                    <span className='ov__title'>OVERVIEW</span>

                    <ul onClick={(e) => handleMenuSlide(e)} className='nls__wpr nls__wpr__one'>

                        <Link to='#' className='nl__wpr flex-row'>
                            <div className='li__icn__ctr inbox__icn__ctr'><img className='li__icn inbox__icn' src={arrowdown} alt='person icon' /></div>
                            <li className='li__txt inbox__txt'>Inbox</li>
                        </Link>

                        <Link to='/taskboard/home/activity' className='nl__wpr flex-row'>
                            <div className='li__icn__ctr activity__icn__ctr'><img className='li__icn activity__icn' src={clock} alt='person icon' /></div>
                            <li className='li__txt activity__txt'>Activity</li>
                        </Link>

                        <Link to='#' className='nl__wpr flex-row'>
                            <div className='li__icn__ctr member__icn__ctr'><img className='li__icn member__icn' src={person} alt='person icon' /></div>
                            <li className='li__txt member__txt'>Member</li>
                        </Link>

                    </ul>

                </div>

                <div className='ws__nls__ctr'>

                    <span className='ws__title'>WORKSPACE</span>

                    <ul onClick={(e) => handleMenuSlide(e)} className='nls__wpr nls__wpr__two'>

                        <Link to='/taskboard/home/personal/workspace' className='nl__wpr flex-row'>
                            <div className='li__icn__ctr personal__icn__ctr'><img className='li__icn personal__icn' src={folder} alt='person icon' /></div>
                            <li className='li__txt personal__txt'>Personal</li>
                        </Link>

                        <Link to='#' className='nl__wpr flex-row'>
                            <div className='li__icn__ctr team__icn__ctr'><img className='li__icn team__icn' src={folder} alt='person icon' /></div>
                            <li className='li__txt team__txt'>Team</li>
                        </Link>

                        <Link to='#' className='nl__wpr flex-row'>
                            <div className='li__icn__ctr client__icn__ctr'><img className='li__icn client__icn' src={folder} alt='person icon' /></div>
                            <li className='li__txt client__txt'>Clients</li>
                        </Link>

                    </ul>

                </div>

            </nav>


            <div className='profile__hamburger__ctr flex-row'>
            <div className='profile__ctr'>
                <Link to='/taskboard/home/profile'>
                    <div className='profile__img__wpr'>
                        <img className='profile__img' src={avatar} alt='profile' />
                    </div>
                    <div style={{ display: 'none' }} className='short__details__wpr'>
                        <h3 className='person__name'>Amanda</h3>
                        <h5 className='person__designation'>Web Developer</h5>
                    </div>
                </Link>
            </div>


            <div className={`hamburger__menu__ctr ${animate && 'animate__menu'}`} onClick={() => setAnimate(!animate)}>
                <span className='line'></span>
            </div>
            </div>

        </header>
    )
}

export default NavBar