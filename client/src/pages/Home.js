import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import NavBar from './NavBar'
import DashBoard from './DashBoard'
import Profile from './Profile'
import PersonalWorkSpace from './PersonalWorkSpace'
import Activity from './Activity'
import ExperienceForm from './ExperienceForm'
import UpdateExperience from './UpdateExperience'
import EducationForm from './EducationForm'
import UpdateEducation from './UpdateEducation'
import UserDetailsForm from './UserDetailsForm'
import UpdateUserDetails from './UpdateUserDetails'
import '../css/Home.css'


const Home = () => {
    const navigate = useNavigate();

    const location = useLocation();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        if(location.pathname === '/taskboard/home'){
            navigate('/taskboard/home/dashboard');
        };
    },[location, navigate]);

    return (
        <section className='home__section'>
            <NavBar />
            <Routes>
                <Route path='/dashboard' element={<DashBoard />} />
                <Route path='/profile' element={userInfo?.requiredData ? <Profile /> : <Navigate to='/taskboard/home/profile/form' />} />
                <Route path='/profile/form' element={userInfo?.requiredData ? <Navigate to='/taskboard/home/profile' /> : <UserDetailsForm />} />
                <Route path='profile/updateuserdetails' element={<UpdateUserDetails />} />
                <Route path='/profile/experience' element={<ExperienceForm />} />
                <Route path='/profile/updateexperience/:companyId' element={<UpdateExperience />} />
                <Route path='/profile/education' element={<EducationForm />} />
                <Route path='/profile/updateeducation/:collegeId' element={<UpdateEducation />} />
                <Route path='/personal/workspace/*' element={<PersonalWorkSpace />} />
                <Route path='/activity' element={<Activity />} />
            </Routes>
        </section>
    )
}

export default Home