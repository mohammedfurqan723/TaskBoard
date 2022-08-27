import { Routes, Route } from 'react-router-dom'
import NavBar from './NavBar'
import PersonalWorkSpace from './PersonalWorkSpace'
import Activity from './Activity'
import '../css/Home.css'

const Home = () => {
    return(
        <section className='home__section'>
        <NavBar />
            <Routes>
                <Route path='/personal/workspace/*' element={<PersonalWorkSpace/>}/>
                <Route path='/activity' element={<Activity/>}/>
            </Routes>
        </section>
    )
}

export default Home