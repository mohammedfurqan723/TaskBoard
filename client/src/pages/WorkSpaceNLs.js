import {NavLink, Link} from 'react-router-dom'
import '../css/WorkSpaceNLs.css'

const WorkSpaceNLs = ({ panel, data }) => {
    return (
        <div className='panel__nls__ctr'>
            <ul className='panel__nls flex-row'>
                <span className='flex-row'>
                {data.map((item, id) =>
                    <NavLink className={({isActive}) => isActive ? 'active' : ''} key={id} to={`/home/${panel}/workspace/${item}`}><li className='panel__nl'>{item}</li></NavLink>
                )}
                </span>
                <Link className='addtsk__btn' to={`/home/${panel}/workspace/addTask`}>Add Task</Link>
            </ul>
            <span className='hr__line' />
        </div>
    )
}

export default WorkSpaceNLs