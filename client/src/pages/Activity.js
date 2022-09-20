import '../css/Activity.css';
import axios from 'axios'
import {useState, useEffect} from 'react';

const months = ["January", "February","March","April","May","June","July","August","September","October","November","December"]

function Activity() {
    const [activities, setActivities] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const {userActivitiesId} = userInfo;

    useEffect( () => {
        if(userActivitiesId){
            const fetchActivities = async() => {
                try {
                    const resp = await axios.get(`/api/activity/${userActivitiesId}`)
                    setActivities(resp.data.activities.reverse());
                } catch (err) {
                    console.log(err);
                };
            };
            fetchActivities();
        }
    },[userActivitiesId])
    return (
        <section className="activity__section">
            <h2 className='panel__name activity__name'>Activity</h2>
            {activities?.map((item, id) => 
                <div key={id} className='activity__wpr'>
                <span className='activity__line__desc__wpr'>
                    <span className='short__line' />
                    <span className='activity__desc'>
                        {item?.message}
                    </span>
                </span>
                <span className='activity__time'>
                    {months[item?.month]} {item?.day} {item?.year}
                </span>
            </div>
            )}
        </section>
    );
};

export default Activity;