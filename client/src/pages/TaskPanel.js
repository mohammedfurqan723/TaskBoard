import NoTask from './NoTask'
import TaskCategory from './TaskCategory'
import avatar from '../asserts/logo/avatar9.png'
import '../css/TaskPanel.css'

const TaskPanel = () => {
    const taskSections = [
        {
            taskSection: 'Development',
            taskList: [
                {
                    taskName: 'Landing Page',
                    shortDesc: 'Prepare design system for Momo landing page.',
                    tags: ['New Client', 'New Project', 'System Design'],
                    avatar: [avatar, avatar, avatar],
                    estTime: '22h 30m',
                },
                {
                    taskName: 'Parallex Page',
                    shortDesc: 'Prepare design system for Ecommerce page.',
                    tags: ['New Client', 'New Project', 'System Design'],
                    avatar: [avatar, avatar, avatar],
                    estTime: '48h 30m'
                }
            ]

        },
        {
            taskSection: 'Design',
            taskList: [
                {
                    taskName: 'Landing Page',
                    shortDesc: 'Prepare design system for Momo landing page.',
                    tags: ['New Client', 'New Project', 'System Design'],
                    avatar: [avatar, avatar, avatar],
                    estTime: '22h 30m',
                },
                {
                    taskName: 'Parallex Page',
                    shortDesc: 'Prepare design system for Ecommerce page.',
                    tags: ['New Client', 'New Project', 'System Design'],
                    avatar: [avatar, avatar, avatar],
                    estTime: '48h 30m'
                }
            ]

        },
        {
            taskSection: 'Bug Fix',
            taskList: [
                {
                    taskName: 'Landing Page',
                    shortDesc: 'Prepare design system for Momo landing page.',
                    tags: ['New Client', 'New Project', 'System Design'],
                    avatar: [avatar, avatar, avatar],
                    estTime: '22h 30m',
                },
                {
                    taskName: 'Parallex Page',
                    shortDesc: 'Prepare design system for Ecommerce page.',
                    tags: ['New Client', 'New Project', 'System Design'],
                    avatar: [avatar, avatar, avatar],
                    estTime: '48h 30m'
                }
            ]

        },
    ]
    const data = true;
    return (
        <section className="tp__ctr">
            {data ?
                taskSections?.map((item, id) => <TaskCategory key={id} section={item} />)
                :
                <NoTask />
            }
        </section>
    )
}

export default TaskPanel