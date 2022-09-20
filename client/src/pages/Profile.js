import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserDetails, dispatchUserDetailsData } from '../redux/actions/userActions';
import axios from 'axios'
import '../css/Profile.css';
import avatar from '../asserts/avatars/avatar9.png';
import location from '../asserts/icons/location.png';
import edit from '../asserts/icons/edit.png';
import cancel from '../asserts/icons/cancel.png';
import mail from '../asserts/icons/mail.png';
import phone from '../asserts/icons/phone.png';
import birthday from '../asserts/icons/birthday-cake.png';
import suitcase from '../asserts/icons/suitcase.png';
import company from '../asserts/icons/company.png';
import plus from '../asserts/logo/plus.png';
import education from '../asserts/icons/education.png';

const Profile = () => {
    const dispatch = useDispatch();
    
    const [amState, setAMState] = useState(false);
    const [aboutMe, setAboutMe] = useState('');
    const [amError, setAMErrror] = useState('');

    const [successText, setSuccessText] = useState({});

    const [skillState, setSkillState] = useState(false);
    const [skill, setSkill] = useState('');
    const [skillError, setSkillError] = useState('');

    const [langState, setLangState] = useState(false);
    const [language, setLanguage] = useState('');
    const [languageError, setLanguageError] = useState('');

    const { userDetails } = useSelector(state => state.userReducer);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const fetchData = () => {
        if(userInfo?.userDetailsId){
            fetchUserDetails(userInfo?.userDetailsId).then((resp) => dispatch(dispatchUserDetailsData(resp.data)));
        }
    };

    useEffect(() => {
        if (userDetails) {
            setAboutMe(userDetails?.aboutMe)
        }
    }, [userDetails]);

    const dateFormater = (date) => {
        date = new Date(date)
        var d = date.getDate()
        var month = date.getMonth() + 1
        var year = date.getFullYear();
        return `${d}-${month}-${year}`
    };

    const durationCalc = (start, end) => {

        start = new Date(start);
        end = new Date(end);

        const startMonth = start.getMonth() + 1;
        const startYear = start.getFullYear();

        const endMonth = end.getMonth() + 1;
        const endYear = end.getFullYear();

        const totalYears = endYear - startYear;

        let totalMonths;

        if(startYear === endYear){
            totalMonths = endMonth - startMonth;
        }
        else{
            totalMonths = (12 - startMonth) + endMonth;
        }

        if (totalYears > 1) {
            totalMonths = totalMonths + ((totalYears - 1) * 12)
        }

        let totalDuration;

        if (totalMonths <= 12) {
            if (totalMonths === 1) {
                totalDuration = `${totalMonths} Month`
            }
            else {
                totalDuration = `${totalMonths} Months`
            }
        }
        else if (totalMonths > 12) {

            let year = totalMonths / 12;
            let month = totalMonths % 12;
            year = parseInt(year.toFixed(0));
            month = parseInt(month.toFixed(0));

            if (year === 1 && month === 1) {
                totalDuration = `${year} Year ${month} Month`
            }
            else if (year > 1 && month === 1) {
                totalDuration = `${year} Years ${month} Month`
            }
            else if (year === 1 && month > 1) {
                totalDuration = `${year} Year ${month} Months`
            }
            else {
                totalDuration = `${year} Years ${month} Months`
            }
        }
        return totalDuration;
    };

    const monthToString = (date) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        date = new Date(date)

        const month = date.getMonth();
        const year = date.getFullYear();

        const monthString = monthNames[month];

        return `${monthString} ${year}`;
    }


    //Handling About Me
    const handleAboutMeField = (e) => {
        setAboutMe(e.target.value);
    }

    const handleUpdateAboutMe = () => {
        let errors;
        if (aboutMe) {
            updateAboutMe(aboutMe, userDetails?._id);
        }
        else {
            errors = 'Please Fill The Field.'
        };

        setAMErrror(errors);
    };

    const updateAboutMe = async (data, userDetailsId) => {
        try {
            const resp = await axios.patch('/api/updateaboutme', { data, userDetailsId });
            setAMState(!amState);
            setSuccessText({ aboutMe: resp.data.message });
        }
        catch (err) {
            console.log(err)
        }
    }

    //Handling Skill
    const handleSkillField = (e) => {
        setSkill(e.target.value);
    };

    const handleUpdateSkills = () => {
        let error;
        if (skill) {
            updateSkill(skill, userDetails?._id)
        }
        else {
            error = 'Please Fill The Field';
        };

        setSkillError(error);
    };

    const updateSkill = async (data, userDetailsId) => {
        try {
            const resp = await axios.patch('/api/add/skill', { data, userDetailsId })
            setSuccessText({ skill: resp.data.message });
            fetchData();
        } catch (err) {
            console.log(err)
        };
    };

    const handleDeleteSkill = async (e) => {
        if (e.target.className === 'del__btn') {
            const id = e.target.parentElement.getAttribute('data-key');
            try {
                const resp = await axios.patch(`/api/delete/skill/${userDetails?._id}/${id}`);
                setSuccessText({ skill: resp.data.message });
                fetchData();
            } catch (error) {
                console.log(error)
            }
        }
    }

    //Handling Language

    const handleLanguageField = (e) => {
        setLanguage(e.target.value);
    };

    const handleUpdateLanguages = () => {
        let error;
        if (language) {
            updateLanguage(language, userDetails?._id)
        }
        else {
            error = 'Please Fill The Field';
        };

        setLanguageError(error);
    };

    const updateLanguage = async (data, userDetailsId) => {
        try {
            const resp = await axios.patch('/api/add/language', { data, userDetailsId })
            setSuccessText({ language: resp.data.message });
            fetchData();
        } catch (err) {
            console.log(err)
        };
    }

    const handleDeleteLanguage = async (e) => {
        if (e.target.className === 'del__btn') {
            const id = e.target.parentElement.getAttribute('data-key');
            try {
                const resp = await axios.patch(`/api/delete/language/${userDetails?._id}/${id}`)
                setSuccessText({ language: resp.data.message });
                fetchData();
            } catch (error) {
                console.log(error)
            }
        }
    }




    return (
        <section id='profile__section'>

            <div className='ps__ctr ps__ctr__one'>
                <div className='banner__ctr'
                    style={{
                        backgroundImage: "url('https://c1.wallpaperflare.com/preview/427/745/192/notebook-natural-laptop-macbook.jpg')",
                        backgroundPosition: "center",
                        backgroundSize: "cover"
                    }}>

                </div>
                <div className='profile__ctrr'>
                    <img className='profile__image' src={avatar} alt='profile__image' />
                </div>

                <div className='profile__details__ctr'>
                    <h3 className='name'>{userDetails?.displayName}</h3>
                    <span className='com__posi__wpr'>
                        <span className='company__name'>{userDetails?.unicompi}</span>
                        <span className='dott' />
                        <span className='position__name'>{userDetails?.currentPosition}</span>
                    </span>
                    <br />
                    <span className='loc__icon__name__wpr'>
                        <div className='loc__icon__wpr'>
                            <img src={location} alt='location' />
                        </div>
                        <h3 className='loc__name'>{userDetails?.location}</h3>
                    </span>
                </div>

                <div className='profile__btns__ctr'>
                    <button className='add__frnd__btn'>+ Add Friend</button>
                    <button className='spr__btn'>Send Project Request</button>
                </div>
            </div>

            <div className='ps__ctr ps__ctr__two'>
                <div className='ps__ctr__title__btns__wpr about__ctr__title__btns__wpr'>
                    <h3 className='ps__ctr__title'>About Me</h3>
                    <div className='ps__ctr__btns__wpr' onClick={() => setAMState(!amState)}>
                        <img className='edit__image' src={amState ? cancel : edit} alt='edit' />
                    </div>
                </div>
                {amError && <span className='form__error__text'>{amError}</span>}
                {successText?.aboutMe && <span className='success__txt'>{successText?.aboutMe}</span>}
    <textarea rows="4" disabled={!amState} value={aboutMe} onChange={(e) => handleAboutMeField(e)} cols="50" className='about__desc' />
                {amState && <button onClick={() => handleUpdateAboutMe()} className='ps__ctr__save__btn'>Save</button>}
            </div>

            <div className='ps__ctr ps__ctr__three'>
                <div className='ps__ctr__title__btns__wpr'>
                    <h3 className='ps__ctr__title'>Personal Information</h3>
                    <div className='ps__ctr__btns__wpr' >
                        <Link to='/taskboard/home/profile/updateuserdetails'><img className='edit__image' src={edit} alt='edit' /></Link>
                    </div>
                </div>

                <div className='pi__field__ctr'>
                    <div className='pi__field__icn__wpr'>
                        <img className='mail__image' src={mail} alt='mail' />
                    </div>
                    <div className='pi__field__wpr'>
                        <input type='text' value={userDetails?.email || ''} disabled className='pi__input' />
                        <label className='field__label'>Mail</label>
                    </div>
                </div>

                <div className='pi__field__ctr'>
                    <div className='pi__field__icn__wpr'>
                        <img className='phone__image' src={phone} alt='mail' />
                    </div>
                    <div className='pi__field__wpr'>
                        <input type='text' value={userDetails?.phoneNumber || ''} disabled className='pi__input' />
                        <label className='field__label'>Phone Number</label>
                    </div>
                </div>

                <div className='pi__field__ctr'>
                    <div className='pi__field__icn__wpr'>
                        <img className='cake__image' src={birthday} alt='mail' />
                    </div>
                    <div className='pi__field__wpr'>
                        <input type='text' value={dateFormater(userDetails?.dob) || ''} disabled className='pi__input' />
                        <label className='field__label'>Date Of Birth</label>
                    </div>
                </div>

                <hr />

                <div className='pi__field__ctr'>
                    <div className='pi__field__icn__wpr'>
                        <img className='suitcase__image' src={suitcase} alt='mail' />
                    </div>
                    <div className='pi__field__wpr'>
                        <input type='text' value={userDetails?.workType || ''} disabled className='pi__input' />
                        <label className='field__label'>Work Type</label>
                    </div>
                </div>

            </div>

            <div className='ps__ctr ps__ctr__four'>
                <div className='ps__ctr__title__btns__wpr' style={{ display: 'block' }}>
                    <h3 className='ps__ctr__title'>All Experience</h3>
                </div>

                {userDetails?.allExperience?.map((item, id) =>
                    <div key={id} className='expi__field__ctr'>
                        <div className='expi__field__icn__wpr' style={{ borderRadius: '50%' }}>
                            <img className='company__image' src={company} alt='company' />
                        </div>
                        <div className='expi__field__wpr'>
                            <div className='expi__field__left__wpr'>
                                <span className='compi__name'>{item?.company}</span>
                                <br />
                                <span className='posi__name'>{item?.position}</span>
                            </div>
                            <div className='expi__field__right__wpr'>
                                <span className='jt__name'>{item?.workType}</span>
                                <br />
                                <span className='duration'>{durationCalc(item?.startDate, item?.endDate)}</span>
                            </div>
                            <Link to={`/taskboard/home/profile/updateexperience/${id}`} className='edit__image__wpr'>
                                <img className='edit__image' src={edit} alt='edit' />
                            </Link>
                        </div>
                    </div>
                )}

                <div className='plus__link__wpr'>
                    <Link className='plus__image__wpr' to='/taskboard/home/profile/experience'>
                        <img className='plus__image' src={plus} alt='plus' />
                    </Link>
                </div>


            </div>

            <div className='ps__ctr ps__ctr__five'>
                <div className='ps__ctr__title__btns__wpr'>
                    <h3 className='ps__ctr__title'>Education Information</h3>
                </div>

                {userDetails?.allEducation?.map((item, id) =>
                    <div key={id} className='edu__field__ctr'>
                        <div className='edu__field__icn__wpr' style={{ borderRadius: '50%' }}>
                            <img className='certificate__image' src={education} alt='company' />
                        </div>
                        <div className='edu__field__wpr'>
                            <span className='college__name'>{item?.college}</span>
                            <br />
                            <span className='degree__name'>{item?.degree}</span>
                            <div className='edu__field__right__wpr'>
                                <span className='year'>{monthToString(item?.endDate)}</span>
                                <span className='college__loc'>{item?.location}</span>

                            </div>
                            <Link to={`/taskboard/home/profile/updateeducation/${id}`} className='edit__image__wpr'>
                                <img className='edit__image' src={edit} alt='edit' />
                            </Link>
                        </div>
                    </div>
                )}

                <div className='plus__link__wpr'>
                    <Link className='plus__image__wpr' to='/taskboard/home/profile/education'>
                        <img className='plus__image' src={plus} alt='plus' />
                    </Link>
                </div>
            </div>

            <div className='ps__ctr ps__ctr__six'>
                <div className='ps__ctr__title__btns__wpr skills__ctr__title__btns__wpr'>
                    <h3 className='ps__ctr__title'>Skills</h3>
                    <div className='ps__ctr__btns__wpr' onClick={() => setSkillState(!skillState)}>
                        <img className='edit__image' src={skillState ? cancel : edit} alt='edit' />
                    </div>
                </div>
                {successText?.skill && <span className='success__txt'>{successText?.skill}</span>}
                <div onClick={(e) => handleDeleteSkill(e)} className='skills__ctr'>
                    {userDetails?.skills?.map((item, id) =>
                        <div key={id} data-key={item} className='skill__wpr'>
                            <span className='skill__name'>{item}</span>
                            {skillState && <span className='del__btn'>X</span>}
                        </div>
                    )}
                </div>

                {skillState &&
                    <div className='input__btn__wpr'>
                        <input className='skill__input' type='text' value={skill} onChange={(e) => handleSkillField(e)} placeholder='Enter Skill' />
                        <button onClick={() => handleUpdateSkills()} className='add__skill__btn'>Add</button>
                        {skillError && <span style={{ display: 'block' }} className='form__error__text' >{skillError}</span>}
                    </div>
                }
            </div>

            <div className='ps__ctr ps__ctr__seven'>
                <div className='lang__ctr'>
                    <div className='ps__ctr__title__btns__wpr languages__ctr__title__btns__wpr'>
                        <h3 className='ps__ctr__title'>Languages</h3>
                        <div className='ps__ctr__btns__wpr' onClick={() => setLangState(!langState)}>
                            <img className='edit__image' src={langState ? cancel : edit} alt='edit' />
                        </div>
                    </div>
                    {successText?.language && <span className='success__txt'>{successText?.language}</span>}
                    <div onClick={(e) => handleDeleteLanguage(e)} className='language__ctr'>
                        {userDetails?.languages?.map((item, id) =>
                            <div key={id} data-key={item} className='language__wpr'>
                                <span className='language__name'>{item}</span>
                                {langState && <span className='del__btn'>X</span>}
                            </div>
                        )}
                    </div>

                    {langState &&
                        <div className='input__btn__wpr'>
                            <input className='language__input' type='text' value={language} onChange={(e) => handleLanguageField(e)} placeholder='Enter Language' />
                            <button onClick={() => handleUpdateLanguages()} className='add__language__btn'>Add</button>
                            {languageError && <span style={{ display: 'block' }} className='form__error__text' >{languageError}</span>}
                        </div>
                    }
                </div>
            </div>

        </section>
    );
};

export default Profile;